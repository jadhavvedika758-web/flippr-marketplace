export default function Btn({ children, onClick, variant = "primary", size = "md", style = {}, disabled = false }) {
  const base = { fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", border: "none", borderRadius: 10, transition: "all 0.15s", opacity: disabled ? 0.6 : 1, ...style };
  const sizes = { sm: { padding: "6px 14px", fontSize: 13 }, md: { padding: "10px 20px", fontSize: 14 }, lg: { padding: "13px 28px", fontSize: 15 } };
  const variants = {
    primary: { background: "#1a1a2e", color: "#fff" },
    secondary: { background: "#f0efff", color: "#534AB7" },
    danger: { background: "#fee2e2", color: "#991b1b" },
    ghost: { background: "transparent", color: "#534AB7", border: "1.5px solid #AFA9EC" },
    success: { background: "#dcfce7", color: "#166534" }
  };
  return <button onClick={!disabled ? onClick : undefined} style={{ ...base, ...sizes[size], ...variants[variant] }}>{children}</button>;
}