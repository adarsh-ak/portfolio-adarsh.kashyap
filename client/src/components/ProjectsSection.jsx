import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, X } from "lucide-react";

const projects = [
  { id: 1, title: "Social Media", description: "Full-stack social media platform using MERN with workflows powered by Inngest.", image: "/projects/project1.png", tags: ["MERN", "Clerk", "ImageKit"], demoUrl: "https://social-media-2-opal.vercel.app/", githubUrl: "https://github.com/adarsh-ak/social-media-2/tree/main" },
  { id: 2, title: "AI Resume Builder", description: "AI resume builder with ATS-friendly sections: summary, experience, education and projects.", image: "/projects/project2.png", tags: ["OpenAI", "MERN", "ImageKit"], demoUrl: "#", githubUrl: "https://github.com/adarsh-ak/ai-resume-builder" },
  { id: 3, title: "ByBook - Book Dealer", description: "Book dealer system with full CRUD for managing books and inventory.", image: "/projects/project3.png", tags: ["React", "MERN"], demoUrl: "#", githubUrl: "https://github.com/adarsh-ak/book-dealer-database" },
];

export const ProjectsSection = () => {
  const [open, setOpen] = useState(null);
  const p = projects.find((x) => x.id === open);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <section id="projects" className="py-24 px-4">
      <div className="container max-w-5xl mx-auto">
        <p className="serif-i text-lg text-muted-foreground">/ Best projects</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">Selected Works</h2>
        <p className="text-muted-foreground mb-12">Hover a card to preview it, click to open the full project.</p>

        <LayoutGroup>
          <div className="flex flex-col md:flex-row gap-4 md:h-[26rem]">
            {projects.map((x) => (
              <motion.button
                key={x.id}
                layoutId={`card-${x.id}`}
                onClick={() => setOpen(x.id)}
                whileHover={{ flex: 1.6 }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                className="group relative flex-1 min-h-48 rounded-2xl overflow-hidden bg-card border border-border text-left p-6 flex flex-col justify-between"
              >
                <img src={x.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" onError={(e) => (e.currentTarget.style.display = "none")} />
                <span className="relative text-5xl font-light text-foreground/30 group-hover:text-white transition-colors">0{x.id}</span>
                <div className="relative group-hover:text-white transition-colors">
                  <h3 className="serif-i text-3xl">{x.title}</h3>
                  <p className="text-xs opacity-70 mt-1">{x.tags.join(" · ")}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </LayoutGroup>

        <a className="cosmic-button mt-12 mx-auto w-fit" target="_blank" rel="noreferrer" href="https://github.com/adarsh-ak">
          Check My Github <ArrowRight size={16} />
        </a>
      </div>

      <AnimatePresence>
        {p && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div layoutId={`card-${p.id}`} className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-card border border-border grid md:grid-cols-2 text-left">
              <div className="bg-secondary min-h-64 md:min-h-[28rem]">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="p-8 md:p-12 flex flex-col justify-center gap-5">
                <h3 className="serif-i text-5xl md:text-6xl">{p.title}</h3>
                <p className="text-muted-foreground">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-full bg-secondary">{t}</span>)}
                </div>
                <div className="flex gap-3 pt-2">
                  {p.demoUrl !== "#" && <a href={p.demoUrl} target="_blank" rel="noreferrer" className="cosmic-button"><ExternalLink size={16} /> Live demo</a>}
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-2.5 rounded-full border border-border hover:bg-secondary inline-flex items-center gap-2"><Github size={16} /> Code</a>
                </div>
              </motion.div>
              <button onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background"><X size={20} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};