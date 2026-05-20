export default function Avatar({ name, size = 36, color = "#7F77DD" }) {
  const initials = name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 600, color: "#fff", flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>
      {initials}
    </div>
  );
}