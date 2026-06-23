'use client';

import { useState, useEffect, useRef, useCallback } from "react";

const WHATSAPP_NUMBER = "961XXXXXXXX";

const PRODUCTS = [
  { id:"cacao-powder", name:"Cacao Powder", price:15, size:"200g", category:"powders", desc:"Rich, unprocessed, unsweetened and deeply satisfying. Made of 100% premium cacao. High in antioxidants, boosts mood, great for a warm drink or desserts.", images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/FullSizeRender_e4bd0bf7-c5ae-4cd6-ba3b-0ce122dbfc49.jpg?v=1770908353"] },
  { id:"hojicha-classic", name:"Hojicha Tea — Classic", price:15, size:"30g", category:"japanese", desc:"Roasted to perfection with umami-rich taste. Made of 100% first harvest Sencha tea, medium roasted. A great coffee alternative, smooth on stomach, rich in L-theanine, low in caffeine.", benefits:["Boosts Metabolism","Low Caffeine","Heart Health","Calm Focus"], images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/FullSizeRender_2acf7464-448e-4798-b6c8-b6982bcc927a.jpg?v=1770921443","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9032.jpg?v=1770921443"] },
  { id:"hojicha-floral", name:"Hojicha Tea — Floral Harmony", price:18, size:"25g", category:"japanese", desc:"Luxury blend of superior quality Hojicha. Made of 100% first harvest Tencha tea, light roasted. Low in caffeine, antioxidant-rich, controls blood sugar while still uplifting.", images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2205.jpg?v=1770919693"] },
  { id:"hojicha-powder", name:"Organic Hojicha Powder", price:22, size:"40g", category:"powders", desc:"Nutty, caramel-like taste with all-day hydration. Made of 100% organic Bancha tea in powder form. Extremely low in caffeine — perfect for the whole family. Great for lattes and desserts.", images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2204.jpg?v=1770919462"] },
  { id:"lemon-balm", name:"Organic Lemon Balm Tea", price:8, size:"Glass Jar", category:"japanese", desc:"Known as مليسة (Melissa). A herbal tea that promotes relaxation, reduces stress, and eases PMS symptoms. Comes in a glass jar with wooden spoon.", images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/BFF6BC9B-CC35-4E67-85FC-2522493380DB.jpg?v=1774715246"] },
  { id:"rose-puerh", name:"Rose Pu'erh Tea Bomb", price:6.5, size:"2 × 9g balls", category:"chinese", desc:"Pu'erh tea with rose flower. Steep in boiling water to watch the tea ball bloom artistically. Each ball makes 4–5 cups.", benefits:["Glowing Skin","Beauty","Pain Relief"], images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/3.jpg?v=1761370469","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM.jpg?v=1763463842"] },
  { id:"tangerine-puerh", name:"Tangerine Peel Pu'erh Tea Bomb", price:6.5, size:"2 × 9g balls", category:"chinese", desc:"Pu'erh tea with tangerine peel. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.", benefits:["Reduces Fat","Helps Stomach","Reduces Cough"], images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/2.jpg?v=1761370453","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_3.jpg?v=1763463821"] },
  { id:"jasmine-puerh", name:"Jasmine Pu'erh Tea Bomb", price:6.5, size:"2 × 9g balls", category:"chinese", desc:"Pu'erh tea with jasmine flower. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.", benefits:["Detox","Slimming","Fresh Breath","Mood Enhancer"], images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9038.jpg?v=1761757578","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_1.jpg?v=1763463836"] },
  { id:"chrysanthemum-big", name:"Chrysanthemum Pu'erh Tea Bomb", price:6.5, size:"2 × 9g balls", category:"chinese", desc:"Pu'erh tea with white chrysanthemum flower. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.", benefits:["Anti-bacterial","Good for Eyes & Liver","Reduces Swelling"], images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/1.jpg?v=1761370435","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_2.jpg?v=1763463829"] },
  { id:"white-chrysanthemum", name:"White Chrysanthemum Tea Bomb Jar", price:10, size:"4 × 5g balls", category:"chinese", desc:"White tea with chrysanthemum flower in a glass jar. Steep in boiling water for an artistic blooming experience. Each ball makes 1–2 cups.", benefits:["Anti-bacterial","Good for Eyes & Liver","Reduces Swelling"], images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2203.jpg?v=1770921274","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9036.jpg?v=1770921274"] },
  { id:"white-tangerine", name:"White Tangerine Peel Tea Bomb Jar", price:10, size:"4 × 5g balls", category:"chinese", desc:"White tea with tangerine peel in a glass jar. Steep in boiling water for an artistic blooming experience. Each ball makes 1–2 cups.", images:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2201.jpg?v=1770921245","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9037.jpg?v=1770921245"] },
];

const CATS = { all:"All", japanese:"Japanese", chinese:"Tea Bombs", powders:"Powders" };

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, direction = "up", style = {}, className = "" }) {
  const [ref, vis] = useInView();
  const transforms = { up: "translateY(60px)", down: "translateY(-60px)", left: "translateX(60px)", right: "translateX(-60px)", scale: "scale(0.9)" };
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translate(0) scale(1)" : transforms[direction], transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

export default function MuraCha() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [sel, setSel] = useState(null);
  const [cat, setCat] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [form, setForm] = useState({ name:"", phone:"", address:"", notes:"" });
  const [toast, setToast] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2500); return () => clearTimeout(t); } }, [toast]);

  const goTo = (p) => {
    setTransition(true);
    setTimeout(() => { setPage(p); setSel(null); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); setTimeout(() => setTransition(false), 50); }, 300);
  };

  const addToCart = (p) => {
    setCart(prev => { const ex = prev.find(i => i.id === p.id); return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }]; });
    setToast(p.name);
  };
  const removeFromCart = id => setCart(p => p.filter(i => i.id !== id));
  const updateQty = (id, d) => setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);

  const sendWA = () => {
    const items = cart.map(i => `• ${i.name} × ${i.qty} — $${(i.price * i.qty).toFixed(2)}`).join("\n");
    const msg = `🍵 *New MuraCha Order*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Address:* ${form.address}\n${form.notes ? `*Notes:* ${form.notes}\n` : ""}\n*Items:*\n${items}\n\n*Total: $${total.toFixed(2)}*${total >= 50 ? "\n✓ Free shipping" : ""}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const navSolid = scrollY > 80 || page !== "home";
  const nc = navSolid ? "#2c2418" : "#faf8f5";
  const progress = Math.min(scrollY / (typeof document !== 'undefined' ? Math.max(document.body.scrollHeight - window.innerHeight, 1) : 1), 1);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#faf8f5", color: "#2c2418", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        a{text-decoration:none;color:inherit}

        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes float2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(5deg)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:.3}50%{opacity:.7}}
        @keyframes toastIn{0%{opacity:0;transform:translateX(-50%) translateY(30px) scale(.9)}100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
        @keyframes toastOut{0%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-20px)}}
        @keyframes modalIn{from{opacity:0;transform:scale(.95) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes slideRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes heroLine{from{width:0;opacity:0}to{width:100px;opacity:1}}
        @keyframes letterSpace{from{letter-spacing:12px;opacity:0}to{letter-spacing:5px;opacity:1}}
        @keyframes gentleZoom{0%{transform:scale(1)}100%{transform:scale(1.03)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

        .card{transition:all .45s cubic-bezier(.16,1,.3,1);cursor:pointer;border-radius:16px;overflow:hidden;background:#fff;border:1px solid rgba(139,111,71,.06)}
        .card:hover{transform:translateY(-10px);box-shadow:0 24px 64px rgba(44,36,24,.12)}
        .card-img{transition:transform .7s cubic-bezier(.16,1,.3,1)}
        .card:hover .card-img{transform:scale(1.08)}
        .card:hover .card-overlay{opacity:1}

        .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:13px 28px;border:none;cursor:pointer;font-family:'DM Sans';font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;transition:all .35s cubic-bezier(.16,1,.3,1);border-radius:6px;position:relative;overflow:hidden}
        .btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.1);transform:translateX(-100%);transition:transform .5s}
        .btn:hover::after{transform:translateX(100%)}
        .bp{background:#2c2418;color:#faf8f5}.bp:hover{background:#8b6f47;transform:translateY(-2px);box-shadow:0 8px 24px rgba(139,111,71,.25)}
        .bo{background:transparent;border:1.5px solid #2c2418;color:#2c2418}.bo:hover{background:#2c2418;color:#faf8f5;transform:translateY(-2px)}
        .ba{background:#8b6f47;color:#fff}.ba:hover{background:#6b5535;transform:translateY(-2px)}
        .bs{padding:8px 18px;font-size:11px;border-radius:4px}

        .cat-btn{padding:9px 22px;border:1px solid rgba(139,111,71,.15);background:transparent;color:#7a6e5d;font-family:'DM Sans';font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .35s cubic-bezier(.16,1,.3,1);border-radius:30px;font-weight:500}
        .cat-btn.on{background:#2c2418;color:#faf8f5;border-color:#2c2418;transform:scale(1.05)}
        .cat-btn:hover:not(.on){border-color:#8b6f47;color:#8b6f47;transform:scale(1.03)}

        .overlay{position:fixed;inset:0;background:rgba(20,16,10,.6);z-index:200;backdrop-filter:blur(8px);animation:fadeIn .3s}
        .input{width:100%;padding:14px 18px;border:1px solid rgba(139,111,71,.15);background:rgba(255,255,255,.5);font-family:'DM Sans';font-size:14px;color:#2c2418;outline:none;border-radius:8px;transition:all .3s}
        .input:focus{border-color:#8b6f47;background:#fff;box-shadow:0 0 0 3px rgba(139,111,71,.08)}
        .input::placeholder{color:#b8ad9e}
        .tag{display:inline-block;padding:5px 14px;background:rgba(139,111,71,.06);color:#8b6f47;font-size:11px;letter-spacing:.5px;border-radius:20px;font-weight:500;transition:all .3s}
        .tag:hover{background:rgba(139,111,71,.15);transform:scale(1.05)}

        .page-transition{transition:opacity .3s,transform .3s}

        @media(max-width:768px){
          .desk{display:none!important}
          .pgrid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}
          .modal-p{width:100%!important;height:100%!important;inset:0!important;border-radius:0!important}
          .cart-p{width:100%!important}
          .hero-t{font-size:34px!important}
          .csec{flex-wrap:nowrap!important;overflow-x:auto;padding-bottom:8px;justify-content:flex-start!important}
        }
      `}</style>

      {/* SCROLL PROGRESS */}
      <div style={{ position:"fixed", top:0, left:0, height:2, background:"linear-gradient(90deg,#8b6f47,#c4a97d)", width:`${progress*100}%`, zIndex:200, transition:"width .1s" }} />

      {/* TOAST */}
      {toast && (
        <div style={{ position:"fixed", bottom:32, left:"50%", transform:"translateX(-50%)", zIndex:999, background:"#2c2418", color:"#faf8f5", padding:"14px 32px", borderRadius:12, fontSize:13, fontWeight:500, animation:"toastIn .4s cubic-bezier(.16,1,.3,1), toastOut .4s ease 2s forwards", boxShadow:"0 12px 40px rgba(0,0,0,.2)", display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ background:"#8b6f47", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>✓</span>
          {toast} added to cart
        </div>
      )}

      {/* PAGE TRANSITION OVERLAY */}
      <div style={{ position:"fixed", inset:0, background:"#2c2418", zIndex:150, pointerEvents:"none", opacity:transition?1:0, transition:"opacity .3s ease" }} />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:68, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 clamp(16px,4vw,48px)", background:navSolid?"rgba(250,248,245,.92)":"transparent", backdropFilter:navSolid?"blur(20px) saturate(1.5)":"none", borderBottom:navSolid?"1px solid rgba(139,111,71,.06)":"none", transition:"all .5s cubic-bezier(.16,1,.3,1)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:36 }}>
          <span onClick={() => goTo("home")} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:600, letterSpacing:3, cursor:"pointer", color:nc, transition:"color .3s" }}>MuraCha</span>
          <div className="desk" style={{ display:"flex", gap:28 }}>
            {[["home","Home"],["shop","Shop"],["about","About"]].map(([p,l]) => (
              <span key={p} onClick={() => goTo(p)} style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontWeight:600, color:nc, opacity:page===p?1:.5, transition:"all .3s", borderBottom:page===p?`1.5px solid ${nc}`:"1.5px solid transparent", paddingBottom:2 }}>{l}</span>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <button onClick={() => setCartOpen(true)} style={{ position:"relative", background:"none", border:"none", cursor:"pointer", padding:6, transition:"transform .3s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.15)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={nc} strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {count > 0 && <span style={{ position:"absolute", top:-2, right:-2, background:"#8b6f47", color:"white", fontSize:9, fontWeight:700, width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", animation:"pulse 2s infinite", boxShadow:"0 2px 8px rgba(139,111,71,.4)" }}>{count}</span>}
          </button>
        </div>
      </nav>

      {/* CART */}
      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)} />}
      {cartOpen && (
        <div className="cart-p" style={{ position:"fixed", right:0, top:0, bottom:0, width:400, background:"#fff", zIndex:202, boxShadow:"-12px 0 60px rgba(0,0,0,.12)", display:"flex", flexDirection:"column", animation:"slideRight .4s cubic-bezier(.16,1,.3,1)" }}>
          <div style={{ padding:"28px 28px 18px", borderBottom:"1px solid rgba(139,111,71,.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:500 }}>Cart <span style={{ fontSize:16, color:"#8b6f47" }}>({count})</span></h3>
            <button onClick={() => setCartOpen(false)} style={{ background:"rgba(0,0,0,.04)", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:16, transition:"all .3s", display:"flex", alignItems:"center", justifyContent:"center" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,.1)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,.04)"}>✕</button>
          </div>
          <div style={{ flex:1, overflow:"auto", padding:24 }}>
            {cart.length === 0 ? <p style={{ color:"#b8ad9e", fontSize:14, textAlign:"center", marginTop:60 }}>Your cart is empty</p> :
            cart.map((item, i) => (
              <div key={item.id} style={{ display:"flex", gap:16, marginBottom:20, paddingBottom:20, borderBottom:"1px solid rgba(139,111,71,.04)", animation:`fadeIn .4s ease ${i*.1}s both` }}>
                <img src={item.images[0]} alt="" style={{ width:68, height:68, objectFit:"cover", borderRadius:10 }} />
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14, fontWeight:600, marginBottom:3 }}>{item.name}</p>
                  <p style={{ fontSize:11, color:"#9e9385", marginBottom:8 }}>{item.size}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ display:"flex", alignItems:"center", border:"1px solid rgba(139,111,71,.12)", borderRadius:6, overflow:"hidden" }}>
                      <button onClick={() => updateQty(item.id,-1)} style={{ background:"none", border:"none", padding:"5px 12px", cursor:"pointer", fontSize:14, transition:"background .2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,.04)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>−</button>
                      <span style={{ fontSize:13, fontWeight:600, minWidth:22, textAlign:"center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id,1)} style={{ background:"none", border:"none", padding:"5px 12px", cursor:"pointer", fontSize:14, transition:"background .2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,.04)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>+</button>
                    </div>
                    <span style={{ fontSize:14, fontWeight:700, color:"#8b6f47" }}>${(item.price*item.qty).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer", fontSize:11, color:"#c9857a", fontWeight:600, transition:"color .3s" }} onMouseEnter={e=>e.currentTarget.style.color="#a0524a"} onMouseLeave={e=>e.currentTarget.style.color="#c9857a"}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding:24, borderTop:"1px solid rgba(139,111,71,.06)", background:"rgba(250,248,245,.5)" }}>
              {total >= 50 ? <p style={{ fontSize:12, color:"#5a8a5e", marginBottom:12, fontWeight:600 }}>✓ Free shipping unlocked!</p> :
              <div style={{ marginBottom:12 }}>
                <p style={{ fontSize:12, color:"#7a6e5d", marginBottom:6 }}>${(50-total).toFixed(2)} away from free shipping</p>
                <div style={{ height:3, background:"rgba(139,111,71,.08)", borderRadius:2, overflow:"hidden" }}><div style={{ height:"100%", background:"linear-gradient(90deg,#8b6f47,#c4a97d)", borderRadius:2, width:`${Math.min(total/50*100,100)}%`, transition:"width .5s cubic-bezier(.16,1,.3,1)" }} /></div>
              </div>}
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:18 }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22 }}>Total</span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>${total.toFixed(2)}</span>
              </div>
              <button className="btn bp" style={{ width:"100%" }} onClick={() => { setCartOpen(false); goTo("checkout"); }}>Checkout via WhatsApp</button>
            </div>
          )}
        </div>
      )}

      {/* PRODUCT MODAL */}
      {sel && (
        <>
          <div className="overlay" onClick={() => setSel(null)} />
          <div className="modal-p" style={{ position:"fixed", zIndex:201, background:"#fff", top:"4%", left:"4%", right:"4%", bottom:"4%", borderRadius:20, display:"flex", flexDirection:"column", overflow:"hidden", animation:"modalIn .5s cubic-bezier(.16,1,.3,1)" }}>
            <button onClick={() => setSel(null)} style={{ position:"absolute", top:18, right:18, background:"rgba(255,255,255,.9)", backdropFilter:"blur(8px)", border:"none", borderRadius:"50%", width:40, height:40, cursor:"pointer", fontSize:18, zIndex:10, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform .3s", boxShadow:"0 2px 12px rgba(0,0,0,.1)" }} onMouseEnter={e=>e.currentTarget.style.transform="rotate(90deg)"} onMouseLeave={e=>e.currentTarget.style.transform="rotate(0)"}>✕</button>
            <div style={{ display:"flex", flex:1, overflow:"hidden", flexWrap:"wrap" }}>
              <div style={{ flex:"1 1 55%", minWidth:280, background:"linear-gradient(135deg,#f8f6f2,#efe9df)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, position:"relative" }}>
                <img src={sel.images[imgIdx]||sel.images[0]} alt={sel.name} style={{ maxWidth:"85%", maxHeight:"55vh", objectFit:"contain", borderRadius:12, transition:"all .5s cubic-bezier(.16,1,.3,1)" }} />
                {sel.images.length > 1 && (
                  <div style={{ display:"flex", gap:10, marginTop:20 }}>
                    {sel.images.map((img,i) => (
                      <img key={i} src={img} alt="" onClick={() => setImgIdx(i)} style={{ width:60, height:60, objectFit:"cover", borderRadius:10, cursor:"pointer", border:i===imgIdx?"2.5px solid #8b6f47":"2.5px solid transparent", opacity:i===imgIdx?1:.5, transition:"all .3s cubic-bezier(.16,1,.3,1)", transform:i===imgIdx?"scale(1.08)":"scale(1)" }} />
                    ))}
                  </div>
                )}
              </div>
              <div style={{ flex:"1 1 40%", minWidth:280, padding:"44px 36px", overflow:"auto" }}>
                <p style={{ fontSize:10, letterSpacing:4, textTransform:"uppercase", color:"#8b6f47", marginBottom:10, fontWeight:600 }}>{CATS[sel.category]}</p>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:400, marginBottom:8, lineHeight:1.2 }}>{sel.name}</h2>
                <p style={{ fontSize:13, color:"#9e9385", marginBottom:20 }}>{sel.size}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:600, color:"#8b6f47", marginBottom:28 }}>${sel.price.toFixed(2)}</p>
                <p style={{ fontSize:14, lineHeight:1.9, color:"#5a4e3e", marginBottom:24 }}>{sel.desc}</p>
                {sel.benefits && <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>{sel.benefits.map(b => <span key={b} className="tag">{b}</span>)}</div>}
                <button className="btn bp" style={{ width:"100%", padding:"16px" }} onClick={() => { addToCart(sel); setSel(null); }}>Add to Cart</button>
                <a href="https://www.instagram.com/muracha.lb" target="_blank" rel="noopener noreferrer" style={{ display:"block", textAlign:"center", marginTop:14, fontSize:12, color:"#8b6f47", letterSpacing:1, transition:"opacity .3s" }}>Or order via Instagram →</a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══ CONTENT ═══ */}
      <div className="page-transition" style={{ opacity:transition?0:1, transform:transition?"translateY(10px)":"translateY(0)" }}>

      {page === "home" && <>
        {/* HERO */}
        <section style={{ height:"100vh", background:"#1e1a14", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", padding:"0 clamp(16px,5vw,60px)" }}>
          <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 25% 45%, rgba(139,111,71,.2) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(196,169,125,.1) 0%, transparent 45%), radial-gradient(circle at 50% 80%, rgba(139,111,71,.08) 0%, transparent 40%)` }} />
          {/* Parallax kanji */}
          <div style={{ position:"absolute", right:"clamp(-80px,3vw,20px)", top:`calc(50% - ${scrollY*.15}px)`, transform:"translateY(-50%)", fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(200px,32vw,420px)", color:"rgba(139,111,71,.04)", lineHeight:1, userSelect:"none", transition:"none" }}>茶</div>
          {/* Floating decorative circles */}
          <div style={{ position:"absolute", top:"15%", left:"12%", width:6, height:6, borderRadius:"50%", background:"rgba(196,169,125,.3)", animation:"float 5s ease-in-out infinite" }} />
          <div style={{ position:"absolute", top:"65%", right:"18%", width:4, height:4, borderRadius:"50%", background:"rgba(196,169,125,.2)", animation:"float2 7s ease-in-out infinite 1s" }} />
          <div style={{ position:"absolute", bottom:"25%", left:"8%", width:8, height:8, borderRadius:"50%", background:"rgba(196,169,125,.15)", animation:"float 6s ease-in-out infinite 2s" }} />
          <div style={{ position:"absolute", top:"30%", right:"10%", width:80, height:80, border:"1px solid rgba(196,169,125,.06)", borderRadius:"50%", animation:"spin 30s linear infinite" }} />

          <div style={{ textAlign:"center", maxWidth:680, position:"relative", zIndex:1 }}>
            <p style={{ fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"#c4a97d", marginBottom:32, fontWeight:500, animation:"letterSpace 1.2s cubic-bezier(.16,1,.3,1) both" }}>Authentic Japanese & Chinese Tea</p>
            <h1 className="hero-t" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(40px,7.5vw,78px)", fontWeight:300, color:"#faf8f5", lineHeight:1.08, marginBottom:24, opacity:0, animation:"fadeIn 1s ease .3s both" }}>
              Pure Essence,<br /><em style={{ fontWeight:500, fontStyle:"italic", background:"linear-gradient(135deg,#faf8f5,#c4a97d)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Timeless Craft</em>
            </h1>
            <div style={{ width:0, height:1.5, background:"linear-gradient(90deg, transparent, #c4a97d, transparent)", margin:"0 auto 32px", animation:"heroLine 1.2s cubic-bezier(.16,1,.3,1) .8s both" }} />
            <p style={{ fontSize:15, color:"rgba(250,248,245,.45)", lineHeight:1.9, maxWidth:480, margin:"0 auto 48px", opacity:0, animation:"fadeIn 1s ease .6s both" }}>
              Experience the nourishing and calming taste of meticulously sourced authentic tea from Japan and China.
            </p>
            <div style={{ opacity:0, animation:"fadeIn 1s ease .9s both" }}>
              <button className="btn" style={{ background:"transparent", border:"1.5px solid rgba(196,169,125,.5)", color:"#faf8f5", padding:"16px 44px", letterSpacing:3, borderRadius:8 }} onClick={() => goTo("shop")} onMouseEnter={e=>{e.currentTarget.style.background="rgba(196,169,125,.15)";e.currentTarget.style.borderColor="#c4a97d"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(196,169,125,.5)"}}>
                Shop Collection
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, animation:"pulse 2.5s ease infinite" }}>
            <span style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(250,248,245,.25)" }}>Scroll</span>
            <div style={{ width:1, height:28, background:"linear-gradient(rgba(250,248,245,.3),transparent)" }} />
          </div>
        </section>

        {/* MARQUEE BANNER */}
        <div style={{ background:"#8b6f47", color:"white", padding:"13px 0", overflow:"hidden", position:"relative" }}>
          <div style={{ display:"flex", animation:"marquee 25s linear infinite", whiteSpace:"nowrap" }}>
            {[...Array(8)].map((_,i) => <span key={i} style={{ fontSize:11, letterSpacing:3, textTransform:"uppercase", fontWeight:500, marginRight:80 }}>✦ Free shipping on orders above $50 ✦ Limited time offer ✦ Authentic Japanese & Chinese Tea</span>)}
          </div>
        </div>

        {/* FEATURED */}
        <section style={{ padding:"100px clamp(16px,5vw,48px)", maxWidth:1200, margin:"0 auto" }}>
          <Reveal><div style={{ textAlign:"center", marginBottom:56 }}>
            <p style={{ fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"#8b6f47", marginBottom:14, fontWeight:600 }}>Featured</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,5vw,46px)", fontWeight:300, letterSpacing:"-1px" }}>Our Bestsellers</h2>
          </div></Reveal>

          <div className="pgrid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:22 }}>
            {PRODUCTS.slice(0,4).map((p,i) => (
              <Reveal key={p.id} delay={i*.1}>
                <div className="card" onClick={() => { setSel(p); setImgIdx(0); }}>
                  <div style={{ height:240, overflow:"hidden", background:"#f5f3ef", position:"relative" }}>
                    <img className="card-img" src={p.images[0]} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <div className="card-overlay" style={{ position:"absolute", inset:0, background:"rgba(44,36,24,.04)", opacity:0, transition:"opacity .4s", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ background:"rgba(255,255,255,.95)", padding:"8px 20px", borderRadius:20, fontSize:11, fontWeight:600, letterSpacing:1, textTransform:"uppercase", boxShadow:"0 4px 16px rgba(0,0,0,.1)" }}>View Details</span>
                    </div>
                  </div>
                  <div style={{ padding:"18px 20px 22px" }}>
                    <p style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#8b6f47", marginBottom:6, fontWeight:600 }}>{CATS[p.category]}</p>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:500, marginBottom:5 }}>{p.name}</h3>
                    <p style={{ fontSize:12, color:"#9e9385", marginBottom:12 }}>{p.size}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:17, fontWeight:700, color:"#8b6f47" }}>${p.price.toFixed(2)}</span>
                      <button className="btn bs bo" onClick={e => { e.stopPropagation(); addToCart(p); }}>Add</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}><div style={{ textAlign:"center", marginTop:48 }}>
            <button className="btn bo" onClick={() => goTo("shop")}>View All Products</button>
          </div></Reveal>
        </section>

        {/* TEA BOMBS SECTION */}
        <section style={{ padding:"90px clamp(16px,5vw,48px)", background:"linear-gradient(180deg,#1e1a14,#2c2418)" }}>
          <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
            <Reveal><div>
              <p style={{ fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"#c4a97d", marginBottom:14, fontWeight:600 }}>Chinese Collection</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,5vw,42px)", fontWeight:300, color:"#faf8f5", marginBottom:16 }}>Blooming Tea Bombs</h2>
              <p style={{ fontSize:14, color:"rgba(250,248,245,.4)", lineHeight:1.9, maxWidth:520, margin:"0 auto 40px" }}>Steep a hand-rolled tea ball in boiling water and watch it bloom into a beautiful flower. Each ball makes 4–5 cups.</p>
            </div></Reveal>
            <div style={{ display:"flex", justifyContent:"center", gap:28, flexWrap:"wrap" }}>
              {PRODUCTS.filter(p => p.category === "chinese").slice(0,4).map((p,i) => (
                <Reveal key={p.id} delay={i*.12} direction="scale">
                  <div onClick={() => { setSel(p); setImgIdx(0); }} style={{ width:140, cursor:"pointer", transition:"transform .4s" }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-8px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                    <div style={{ width:110, height:110, borderRadius:"50%", overflow:"hidden", border:"2px solid rgba(196,169,125,.2)", margin:"0 auto 14px", transition:"border-color .3s" }}>
                      <img src={p.images[0]} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .5s" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.15)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"} />
                    </div>
                    <p style={{ fontSize:12, color:"#c4a97d", fontWeight:500, lineHeight:1.4 }}>{p.name.replace(" Tea Bomb","").replace(" Pu'erh","")}</p>
                    <p style={{ fontSize:15, color:"#faf8f5", fontWeight:700, marginTop:6 }}>${p.price.toFixed(2)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.4}>
              <button className="btn" style={{ marginTop:40, border:"1px solid rgba(196,169,125,.3)", background:"transparent", color:"#faf8f5", borderRadius:8 }} onClick={() => { goTo("shop"); setCat("chinese"); }} onMouseEnter={e=>e.currentTarget.style.background="rgba(196,169,125,.1)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>View All Tea Bombs</button>
            </Reveal>
          </div>
        </section>

        {/* ABOUT TEASER */}
        <section style={{ padding:"100px clamp(16px,5vw,48px)" }}>
          <div style={{ maxWidth:620, margin:"0 auto", textAlign:"center" }}>
            <Reveal>
              <p style={{ fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"#8b6f47", marginBottom:14, fontWeight:600 }}>Our Story</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,5vw,42px)", fontWeight:300, marginBottom:28 }}>Rooted in Tradition</h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ width:60, height:1.5, background:"linear-gradient(90deg,transparent,#c4a97d,transparent)", margin:"0 auto 28px" }} />
              <p style={{ fontSize:16, color:"#7a6e5d", lineHeight:2 }}>MuraCha brings the art of Japanese and Chinese tea culture to Lebanon. Every leaf is carefully selected from heritage farms, honoring generations of craft and the meditative ritual of tea.</p>
            </Reveal>
            <Reveal delay={0.25}>
              <button className="btn bo" style={{ marginTop:28 }} onClick={() => goTo("about")}>Learn More</button>
            </Reveal>
          </div>
        </section>
      </>}

      {page === "shop" && (
        <section style={{ paddingTop:100, padding:"100px clamp(16px,5vw,48px) 60px", maxWidth:1200, margin:"0 auto" }}>
          <Reveal><div style={{ textAlign:"center", marginBottom:44 }}>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,5vw,48px)", fontWeight:300, marginBottom:24 }}>Our Collection</h1>
            <div className="csec" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              {Object.entries(CATS).map(([k,v]) => <button key={k} className={`cat-btn ${cat===k?"on":""}`} onClick={() => setCat(k)}>{v}</button>)}
            </div>
          </div></Reveal>
          <div className="pgrid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:22 }}>
            {filtered.map((p,i) => (
              <Reveal key={p.id} delay={i*.07}>
                <div className="card" onClick={() => { setSel(p); setImgIdx(0); }}>
                  <div style={{ height:240, overflow:"hidden", background:"#f5f3ef", position:"relative" }}>
                    <img className="card-img" src={p.images[0]} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <div className="card-overlay" style={{ position:"absolute", inset:0, background:"rgba(44,36,24,.04)", opacity:0, transition:"opacity .4s", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ background:"rgba(255,255,255,.95)", padding:"8px 20px", borderRadius:20, fontSize:11, fontWeight:600, letterSpacing:1, textTransform:"uppercase" }}>View Details</span>
                    </div>
                  </div>
                  <div style={{ padding:"18px 20px 22px" }}>
                    <p style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"#8b6f47", marginBottom:6, fontWeight:600 }}>{CATS[p.category]}</p>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:500, marginBottom:5 }}>{p.name}</h3>
                    <p style={{ fontSize:12, color:"#9e9385", marginBottom:12 }}>{p.size}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:17, fontWeight:700, color:"#8b6f47" }}>${p.price.toFixed(2)}</span>
                      <button className="btn bs bo" onClick={e => { e.stopPropagation(); addToCart(p); }}>Add</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {page === "about" && (
        <section style={{ paddingTop:100, padding:"100px clamp(16px,5vw,48px) 60px", maxWidth:720, margin:"0 auto" }}>
          <Reveal><div style={{ textAlign:"center" }}>
            <p style={{ fontSize:11, letterSpacing:5, textTransform:"uppercase", color:"#8b6f47", marginBottom:14, fontWeight:600 }}>About Us</p>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,5vw,52px)", fontWeight:300, marginBottom:28 }}>Our Story</h1>
            <div style={{ width:60, height:1.5, background:"linear-gradient(90deg,transparent,#c4a97d,transparent)", margin:"0 auto 36px" }} />
          </div></Reveal>
          <Reveal delay={0.1}><p style={{ fontSize:16, color:"#5a4e3e", lineHeight:2.1, textAlign:"center", marginBottom:22 }}>MuraCha brings the art of Japanese and Chinese tea culture to Lebanon. Every leaf is carefully selected from heritage farms, honoring generations of craft and the meditative ritual of tea.</p></Reveal>
          <Reveal delay={0.2}><p style={{ fontSize:16, color:"#5a4e3e", lineHeight:2.1, textAlign:"center", marginBottom:22 }}>From the roasted warmth of hojicha to the artistic bloom of Chinese tea bombs, each product is an invitation to slow down, breathe, and savor the moment.</p></Reveal>
          <Reveal delay={0.3}><p style={{ fontSize:16, color:"#5a4e3e", lineHeight:2.1, textAlign:"center", marginBottom:36 }}>Our Japanese collection features premium first-harvest teas — Sencha, Tencha, and organic Bancha — sourced directly from Japanese farms. Our Chinese collection showcases hand-rolled Pu&apos;erh tea balls wrapped with flowers — each one a unique sensory experience.</p></Reveal>
          <Reveal delay={0.35}><div style={{ display:"flex", justifyContent:"center", gap:16 }}>
            <a href="https://www.instagram.com/muracha.lb" target="_blank" rel="noopener noreferrer" className="btn bo">Instagram</a>
            <a href="https://www.tiktok.com/@muracha.lb" target="_blank" rel="noopener noreferrer" className="btn bo">TikTok</a>
          </div></Reveal>
        </section>
      )}

      {page === "checkout" && (
        <section style={{ paddingTop:100, padding:"100px clamp(16px,5vw,48px) 60px", maxWidth:600, margin:"0 auto" }}>
          <Reveal><h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:300, textAlign:"center", marginBottom:8 }}>Checkout</h1>
          <p style={{ textAlign:"center", fontSize:14, color:"#9e9385", marginBottom:40 }}>Complete your order via WhatsApp</p></Reveal>
          <Reveal delay={0.1}><div style={{ background:"#fff", borderRadius:16, padding:28, marginBottom:24, border:"1px solid rgba(139,111,71,.06)", boxShadow:"0 4px 24px rgba(0,0,0,.03)" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, marginBottom:18 }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display:"flex", justifyContent:"space-between", paddingBottom:12, marginBottom:12, borderBottom:"1px solid rgba(139,111,71,.04)", fontSize:14 }}>
                <span>{item.name} × {item.qty}</span>
                <span style={{ fontWeight:700 }}>${(item.price*item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:20, fontFamily:"'Cormorant Garamond',serif", fontWeight:700, paddingTop:10 }}>
              <span>Total</span><span style={{ color:"#8b6f47" }}>${total.toFixed(2)}</span>
            </div>
            {total >= 50 && <p style={{ fontSize:12, color:"#5a8a5e", marginTop:8, fontWeight:600 }}>✓ Free shipping</p>}
          </div></Reveal>
          <Reveal delay={0.2}><div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <input className="input" placeholder="Full Name *" value={form.name} onChange={e => setForm({...form,name:e.target.value})} />
            <input className="input" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} />
            <input className="input" placeholder="Delivery Address *" value={form.address} onChange={e => setForm({...form,address:e.target.value})} />
            <textarea className="input" placeholder="Notes (optional)" rows={3} value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} style={{ resize:"vertical" }} />
            <button className="btn ba" style={{ width:"100%", padding:16, fontSize:13 }} onClick={sendWA} disabled={!form.name||!form.phone||!form.address}>Send Order via WhatsApp →</button>
            <p style={{ fontSize:12, color:"#9e9385", textAlign:"center" }}>You&apos;ll be redirected to WhatsApp with your order details</p>
          </div></Reveal>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid rgba(139,111,71,.06)", padding:"56px clamp(16px,5vw,48px) 36px", marginTop:40, background:"rgba(44,36,24,.02)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:36 }}>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:600, letterSpacing:3, marginBottom:8 }}>MuraCha</h3>
            <p style={{ fontSize:13, color:"#9e9385" }}>Pure Japanese Essence & Chinese Art</p>
          </div>
          <div style={{ display:"flex", gap:36, flexWrap:"wrap" }}>
            <div>
              <p style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#8b6f47", marginBottom:14, fontWeight:700 }}>Navigate</p>
              {[["home","Home"],["shop","Shop"],["about","About"]].map(([p,l]) => (
                <p key={p} onClick={() => goTo(p)} style={{ fontSize:13, color:"#7a6e5d", cursor:"pointer", marginBottom:8, transition:"color .3s" }} onMouseEnter={e=>e.currentTarget.style.color="#8b6f47"} onMouseLeave={e=>e.currentTarget.style.color="#7a6e5d"}>{l}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#8b6f47", marginBottom:14, fontWeight:700 }}>Contact</p>
              <a href="mailto:muracha.lb@gmail.com" style={{ fontSize:13, color:"#7a6e5d", display:"block", marginBottom:8 }}>muracha.lb@gmail.com</a>
              <p style={{ fontSize:13, color:"#7a6e5d" }}>Lebanon</p>
            </div>
            <div>
              <p style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"#8b6f47", marginBottom:14, fontWeight:700 }}>Follow</p>
              {[["https://www.instagram.com/muracha.lb","Instagram"],["https://www.tiktok.com/@muracha.lb","TikTok"],["https://www.facebook.com/share/1B6JkrCKFt/","Facebook"]].map(([u,l]) => (
                <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:"#7a6e5d", display:"block", marginBottom:8, transition:"color .3s" }} onMouseEnter={e=>e.currentTarget.style.color="#8b6f47"} onMouseLeave={e=>e.currentTarget.style.color="#7a6e5d"}>{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ maxWidth:1200, margin:"36px auto 0", paddingTop:22, borderTop:"1px solid rgba(139,111,71,.04)", textAlign:"center" }}>
          <p style={{ fontSize:11, color:"#b8ad9e" }}>© 2026 MuraCha. All rights reserved.</p>
        </div>
      </footer>

      </div>
    </div>
  );
}
