import Card from "./Card";
import Badge from "./Badge";
import Btn from "./Btn";

export default function ProductCard({ product, onClick, onDelete, onEdit, currentUser }) {
  const isOwner = currentUser?.id === product.sellerId;
  const isAdmin = currentUser?.role === "admin";
  return (
    <Card onClick={() => !isOwner && onClick(product)} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden", background: "#f0efff" }}>
        {product.images?.[0] ? <img src={product.images[0]} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>📦</div>}
        <Badge color="#534AB7" bg="#EEEDFE">{product.category}</Badge>
        {!product.active && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>REMOVED</div>}
      </div>
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.3 }}>{product.title}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b7280", lineHeight: 1.4, flex: 1 }}>{product.description?.slice(0, 80)}...</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "#534AB7" }}>₹{product.price?.toLocaleString()}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {(isOwner || isAdmin) && product.active && (
              <>
                {isOwner && <Btn size="sm" variant="secondary" onClick={e => { e.stopPropagation(); onEdit(product); }}>Edit</Btn>}
                <Btn size="sm" variant="danger" onClick={e => { e.stopPropagation(); onDelete(product.id); }}>Remove</Btn>
              </>
            )}
          </div>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9ca3af" }}>by {product.sellerName}</div>
      </div>
    </Card>
  );
}