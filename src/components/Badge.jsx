export default function Badge({ children, color = "#7F77DD", bg = "#EEEDFE" }) {
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>{children}</span>;
}