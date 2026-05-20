import Card from "../components/Card";
import Btn from "../components/Btn";
import Avatar from "../components/Avatar";
import Input from "../components/Input";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import {getUsers,getProducts,getMessages,saveUsers,saveProducts,saveMessages} from "../utils/storage";

export default function ProfilePage({ currentUser, products, onDelete, onEdit, refreshProducts, setCurrentUser, notify }) {
  if (!currentUser) return <div style={{ textAlign: "center", padding: 60 }}><div style={{ fontFamily: "'Fraunces', serif", fontSize: 24 }}>Please login</div></div>;
  const myProducts = products.filter(p => p.sellerId === currentUser.id);
  const activeListings = myProducts.filter(p => p.active);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(currentUser.name);

  const saveName = () => {
    const users = getUsers().map(u => u.id === currentUser.id ? { ...u, name: newName } : u);
    saveUsers(users);
    setCurrentUser({ ...currentUser, name: newName });
    setEditName(false);
    notify("Name updated!");
  };

  return (
    <div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1a1a2e", marginBottom: 24 }}>My Profile</div>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card style={{ padding: 24, textAlign: "center" }}>
            <Avatar name={currentUser.name} size={72} color="#534AB7" />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginTop: 12 }}>{currentUser.name}</div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>{currentUser.email}</div>
            {editName ? (
              <div>
                <Input value={newName} onChange={setNewName} />
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn size="sm" onClick={saveName} style={{ flex: 1 }}>Save</Btn>
                  <Btn size="sm" variant="ghost" onClick={() => setEditName(false)}>Cancel</Btn>
                </div>
              </div>
            ) : (
              <Btn size="sm" variant="secondary" onClick={() => setEditName(true)}>Edit Name</Btn>
            )}
          </Card>
          <Card style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: "#6b7280" }}>Active Listings</span>
              <span style={{ fontWeight: 700, color: "#534AB7" }}>{activeListings.length}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, color: "#6b7280" }}>Total Listed</span>
              <span style={{ fontWeight: 700, color: "#1a1a2e" }}>{myProducts.length}</span>
            </div>
          </Card>
        </div>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: "#1a1a2e", marginBottom: 16 }}>My Listings</div>
          {myProducts.length === 0 ? (
            <div style={{ color: "#9ca3af", textAlign: "center", padding: 40 }}>You haven't listed anything yet</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {myProducts.map(p => <ProductCard key={p.id} product={p} onClick={() => {}} onDelete={onDelete} onEdit={onEdit} currentUser={currentUser} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
