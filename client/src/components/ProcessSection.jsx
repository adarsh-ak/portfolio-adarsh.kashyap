import { motion } from "framer-motion";

const steps = [
  { n: "01", t: "Discover", d: "Understanding the problem, the users and the data before writing code.", r: -4, y: 0 },
  { n: "02", t: "Build", d: "Clean React interfaces on a solid Node, Express and MongoDB backend.", r: 0, y: 40 },
  { n: "03", t: "Deliver", d: "Test, refine and deploy with performance and polish in mind.", r: 4, y: 0 },
];

export const ProcessSection = () => (
  <section className="py-24 px-4">
    <div className="container max-w-5xl mx-auto">
      <p className="serif-i text-lg text-muted-foreground">/ How I work</p>
      <h2 className="text-3xl md:text-5xl font-semibold mb-16">Here's how it works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: s.y, rotate: s.r }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 120, damping: 16 }}
            className="glass-card p-8 text-left min-h-60 flex flex-col justify-between"
          >
            <span className="text-4xl font-light text-foreground/40">{s.n}</span>
            <div>
              <h3 className="serif-i text-4xl mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);