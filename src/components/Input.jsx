export default function Input({ label, value, onChange, type = "text", placeholder, style = {}, rows }) {
  const base = { width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "10px 14px", border: "1.5px solid #e2e0ff", borderRadius: 10, outline: "none", boxSizing: "border-box", background: "#fafafe", color: "#1a1a2e", ...style };
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#534AB7", marginBottom: 6 }}>{label}</label>}
      {rows ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...base, resize: "vertical" }} /> : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={base} />}
    </div>
  );
}