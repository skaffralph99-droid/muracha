'use client';
import { useState, useEffect } from "react";

const WA = "96171425250";
const SB_URL = "https://ihhhjwtgfamjuczaqqwn.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloaGhqd3RnZmFtanVjemFxcXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5OTA2ODgsImV4cCI6MjA5NTU2NjY4OH0.PIKDUY--lWbhAPiVd7ltpJFG2d2O9bvVgSO-mJo15Xo";
const G="#326b2f", GL="#5a9e4f", GX="#eaf2e8";

// ── STEP 1: PACKAGING ──
const PACKAGES = [
  { id:"envelope", name:"Envelope Package", price:2.5 },
  { id:"heart-box", name:"Heart / Square Box with Plexi Lid", price:5 },
  { id:"magnetic-bag", name:"Magnetic Bag", price:5.5 },
  { id:"magnetic-box", name:"Magnetic Box", price:5.5 },
];

// ── STEP 2: RITUAL (tea) ──
const RITUALS = [
  { id:"cacao-200", name:"Premium Cacao Powder 200g (Glass Jar)", price:10 },
  { id:"cacao-500", name:"Premium Cacao Powder 500g (Pouch)", price:18 },
  { id:"white-lavender", name:"White Tea Lavender 50g", price:30 },
  { id:"hibiscus", name:"Hibiscus Flower Tea 100g", price:4.5 },
  { id:"oolong", name:"Oolong Tea 100g", price:35 },
  { id:"tencha", name:"Tencha Tea — Floral Harmony 50g", price:33 },
  { id:"sencha", name:"Sencha Tea — Classic Hojicha 40g", price:15 },
  { id:"hojicha-powder", name:"Organic Hojicha Powder 50g", price:28 },
  { id:"lemon-balm", name:"Organic Lemon Balm Tea (Jar)", price:5 },
  { id:"moringa", name:"Organic Moringa Powder 200g", price:10 },
  { id:"blooming", name:"Blooming Tea (Teabombs) box of 2", price:6.5 },
];

// ── STEP 3: CHOCOLATE (per 1kg, min 200g, sold by weight) ──
const CHOCOLATES = [
  { id:"almonds", name:"Milk / Dark Chocolate Coated Almonds", pricePerKg:36 },
  { id:"hazelnuts", name:"Milk / Dark Chocolate Coated Hazelnuts", pricePerKg:38 },
  { id:"mocha-pecan", name:"Mocha Coated Pecan Nuts", pricePerKg:38 },
  { id:"strawberries", name:"Milk Chocolate Coated Dried Strawberries", pricePerKg:32 },
  { id:"orange-peel", name:"Dark Chocolate Coated Orange Peel", pricePerKg:40 },
  { id:"salted-caramel", name:"Salted Caramel Coated Pecan Nuts", pricePerKg:38 },
  { id:"mixed-dragees", name:"Mixed Dragees", pricePerKg:40, custom:true },
];

