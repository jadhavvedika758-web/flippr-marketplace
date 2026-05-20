import { useState, useEffect, useRef } from "react";
import Avatar from "./components/Avatar";
import Btn from "./components/Btn";
import Badge from "./components/Badge";
import Card from "./components/Card";
import Input from "./components/Input";
import Select from "./components/Select";
import ProductCard from "./components/ProductCard";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ChatPage from "./pages/ChatPage";
import DetailPage from "./pages/DetailPage";
import SellPage from "./pages/SellPage";
import SignupPage from "./pages/SignupPage";
import {CATEGORIES,ADMIN_EMAIL,ADMIN_PASS} from "./utils/constants";
import { callGemini } from "./utils/gemini";
import {getUsers,getProducts,getMessages,saveUsers,saveProducts,saveMessages} from "./utils/storage";
import {SEED_PRODUCTS,SEED_USERS} from "./utils/seedData";
import { initData } from "./utils/initData";


export default function App() {
  initData();
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(getProducts);
  const [messages, setMessages] = useState(getMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSearchResult, setAiSearchResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [chatPartner, setChatPartner] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [aiSearchLoading, setAiSearchLoading] = useState(false);

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const refreshProducts = () => { const p = getProducts(); setProducts(p); };
  const refreshMessages = () => { const m = getMessages(); setMessages(m); };

  const handleDeleteProduct = (id) => {
    const p = getProducts().map(pr => pr.id === id ? { ...pr, active: false } : pr);
    saveProducts(p);
    refreshProducts();
    notify("Listing removed.");
  };

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;

    setAiSearchLoading(true);

    const filtered = products
      .filter((p) => {
        const text =
          (
            p.title +
            " " +
            p.description +
            " " +
            p.category
          ).toLowerCase();

        return text.includes(searchQuery.toLowerCase());
      })
      .map((p) => p.id);

    setAiSearchResult(filtered);

    setAiSearchLoading(false);
  };

  const filteredProducts = (() => {
    let p = products.filter(p => p.active);
    if (aiSearchResult) return p.filter(pr => aiSearchResult.includes(pr.id)).sort((a, b) => aiSearchResult.indexOf(a.id) - aiSearchResult.indexOf(b.id));
    if (selectedCategory !== "All") p = p.filter(pr => pr.category === selectedCategory);
    if (searchQuery) p = p.filter(pr => pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || pr.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    return p.sort((a, b) => b.createdAt - a.createdAt);
  })();

  const unreadCount = messages.filter(m => m.receiverId === currentUser?.id && !m.read).length;

  const navItems = [
    { id: "home", label: "Browse" },
    ...(currentUser ? [
      { id: "sell", label: "+ Sell" },
      { id: "chat", label: `Messages${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
      { id: "profile", label: "My Profile" },
      ...(currentUser.role === "admin" ? [{ id: "admin", label: "Admin" }] : [])
    ] : [
      { id: "login", label: "Login" },
      { id: "signup", label: "Sign Up" }
    ])
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6ff", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={{ background: "#1a1a2e", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100 }}>
        <div onClick={() => { setPage("home"); setAiSearchResult(null); setSearchQuery(""); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 800, color: "#a78bfa" }}>Flippr</span>
          <span style={{ fontSize: 10, color: "#7c6ead", fontWeight: 600, letterSpacing: 2 }}>Buy • Sell • Repeat</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ background: page === n.id ? "#534AB7" : "transparent", color: page === n.id ? "#fff" : "#c4b5fd", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>
              {n.label}
            </button>
          ))}
          {currentUser && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
              <Avatar name={currentUser.name} size={30} />
              <button onClick={() => { setCurrentUser(null); setPage("home"); notify("Logged out."); }} style={{ background: "transparent", border: "none", color: "#c4b5fd", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Logout</button>
            </div>
          )}
        </div>
      </nav>

      {/* Notification */}
      {notification && (
        <div style={{ position: "fixed", top: 70, right: 24, background: notification.type === "error" ? "#fee2e2" : "#dcfce7", color: notification.type === "error" ? "#991b1b" : "#166534", padding: "12px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          {notification.msg}
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        {page === "home" && <HomePage products={filteredProducts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onProductClick={p => { setSelectedProduct(p); setPage("detail"); }} onDelete={handleDeleteProduct} onEdit={p => { setEditProduct(p); setPage("sell"); }} currentUser={currentUser} onAiSearch={handleAiSearch} aiSearchLoading={aiSearchLoading} aiSearchResult={aiSearchResult} clearAiSearch={() => { setAiSearchResult(null); setSearchQuery(""); }} />}
        {page === "detail" && selectedProduct && <DetailPage product={selectedProduct} currentUser={currentUser} onBack={() => setPage("home")} onChat={(seller) => { if (!currentUser) { notify("Please login to message sellers.", "error"); setPage("login"); return; } setChatPartner(seller); setPage("chat"); }} messages={messages} refreshMessages={refreshMessages} notify={notify} />}
        {page === "sell" && <SellPage currentUser={currentUser} editProduct={editProduct} onSaved={() => { setEditProduct(null); refreshProducts(); setPage("profile"); notify("Listing saved!"); }} onCancel={() => { setEditProduct(null); setPage("home"); }} notify={notify} />}
        {page === "chat" && <ChatPage currentUser={currentUser} messages={messages} refreshMessages={refreshMessages} chatPartner={chatPartner} setChatPartner={setChatPartner} notify={notify} />}
        {page === "profile" && <ProfilePage currentUser={currentUser} products={products} onDelete={handleDeleteProduct} onEdit={p => { setEditProduct(p); setPage("sell"); }} refreshProducts={refreshProducts} setCurrentUser={setCurrentUser} notify={notify} />}
        {page === "login" && <LoginPage onLogin={user => { setCurrentUser(user); setPage("home"); notify(`Welcome back, ${user.name}!`); }} onSwitch={() => setPage("signup")} notify={notify} />}
        {page === "signup" && <SignupPage onSignup={user => { setCurrentUser(user); setPage("home"); notify(`Welcome to Flippr, ${user.name}!`); }} onSwitch={() => setPage("login")} notify={notify} />}
        {page === "admin" && currentUser?.role === "admin" && <AdminPage products={products} onDelete={handleDeleteProduct} refreshProducts={refreshProducts} notify={notify} />}
      </div>
    </div>
  );
}