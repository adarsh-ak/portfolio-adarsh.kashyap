import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Set FRONTEND_URL on Vercel, e.g. https://portfolio-adarsh-kashyap.vercel.app
const allowed = [process.env.FRONTEND_URL, 'http://localhost:5173'].filter(Boolean);
app.use(cors({ origin: allowed.length > 1 ? allowed : '*' }));
app.use(express.json({ limit: '50kb' }));

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Provider 1: Gmail (Nodemailer) ----
const sendViaGmail = async ({ to, subject, html, replyTo }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) throw new Error('Gmail env vars missing');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
  return transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html, replyTo });
};

// ---- Provider 2 (backup): Resend API. Free tier; works without a domain when sending to your own email ----
const sendViaResend = async ({ to, subject, html, replyTo }) => {
  if (!process.env.RESEND_API_KEY) throw new Error('Resend key missing');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Portfolio <onboarding@resend.dev>', to: [to], subject, html, reply_to: replyTo }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
};

// Try Gmail 3 times, then fall back to Resend
const deliver = async (mail) => {
  for (let i = 1; i <= 3; i++) {
    try { return await sendViaGmail(mail); }
    catch (e) { console.error(`Gmail attempt ${i} failed:`, e.message); if (i < 3) await sleep(i * 700); }
  }
  await sendViaResend(mail); // throws if this fails too
};

app.get('/', (req, res) => res.json({ status: 'OK', time: new Date().toISOString() }));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: 'Please fill in all fields.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });

  // Always keep a copy in the server logs, so a message can never be lost
  console.log('CONTACT_MESSAGE', JSON.stringify({ name, email, message, at: new Date().toISOString() }));

  const owner = process.env.EMAIL_USER || process.env.OWNER_EMAIL;
  try {
    await deliver({
      to: owner,
      replyTo: email,
      subject: `Portfolio Contact from ${String(name).slice(0, 80)}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:8px">
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p style="white-space:pre-wrap;line-height:1.6;border-left:4px solid #84cc16;padding-left:12px">${esc(message)}</p>
        <p style="color:#888;font-size:12px">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p></div>`,
    });
  } catch (err) {
    console.error('ALL PROVIDERS FAILED:', err.message);
    return res.status(502).json({
      success: false,
      message: 'Could not send right now. Please email me directly at adarshspn2005@gmail.com',
    });
  }

  // Auto-reply is a bonus: if it fails, the visitor still sees success
  try {
    await sendViaGmail({
      to: email,
      subject: 'Thanks for contacting me - Adarsh Kumar Kashyap',
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px">
        <h2>Thanks for reaching out, ${esc(name)}!</h2>
        <p>I received your message and will reply soon.</p>
        <p style="white-space:pre-wrap;color:#555">${esc(message)}</p>
        <p>Best regards,<br><strong>Adarsh Kumar Kashyap</strong></p></div>`,
    });
  } catch (e) {
    console.error('Auto-reply failed (ignored):', e.message);
  }

  return res.json({ success: true, message: 'Message sent! Check your email for confirmation.' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;