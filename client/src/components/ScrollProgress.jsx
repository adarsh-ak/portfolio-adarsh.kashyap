import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-primary to-cyan-400 z-50" />;
};