import { useState } from "react";
import { CATEGORIES } from "../utils/constants";
import Card from "../components/Card";
import Btn from "../components/Btn";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import {getUsers,getProducts,getMessages,saveUsers,saveProducts,saveMessages} from "../utils/storage";

export default function AdminPage({ products, onDelete, refreshProducts, notify }) {
  const [tab, setTab] = useState("products");
  const users = getUsers().filter(u => u.role !== "admin");
  const allProducts = getProducts();

  const banUser = (userId) => {
    const u = getUsers().map(user => user.id === userId ? { ...user, banned: true } : user);
    saveUsers(u);
    notify("User banned.");
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1a1a2e" }}>Admin Panel</div>
        <Badge color="#991b1b" bg="#fee2e2">ADMIN</Badge>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["products", "users"].map(t => (
          <Btn key={t} onClick={() => setTab(t)} variant={tab === t ? "primary" : "ghost"}>{t === "products" ? `Listings (${allProducts.length})` : `Users (${users.length})`}</Btn>
        ))}
      </div>
      {tab === "products" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {allProducts.map(p => (
            <Card key={p.id} style={{ padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 10, background: "#f0efff", overflow: "hidden", flexShrink: 0 }}>
                {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>📦</div>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#1a1a2e", marginBottom: 2 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>by {p.sellerName} · ₹{p.price?.toLocaleString()} · {p.category}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge color={p.active ? "#166534" : "#991b1b"} bg={p.active ? "#dcfce7" : "#fee2e2"}>{p.active ? "Active" : "Removed"}</Badge>
                {p.active && <Btn size="sm" variant="danger" onClick={() => onDelete(p.id)}>Remove</Btn>}
              </div>
            </Card>
          ))}
        </div>
      )}
      {tab === "users" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {users.map(u => (
            <Card key={u.id} style={{ padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar name={u.name} size={44} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#1a1a2e" }}>{u.name}</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>{u.email} · Joined {new Date(u.joinedAt).toLocaleDateString()}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {u.banned && <Badge color="#991b1b" bg="#fee2e2">Banned</Badge>}
                {!u.banned && <Btn size="sm" variant="danger" onClick={() => banUser(u.id)}>Ban</Btn>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
