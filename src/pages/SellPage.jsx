import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Btn from "../components/Btn";
import { useState } from "react";
import { CATEGORIES } from "../utils/constants";
import { getProducts, saveProducts } from "../utils/storage";
import { callGemini } from "../utils/gemini";

export default function SellPage({ currentUser, editProduct, onSaved, onCancel, notify }) {
  const isEditing = !!editProduct;
  const [title, setTitle] = useState(editProduct?.title || "");
  const [desc, setDesc] = useState(editProduct?.description || "");
  const [price, setPrice] = useState(editProduct?.price?.toString() || "");
  const [category, setCategory] = useState(editProduct?.category || "Electronics");
  const [images, setImages] = useState(editProduct?.images || []);
  const [imageUrl, setImageUrl] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);

  if (!currentUser) return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, marginBottom: 16 }}>Login to sell items</div>
    </div>
  );

  const generateDesc = async () => {
    if (!title) { notify("Enter a title first.", "error"); return; }
    setAiLoading(true);
    const prompt = `
    Generate a compelling and honest product description
    for this used item:

    Title: ${title}
    Category: ${category}

    Keep it 3-4 sentences.
    `;

    const reply = await callGemini(prompt);
    setDesc(reply);
    setAiLoading(false);
  };

  const suggestPrice = async () => {
    if (!title) { notify("Enter a title first.", "error"); return; }
    setPriceLoading(true);
    const prompt = `
    Suggest a fair resale price in Indian Rupees
    for this used item:

    Title: ${title}
    Category: ${category}

    Return ONLY JSON like:
    {"price":15000,"reason":"short reason"}
    `;

    const reply = await callGemini(prompt);
    try {
      const clean = reply.replace(/```json|```/g, "").trim();
      const { price: p, reason } = JSON.parse(clean);
      setPrice(p.toString());
      notify(`Suggested: ₹${p.toLocaleString()} — ${reason}`);
    } catch { notify("Could not parse price suggestion.", "error"); }
    setPriceLoading(false);
  };

  const addImage = () => {
    if (imageUrl.trim() && images.length < 5) { setImages([...images, imageUrl.trim()]); setImageUrl(""); }
  };

  const handleSave = () => {
    if (!title || !desc || !price || !category) { notify("Please fill all fields.", "error"); return; }
    const products = getProducts();
    if (isEditing) {
      const updated = products.map(p => p.id === editProduct.id ? { ...p, title, description: desc, price: parseInt(price), category, images } : p);
      saveProducts(updated);
    } else {
      const newProduct = { id: `p${Date.now()}`, sellerId: currentUser.id, sellerName: currentUser.name, title, description: desc, price: parseInt(price), category, images, createdAt: Date.now(), active: true };
      saveProducts([...products, newProduct]);
    }
    onSaved();
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1a1a2e", marginBottom: 24 }}>{isEditing ? "Edit Listing" : "Sell an Item"}</div>
      <Card style={{ padding: 28 }}>
        <Input label="Title *" value={title} onChange={setTitle} placeholder="e.g. iPhone 12 Pro 128GB" />
        <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
          <div style={{ flex: 1 }}>
            <Input label="Description *" value={desc} onChange={setDesc} placeholder="Describe your item honestly..." rows={4} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <Btn onClick={generateDesc} variant="secondary" size="sm" disabled={aiLoading}>
            {aiLoading ? "✨ Generating..." : "✨ AI Generate Description"}
          </Btn>
          <Btn onClick={suggestPrice} variant="secondary" size="sm" disabled={priceLoading}>
            {priceLoading ? "💡 Thinking..." : "💡 AI Price Suggestion"}
          </Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Price (₹) *" value={price} onChange={setPrice} type="number" placeholder="15000" />
          <Select label="Category *" value={category} onChange={setCategory} options={CATEGORIES.filter(c => c !== "All")} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#534AB7", marginBottom: 6 }}>Product Images (URL)</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && addImage()} placeholder="Paste image URL and press Add" style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e2e0ff", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: "#fafafe", color: "#1a1a2e", outline: "none" }} />
            <Btn onClick={addImage} variant="secondary">Add</Btn>
          </div>
          {images.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {images.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={img} alt="" style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 10, border: "1.5px solid #e2e0ff" }} />
                  <button onClick={() => setImages(images.filter((_, j) => j !== i))} style={{ position: "absolute", top: -6, right: -6, background: "#fee2e2", border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 10, cursor: "pointer", color: "#991b1b" }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Btn onClick={handleSave} style={{ flex: 1 }}>{isEditing ? "Save Changes" : "Post Listing"}</Btn>
          <Btn onClick={onCancel} variant="ghost">Cancel</Btn>
        </div>
      </Card>
    </div>
  );
}
