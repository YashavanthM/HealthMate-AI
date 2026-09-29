import { motion } from "framer-motion";

function Card({ children, className = "", delay = 0, hover = true }) {
  return (
    <motion.div
      className={`rounded-2xl border border-white/10 bg-white/[0.05] shadow-xl shadow-black/10 backdrop-blur-lg ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -3, boxShadow: "0 0 38px rgba(56,189,248,0.12)" } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default Card;
