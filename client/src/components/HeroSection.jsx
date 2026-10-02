import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tech = ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JavaScript", "C++", "MySQL", "Git", "Postman"];
const rise = (d = 0) => ({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.8, ease: [0.22, 1, 0.36, 1] } });

export const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
    <div className="hero-glow" aria-hidden />

    <div className="relative z-10 flex-1 container pt-32 pb-10 flex flex-col items-center">
      <motion.div {...rise(0.1)} className="text-sm px-4 py-1.5 rounded-full bg-card/80 border border-border">
        Full-Stack Developer · B.Tech IT
      </motion.div>

      {/* optional cut-out photo: put /public/profile.png (transparent bg). Hidden if missing. */}
      <motion.img
        src="/profile.png" alt="" {...rise(0.3)}
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[65%] object-contain grayscale z-0"
      />

      <div className="relative z-10 mt-10">
        <motion.h1 {...rise(0.2)} className="text-6xl md:text-8xl font-semibold tracking-tight leading-none">
          Hi I'm Adarsh
        </motion.h1>
        <motion.h1 {...rise(0.4)} className="serif-i text-6xl md:text-9xl leading-[0.9] -mt-1 md:-mt-3 whitespace-nowrap">
          Web Developer
        </motion.h1>
      </div>

      <div className="relative z-10 w-full mt-auto pt-28 grid md:grid-cols-3 items-end gap-6 text-left">
        <motion.div {...rise(0.7)} className="flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-card border border-border text-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-lime animate-pulse" /> Available for new opportunities
        </motion.div>
        <motion.p {...rise(0.8)} className="md:justify-self-end text-sm md:text-base max-w-xs text-foreground/80">
          Passionate about building fast, intuitive web apps with the MERN stack and DSA-driven thinking.
        </motion.p>
        <motion.div {...rise(0.9)} className="md:justify-self-end">
          <a href="#contact" className="cosmic-button"><ArrowRight size={16} /> Get in Touch</a>
        </motion.div>
      </div>
    </div>

    <div className="relative z-10 py-6 overflow-hidden marquee-mask">
      <div className="flex w-max animate-marquee gap-14">
        {[...tech, ...tech].map((t, i) => (
          <span key={i} className="text-xl font-semibold text-foreground/35 whitespace-nowrap">{t}</span>
        ))}
      </div>
    </div>
  </section>
);