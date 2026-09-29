import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-[0_0_32px_rgba(37,99,235,0.28)] hover:shadow-[0_0_42px_rgba(56,189,248,0.32)]",
  secondary:
    "border border-white/10 bg-white/[0.05] text-slate-200 hover:border-white/20 hover:bg-white/[0.08]",
  danger: "bg-red-500/90 text-white hover:bg-red-400",
  ghost: "text-slate-300 hover:bg-white/[0.06] hover:text-white",
};

function Button({ children, className = "", variant = "primary", ...props }) {
  return (
    <motion.button
      className={`rounded-xl px-5 py-3 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      type="button"
      whileHover={props.disabled ? undefined : { scale: 1.025 }}
      whileTap={props.disabled ? undefined : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
