import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false); // light is the new default

  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="fixed max-sm:hidden top-4 right-5 z-50 p-2.5 rounded-full bg-card border border-border">
      {isDark ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;