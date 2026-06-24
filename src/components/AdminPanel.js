'use client';
import { useState, useEffect } from 'react';

const ADMIN_PASS = "muracha2026";
const G = "#326b2f", GL = "#5a9e4f";

const DEFAULT_PRODUCTS = [
  {id:"cacao-powder",name:"Cacao Powder",price:15,size:"200g",cat:"powders",desc:"Rich, unprocessed, unsweetened and deeply satisfying. Made of 100% premium cacao.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/FullSizeRender_e4bd0bf7-c5ae-4cd6-ba3b-0ce122dbfc49.jpg?v=1770908353"]},
  {id:"hojicha-classic",name:"Hojicha Tea — Classic",price:15,size:"30g",cat:"japanese",desc:"Roasted to perfection with umami-rich taste. A great coffee alternative.",ben:["Boosts Metabolism","Low Caffeine","Heart Health","Calm Focus"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/FullSizeRender_2acf7464-448e-4798-b6c8-b6982bcc927a.jpg?v=1770921443","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9032.jpg?v=1770921443"]},
  {id:"hojicha-floral",name:"Hojicha Tea — Floral Harmony",price:18,size:"25g",cat:"japanese",desc:"Luxury blend of superior quality Hojicha. First harvest Tencha tea, light roasted.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2205.jpg?v=1770919693"]},
  {id:"hojicha-powder",name:"Organic Hojicha Powder",price:22,size:"40g",cat:"powders",desc:"Nutty, caramel-like taste. 100% organic Bancha tea in powder form.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2204.jpg?v=1770919462"]},
  {id:"lemon-balm",name:"Organic Lemon Balm Tea",price:8,size:"Glass Jar",cat:"japanese",desc:"Promotes relaxation, reduces stress, and eases PMS symptoms.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/BFF6BC9B-CC35-4E67-85FC-2522493380DB.jpg?v=1774715246"]},
  {id:"rose-puerh",name:"Rose Pu'erh Tea Bomb",price:6.5,size:"2 × 9g balls",cat:"chinese",desc:"Pu'erh tea with rose flower. Watch the tea ball bloom artistically.",ben:["Glowing Skin","Beauty","Pain Relief"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/3.jpg?v=1761370469"]},
  {id:"tangerine-puerh",name:"Tangerine Peel Pu'erh Tea Bomb",price:6.5,size:"2 × 9g balls",cat:"chinese",desc:"Pu'erh tea with tangerine peel. Artistic blooming experience.",ben:["Reduces Fat","Helps Stomach","Reduces Cough"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/2.jpg?v=1761370453"]},
  {id:"jasmine-puerh",name:"Jasmine Pu'erh Tea Bomb",price:6.5,size:"2 × 9g balls",cat:"chinese",desc:"Pu'erh tea with jasmine flower. Each ball makes 4-5 cups.",ben:["Detox","Slimming","Fresh Breath","Mood Enhancer"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9038.jpg?v=1761757578"]},
  {id:"chrysanthemum-big",name:"Chrysanthemum Pu'erh Tea Bomb",price:6.5,size:"2 × 9g balls",cat:"chinese",desc:"Pu'erh tea with white chrysanthemum flower.",ben:["Anti-bacterial","Good for Eyes & Liver","Reduces Swelling"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/1.jpg?v=1761370435"]},
  {id:"white-chrysanthemum",name:"White Chrysanthemum Tea Bomb Jar",price:10,size:"4 × 5g balls",cat:"chinese",desc:"White tea with chrysanthemum flower in a glass jar.",ben:["Anti-bacterial","Good for Eyes & Liver"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2203.jpg?v=1770921274"]},
  {id:"white-tangerine",name:"White Tangerine Peel Tea Bomb Jar",price:10,size:"4 × 5g balls",cat:"chinese",desc:"White tea with tangerine peel in a glass jar.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2201.jpg?v=1770921245"]},
];

const DEFAULT_SETTINGS = {
  whatsapp: "96171425250",
  deliveryFee: 4,
  freeShipMin: 50,
  email: "muracha.lb@gmail.com",
  instagram: "muracha.lb",
  tiktok: "muracha.lb",
  siteName: "MuraCha",
};

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  // Load from localStorage
  useEffect(() => {
    try {
      const p = localStorage.getItem('muracha_products');
      setProducts(p ? JSON.parse(p) : DEFAULT_PRODUCTS);
      const s = localStorage.getItem('muracha_settings');
      if (s) setSettings(JSON.parse(s));
      const r = localStorage.getItem('muracha_reviews');
      if (r) setReviews(JSON.parse(r));
    } catch (e) {
      setProducts(DEFAULT_PRODUCTS);
    }
  }, []);

  const save = (key, data) => {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const saveProducts = (p) => { setProducts(p); save('muracha_products', p); };
  const saveSettings = (s) => { setSettings(s); save('muracha_settings', s); };

  const deleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
    showToast("Product deleted");
    setConfirm(null);
  };

  const saveProduct = (product) => {
    if (editing) {
      const updated = products.map(p => p.id === editing.id ? { ...product, id: editing.id } : p);
      saveProducts(updated);
      showToast("Product updated");
    } else {
      const id = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
      saveProducts([...products, { ...product, id }]);
      showToast("Product added");
    }
    setEditing(null);
    setAdding(false);
  };

  const deleteReview = (idx) => {
    const updated = reviews.filter((_, i) => i !== idx);
    setReviews(updated);
    save('muracha_reviews', updated);
    showToast("Review deleted");
  };

  const exportData = () => {
    const data = { products, settings, reviews, exported: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `muracha-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
    showToast("Data exported");
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.products) { setProducts(data.products); save('muracha_products', data.products); }
        if (data.settings) { setSettings(data.settings); save('muracha_settings', data.settings); }
        if (data.reviews) { setReviews(data.reviews); save('muracha_reviews', data.reviews); }
        showToast("Data imported successfully");
      } catch (err) { showToast("Invalid file format"); }
    };
    reader.readAsText(file);
  };

  const resetToDefaults = () => {
    saveProducts(DEFAULT_PRODUCTS);
    saveSettings(DEFAULT_SETTINGS);
    setReviews([]); save('muracha_reviews', []);
    showToast("Reset to defaults");
    setConfirm(null);
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || p.cat === catFilter;
    return matchSearch && matchCat;
  });

  const stats = {
    total: products.length,
    japanese: products.filter(p => p.cat === "japanese").length,
    chinese: products.filter(p => p.cat === "chinese").length,
    powders: products.filter(p => p.cat === "powders").length,
    avgPrice: products.length ? (products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(2) : 0,
    minPrice: products.length ? Math.min(...products.map(p => p.price)).toFixed(2) : 0,
    maxPrice: products.length ? Math.max(...products.map(p => p.price)).toFixed(2) : 0,
    reviewCount: reviews.length,
  };

  // LOGIN
  if (!auth) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f0", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 40, width: 360, boxShadow: "0 8px 32px rgba(0,0,0,.06)", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: G, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24 }}>🍵</div>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>MuraCha Admin</h1>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>Enter password to continue</p>
        <input
          type="password" value={pass}
          onChange={e => { setPass(e.target.value); setPassErr(false); }}
          onKeyDown={e => { if (e.key === "Enter") { if (pass === ADMIN_PASS) setAuth(true); else setPassErr(true); }}}
          placeholder="Password"
          style={{ width: "100%", padding: "12px 16px", border: `1.5px solid ${passErr ? "#e74c3c" : "#e0e0e0"}`, borderRadius: 8, fontSize: 14, outline: "none", marginBottom: 14, fontFamily: "'DM Sans'" }}
        />
        {passErr && <p style={{ fontSize: 12, color: "#e74c3c", marginBottom: 12 }}>Wrong password</p>}
        <button
          onClick={() => { if (pass === ADMIN_PASS) setAuth(true); else setPassErr(true); }}
          style={{ width: "100%", padding: "12px", background: G, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans'" }}
        >Log In</button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#f5f5f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        input, textarea, select, button { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
      `}</style>

      {/* TOAST */}
      {toast && <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 999, background: "#2a2a2a", color: "#fff", padding: "12px 28px", borderRadius: 10, fontSize: 13, fontWeight: 500, animation: "toastIn .3s ease", boxShadow: "0 8px 24px rgba(0,0,0,.15)" }}>{toast}</div>}

      {/* CONFIRM MODAL */}
      {confirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 28, maxWidth: 380, width: "90%", animation: "fadeIn .2s ease" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{confirm.title}</h3>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>{confirm.message}</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setConfirm(null)} style={{ padding: "8px 18px", background: "#f0f0f0", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>Cancel</button>
              <button onClick={confirm.action} style={{ padding: "8px 18px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <div style={{ width: 220, background: "#fff", borderRight: "1px solid #e8e8e4", padding: "24px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #f0f0ec" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: G }}>🍵 MuraCha</h2>
          <p style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>Admin Panel</p>
        </div>
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {[["dashboard", "📊", "Dashboard"], ["products", "📦", "Products"], ["reviews", "⭐", "Reviews"], ["settings", "⚙️", "Settings"], ["data", "💾", "Data"]].map(([id, icon, label]) => (
            <button key={id} onClick={() => { setTab(id); setEditing(null); setAdding(false); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "none", borderRadius: 8, background: tab === id ? `${G}12` : "transparent", color: tab === id ? G : "#555", fontSize: 13, fontWeight: tab === id ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}>
              <span style={{ fontSize: 16 }}>{icon}</span>{label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0ec" }}>
          <a href="/" style={{ fontSize: 12, color: G, fontWeight: 500, textDecoration: "none" }}>← Back to Site</a>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "28px 36px", overflow: "auto" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div style={{ animation: "fadeIn .3s ease" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Dashboard</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 32 }}>
              {[
                [stats.total, "Total Products", "📦", "#e8f0e6"],
                [stats.japanese, "Japanese", "🍵", "#fff3e6"],
                [stats.chinese, "Tea Bombs", "🌸", "#fce8e8"],
                [stats.powders, "Powders", "✨", "#e6f0ff"],
                [`$${stats.avgPrice}`, "Avg Price", "💰", "#f0e6ff"],
                [`$${stats.minPrice} – $${stats.maxPrice}`, "Price Range", "📊", "#e6fff0"],
                [stats.reviewCount, "User Reviews", "⭐", "#fff8e6"],
                [settings.deliveryFee === 0 ? "Free" : `$${settings.deliveryFee}`, "Delivery Fee", "🚚", "#f5f0e6"],
              ].map(([val, label, icon, bg]) => (
                <div key={label} style={{ background: "#fff", borderRadius: 12, padding: "20px 18px", border: "1px solid #f0f0ec" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 12 }}>{icon}</div>
                  <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>{val}</p>
                  <p style={{ fontSize: 11, color: "#999", letterSpacing: .5 }}>{label}</p>
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>Quick Actions</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => { setTab("products"); setAdding(true); }} style={{ padding: "10px 20px", background: G, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Product</button>
              <button onClick={() => setTab("settings")} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #ddd", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Edit Settings</button>
              <button onClick={exportData} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #ddd", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Export Backup</button>
              <a href="/" target="_blank" style={{ padding: "10px 20px", background: "#fff", border: "1px solid #ddd", borderRadius: 8, fontSize: 13, cursor: "pointer", textDecoration: "none", color: "#333", display: "inline-block" }}>View Live Site →</a>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === "products" && !editing && !adding && (
          <div style={{ animation: "fadeIn .3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700 }}>Products ({products.length})</h1>
              <button onClick={() => setAdding(true)} style={{ padding: "10px 22px", background: G, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Product</button>
            </div>
            {/* Filters */}
            <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ padding: "8px 14px", border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 13, width: 220, outline: "none" }} />
              <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ padding: "8px 14px", border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 13, outline: "none", background: "#fff" }}>
                <option value="all">All Categories</option>
                <option value="japanese">Japanese</option>
                <option value="chinese">Tea Bombs</option>
                <option value="powders">Powders</option>
              </select>
            </div>
            {/* Product table */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #f0f0ec", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f0f0ec" }}>
                    {["Image", "Name", "Category", "Size", "Price", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#999", letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #f8f8f4" }}>
                      <td style={{ padding: "10px 16px" }}>
                        <img src={p.img[0]} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }} />
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</p>
                        <p style={{ fontSize: 11, color: "#aaa", marginTop: 2, maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.desc}</p>
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 12, background: p.cat === "japanese" ? "#fff3e6" : p.cat === "chinese" ? "#fce8e8" : "#e6f0ff", color: p.cat === "japanese" ? "#c47a00" : p.cat === "chinese" ? "#c44040" : "#4070c4", fontWeight: 500 }}>
                          {p.cat === "japanese" ? "Japanese" : p.cat === "chinese" ? "Tea Bombs" : "Powders"}
                        </span>
                      </td>
                      <td style={{ padding: "10px 16px", fontSize: 13, color: "#666" }}>{p.size}</td>
                      <td style={{ padding: "10px 16px", fontSize: 14, fontWeight: 700, color: G }}>${p.price.toFixed(2)}</td>
                      <td style={{ padding: "10px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => setEditing(p)} style={{ padding: "5px 12px", background: "#f0f0f0", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 500 }}>Edit</button>
                          <button onClick={() => setConfirm({ title: "Delete Product", message: `Delete "${p.name}"? This can't be undone.`, action: () => deleteProduct(p.id) })} style={{ padding: "5px 12px", background: "#fef0f0", color: "#e74c3c", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 500 }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && <p style={{ padding: 24, textAlign: "center", color: "#bbb", fontSize: 13 }}>No products found</p>}
            </div>
          </div>
        )}

        {/* PRODUCT FORM (Add / Edit) */}
        {tab === "products" && (editing || adding) && (
          <ProductForm
            product={editing || undefined}
            onSave={saveProduct}
            onCancel={() => { setEditing(null); setAdding(false); }}
          />
        )}

        {/* REVIEWS */}
        {tab === "reviews" && (
          <div style={{ animation: "fadeIn .3s ease" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Customer Reviews ({reviews.length})</h1>
            {reviews.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 12, padding: 40, textAlign: "center", border: "1px solid #f0f0ec" }}>
                <p style={{ fontSize: 36, marginBottom: 12 }}>⭐</p>
                <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>No customer reviews yet</p>
                <p style={{ fontSize: 13, color: "#999" }}>Reviews submitted on the site will appear here</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {reviews.map((r, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "18px 22px", border: "1px solid #f0f0ec", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</p>
                        <span style={{ fontSize: 12, color: "#f0c040" }}>{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</span>
                        {r.date && <span style={{ fontSize: 11, color: "#bbb" }}>{r.date}</span>}
                      </div>
                      <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{r.text}</p>
                    </div>
                    <button onClick={() => deleteReview(i)} style={{ padding: "5px 12px", background: "#fef0f0", color: "#e74c3c", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div style={{ animation: "fadeIn .3s ease" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Site Settings</h1>
            <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #f0f0ec", maxWidth: 600 }}>
              {[
                ["siteName", "Site Name", "text"],
                ["whatsapp", "WhatsApp Number", "text"],
                ["email", "Email", "email"],
                ["instagram", "Instagram Handle", "text"],
                ["tiktok", "TikTok Handle", "text"],
                ["deliveryFee", "Delivery Fee ($)", "number"],
                ["freeShipMin", "Free Shipping Minimum ($)", "number"],
              ].map(([key, label, type]) => (
                <div key={key} style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>{label}</label>
                  <input
                    type={type} value={settings[key]}
                    onChange={e => setSettings({ ...settings, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 14, outline: "none" }}
                  />
                </div>
              ))}
              <button onClick={() => { saveSettings(settings); showToast("Settings saved"); }} style={{ padding: "12px 28px", background: G, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>Save Settings</button>
            </div>
          </div>
        )}

        {/* DATA */}
        {tab === "data" && (
          <div style={{ animation: "fadeIn .3s ease" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Data Management</h1>
            <div style={{ display: "grid", gap: 14, maxWidth: 500 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #f0f0ec" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>📤 Export Backup</h3>
                <p style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>Download all products, settings, and reviews as JSON</p>
                <button onClick={exportData} style={{ padding: "10px 22px", background: G, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Export Data</button>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #f0f0ec" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>📥 Import Backup</h3>
                <p style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>Restore from a previously exported JSON file</p>
                <input type="file" accept=".json" onChange={importData} style={{ fontSize: 13 }} />
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #fce8e8" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: "#e74c3c" }}>🔄 Reset to Defaults</h3>
                <p style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>Restore all products, settings, and reviews to original defaults</p>
                <button onClick={() => setConfirm({ title: "Reset Everything?", message: "This will delete all your changes and restore defaults.", action: resetToDefaults })} style={{ padding: "10px 22px", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Reset All Data</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// PRODUCT FORM COMPONENT
function ProductForm({ product, onSave, onCancel }) {
  const [f, setF] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    size: product?.size || "",
    cat: product?.cat || "japanese",
    desc: product?.desc || "",
    img: product?.img?.join("\n") || "",
    ben: product?.ben?.join(", ") || "",
  });

  const handleSave = () => {
    if (!f.name || !f.price) return;
    onSave({
      name: f.name,
      price: Number(f.price),
      size: f.size,
      cat: f.cat,
      desc: f.desc,
      img: f.img.split("\n").map(s => s.trim()).filter(Boolean),
      ...(f.ben.trim() ? { ben: f.ben.split(",").map(s => s.trim()).filter(Boolean) } : {}),
    });
  };

  const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "'DM Sans'" };

  return (
    <div style={{ animation: "fadeIn .3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={onCancel} style={{ padding: "6px 14px", background: "#f0f0f0", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>← Back</button>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>{product ? "Edit Product" : "Add Product"}</h1>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #f0f0ec", maxWidth: 600 }}>
        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Product Name *</label>
            <input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="e.g. Hojicha Tea — Classic" style={inputStyle} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Price ($) *</label>
              <input type="number" step="0.5" value={f.price} onChange={e => setF({ ...f, price: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Size</label>
              <input value={f.size} onChange={e => setF({ ...f, size: e.target.value })} placeholder="e.g. 30g" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Category</label>
              <select value={f.cat} onChange={e => setF({ ...f, cat: e.target.value })} style={{ ...inputStyle, background: "#fff" }}>
                <option value="japanese">Japanese</option>
                <option value="chinese">Tea Bombs</option>
                <option value="powders">Powders</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Description</label>
            <textarea value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} rows={3} placeholder="Product description..." style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Image URLs (one per line)</label>
            <textarea value={f.img} onChange={e => setF({ ...f, img: e.target.value })} rows={3} placeholder="https://cdn.shopify.com/..." style={{ ...inputStyle, resize: "vertical", fontSize: 12 }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Benefits (comma separated, optional)</label>
            <input value={f.ben} onChange={e => setF({ ...f, ben: e.target.value })} placeholder="e.g. Low Caffeine, Heart Health" style={inputStyle} />
          </div>
          {/* Preview */}
          {f.img.trim() && (
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 6 }}>Preview</label>
              <div style={{ display: "flex", gap: 8 }}>
                {f.img.split("\n").filter(Boolean).map((url, i) => (
                  <img key={i} src={url.trim()} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }} onError={e => e.currentTarget.style.display = "none"} />
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, paddingTop: 8 }}>
            <button onClick={handleSave} disabled={!f.name || !f.price} style={{ padding: "12px 28px", background: G, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: !f.name || !f.price ? .5 : 1 }}>
              {product ? "Save Changes" : "Add Product"}
            </button>
            <button onClick={onCancel} style={{ padding: "12px 28px", background: "#f0f0f0", border: "none", borderRadius: 8, fontSize: 14, cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
