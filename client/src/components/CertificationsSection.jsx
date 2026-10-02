import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import { cn } from "../lib/utils";

// ✏️ EDIT THIS LIST — add images in /public/certificates/
const certificates = [
  { title: "Full-Stack Web Development (MERN)", issuer: "Coursera", date: "Jan 2025", id: "DEMO-MERN-0001", category: "Web Dev", image: "/certificates/cert1.png", link: "#" },
  { title: "Data Structures & Algorithms", issuer: "NPTEL", date: "Nov 2024", id: "DEMO-DSA-0002", category: "DSA", image: "/certificates/cert2.png", link: "#" },
  { title: "React - The Complete Guide", issuer: "Udemy", date: "Aug 2024", id: "DEMO-REACT-0003", category: "Web Dev", image: "/certificates/cert3.png", link: "#" },
  { title: "C++ Programming", issuer: "HackerRank", date: "May 2024", id: "DEMO-CPP-0004", category: "DSA", image: "/certificates/cert4.png", link: "#" },
  { title: "SQL & Database Management", issuer: "Coursera", date: "Mar 2024", id: "DEMO-SQL-0005", category: "Database", image: "/certificates/cert5.png", link: "#" },
  { title: "Git & GitHub Essentials", issuer: "Google", date: "Jan 2024", id: "DEMO-GIT-0006", category: "Tools", image: "/certificates/cert6.png", link: "#" },
];

const categories = ["All", ...new Set(certificates.map((c) => c.category))];

export const CertificatesSection = () => {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const list = certificates.filter((c) => active === "All" || c.category === active);

  return (
    <section id="certificates" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-center">
          My <span className="text-gradient">Certificates</span>
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Courses and credentials that back up the skills above. Click a card to view it in full.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300",
                active === c ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.div
                layout
                key={c.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onClick={() => setSelected(c)}
                className="glass-card cursor-pointer overflow-hidden text-left"
              >
                <div className="relative h-44 flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(var(--lime) / .85), hsl(var(--lime) / .15))" }}>
                  <Award className="h-12 w-12 text-foreground/70" />
                  <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
                <div className="p-5">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{c.category}</span>
                  <h3 className="font-semibold text-lg mt-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.issuer} · {c.date}</p>
                  <p className="text-xs text-muted-foreground/80 mt-1">Credential ID: {c.id}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }}
              className="relative bg-card rounded-xl max-w-3xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} aria-label="Close" className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:text-primary">
                <X size={20} />
              </button>
              <div className="w-full h-72 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--lime) / .85), hsl(var(--lime) / .15))" }}><Award className="h-16 w-16" /></div>
              <img src={selected.image} alt={selected.title} className="w-full max-h-[70vh] object-contain rounded-lg -mt-72 relative" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div className="flex items-center justify-between mt-4 px-2">
                <div className="text-left">
                  <h3 className="font-semibold">{selected.title}</h3>
                  <p className="text-sm text-muted-foreground">{selected.issuer} · {selected.date}</p>
                </div>
                {selected.link !== "#" && (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="cosmic-button flex items-center gap-2">
                    Verify <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};