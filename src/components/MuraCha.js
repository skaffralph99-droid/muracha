import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════
const PRODUCTS = [
  {
    id: "cacao-powder", name: "Cacao Powder", price: 15, size: "200g",
    category: "powders",
    desc: "Rich, unprocessed, unsweetened and deeply satisfying. Made of 100% premium cacao. High in antioxidants, boosts mood, great for a warm drink or desserts.",
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/FullSizeRender_e4bd0bf7-c5ae-4cd6-ba3b-0ce122dbfc49.jpg?v=1770908353",
    ],
  },
  {
    id: "hojicha-classic", name: "Hojicha Tea — Classic", price: 15, size: "30g",
    category: "japanese",
    desc: "Roasted to perfection with umami-rich taste. Made of 100% first harvest Sencha tea, medium roasted. A great coffee alternative, smooth on stomach, rich in L-theanine, low in caffeine.",
    benefits: ["Boosts Metabolism", "Low Caffeine", "Heart Health", "Calm Focus"],
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/FullSizeRender_2acf7464-448e-4798-b6c8-b6982bcc927a.jpg?v=1770921443",
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9032.jpg?v=1770921443",
    ],
  },
  {
    id: "hojicha-floral", name: "Hojicha Tea — Floral Harmony", price: 18, size: "25g",
    category: "japanese",
    desc: "Luxury blend of superior quality Hojicha. Made of 100% first harvest Tencha tea, light roasted. Low in caffeine, antioxidant-rich, controls blood sugar while still uplifting.",
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2205.jpg?v=1770919693",
    ],
  },
  {
    id: "hojicha-powder", name: "Organic Hojicha Powder", price: 22, size: "40g",
    category: "powders",
    desc: "Nutty, caramel-like taste with all-day hydration. Made of 100% organic Bancha tea in powder form. Extremely low in caffeine — perfect for the whole family. Great for lattes and desserts.",
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2204.jpg?v=1770919462",
    ],
  },
  {
    id: "lemon-balm", name: "Organic Lemon Balm Tea", price: 8, size: "Glass Jar",
    category: "japanese",
    desc: "Known as مليسة (Melissa). A herbal tea that promotes relaxation, reduces stress, and eases PMS symptoms. Comes in a glass jar with wooden spoon.",
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/BFF6BC9B-CC35-4E67-85FC-2522493380DB.jpg?v=1774715246",
    ],
  },
  {
    id: "rose-puerh", name: "Rose Pu'erh Tea Bomb", price: 6.5, size: "2 × 9g balls",
    category: "chinese",
    desc: "Pu'erh tea with rose flower. Steep in boiling water to watch the tea ball bloom artistically. Each ball makes 4–5 cups.",
    benefits: ["Glowing Skin", "Beauty", "Pain Relief"],
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/3.jpg?v=1761370469",
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM.jpg?v=1763463842",
    ],
  },
  {
    id: "tangerine-puerh", name: "Tangerine Peel Pu'erh Tea Bomb", price: 6.5, size: "2 × 9g balls",
    category: "chinese",
    desc: "Pu'erh tea with tangerine peel. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.",
    benefits: ["Reduces Fat", "Helps Stomach", "Reduces Cough"],
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/2.jpg?v=1761370453",
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_3.jpg?v=1763463821",
    ],
  },
  {
    id: "jasmine-puerh", name: "Jasmine Pu'erh Tea Bomb", price: 6.5, size: "2 × 9g balls",
    category: "chinese",
    desc: "Pu'erh tea with jasmine flower. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.",
    benefits: ["Detox", "Slimming", "Fresh Breath", "Mood Enhancer"],
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9038.jpg?v=1761757578",
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_1.jpg?v=1763463836",
    ],
  },
  {
    id: "chrysanthemum-big", name: "Chrysanthemum Pu'erh Tea Bomb", price: 6.5, size: "2 × 9g balls",
    category: "chinese",
    desc: "Pu'erh tea with white chrysanthemum flower. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.",
    benefits: ["Anti-bacterial", "Good for Eyes & Liver", "Reduces Swelling"],
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/1.jpg?v=1761370435",
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_2.jpg?v=1763463829",
    ],
  },
  {
    id: "white-chrysanthemum", name: "White Chrysanthemum Tea Bomb Jar", price: 10, size: "4 × 5g balls",
    category: "chinese",
    desc: "White tea with chrysanthemum flower in a glass jar. Steep in boiling water for an artistic blooming experience. Each ball makes 1–2 cups.",
    benefits: ["Anti-bacterial", "Good for Eyes & Liver", "Reduces Swelling"],
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2203.jpg?v=1770921274",
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9036.jpg?v=1770921274",
    ],
  },
  {
    id: "white-tangerine", name: "White Tangerine Peel Tea Bomb Jar", price: 10, size: "4 × 5g balls",
    category: "chinese",
    desc: "White tea with tangerine peel in a glass jar. Steep in boiling water for an artistic blooming experience. Each ball makes 1–2 cups.",
    images: [
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2201.jpg?v=1770921245",
      "https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9037.jpg?v=1770921245",
    ],
  },
];

