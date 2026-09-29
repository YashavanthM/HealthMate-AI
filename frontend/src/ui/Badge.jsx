function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
