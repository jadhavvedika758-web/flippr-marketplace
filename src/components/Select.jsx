export default function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#534AB7", marginBottom: 6 }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "10px 14px", border: "1.5px solid #e2e0ff", borderRadius: 10, background: "#fafafe", color: "#1a1a2e", boxSizing: "border-box" }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}