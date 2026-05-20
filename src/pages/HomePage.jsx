import Btn from "../components/Btn";
import ProductCard from "../components/ProductCard";
import Input from "../components/Input";
import { CATEGORIES } from "../utils/constants";
import {getUsers,getProducts,getMessages,saveUsers,saveProducts,saveMessages} from "../utils/storage";

export default function HomePage({ products, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, onProductClick, onDelete, onEdit, currentUser, onAiSearch, aiSearchLoading, aiSearchResult, clearAiSearch }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #534AB7 100%)", borderRadius: 24, padding: "40px 32px", marginBottom: 32, color: "#fff" }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Find great deals<br />on used items</div>
        <div style={{ color: "#c4b5fd", fontSize: 15, marginBottom: 24 }}>Browse thousands of listings from sellers near you</div>
        <div style={{ display: "flex", gap: 10, maxWidth: 600 }}>
          <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); }} onKeyDown={e => e.key === "Enter" && onAiSearch()} placeholder='Try "cheap bike under 20k" or "iPhone"...' style={{ flex: 1, padding: "12px 18px", borderRadius: 12, border: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: "rgba(255,255,255,0.15)", color: "#fff", outline: "none" }} />
          <Btn onClick={onAiSearch} variant="primary" style={{ background: "#a78bfa", color: "#1a1a2e", borderRadius: 12, whiteSpace: "nowrap" }} disabled={aiSearchLoading}>
            {aiSearchLoading ? "Searching..." : "🔍 Smart Search"}
          </Btn>
        </div>
        {aiSearchResult && (
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#c4b5fd", fontSize: 13 }}>✨ AI found {aiSearchResult.length} matching results</span>
            <button onClick={clearAiSearch} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Clear</button>
          </div>
        )}
      </div>

      {/* Category Filter */}
      {!aiSearchResult && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setSelectedCategory(c)} style={{ padding: "7px 16px", borderRadius: 20, border: "1.5px solid", borderColor: selectedCategory === c ? "#534AB7" : "#e2e0ff", background: selectedCategory === c ? "#534AB7" : "#fff", color: selectedCategory === c ? "#fff" : "#534AB7", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: "#374151", marginBottom: 8 }}>No listings found</div>
          <div style={{ fontSize: 14 }}>Try a different search or category</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {products.map(p => <ProductCard key={p.id} product={p} onClick={onProductClick} onDelete={onDelete} onEdit={onEdit} currentUser={currentUser} />)}
        </div>
      )}
    </div>
  );
}
