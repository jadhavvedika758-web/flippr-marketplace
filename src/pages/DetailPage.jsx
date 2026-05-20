import { useState } from "react";
import Card from "../components/Card";
import Btn from "../components/Btn";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import {getUsers,getProducts,getMessages,saveUsers,saveProducts,saveMessages} from "../utils/storage";


export default function DetailPage({ product, currentUser, onBack, onChat, messages, refreshMessages, notify }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [msg, setMsg] = useState("");
  const seller = getUsers().find(u => u.id === product.sellerId);

  const sendQuickMsg = () => {
    if (!currentUser) { notify("Login to message seller.", "error"); return; }
    if (!msg.trim()) return;
    const m = getMessages();
    m.push({ id: `m${Date.now()}`, senderId: currentUser.id, senderName: currentUser.name, receiverId: product.sellerId, receiverName: product.sellerName, productId: product.id, productTitle: product.title, text: msg, createdAt: Date.now(), read: false });
    saveMessages(m);
    refreshMessages();
    setMsg("");
    notify("Message sent!");
  };

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#534AB7", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>← Back to listings</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 32 }}>
        <div>
          <div style={{ borderRadius: 20, overflow: "hidden", background: "#f0efff", height: 400, marginBottom: 12 }}>
            {product.images?.[imgIdx] ? <img src={product.images[imgIdx]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>📦</div>}
          </div>
          {product.images?.length > 1 && (
            <div style={{ display: "flex", gap: 8 }}>
              {product.images.map((img, i) => <img key={i} src={img} alt="" onClick={() => setImgIdx(i)} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 10, border: i === imgIdx ? "2px solid #534AB7" : "2px solid transparent", cursor: "pointer" }} />)}
            </div>
          )}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#534AB7", marginBottom: 8 }}>DESCRIPTION</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#374151", lineHeight: 1.7 }}>{product.description}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ padding: 24 }}>
            <Badge color="#534AB7" bg="#EEEDFE">{product.category}</Badge>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginTop: 12, marginBottom: 4 }}>{product.title}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 800, color: "#534AB7", marginBottom: 16 }}>₹{product.price?.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>Listed {new Date(product.createdAt).toLocaleDateString()}</div>
          </Card>
          <Card style={{ padding: 20 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#6b7280", marginBottom: 12 }}>SELLER</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Avatar name={product.sellerName} size={44} />
              <div>
                <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 15 }}>{product.sellerName}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>Member since {seller ? new Date(seller.joinedAt).toLocaleDateString() : "N/A"}</div>
              </div>
            </div>
            {currentUser?.id !== product.sellerId && (
              <>
                <div style={{ marginBottom: 10 }}>
                  <Input value={msg} onChange={setMsg} placeholder="Ask about this item..." />
                </div>
                <Btn onClick={sendQuickMsg} style={{ width: "100%" }}>Send Message</Btn>
                <Btn onClick={() => onChat(seller)} variant="ghost" style={{ width: "100%", marginTop: 8 }}>Open Chat</Btn>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