export default function BuildBox({ onBack }) {
  const [pkg, setPkg] = useState(null);
  const [rituals, setRituals] = useState([]); // array of ritual ids
  const [chocs, setChocs] = useState({}); // { id: { grams, flavors } }
  const [message, setMessage] = useState("");
  const [special, setSpecial] = useState("");
  const [form, setForm] = useState({ name:"", phone:"", address:"" });
  const [sent, setSent] = useState(false);

  useEffect(()=>{window.scrollTo({top:0,behavior:"instant"})},[]);

  const toggleRitual = (id) => setRituals(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  const setChoc = (id, grams, flavors) => {
    setChocs(p => {
      const n = { ...p };
      if (grams <= 0) { delete n[id]; } else { n[id] = { grams, flavors: flavors ?? (p[id]?.flavors || "") }; }
      return n;
    });
  };

  // Totals
  const pkgPrice = pkg ? PACKAGES.find(x=>x.id===pkg).price : 0;
  const ritualsPrice = rituals.reduce((s,id)=> s + RITUALS.find(x=>x.id===id).price, 0);
  const chocsPrice = Object.entries(chocs).reduce((s,[id,v])=> {
    const c = CHOCOLATES.find(x=>x.id===id); return s + (c.pricePerKg * (v.grams/1000));
  }, 0);
  const total = pkgPrice + ritualsPrice + chocsPrice;

  const canSend = pkg && form.name && form.phone && form.address;

  const sendWA = () => {
    let msg = `🎁 *New MuraCha Custom Box Order*\n\n`;
    msg += `*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Address:* ${form.address}\n\n`;
    msg += `*━━━ Packaging ━━━*\n${PACKAGES.find(x=>x.id===pkg).name} — $${pkgPrice.toFixed(2)}\n\n`;
    if (rituals.length) {
      msg += `*━━━ Tea Selection ━━━*\n`;
      rituals.forEach(id => { const r = RITUALS.find(x=>x.id===id); msg += `• ${r.name} — $${r.price.toFixed(2)}\n`; });
      msg += `\n`;
    }
    if (Object.keys(chocs).length) {
      msg += `*━━━ Chocolate Selection ━━━*\n`;
      Object.entries(chocs).forEach(([id,v]) => {
        const c = CHOCOLATES.find(x=>x.id===id);
        const p = c.pricePerKg * (v.grams/1000);
        msg += `• ${c.name} — ${v.grams}g — $${p.toFixed(2)}`;
        if (c.custom && v.flavors) msg += ` (Mix: ${v.flavors})`;
        msg += `\n`;
      });
      msg += `\n`;
    }
    if (message.trim()) msg += `*━━━ Personalized Message (to print) ━━━*\n"${message}"\n\n`;
    if (special.trim()) msg += `*━━━ Special Requests ━━━*\n${special}\n\n`;
    msg += `*TOTAL: $${total.toFixed(2)}*\n\n_This order will be reviewed by the shop and confirmed via WhatsApp._`;

    // Save to Supabase
    fetch(`${SB_URL}/rest/v1/muracha_orders`, {
      method:"POST",
      headers:{ "apikey":SB_KEY, "Authorization":`Bearer ${SB_KEY}`, "Content-Type":"application/json" },
      body: JSON.stringify({
        customer_name: form.name, customer_phone: form.phone, customer_address: form.address,
        customer_notes: `CUSTOM BOX${special?` | Special: ${special}`:""}${message?` | Message: ${message}`:""}`,
        items: [
          { name: `📦 ${PACKAGES.find(x=>x.id===pkg).name}`, qty:1, price:pkgPrice, size:"packaging" },
          ...rituals.map(id => { const r=RITUALS.find(x=>x.id===id); return { name:r.name, qty:1, price:r.price, size:"tea" }; }),
          ...Object.entries(chocs).map(([id,v]) => { const c=CHOCOLATES.find(x=>x.id===id); return { name:`${c.name}${c.custom&&v.flavors?` (${v.flavors})`:""}`, qty:1, price:c.pricePerKg*(v.grams/1000), size:`${v.grams}g` }; }),
        ],
        subtotal: total, delivery: 0, total, status:"pending"
      })
    }).catch(()=>{});

    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  const Section = ({ num, title, sub, children }) => (
    <section style={{ marginBottom:56 }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <span style={{ width:36, height:36, borderRadius:"50%", background:G, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, flexShrink:0 }}>{num}</span>
        <h2 className="f" style={{ fontSize:"clamp(22px,4vw,30px)", fontWeight:400 }}>{title}</h2>
      </div>
      {sub && <p style={{ fontSize:13, color:"#8a9a88", marginBottom:20, marginLeft:50 }}>{sub}</p>}
      <div style={{ marginLeft:0 }}>{children}</div>
    </section>
  );

  if (sent) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#fafaf7", padding:24, fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ textAlign:"center", maxWidth:440 }}>
        <div style={{ fontSize:52, marginBottom:16 }}>🎁</div>
        <h1 className="f" style={{ fontSize:32, fontWeight:400, marginBottom:12, fontFamily:"'Cormorant Garamond',serif" }}>Order Sent!</h1>
        <p style={{ fontSize:15, color:"#666", lineHeight:1.7, marginBottom:28 }}>Your custom box request has been sent via WhatsApp. Our team will review it and confirm the details with you shortly.</p>
        <button onClick={onBack} style={{ padding:"14px 32px", background:G, color:"#fff", border:"none", borderRadius:8, fontSize:13, fontWeight:600, letterSpacing:1, textTransform:"uppercase", cursor:"pointer" }}>Back to Shop</button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#fafaf7", color:"#2a2a2a", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .f{font-family:'Cormorant Garamond',serif}
        .opt{border:1.5px solid rgba(50,107,47,.12);border-radius:12px;padding:16px 18px;cursor:pointer;transition:all .25s;background:#fff;display:flex;justify-content:space-between;align-items:center;gap:12}
        .opt:hover{border-color:${GL}}
        .opt.on{border-color:${G};background:rgba(50,107,47,.04)}
        .qbtn{width:30px;height:30px;border:1px solid rgba(50,107,47,.2);background:#fff;border-radius:6px;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;color:${G}}
        .inp{width:100%;padding:13px 16px;border:1px solid rgba(50,107,47,.15);border-radius:8px;font-size:14px;outline:none;font-family:'DM Sans'}
        .inp:focus{border-color:${GL}}
      `}</style>

      {/* Header */}
      <div style={{ position:"sticky", top:0, zIndex:50, background:"rgba(250,250,247,.97)", borderBottom:"1px solid rgba(50,107,47,.06)", padding:"14px clamp(16px,4vw,48px)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:G, fontWeight:500 }}>← Back</button>
        <img src="/images/logo.png" alt="MuraCha" style={{ height:34, objectFit:"contain" }} />
        <div style={{ fontSize:13, fontWeight:700, color:G }}>${total.toFixed(2)}</div>
      </div>

      <div style={{ maxWidth:760, margin:"0 auto", padding:"40px clamp(16px,4vw,32px) 120px" }}>
        {/* Intro */}
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:G, marginBottom:10, fontWeight:600 }}>Custom Gift Box</p>
          <h1 className="f" style={{ fontSize:"clamp(30px,6vw,46px)", fontWeight:300, marginBottom:8 }}>Build Your Own Box</h1>
          <p style={{ fontSize:14, color:"#888" }}>Craft a personalized gift, step by step.</p>
        </div>

        {/* STEP 1 */}
        <Section num="1" title="Choose Your Package" sub="Select one packaging option (required)">
          <div style={{ display:"grid", gap:10 }}>
            {PACKAGES.map(p => (
              <div key={p.id} className={`opt ${pkg===p.id?"on":""}`} onClick={()=>setPkg(p.id)}>
                <span style={{ fontSize:14, fontWeight:500 }}>{p.name}</span>
                <span style={{ fontSize:14, fontWeight:700, color:G, whiteSpace:"nowrap" }}>${p.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* STEP 2 */}
        <Section num="2" title="Choose Your Ritual" sub="Pick any teas you'd like — or skip this step">
          <div style={{ display:"grid", gap:10 }}>
            {RITUALS.map(r => (
              <div key={r.id} className={`opt ${rituals.includes(r.id)?"on":""}`} onClick={()=>toggleRitual(r.id)}>
                <span style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ width:20, height:20, borderRadius:5, border:`1.5px solid ${rituals.includes(r.id)?G:"#ccc"}`, background:rituals.includes(r.id)?G:"#fff", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, flexShrink:0 }}>{rituals.includes(r.id)?"✓":""}</span>
                  <span style={{ fontSize:14, fontWeight:500 }}>{r.name}</span>
                </span>
                <span style={{ fontSize:14, fontWeight:700, color:G, whiteSpace:"nowrap" }}>${r.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* STEP 3 */}
        <Section num="3" title="Choose Your Chocolate" sub="Sold by weight — minimum 200g per item. Skip if you don't want chocolate.">
          <div style={{ display:"grid", gap:12 }}>
            {CHOCOLATES.map(c => {
              const active = chocs[c.id];
              const grams = active?.grams || 0;
              return (
                <div key={c.id} style={{ border:`1.5px solid ${active?G:"rgba(50,107,47,.12)"}`, borderRadius:12, padding:"14px 18px", background:active?"rgba(50,107,47,.04)":"#fff", transition:"all .25s" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, marginBottom: active?12:0 }}>
                    <div>
                      <p style={{ fontSize:14, fontWeight:500 }}>{c.name}</p>
                      <p style={{ fontSize:12, color:"#8a9a88" }}>${c.pricePerKg}/kg</p>
                    </div>
                    {!active ? (
                      <button onClick={()=>setChoc(c.id, 200)} style={{ padding:"8px 16px", background:G, color:"#fff", border:"none", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>Add</button>
                    ) : (
                      <span style={{ fontSize:14, fontWeight:700, color:G, whiteSpace:"nowrap" }}>${(c.pricePerKg*(grams/1000)).toFixed(2)}</span>
                    )}
                  </div>
                  {active && (
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom: c.custom?12:0 }}>
                        <span style={{ fontSize:12, color:"#666" }}>Weight:</span>
                        <button className="qbtn" onClick={()=>setChoc(c.id, Math.max(200, grams-100))}>−</button>
                        <span style={{ fontSize:14, fontWeight:600, minWidth:60, textAlign:"center" }}>{grams}g</span>
                        <button className="qbtn" onClick={()=>setChoc(c.id, grams+100)}>+</button>
                        <button onClick={()=>setChoc(c.id, 0)} style={{ marginLeft:"auto", background:"none", border:"none", color:"#c9857a", fontSize:12, fontWeight:600, cursor:"pointer" }}>Remove</button>
                      </div>
                      {c.custom && (
                        <input className="inp" placeholder="Type the flavors you'd like to mix..." value={active.flavors||""} onChange={e=>setChoc(c.id, grams, e.target.value)} style={{ fontSize:13 }} />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* STEP 4 — Teaware coming soon */}
        <Section num="4" title="Choose Your Teaware">
          <div style={{ border:"1.5px dashed rgba(50,107,47,.2)", borderRadius:12, padding:"32px 20px", textAlign:"center", background:"rgba(50,107,47,.02)" }}>
            <p style={{ fontSize:22, marginBottom:6 }}>🫖</p>
            <p className="f" style={{ fontSize:20, color:G }}>Coming Soon</p>
          </div>
        </Section>

        {/* STEP 5 — Message */}
        <Section num="5" title="Personalize Your Message" sub="Write a message and we'll print it for your box">
          <textarea className="inp" rows={3} placeholder="Your custom message (we'll print this)..." value={message} onChange={e=>setMessage(e.target.value)} style={{ resize:"vertical" }} />
        </Section>

        {/* STEP 6 — Special requests */}
        <Section num="6" title="Any Special Requests?" sub="This will be reviewed by the shop and confirmed with you via WhatsApp">
          <textarea className="inp" rows={3} placeholder="Anything else you'd like? (optional)" value={special} onChange={e=>setSpecial(e.target.value)} style={{ resize:"vertical" }} />
        </Section>

        {/* Your details */}
        <Section num="✓" title="Your Details">
          <div style={{ display:"grid", gap:12 }}>
            <input className="inp" placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="inp" placeholder="Phone Number *" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            <input className="inp" placeholder="Delivery Address *" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
          </div>
        </Section>
      </div>

      {/* Sticky bottom bar */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1px solid rgba(50,107,47,.1)", padding:"14px clamp(16px,4vw,48px)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, boxShadow:"0 -4px 20px rgba(0,0,0,.05)", zIndex:60 }}>
        <div>
          <p style={{ fontSize:11, color:"#888", textTransform:"uppercase", letterSpacing:1 }}>Total</p>
          <p className="f" style={{ fontSize:26, fontWeight:700, color:G, lineHeight:1 }}>${total.toFixed(2)}</p>
        </div>
        <button onClick={sendWA} disabled={!canSend} style={{ flex:1, maxWidth:340, padding:"16px", background:canSend?G:"#ccc", color:"#fff", border:"none", borderRadius:10, fontSize:13, fontWeight:600, letterSpacing:1, textTransform:"uppercase", cursor:canSend?"pointer":"not-allowed", transition:"background .3s" }}>
          {pkg ? "Send Order via WhatsApp →" : "Select a package first"}
        </button>
      </div>
    </div>
  );
}
