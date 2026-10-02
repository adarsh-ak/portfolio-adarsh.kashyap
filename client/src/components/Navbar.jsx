import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10); // fixed: was window.screenY
    window.addEventListener("scroll", onScroll);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach((n) => { const el = document.querySelector(n.href); el && obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  const link = (item, extra = "") => (
    <a
      key={item.name}
      href={item.href}
      onClick={() => setIsMenuOpen(false)}
      className={cn(
        "transition-colors duration-300 hover:text-primary",
        activeId === item.href.slice(1) ? "text-primary font-medium" : "text-foreground/80",
        extra
      )}
    >
      {item.name}
    </a>
  );

  return (
    <nav className={cn("fixed w-full z-40 transition-all duration-300", isScrolled ? "py-3 bg-background/70 backdrop-blur-md shadow-xs" : "py-5")}>
      <div className="container flex items-center justify-between">
        <a className="text-xl font-bold text-primary" href="#hero">
          <span className="text-glow text-foreground">Adarsh</span> Portfolio
        </a>
        <div className="hidden md:flex space-x-8 mr-12">{navItems.map((i) => link(i))}</div>
        <button onClick={() => setIsMenuOpen((p) => !p)} className="md:hidden p-2 text-foreground z-50" aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}>
          <div className="flex flex-col space-y-8 text-xl text-center">{navItems.map((i) => link(i))}</div>
        </div>
      </div>
    </nav>
  );
};