const CATEGORIES = {
  all: "All Products",
  japanese: "Japanese Collection",
  chinese: "Chinese Tea Bombs",
  powders: "Powders",
};

const WHATSAPP_NUMBER = ""; // Add client's number here

// ═══════════════════════════════════════════
// APP
// ═══════════════════════════════════════════
export default function MuraCha() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const [checkoutForm, setCheckoutForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); } }, [toast]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id, delta) => setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const sendWhatsApp = () => {
    const items = cart.map((i) => `• ${i.name} × ${i.qty} — $${(i.price * i.qty).toFixed(2)}`).join("\n");
    const msg = `🍵 *New MuraCha Order*\n\n*Name:* ${checkoutForm.name}\n*Phone:* ${checkoutForm.phone}\n*Address:* ${checkoutForm.address}\n${checkoutForm.notes ? `*Notes:* ${checkoutForm.notes}\n` : ""}\n*Items:*\n${items}\n\n*Total: $${cartTotal.toFixed(2)}*`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const filtered = activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#faf8f5", minHeight: "100vh", color: "#2c2418" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(100%); } to { opacity:1; transform:translateY(0); } }
        @keyframes toast { 0% { opacity:0; transform:translateY(20px); } 15% { opacity:1; transform:translateY(0); } 85% { opacity:1; } 100% { opacity:0; transform:translateY(-10px); } }
        .fade-in { animation: fadeIn 0.6s ease both; }
        .product-card { transition: all 0.35s cubic-bezier(0.22,1,0.36,1); }
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
        .product-img { transition: transform 0.5s ease; }
        .product-card:hover .product-img { transform: scale(1.05); }
        .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:12px 24px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; letter-spacing:1px; text-transform:uppercase; transition:all 0.3s ease; border-radius:4px; }
        .btn-primary { background:#2c2418; color:#faf8f5; }
        .btn-primary:hover { background:#8b6f47; }
        .btn-outline { background:transparent; border:1.5px solid #2c2418; color:#2c2418; }
        .btn-outline:hover { background:#2c2418; color:#faf8f5; }
        .btn-accent { background:#8b6f47; color:white; }
        .btn-accent:hover { background:#6b5535; }
        .btn-sm { padding:8px 16px; font-size:11px; }
        .cat-btn { padding:8px 20px; border:1px solid rgba(139,111,71,0.2); background:transparent; color:#7a6e5d; font-family:'DM Sans'; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; cursor:pointer; transition:all 0.3s; border-radius:30px; font-weight:500; }
        .cat-btn.active { background:#2c2418; color:#faf8f5; border-color:#2c2418; }
        .cat-btn:hover:not(.active) { border-color:#8b6f47; color:#8b6f47; }
        .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:200; backdrop-filter:blur(4px); }
        .modal { position:fixed; z-index:201; background:#fff; overflow-y:auto; }
        .input { width:100%; padding:12px 16px; border:1px solid rgba(139,111,71,0.2); background:transparent; font-family:'DM Sans'; font-size:14px; color:#2c2418; outline:none; border-radius:4px; transition:border 0.3s; }
        .input:focus { border-color:#8b6f47; }
        .input::placeholder { color:#b8ad9e; }
        a { text-decoration:none; color:inherit; }
        .benefit-tag { display:inline-block; padding:4px 12px; background:rgba(139,111,71,0.08); color:#8b6f47; font-size:11px; letter-spacing:0.5px; border-radius:20px; font-weight:500; }
        @media (max-width:768px) {
          .desktop-only { display:none !important; }
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap:12px !important; }
          .hero-title { font-size:36px !important; }
          .hero-sub { font-size:13px !important; }
          .section-pad { padding:48px 16px !important; }
          .modal-product { width:100% !important; height:100% !important; top:0 !important; left:0 !important; right:0 !important; bottom:0 !important; border-radius:0 !important; }
          .cart-panel { width:100% !important; }
          .cat-scroll { overflow-x:auto; flex-wrap:nowrap !important; padding-bottom:8px; }
        }
      `}</style>

      {/* TOAST */}
      {toast && (
        <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", zIndex:999, background:"#2c2418", color:"#faf8f5", padding:"12px 28px", borderRadius:8, fontSize:13, fontWeight:500, animation:"toast 2.2s ease both", letterSpacing:0.5 }}>
          ✓ {toast}
        </div>
      )}

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(16px,4vw,48px)", background: scrolled ? "rgba(250,248,245,0.95)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(139,111,71,0.08)" : "none", transition:"all 0.3s ease" }}>
        <div style={{ display:"flex", alignItems:"center", gap:32 }}>
          <span onClick={() => { setPage("home"); setSelectedProduct(null); }} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:600, letterSpacing:2, cursor:"pointer", color: scrolled || page !== "home" ? "#2c2418" : "#faf8f5" }}>MuraCha</span>
          <div className="desktop-only" style={{ display:"flex", gap:24 }}>
            {[["home","Home"],["shop","Shop"],["about","About"]].map(([p,l]) => (
              <span key={p} onClick={() => { setPage(p); setSelectedProduct(null); }} style={{ fontSize:12, letterSpacing:1.5, textTransform:"uppercase", cursor:"pointer", fontWeight:500, opacity: page === p ? 1 : 0.6, color: scrolled || page !== "home" ? "#2c2418" : "#faf8f5", transition:"opacity 0.3s" }}>{l}</span>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <button onClick={() => setCartOpen(true)} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={scrolled || page !== "home" ? "#2c2418" : "#faf8f5"} strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {cartCount > 0 && <span style={{ position:"absolute", top:-4, right:-4, background:"#8b6f47", color:"white", fontSize:10, fontWeight:700, width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>{cartCount}</span>}
          </button>
          {/* Mobile hamburger */}
          <button className="desktop-only" style={{ display:"none" }} />
        </div>
      </nav>

      {/* CART SIDEBAR */}
      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}
      {cartOpen && (
        <div className="cart-panel" style={{ position:"fixed", right:0, top:0, bottom:0, width:380, background:"#fff", zIndex:202, boxShadow:"-8px 0 40px rgba(0,0,0,0.1)", display:"flex", flexDirection:"column", animation:"fadeIn 0.3s ease" }}>
          <div style={{ padding:"24px 24px 16px", borderBottom:"1px solid rgba(139,111,71,0.08)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:500 }}>Your Cart ({cartCount})</h3>
            <button onClick={() => setCartOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:20, color:"#7a6e5d" }}>✕</button>
          </div>
          <div style={{ flex:1, overflow:"auto", padding:24 }}>
            {cart.length === 0 ? (
              <p style={{ color:"#7a6e5d", fontSize:14, textAlign:"center", marginTop:40 }}>Your cart is empty</p>
            ) : cart.map((item) => (
              <div key={item.id} style={{ display:"flex", gap:16, marginBottom:20, paddingBottom:20, borderBottom:"1px solid rgba(139,111,71,0.06)" }}>
                <img src={item.images[0]} alt="" style={{ width:64, height:64, objectFit:"cover", borderRadius:8 }} />
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14, fontWeight:500, marginBottom:4 }}>{item.name}</p>
                  <p style={{ fontSize:12, color:"#7a6e5d", marginBottom:8 }}>{item.size}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ display:"flex", alignItems:"center", border:"1px solid rgba(139,111,71,0.15)", borderRadius:4 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ background:"none", border:"none", padding:"4px 10px", cursor:"pointer", fontSize:14 }}>−</button>
                      <span style={{ fontSize:13, fontWeight:500, minWidth:20, textAlign:"center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ background:"none", border:"none", padding:"4px 10px", cursor:"pointer", fontSize:14 }}>+</button>
                    </div>
                    <span style={{ fontSize:14, fontWeight:600, color:"#8b6f47" }}>${(item.price * item.qty).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer", fontSize:12, color:"#c9857a" }}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding:24, borderTop:"1px solid rgba(139,111,71,0.08)" }}>
              {cartTotal >= 50 && <p style={{ fontSize:12, color:"#6b8f71", marginBottom:12, fontWeight:500 }}>✓ Free shipping applied</p>}
              {cartTotal < 50 && <p style={{ fontSize:12, color:"#7a6e5d", marginBottom:12 }}>${(50 - cartTotal).toFixed(2)} away from free shipping</p>}
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20 }}>Total</span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600 }}>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary" style={{ width:"100%" }} onClick={() => { setCartOpen(false); setPage("checkout"); }}>Checkout via WhatsApp</button>
            </div>
          )}
        </div>
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <>
          <div className="overlay" onClick={() => setSelectedProduct(null)} />
          <div className="modal modal-product" style={{ top:"5%", left:"5%", right:"5%", bottom:"5%", borderRadius:16, display:"flex", flexDirection:"column" }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position:"absolute", top:16, right:16, background:"rgba(0,0,0,0.05)", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:16, zIndex:10, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
            <div style={{ display:"flex", flex:1, overflow:"hidden", flexWrap:"wrap" }}>
              {/* Images */}
              <div style={{ flex:"1 1 50%", minWidth:280, background:"#f5f3ef", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, position:"relative" }}>
                <img src={selectedProduct.images[imgIdx] || selectedProduct.images[0]} alt={selectedProduct.name} style={{ maxWidth:"100%", maxHeight:"60vh", objectFit:"contain", borderRadius:8 }} />
                {selectedProduct.images.length > 1 && (
                  <div style={{ display:"flex", gap:8, marginTop:16 }}>
                    {selectedProduct.images.map((img, i) => (
                      <img key={i} src={img} alt="" onClick={() => setImgIdx(i)} style={{ width:56, height:56, objectFit:"cover", borderRadius:6, cursor:"pointer", border: i === imgIdx ? "2px solid #8b6f47" : "2px solid transparent", opacity: i === imgIdx ? 1 : 0.6, transition:"all 0.2s" }} />
                    ))}
                  </div>
                )}
              </div>
              {/* Details */}
              <div style={{ flex:"1 1 40%", minWidth:280, padding:"40px 32px", overflow:"auto" }}>
                <p style={{ fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"#8b6f47", marginBottom:8, fontWeight:500 }}>{CATEGORIES[selectedProduct.category]}</p>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:400, marginBottom:8 }}>{selectedProduct.name}</h2>
                <p style={{ fontSize:13, color:"#7a6e5d", marginBottom:16 }}>{selectedProduct.size}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:500, color:"#8b6f47", marginBottom:24 }}>${selectedProduct.price.toFixed(2)}</p>
                <p style={{ fontSize:14, lineHeight:1.8, color:"#5a4e3e", marginBottom:24 }}>{selectedProduct.desc}</p>
                {selectedProduct.benefits && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
                    {selectedProduct.benefits.map((b) => <span key={b} className="benefit-tag">{b}</span>)}
                  </div>
                )}
                <button className="btn btn-primary" style={{ width:"100%" }} onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>Add to Cart</button>
                <a href="https://www.instagram.com/muracha.lb" target="_blank" rel="noopener noreferrer" style={{ display:"block", textAlign:"center", marginTop:12, fontSize:12, color:"#8b6f47", letterSpacing:1 }}>Or order via Instagram →</a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══ PAGES ═══ */}
      {page === "home" && (
        <>
          {/* HERO */}
          <section style={{ height:"100vh", background:"#2c2418", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", padding:"0 clamp(16px,5vw,60px)" }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 30% 50%, rgba(139,111,71,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(196,169,125,0.08) 0%, transparent 40%)" }} />
            <div style={{ position:"absolute", right:"clamp(-60px,5vw,40px)", top:"50%", transform:"translateY(-50%)", fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(180px,28vw,380px)", color:"rgba(139,111,71,0.05)", lineHeight:1, userSelect:"none" }}>茶</div>
            <div className="fade-in" style={{ textAlign:"center", maxWidth:640, position:"relative", zIndex:1 }}>
              <p style={{ fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"#c4a97d", marginBottom:28, fontWeight:500 }}>Authentic Japanese & Chinese Tea</p>
              <h1 className="hero-title" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,7vw,72px)", fontWeight:300, color:"#faf8f5", lineHeight:1.1, marginBottom:20 }}>
                Pure Essence,<br /><em style={{ fontWeight:400, fontStyle:"italic" }}>Timeless Craft</em>
              </h1>
              <div style={{ width:60, height:1.5, background:"linear-gradient(90deg, transparent, #c4a97d, transparent)", margin:"0 auto 28px" }} />
              <p className="hero-sub" style={{ fontSize:15, color:"rgba(250,248,245,0.55)", lineHeight:1.8, marginBottom:40, maxWidth:460, margin:"0 auto 40px" }}>
                Experience the nourishing and calming taste of meticulously sourced authentic tea from Japan and China.
              </p>
              <button className="btn" style={{ background:"transparent", border:"1.5px solid #c4a97d", color:"#faf8f5", padding:"14px 36px", letterSpacing:3 }} onClick={() => setPage("shop")}>
                Shop Collection
              </button>
            </div>
          </section>

          {/* SHIPPING BANNER */}
          <div style={{ background:"#8b6f47", color:"white", textAlign:"center", padding:"12px 16px", fontSize:12, letterSpacing:2, textTransform:"uppercase", fontWeight:500 }}>
            Free shipping on orders above $50 — Limited time
          </div>

          {/* FEATURED */}
          <section className="section-pad" style={{ padding:"80px clamp(16px,5vw,48px)", maxWidth:1200, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:"#8b6f47", marginBottom:12, fontWeight:500 }}>Featured</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:300 }}>Our Bestsellers</h2>
            </div>
            <div className="product-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:20 }}>
              {PRODUCTS.slice(0, 4).map((p) => (
                <div key={p.id} className="product-card" onClick={() => { setSelectedProduct(p); setImgIdx(0); }} style={{ cursor:"pointer", borderRadius:12, overflow:"hidden", background:"#fff", border:"1px solid rgba(139,111,71,0.08)" }}>
                  <div style={{ height:220, overflow:"hidden", background:"#f5f3ef" }}>
                    <img className="product-img" src={p.images[0]} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <div style={{ padding:"16px 18px 20px" }}>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:500, marginBottom:4 }}>{p.name}</h3>
                    <p style={{ fontSize:12, color:"#7a6e5d", marginBottom:8 }}>{p.size}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:16, fontWeight:600, color:"#8b6f47" }}>${p.price.toFixed(2)}</span>
                      <button className="btn btn-sm btn-outline" onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:40 }}>
              <button className="btn btn-outline" onClick={() => setPage("shop")}>View All Products</button>
            </div>
          </section>

          {/* TEA BOMBS FEATURE */}
          <section style={{ padding:"60px clamp(16px,5vw,48px)", background:"#2c2418" }}>
            <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
              <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:"#c4a97d", marginBottom:12, fontWeight:500 }}>Chinese Collection</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,38px)", fontWeight:300, color:"#faf8f5", marginBottom:16 }}>Blooming Tea Bombs</h2>
              <p style={{ fontSize:14, color:"rgba(250,248,245,0.5)", lineHeight:1.8, marginBottom:32, maxWidth:500, margin:"0 auto 32px" }}>
                Steep a hand-rolled tea ball in boiling water and watch it bloom into a beautiful flower. Each ball makes 4–5 cups of nourishing tea.
              </p>
              <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
                {PRODUCTS.filter(p => p.category === "chinese").slice(0, 3).map(p => (
                  <div key={p.id} onClick={() => { setSelectedProduct(p); setImgIdx(0); }} style={{ width:140, cursor:"pointer" }}>
                    <img src={p.images[0]} alt={p.name} style={{ width:120, height:120, borderRadius:"50%", objectFit:"cover", border:"2px solid rgba(196,169,125,0.3)", marginBottom:12 }} />
                    <p style={{ fontSize:12, color:"#c4a97d", fontWeight:500 }}>{p.name.replace(" Tea Bomb","").replace(" Chinese","")}</p>
                    <p style={{ fontSize:14, color:"#faf8f5", fontWeight:600 }}>${p.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <button className="btn" style={{ marginTop:32, border:"1px solid #c4a97d", background:"transparent", color:"#faf8f5" }} onClick={() => { setPage("shop"); setActiveCategory("chinese"); }}>
                View All Tea Bombs
              </button>
            </div>
          </section>

          {/* ABOUT TEASER */}
          <section className="section-pad" style={{ padding:"80px clamp(16px,5vw,48px)" }}>
            <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
              <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:"#8b6f47", marginBottom:12, fontWeight:500 }}>Our Story</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(26px,4vw,38px)", fontWeight:300, marginBottom:24 }}>Rooted in Tradition</h2>
              <div style={{ width:50, height:1.5, background:"#c4a97d", margin:"0 auto 24px" }} />
              <p style={{ fontSize:15, color:"#7a6e5d", lineHeight:1.9, marginBottom:12 }}>
                MuraCha brings the art of Japanese and Chinese tea culture to Lebanon. Every leaf is carefully selected from heritage farms, honoring generations of craft.
              </p>
              <button className="btn btn-outline" style={{ marginTop:20 }} onClick={() => setPage("about")}>Learn More</button>
            </div>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="section-pad" style={{ paddingTop:100, padding:"100px clamp(16px,5vw,48px) 60px", maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,5vw,44px)", fontWeight:300, marginBottom:20 }}>Our Collection</h1>
            <div className="cat-scroll" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              {Object.entries(CATEGORIES).map(([k, v]) => (
                <button key={k} className={`cat-btn ${activeCategory === k ? "active" : ""}`} onClick={() => setActiveCategory(k)}>{v}</button>
              ))}
            </div>
          </div>
          <div className="product-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:20 }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="product-card fade-in" style={{ animationDelay:`${i*0.05}s`, cursor:"pointer", borderRadius:12, overflow:"hidden", background:"#fff", border:"1px solid rgba(139,111,71,0.08)" }} onClick={() => { setSelectedProduct(p); setImgIdx(0); }}>
                <div style={{ height:220, overflow:"hidden", background:"#f5f3ef" }}>
                  <img className="product-img" src={p.images[0]} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div style={{ padding:"16px 18px 20px" }}>
                  <p style={{ fontSize:10, letterSpacing:1.5, textTransform:"uppercase", color:"#8b6f47", marginBottom:6, fontWeight:500 }}>{CATEGORIES[p.category]}</p>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:500, marginBottom:4 }}>{p.name}</h3>
                  <p style={{ fontSize:12, color:"#7a6e5d", marginBottom:10 }}>{p.size}</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:16, fontWeight:600, color:"#8b6f47" }}>${p.price.toFixed(2)}</span>
                    <button className="btn btn-sm btn-outline" onClick={(e) => { e.stopPropagation(); addToCart(p); }}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="section-pad" style={{ paddingTop:100, padding:"100px clamp(16px,5vw,48px) 60px", maxWidth:700, margin:"0 auto" }}>
          <div style={{ textAlign:"center" }}>
            <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:"#8b6f47", marginBottom:12, fontWeight:500 }}>About Us</p>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,5vw,48px)", fontWeight:300, marginBottom:24 }}>Our Story</h1>
            <div style={{ width:50, height:1.5, background:"#c4a97d", margin:"0 auto 32px" }} />
          </div>
          <div style={{ fontSize:15, color:"#5a4e3e", lineHeight:2, textAlign:"center" }}>
            <p style={{ marginBottom:20 }}>MuraCha brings the art of Japanese and Chinese tea culture to Lebanon. Every leaf is carefully selected from heritage farms, honoring generations of craft and the meditative ritual of tea.</p>
            <p style={{ marginBottom:20 }}>From the roasted warmth of hojicha to the artistic bloom of Chinese tea bombs, each product is an invitation to slow down, breathe, and savor the moment.</p>
            <p style={{ marginBottom:32 }}>Our Japanese collection features premium first-harvest teas — Sencha, Tencha, and organic Bancha — sourced directly from Japanese farms. Our Chinese collection showcases hand-rolled Pu'erh tea balls wrapped with flowers — rose, jasmine, chrysanthemum, and tangerine peel — each one a unique sensory experience.</p>
            <div style={{ display:"flex", justifyContent:"center", gap:16 }}>
              <a href="https://www.instagram.com/muracha.lb" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Instagram</a>
              <a href="https://www.tiktok.com/@muracha.lb" target="_blank" rel="noopener noreferrer" className="btn btn-outline">TikTok</a>
            </div>
          </div>
        </section>
      )}

      {page === "checkout" && (
        <section className="section-pad" style={{ paddingTop:100, padding:"100px clamp(16px,5vw,48px) 60px", maxWidth:600, margin:"0 auto" }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:300, textAlign:"center", marginBottom:8 }}>Checkout</h1>
          <p style={{ textAlign:"center", fontSize:14, color:"#7a6e5d", marginBottom:40 }}>Complete your order via WhatsApp</p>

          {/* Order summary */}
          <div style={{ background:"#fff", borderRadius:12, padding:24, marginBottom:24, border:"1px solid rgba(139,111,71,0.08)" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, marginBottom:16 }}>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} style={{ display:"flex", justifyContent:"space-between", paddingBottom:12, marginBottom:12, borderBottom:"1px solid rgba(139,111,71,0.06)", fontSize:14 }}>
                <span>{item.name} × {item.qty}</span>
                <span style={{ fontWeight:600 }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:18, fontFamily:"'Cormorant Garamond',serif", fontWeight:600, paddingTop:8 }}>
              <span>Total</span>
              <span style={{ color:"#8b6f47" }}>${cartTotal.toFixed(2)}</span>
            </div>
            {cartTotal >= 50 && <p style={{ fontSize:12, color:"#6b8f71", marginTop:8, fontWeight:500 }}>✓ Free shipping</p>}
          </div>

          {/* Form */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <input className="input" placeholder="Full Name *" value={checkoutForm.name} onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })} />
            <input className="input" placeholder="Phone Number *" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })} />
            <input className="input" placeholder="Delivery Address *" value={checkoutForm.address} onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })} />
            <textarea className="input" placeholder="Notes (optional)" rows={3} value={checkoutForm.notes} onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })} style={{ resize:"vertical" }} />
            <button className="btn btn-accent" style={{ width:"100%", padding:"16px", fontSize:14 }} onClick={sendWhatsApp} disabled={!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address}>
              Send Order via WhatsApp →
            </button>
            <p style={{ fontSize:12, color:"#7a6e5d", textAlign:"center" }}>You'll be redirected to WhatsApp with your order details</p>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid rgba(139,111,71,0.08)", padding:"48px clamp(16px,5vw,48px) 32px", marginTop:40 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:32 }}>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:600, letterSpacing:2, marginBottom:6 }}>MuraCha</h3>
            <p style={{ fontSize:13, color:"#7a6e5d" }}>Pure Japanese Essence & Chinese Art</p>
          </div>
          <div style={{ display:"flex", gap:32, flexWrap:"wrap" }}>
            <div>
              <p style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#8b6f47", marginBottom:12, fontWeight:600 }}>Navigate</p>
              {[["home","Home"],["shop","Shop"],["about","About"]].map(([p,l]) => (
                <p key={p} onClick={() => setPage(p)} style={{ fontSize:13, color:"#7a6e5d", cursor:"pointer", marginBottom:6 }}>{l}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#8b6f47", marginBottom:12, fontWeight:600 }}>Contact</p>
              <a href="mailto:muracha.lb@gmail.com" style={{ fontSize:13, color:"#7a6e5d", display:"block", marginBottom:6 }}>muracha.lb@gmail.com</a>
              <p style={{ fontSize:13, color:"#7a6e5d" }}>Lebanon</p>
            </div>
            <div>
              <p style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#8b6f47", marginBottom:12, fontWeight:600 }}>Follow</p>
              <a href="https://www.instagram.com/muracha.lb" target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:"#7a6e5d", display:"block", marginBottom:6 }}>Instagram</a>
              <a href="https://www.tiktok.com/@muracha.lb" target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:"#7a6e5d", display:"block", marginBottom:6 }}>TikTok</a>
              <a href="https://www.facebook.com/share/1B6JkrCKFt/" target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:"#7a6e5d", display:"block" }}>Facebook</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth:1200, margin:"32px auto 0", paddingTop:20, borderTop:"1px solid rgba(139,111,71,0.06)", textAlign:"center" }}>
          <p style={{ fontSize:11, color:"#b8ad9e" }}>© 2026 MuraCha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
