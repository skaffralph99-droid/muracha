'use client';
import { useState, useEffect, useRef } from "react";

const WA = "96171425250";
const DELIVERY_FEE = 4;
const FREE_SHIP_MIN = 50;
const G="#326b2f", GL="#5a9e4f", GX="#eaf2e8", GD="#1a3a18";
const P = [
  {id:"cacao-powder",name:"Cacao Powder",price:15,size:"200g",cat:"powders",desc:"Rich, unprocessed, unsweetened and deeply satisfying. Made of 100% premium cacao. High in antioxidants, boosts mood, great for a warm drink or desserts.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/FullSizeRender_e4bd0bf7-c5ae-4cd6-ba3b-0ce122dbfc49.jpg?v=1770908353"]},
  {id:"hojicha-classic",name:"Hojicha Tea — Classic",price:15,size:"30g",cat:"japanese",desc:"Roasted to perfection with umami-rich taste. Made of 100% first harvest Sencha tea, medium roasted. A great coffee alternative, smooth on stomach, rich in L-theanine, low in caffeine.",ben:["Boosts Metabolism","Low Caffeine","Heart Health","Calm Focus"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/FullSizeRender_2acf7464-448e-4798-b6c8-b6982bcc927a.jpg?v=1770921443","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9032.jpg?v=1770921443"]},
  {id:"hojicha-floral",name:"Hojicha Tea — Floral Harmony",price:18,size:"25g",cat:"japanese",desc:"Luxury blend of superior quality Hojicha. Made of 100% first harvest Tencha tea, light roasted. Low in caffeine, antioxidant-rich, controls blood sugar while still uplifting.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2205.jpg?v=1770919693"]},
  {id:"hojicha-powder",name:"Organic Hojicha Powder",price:22,size:"40g",cat:"powders",desc:"Nutty, caramel-like taste with all-day hydration. Made of 100% organic Bancha tea in powder form. Extremely low in caffeine — perfect for the whole family. Great for lattes and desserts.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2204.jpg?v=1770919462"]},
  {id:"lemon-balm",name:"Organic Lemon Balm Tea",price:8,size:"Glass Jar",cat:"japanese",desc:"Known as مليسة (Melissa). Herbal tea that promotes relaxation, reduces stress, and eases PMS symptoms. Comes in a glass jar with wooden spoon.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/BFF6BC9B-CC35-4E67-85FC-2522493380DB.jpg?v=1774715246"]},
  {id:"rose-puerh",name:"Rose Pu'erh Tea Bomb",price:6.5,size:"2 × 9g balls",cat:"chinese",desc:"Pu'erh tea with rose flower. Steep in boiling water to watch the tea ball bloom artistically. Each ball makes 4–5 cups.",ben:["Glowing Skin","Beauty","Pain Relief"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/3.jpg?v=1761370469","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM.jpg?v=1763463842"]},
  {id:"tangerine-puerh",name:"Tangerine Peel Pu'erh Tea Bomb",price:6.5,size:"2 × 9g balls",cat:"chinese",desc:"Pu'erh tea with tangerine peel. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.",ben:["Reduces Fat","Helps Stomach","Reduces Cough"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/2.jpg?v=1761370453","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_3.jpg?v=1763463821"]},
  {id:"jasmine-puerh",name:"Jasmine Pu'erh Tea Bomb",price:6.5,size:"2 × 9g balls",cat:"chinese",desc:"Pu'erh tea with jasmine flower. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.",ben:["Detox","Slimming","Fresh Breath","Mood Enhancer"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9038.jpg?v=1761757578","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_1.jpg?v=1763463836"]},
  {id:"chrysanthemum-big",name:"Chrysanthemum Pu'erh Tea Bomb",price:6.5,size:"2 × 9g balls",cat:"chinese",desc:"Pu'erh tea with white chrysanthemum flower. Steep in boiling water for an artistic blooming experience. Each ball makes 4–5 cups.",ben:["Anti-bacterial","Good for Eyes & Liver","Reduces Swelling"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/1.jpg?v=1761370435","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/WhatsApp_Image_2025-10-30_at_5.38.55_PM_2.jpg?v=1763463829"]},
  {id:"white-chrysanthemum",name:"White Chrysanthemum Tea Bomb Jar",price:10,size:"4 × 5g balls",cat:"chinese",desc:"White tea with chrysanthemum flower in a glass jar. Each ball makes 1–2 cups.",ben:["Anti-bacterial","Good for Eyes & Liver","Reduces Swelling"],img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2203.jpg?v=1770921274","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9036.jpg?v=1770921274"]},
  {id:"white-tangerine",name:"White Tangerine Peel Tea Bomb Jar",price:10,size:"4 × 5g balls",cat:"chinese",desc:"White tea with tangerine peel in a glass jar. Each ball makes 1–2 cups.",img:["https://cdn.shopify.com/s/files/1/0757/2799/5134/files/L6A2201.jpg?v=1770921245","https://cdn.shopify.com/s/files/1/0757/2799/5134/files/IMG-9037.jpg?v=1770921245"]},
];
const CATS={all:"All",japanese:"Japanese",chinese:"Tea Bombs",powders:"Powders"};
const defaultReviews=[
  {name:"Sarah M.",text:"The hojicha is incredible — smooth, calming, and the perfect coffee replacement. I'm obsessed!",stars:5},
  {name:"Rami K.",text:"The rose tea bombs are a whole experience. Watching them bloom is magical. Taste is amazing too.",stars:5},
  {name:"Nour A.",text:"Best tea I've ever had in Lebanon. The quality is unmatched and the packaging is beautiful.",stars:5},
  {name:"Maya H.",text:"Ordered the cacao powder and hojicha powder — both are top quality. Will definitely reorder!",stars:5},
  {name:"Ali S.",text:"My wife loved the chrysanthemum tea bombs as a gift. Beautiful presentation and great taste.",stars:5},
  {name:"Lara J.",text:"Finally a real tea brand in Lebanon! The lemon balm tea helps me relax every evening. Thank you MuraCha!",stars:4},
];

function useInView(t=0.1){const r=useRef(null);const[v,s]=useState(false);useEffect(()=>{const e=r.current;if(!e)return;const o=new IntersectionObserver(([en])=>{if(en.isIntersecting){s(true);o.unobserve(e)}},{threshold:t});o.observe(e);return()=>o.disconnect()},[t]);return[r,v]}
function R({children,delay=0,d="up",style={}}){const[r,v]=useInView();const t={up:"translateY(40px)",scale:"scale(0.93)",left:"translateX(40px)",right:"translateX(-40px)"};return(<div ref={r} style={{...style,opacity:v?1:0,transform:v?"translate(0) scale(1)":t[d],transition:`all .7s cubic-bezier(.16,1,.3,1) ${delay}s`}}>{children}</div>)}

export default function App(){
  const[pg,setPg]=useState("home");
  const[cart,setCart]=useState([]);
  const[sel,setSel]=useState(null);
  const[cat,setCat]=useState("all");
  const[cartOpen,setCartOpen]=useState(false);
  const[sY,setSY]=useState(0);
  const[ii,setII]=useState(0);
  const[form,setForm]=useState({name:"",phone:"",address:"",notes:""});
  const[toast,setToast]=useState(null);
  const[trans,setTrans]=useState(false);
  const[ri,setRI]=useState(0);
  const[heroSlide,setHeroSlide]=useState(0);
  const[userRevs,setUserRevs]=useState([]);
  const[revForm,setRevForm]=useState({name:"",text:"",stars:5});
  const[revOpen,setRevOpen]=useState(false);
  const[revSubmitted,setRevSubmitted]=useState(false);
  const allRevs=[...defaultReviews,...userRevs];

  useEffect(()=>{try{const s=localStorage.getItem('muracha_reviews');if(s)setUserRevs(JSON.parse(s))}catch(e){}},[]);
  const submitReview=()=>{if(!revForm.name||!revForm.text)return;const nr={...revForm,date:new Date().toLocaleDateString()};const updated=[...userRevs,nr];setUserRevs(updated);try{localStorage.setItem('muracha_reviews',JSON.stringify(updated))}catch(e){}setRevForm({name:"",text:"",stars:5});setRevSubmitted(true);setTimeout(()=>setRevSubmitted(false),3000)};

  useEffect(()=>{const h=()=>setSY(window.scrollY);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h)},[]);
  useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(null),2500);return()=>clearTimeout(t)}},[toast]);
  useEffect(()=>{const t=setInterval(()=>setRI(p=>(p+1)%allRevs.length),4000);return()=>clearInterval(t)},[allRevs.length]);
  useEffect(()=>{const t=setInterval(()=>setHeroSlide(p=>(p+1)%5),5000);return()=>clearInterval(t)},[]);

  const go=(p)=>{setTrans(true);setTimeout(()=>{setPg(p);setSel(null);window.scrollTo({top:0,behavior:"instant"});setTimeout(()=>setTrans(false),50)},250)};
  const add=(p)=>{setCart(prev=>{const ex=prev.find(i=>i.id===p.id);return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}]});setToast(p.name)};
  const rm=id=>setCart(p=>p.filter(i=>i.id!==id));
  const uq=(id,d)=>setCart(p=>p.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const tot=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const delivery=tot>=FREE_SHIP_MIN?0:DELIVERY_FEE;
  const grandTotal=tot+delivery;
  const cnt=cart.reduce((s,i)=>s+i.qty,0);
  const fil=cat==="all"?P:P.filter(p=>p.cat===cat);

  const sendWA=()=>{const items=cart.map(i=>`• ${i.name} × ${i.qty} — $${(i.price*i.qty).toFixed(2)}`).join("\n");const delMsg=delivery>0?`\n*Delivery:* $${delivery.toFixed(2)}`:`\n✓ Free delivery`;const msg=`🍵 *New MuraCha Order*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Address:* ${form.address}\n${form.notes?`*Notes:* ${form.notes}\n`:""}\n*Items:*\n${items}\n\n*Subtotal:* $${tot.toFixed(2)}${delMsg}\n*Total: $${grandTotal.toFixed(2)}*`;window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank")};

  const prog=Math.min(sY/(typeof document!=='undefined'?Math.max(document.body.scrollHeight-window.innerHeight,1):1),1);

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#fafaf7",color:"#2a2a2a",minHeight:"100vh",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}a{text-decoration:none;color:inherit}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes modalIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
        @keyframes toastIn{0%{opacity:0;transform:translateX(-50%) translateY(30px) scale(.9)}100%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
        @keyframes toastOut{0%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-20px)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        .f{font-family:'Cormorant Garamond',serif}
        .card{transition:all .4s cubic-bezier(.16,1,.3,1);cursor:pointer;border-radius:14px;overflow:hidden;background:#fff;border:1px solid rgba(50,107,47,.06)}
        .card:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(50,107,47,.1)}
        .cimg{transition:transform .6s cubic-bezier(.16,1,.3,1)}.card:hover .cimg{transform:scale(1.07)}
        .card:hover .covr{opacity:1}
        .b{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;font-family:'DM Sans';font-weight:600;letter-spacing:1.5px;text-transform:uppercase;transition:all .3s cubic-bezier(.16,1,.3,1);border-radius:6px;position:relative;overflow:hidden}
        .b::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.08);transform:translateX(-100%);transition:transform .4s}.b:hover::after{transform:translateX(100%)}
        .bp{background:${G};color:#fff;padding:14px 30px;font-size:13px}.bp:hover{background:${GL};transform:translateY(-2px);box-shadow:0 8px 20px rgba(50,107,47,.2)}
        .bo{background:transparent;border:1.5px solid ${G};color:${G};padding:13px 28px;font-size:12px}.bo:hover{background:${G};color:#fff;transform:translateY(-2px)}
        .bs{padding:8px 16px;font-size:11px;border-radius:4px}
        .bw{background:#fff;color:${G};padding:14px 30px;font-size:13px}.bw:hover{background:rgba(255,255,255,.9);transform:translateY(-2px)}
        .cb{padding:9px 20px;border:1px solid rgba(50,107,47,.12);background:transparent;color:#5a6e58;font-family:'DM Sans';font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .3s;border-radius:30px;font-weight:500}
        .cb.on{background:${G};color:#fff;border-color:${G}}.cb:hover:not(.on){border-color:${GL};color:${GL}}
        .ov{position:fixed;inset:0;background:rgba(20,30,18,.55);z-index:200;backdrop-filter:blur(8px);animation:fadeIn .25s}
        .inp{width:100%;padding:14px 18px;border:1px solid rgba(50,107,47,.12);background:#fff;font-family:'DM Sans';font-size:14px;color:#2a2a2a;outline:none;border-radius:8px;transition:all .3s}
        .inp:focus{border-color:${GL};box-shadow:0 0 0 3px rgba(50,107,47,.06)}.inp::placeholder{color:#b0bfae}
        .tg{display:inline-block;padding:5px 14px;background:rgba(50,107,47,.06);color:${G};font-size:11px;border-radius:20px;font-weight:500;transition:all .3s}.tg:hover{background:rgba(50,107,47,.12)}
        @media(max-width:768px){.dk{display:none!important}.pg{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}.mp{width:100%!important;height:100%!important;inset:0!important;border-radius:0!important}.cp{width:100%!important}.hg{grid-template-columns:1fr!important}.bg{grid-template-columns:1fr 1fr!important}.rg{grid-template-columns:1fr!important}}
      `}</style>

      <div style={{position:"fixed",top:0,left:0,height:2,background:`linear-gradient(90deg,${G},${GL})`,width:`${prog*100}%`,zIndex:200,transition:"width .1s"}} />

      {toast&&<div style={{position:"fixed",bottom:32,left:"50%",transform:"translateX(-50%)",zIndex:999,background:G,color:"#fff",padding:"14px 32px",borderRadius:12,fontSize:13,fontWeight:500,animation:"toastIn .4s cubic-bezier(.16,1,.3,1), toastOut .4s ease 2s forwards",boxShadow:"0 12px 40px rgba(0,0,0,.15)",display:"flex",alignItems:"center",gap:10}}><span style={{background:GL,borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>✓</span>{toast} added</div>}

      <div style={{position:"fixed",inset:0,background:"#fafaf7",zIndex:150,pointerEvents:"none",opacity:trans?1:0,transition:"opacity .25s"}} />

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:64,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,48px)",background:"rgba(250,250,247,.94)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(50,107,47,.05)"}}>
        <div style={{display:"flex",alignItems:"center",gap:32}}>
          <span onClick={()=>go("home")} style={{cursor:"pointer"}}><img src="/images/logo.png" alt="MuraCha" style={{height:40,objectFit:"contain"}} /></span>
          <div className="dk" style={{display:"flex",gap:24}}>
            {[["home","Home"],["shop","Shop"],["about","About"]].map(([p,l])=>(
              <span key={p} onClick={()=>go(p)} style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontWeight:600,color:pg===p?G:"#888",transition:"color .3s"}}>{l}</span>
            ))}
          </div>
        </div>
        <button onClick={()=>setCartOpen(true)} style={{position:"relative",background:"none",border:"none",cursor:"pointer",padding:6}}>
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          {cnt>0&&<span style={{position:"absolute",top:-3,right:-3,background:G,color:"#fff",fontSize:9,fontWeight:700,width:17,height:17,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{cnt}</span>}
        </button>
      </nav>

      {/* CART */}
      {cartOpen&&<div className="ov" onClick={()=>setCartOpen(false)} />}
      {cartOpen&&(
        <div className="cp" style={{position:"fixed",right:0,top:0,bottom:0,width:400,background:"#fff",zIndex:202,boxShadow:"-8px 0 40px rgba(0,0,0,.06)",display:"flex",flexDirection:"column",animation:"slideRight .35s cubic-bezier(.16,1,.3,1)"}}>
          <div style={{padding:"24px 24px 16px",borderBottom:"1px solid rgba(50,107,47,.05)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h3 className="f" style={{fontSize:24,fontWeight:500}}>Cart ({cnt})</h3>
            <button onClick={()=>setCartOpen(false)} style={{background:"rgba(0,0,0,.03)",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          <div style={{flex:1,overflow:"auto",padding:20}}>
            {cart.length===0?<p style={{color:"#b0bfae",fontSize:14,textAlign:"center",marginTop:50}}>Your cart is empty</p>:
            cart.map((item,i)=>(
              <div key={item.id} style={{display:"flex",gap:14,marginBottom:18,paddingBottom:18,borderBottom:"1px solid rgba(50,107,47,.04)"}}>
                <img src={item.img[0]} alt="" style={{width:64,height:64,objectFit:"cover",borderRadius:10}} />
                <div style={{flex:1}}>
                  <p style={{fontSize:13,fontWeight:600,marginBottom:2}}>{item.name}</p>
                  <p style={{fontSize:11,color:"#8a9a88",marginBottom:6}}>{item.size}</p>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{display:"flex",alignItems:"center",border:"1px solid rgba(50,107,47,.1)",borderRadius:5}}>
                      <button onClick={()=>uq(item.id,-1)} style={{background:"none",border:"none",padding:"4px 10px",cursor:"pointer",fontSize:13}}>−</button>
                      <span style={{fontSize:12,fontWeight:600,minWidth:18,textAlign:"center"}}>{item.qty}</span>
                      <button onClick={()=>uq(item.id,1)} style={{background:"none",border:"none",padding:"4px 10px",cursor:"pointer",fontSize:13}}>+</button>
                    </div>
                    <span style={{fontSize:13,fontWeight:700,color:G}}>${(item.price*item.qty).toFixed(2)}</span>
                    <button onClick={()=>rm(item.id)} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",fontSize:10,color:"#c9857a",fontWeight:600}}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cart.length>0&&(
            <div style={{padding:20,borderTop:"1px solid rgba(50,107,47,.05)",background:GX}}>
              {tot>=FREE_SHIP_MIN?<p style={{fontSize:12,color:G,marginBottom:10,fontWeight:600}}>✓ Free delivery!</p>:
              <div style={{marginBottom:10}}>
                <p style={{fontSize:11,color:"#5a6e58",marginBottom:5}}>${(FREE_SHIP_MIN-tot).toFixed(2)} away from free delivery</p>
                <div style={{height:3,background:"rgba(50,107,47,.08)",borderRadius:2}}><div style={{height:"100%",background:`linear-gradient(90deg,${G},${GL})`,borderRadius:2,width:`${Math.min(tot/FREE_SHIP_MIN*100,100)}%`,transition:"width .5s"}} /></div>
              </div>}
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13,color:"#5a6e58"}}>
                <span>Subtotal</span><span>${tot.toFixed(2)}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,fontSize:13,color:delivery===0?G:"#5a6e58"}}>
                <span>Delivery</span><span>{delivery===0?"Free":`$${delivery.toFixed(2)}`}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,borderTop:"1px solid rgba(50,107,47,.08)",paddingTop:10}}>
                <span className="f" style={{fontSize:20}}>Total</span>
                <span className="f" style={{fontSize:20,fontWeight:700}}>${grandTotal.toFixed(2)}</span>
              </div>
              <button className="b bp" style={{width:"100%"}} onClick={()=>{setCartOpen(false);go("checkout")}}>Checkout via WhatsApp</button>
            </div>
          )}
        </div>
      )}

      {/* MODAL */}
      {sel&&(<>
        <div className="ov" onClick={()=>setSel(null)} />
        <div className="mp" style={{position:"fixed",zIndex:201,background:"#fff",top:"4%",left:"4%",right:"4%",bottom:"4%",borderRadius:18,display:"flex",flexDirection:"column",overflow:"hidden",animation:"modalIn .4s cubic-bezier(.16,1,.3,1)"}}>
          <button onClick={()=>setSel(null)} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,.9)",backdropFilter:"blur(8px)",border:"none",borderRadius:"50%",width:38,height:38,cursor:"pointer",fontSize:16,zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>✕</button>
          <div style={{display:"flex",flex:1,overflow:"hidden",flexWrap:"wrap"}}>
            <div style={{flex:"1 1 55%",minWidth:280,background:GX,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28}}>
              <img src={sel.img[ii]||sel.img[0]} alt={sel.name} style={{maxWidth:"85%",maxHeight:"55vh",objectFit:"contain",borderRadius:12,transition:"all .4s"}} />
              {sel.img.length>1&&<div style={{display:"flex",gap:8,marginTop:16}}>{sel.img.map((im,i)=><img key={i} src={im} alt="" onClick={()=>setII(i)} style={{width:56,height:56,objectFit:"cover",borderRadius:8,cursor:"pointer",border:i===ii?`2px solid ${G}`:"2px solid transparent",opacity:i===ii?1:.4,transition:"all .3s"}} />)}</div>}
            </div>
            <div style={{flex:"1 1 40%",minWidth:280,padding:"40px 32px",overflow:"auto"}}>
              <p style={{fontSize:10,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:8,fontWeight:600}}>{CATS[sel.cat]}</p>
              <h2 className="f" style={{fontSize:32,fontWeight:400,marginBottom:6,lineHeight:1.2}}>{sel.name}</h2>
              <p style={{fontSize:12,color:"#8a9a88",marginBottom:16}}>{sel.size}</p>
              <p className="f" style={{fontSize:28,fontWeight:600,color:G,marginBottom:24}}>${sel.price.toFixed(2)}</p>
              <p style={{fontSize:14,lineHeight:1.8,color:"#4a4a4a",marginBottom:20}}>{sel.desc}</p>
              {sel.ben&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:24}}>{sel.ben.map(b=><span key={b} className="tg">{b}</span>)}</div>}
              <button className="b bp" style={{width:"100%"}} onClick={()=>{add(sel);setSel(null)}}>Add to Cart</button>
            </div>
          </div>
        </div>
      </>)}

      <div style={{opacity:trans?0:1,transform:trans?"translateY(8px)":"translateY(0)",transition:"all .25s"}}>

      {pg==="home"&&<>
        {/* HERO SLIDESHOW */}
        <section style={{position:"relative",height:"100vh",minHeight:580,maxHeight:900,overflow:"hidden",paddingTop:64,background:GD}}>
          {/* Slides */}
          {[
            {img:P[1].img[0],label:"Japanese Collection",title:"Hojicha Tea",sub:"Roasted to perfection — a calming coffee alternative",price:"From $15",bg:"linear-gradient(135deg, #1a3a18, #2a5426)"},
            {img:P[5].img[0],label:"Chinese Collection",title:"Blooming Tea Bombs",sub:"Hand-rolled tea balls that bloom into beautiful flowers",price:"From $6.50",bg:"linear-gradient(135deg, #2a1a18, #4a3528)"},
            {img:P[0].img[0],label:"Powders",title:"Cacao Powder",sub:"Rich, unprocessed, 100% premium cacao for warm drinks & desserts",price:"$15",bg:"linear-gradient(135deg, #2a2018, #3d2b1f)"},
            {img:P[3].img[0],label:"Organic",title:"Hojicha Powder",sub:"Stone-ground organic powder for lattes, baking, and beyond",price:"$22",bg:"linear-gradient(135deg, #1a3018, #2a4a20)"},
            {img:P[7].img[0],label:"Tea Bombs",title:"Jasmine Pu'erh",sub:"Detox, slimming, fresh breath — each ball makes 4-5 cups",price:"$6.50",bg:"linear-gradient(135deg, #1a2a18, #2a3a28)"},
          ].map((slide,i)=>(
            <div key={i} style={{position:i===0?"relative":"absolute",inset:0,opacity:heroSlide===i?1:0,transition:"opacity 1s ease",zIndex:heroSlide===i?2:1,background:slide.bg}}>
              <div style={{maxWidth:1200,margin:"0 auto",height:"100%",display:"flex",alignItems:"center",padding:"0 clamp(24px,5vw,80px)",gap:"clamp(20px,4vw,60px)"}}>
                {/* Text side */}
                <div style={{flex:"1 1 50%",zIndex:3}}>
                  <div style={{display:"inline-block",background:"rgba(255,255,255,.1)",backdropFilter:"blur(8px)",borderRadius:20,padding:"5px 16px",marginBottom:18,opacity:heroSlide===i?1:0,transform:heroSlide===i?"translateX(0)":"translateX(-30px)",transition:"all .7s ease .2s"}}>
                    <p style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,.8)",fontWeight:500}}>{slide.label}</p>
                  </div>
                  <h1 className="f" style={{fontSize:"clamp(38px,6vw,68px)",fontWeight:300,color:"#fff",lineHeight:1.05,marginBottom:14,opacity:heroSlide===i?1:0,transform:heroSlide===i?"translateX(0)":"translateX(-30px)",transition:"all .7s ease .3s"}}>
                    {slide.title}
                  </h1>
                  <p style={{fontSize:15,color:"rgba(255,255,255,.55)",lineHeight:1.7,marginBottom:10,maxWidth:380,opacity:heroSlide===i?1:0,transform:heroSlide===i?"translateX(0)":"translateX(-30px)",transition:"all .7s ease .4s"}}>
                    {slide.sub}
                  </p>
                  <p className="f" style={{fontSize:30,fontWeight:600,color:"#fff",marginBottom:28,opacity:heroSlide===i?1:0,transform:heroSlide===i?"translateX(0)":"translateX(-20px)",transition:"all .7s ease .45s"}}>
                    {slide.price}
                  </p>
                  <div style={{display:"flex",gap:12,opacity:heroSlide===i?1:0,transform:heroSlide===i?"translateX(0)":"translateX(-20px)",transition:"all .7s ease .5s"}}>
                    <button className="b bw" onClick={()=>go("shop")}>Shop Now</button>
                    <button className="b" style={{background:"transparent",border:"1.5px solid rgba(255,255,255,.3)",color:"#fff",padding:"13px 28px",fontSize:12,letterSpacing:1.5}} onClick={()=>go("about")} onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)";e.currentTarget.style.borderColor="rgba(255,255,255,.6)"}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,.3)"}}>Our Story</button>
                  </div>
                </div>
                {/* Product image - full, not cropped */}
                <div style={{flex:"1 1 45%",display:"flex",alignItems:"center",justifyContent:"center",height:"100%",position:"relative",padding:"40px 0"}}>
                  <div style={{position:"absolute",width:"60%",height:"60%",borderRadius:"50%",background:"rgba(255,255,255,.05)",filter:"blur(60px)"}} />
                  <img src={slide.img} alt={slide.title} style={{height:"clamp(300px,55vh,480px)",width:"auto",maxWidth:"100%",objectFit:"contain",position:"relative",zIndex:2,filter:"drop-shadow(0 20px 60px rgba(0,0,0,.4))",opacity:heroSlide===i?1:0,transform:heroSlide===i?"scale(1) translateY(0)":"scale(.88) translateY(30px)",transition:"all .8s cubic-bezier(.16,1,.3,1) .2s"}} />
                </div>
              </div>
            </div>
          ))}
          {/* Dots */}
          <div style={{position:"absolute",bottom:60,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:10}}>
            {[0,1,2,3,4].map(i=>(
              <button key={i} onClick={()=>setHeroSlide(i)} style={{width:heroSlide===i?28:10,height:10,borderRadius:5,background:heroSlide===i?"#fff":"rgba(255,255,255,.25)",border:"none",cursor:"pointer",transition:"all .4s cubic-bezier(.16,1,.3,1)"}} />
            ))}
          </div>
          {/* Arrows */}
          <button onClick={()=>setHeroSlide(p=>(p+4)%5)} className="dk" style={{position:"absolute",left:20,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.08)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,.12)",borderRadius:"50%",width:46,height:46,cursor:"pointer",color:"#fff",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,transition:"all .3s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.18)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.08)"}>‹</button>
          <button onClick={()=>setHeroSlide(p=>(p+1)%5)} className="dk" style={{position:"absolute",right:20,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.08)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,.12)",borderRadius:"50%",width:46,height:46,cursor:"pointer",color:"#fff",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,transition:"all .3s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.18)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.08)"}>›</button>
          {/* Trust bar */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,.3)",backdropFilter:"blur(12px)",padding:"12px clamp(16px,4vw,48px)",zIndex:10}}>
            <div style={{maxWidth:800,margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:12}}>
              {[["🌿","100% Natural"],["✨","Premium Quality"],["🚚","$4 Delivery"],["💚","Free above $50"]].map(([ic,tx])=>(
                <div key={tx} style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontSize:14}}>{ic}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.75)",fontWeight:500}}>{tx}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div style={{background:G,color:"#fff",padding:"16px clamp(16px,4vw,48px)"}}>
          <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:16}}>
            {[["11+","Products"],["100%","Natural"],["$4","Delivery (Free 50$+)"],["💬","Order via WhatsApp"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <p className="f" style={{fontSize:22,fontWeight:700}}>{n}</p>
                <p style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",opacity:.7}}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BESTSELLERS */}
        <section style={{padding:"70px clamp(16px,4vw,48px)",maxWidth:1200,margin:"0 auto"}}>
          <R><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:16}}>
            <div>
              <p style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:8,fontWeight:600}}>Featured</p>
              <h2 className="f" style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:300}}>Our Bestsellers</h2>
            </div>
            <button className="b bo" onClick={()=>go("shop")}>View All →</button>
          </div></R>
          <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20}}>
            {P.slice(0,4).map((p,i)=>(
              <R key={p.id} delay={i*.08}>
                <div className="card" onClick={()=>{setSel(p);setII(0)}}>
                  <div style={{height:220,overflow:"hidden",background:"#f5f3ef",position:"relative"}}>
                    <img className="cimg" src={p.img[0]} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                    <div className="covr" style={{position:"absolute",inset:0,background:"rgba(50,107,47,.04)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{background:"#fff",padding:"7px 18px",borderRadius:18,fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase",boxShadow:"0 4px 12px rgba(0,0,0,.06)"}}>Quick View</span>
                    </div>
                  </div>
                  <div style={{padding:"16px 18px 20px"}}>
                    <p style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:5,fontWeight:600}}>{CATS[p.cat]}</p>
                    <h3 className="f" style={{fontSize:17,fontWeight:500,marginBottom:4}}>{p.name}</h3>
                    <p style={{fontSize:11,color:"#8a9a88",marginBottom:10}}>{p.size}</p>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:16,fontWeight:700,color:G}}>${p.price.toFixed(2)}</span>
                      <button className="b bs bo" onClick={e=>{e.stopPropagation();add(p)}}>Add</button>
                    </div>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </section>

        {/* BENEFITS */}
        <section style={{padding:"60px clamp(16px,4vw,48px)",background:GX}}>
          <div className="bg" style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {[["🍵","Premium Quality","First-harvest teas sourced directly from Japanese and Chinese farms"],["🌸","Artisan Crafted","Hand-rolled tea bombs that bloom into beautiful flowers"],["💚","Health Benefits","Rich in antioxidants, L-theanine, and natural minerals"],["📦","$4 Delivery","Just $4 delivery anywhere in Lebanon — free on orders above $50!"]].map(([ic,t,d],i)=>(
              <R key={t} delay={i*.08} d="scale">
                <div style={{background:"#fff",borderRadius:14,padding:"28px 20px",textAlign:"center",border:"1px solid rgba(50,107,47,.04)",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(50,107,47,.08)"}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
                  <div style={{fontSize:28,marginBottom:12}}>{ic}</div>
                  <h4 style={{fontSize:14,fontWeight:600,marginBottom:6,color:"#2a2a2a"}}>{t}</h4>
                  <p style={{fontSize:12,color:"#6a7a68",lineHeight:1.6}}>{d}</p>
                </div>
              </R>
            ))}
          </div>
        </section>

        {/* TEA BOMBS SHOWCASE */}
        <section style={{padding:"70px clamp(16px,4vw,48px)",maxWidth:1200,margin:"0 auto"}}>
          <R><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:16}}>
            <div>
              <p style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:8,fontWeight:600}}>Chinese Collection</p>
              <h2 className="f" style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:300}}>Blooming Tea Bombs</h2>
              <p style={{fontSize:14,color:"#888",marginTop:8,maxWidth:400}}>Hand-rolled tea balls that bloom in hot water. Each ball makes 4–5 cups of pure wellness.</p>
            </div>
            <button className="b bo" onClick={()=>{go("shop");setCat("chinese")}}>View All →</button>
          </div></R>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:16}} className="pg">
            {P.filter(p=>p.cat==="chinese").map((p,i)=>(
              <R key={p.id} delay={i*.06}>
                <div onClick={()=>{setSel(p);setII(0)}} style={{cursor:"pointer",textAlign:"center",transition:"transform .3s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>
                  <div style={{width:"100%",aspectRatio:"1",borderRadius:14,overflow:"hidden",marginBottom:12,border:"1px solid rgba(50,107,47,.06)"}}>
                    <img src={p.img[0]} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"} onMouseLeave={e=>e.currentTarget.style.transform=""} />
                  </div>
                  <p style={{fontSize:13,fontWeight:500,marginBottom:4,lineHeight:1.3}}>{p.name}</p>
                  <p style={{fontSize:15,fontWeight:700,color:G}}>${p.price.toFixed(2)}</p>
                  <button className="b bs bo" style={{marginTop:8}} onClick={e=>{e.stopPropagation();add(p)}}>Add to Cart</button>
                </div>
              </R>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section style={{padding:"60px clamp(16px,4vw,48px)",background:GD,color:"#fff",overflow:"hidden"}}>
          <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
            <R><p style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:GL,marginBottom:10,fontWeight:600}}>What Customers Say</p>
            <h2 className="f" style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:300,marginBottom:8}}>Loved Across Lebanon</h2>
            <p style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:32}}>{allRevs.length} reviews</p></R>
            <div style={{position:"relative",minHeight:140}}>
              {allRevs.map((r,i)=>(
                <div key={i} style={{position:i===0?"relative":"absolute",top:0,left:0,right:0,opacity:ri===i?1:0,transform:ri===i?"translateY(0)":"translateY(16px)",transition:"all .6s cubic-bezier(.16,1,.3,1)",pointerEvents:ri===i?"auto":"none"}}>
                  <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:14}}>
                    {[...Array(5)].map((_,j)=><span key={j} style={{color:j<r.stars?"#f0c040":"rgba(255,255,255,.15)",fontSize:18}}>★</span>)}
                  </div>
                  <p className="f" style={{fontSize:22,fontStyle:"italic",lineHeight:1.6,marginBottom:16,fontWeight:300,opacity:.9}}>&ldquo;{r.text}&rdquo;</p>
                  <p style={{fontSize:13,fontWeight:600,color:GL}}>— {r.name}{r.date?` · ${r.date}`:""}</p>
                </div>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:28}}>
              {allRevs.map((_,i)=><button key={i} onClick={()=>setRI(i)} style={{width:ri===i?20:7,height:7,borderRadius:4,background:ri===i?GL:"rgba(255,255,255,.15)",border:"none",cursor:"pointer",transition:"all .3s"}} />)}
            </div>

            {/* WRITE A REVIEW */}
            <div style={{marginTop:36}}>
              {!revOpen?(
                <button onClick={()=>setRevOpen(true)} className="b" style={{background:"rgba(255,255,255,.1)",color:"#fff",padding:"12px 28px",fontSize:12,letterSpacing:1.5,border:"1px solid rgba(255,255,255,.15)"}}>Write a Review ✍️</button>
              ):(
                <div style={{background:"rgba(255,255,255,.06)",borderRadius:14,padding:24,maxWidth:440,margin:"0 auto",textAlign:"left",border:"1px solid rgba(255,255,255,.08)"}}>
                  {revSubmitted?(
                    <div style={{textAlign:"center",padding:"20px 0"}}>
                      <p style={{fontSize:24,marginBottom:8}}>🎉</p>
                      <p className="f" style={{fontSize:20}}>Thank you for your review!</p>
                    </div>
                  ):(<>
                    <p style={{fontSize:14,fontWeight:600,marginBottom:16}}>Share your experience</p>
                    <div style={{marginBottom:14}}>
                      <p style={{fontSize:11,marginBottom:6,opacity:.6}}>Rating</p>
                      <div style={{display:"flex",gap:4}}>
                        {[1,2,3,4,5].map(s=>(
                          <button key={s} onClick={()=>setRevForm({...revForm,stars:s})} style={{background:"none",border:"none",cursor:"pointer",fontSize:24,color:s<=revForm.stars?"#f0c040":"rgba(255,255,255,.15)",transition:"transform .2s"}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"} onMouseLeave={e=>e.currentTarget.style.transform=""}>★</button>
                        ))}
                      </div>
                    </div>
                    <input value={revForm.name} onChange={e=>setRevForm({...revForm,name:e.target.value})} placeholder="Your name" style={{width:"100%",padding:"10px 14px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:6,color:"#fff",fontSize:13,marginBottom:10,outline:"none",fontFamily:"'DM Sans'"}} />
                    <textarea value={revForm.text} onChange={e=>setRevForm({...revForm,text:e.target.value})} placeholder="What did you love about our tea?" rows={3} style={{width:"100%",padding:"10px 14px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:6,color:"#fff",fontSize:13,marginBottom:14,outline:"none",resize:"vertical",fontFamily:"'DM Sans'"}} />
                    <div style={{display:"flex",gap:10}}>
                      <button onClick={submitReview} className="b" style={{background:GL,color:"#fff",padding:"10px 24px",fontSize:12,flex:1}} disabled={!revForm.name||!revForm.text}>Submit Review</button>
                      <button onClick={()=>setRevOpen(false)} className="b" style={{background:"rgba(255,255,255,.06)",color:"#fff",padding:"10px 16px",fontSize:12,border:"1px solid rgba(255,255,255,.1)"}}>Cancel</button>
                    </div>
                  </>)}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* INSTAGRAM CTA */}
        <section style={{padding:"60px clamp(16px,4vw,48px)"}}>
          <R><div style={{maxWidth:800,margin:"0 auto",background:`linear-gradient(135deg, ${GX}, #f5f2ec)`,borderRadius:20,padding:"48px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <div>
              <h3 className="f" style={{fontSize:28,fontWeight:400,marginBottom:8}}>Follow Us on Instagram</h3>
              <p style={{fontSize:14,color:"#666",maxWidth:360}}>See our latest products, tea rituals, and behind-the-scenes content. Join 1K+ tea lovers!</p>
            </div>
            <a href="https://www.instagram.com/muracha.lb" target="_blank" rel="noopener noreferrer" className="b bp" style={{gap:8}}>
              <span style={{fontSize:18}}>📸</span> @muracha.lb
            </a>
          </div></R>
        </section>

        {/* NEWSLETTER */}
        <section style={{padding:"50px clamp(16px,4vw,48px) 70px"}}>
          <R><div style={{maxWidth:500,margin:"0 auto",textAlign:"center"}}>
            <h3 className="f" style={{fontSize:28,fontWeight:300,marginBottom:8}}>Stay in the Loop</h3>
            <p style={{fontSize:13,color:"#888",marginBottom:24}}>Be the first to know about new arrivals and exclusive offers.</p>
            <div style={{display:"flex",gap:0}}>
              <input className="inp" placeholder="Your email" style={{borderRadius:"8px 0 0 8px",borderRight:"none"}} />
              <button className="b bp" style={{borderRadius:"0 8px 8px 0",whiteSpace:"nowrap",padding:"14px 24px"}}>Subscribe</button>
            </div>
          </div></R>
        </section>
      </>}

      {pg==="shop"&&(
        <section style={{paddingTop:90,padding:"90px clamp(16px,4vw,48px) 60px",maxWidth:1200,margin:"0 auto"}}>
          <R><div style={{textAlign:"center",marginBottom:36}}>
            <h1 className="f" style={{fontSize:"clamp(30px,4vw,44px)",fontWeight:300,marginBottom:20}}>Our Collection</h1>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              {Object.entries(CATS).map(([k,v])=><button key={k} className={`cb ${cat===k?"on":""}`} onClick={()=>setCat(k)}>{v}</button>)}
            </div>
          </div></R>
          <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20}}>
            {fil.map((p,i)=>(
              <R key={p.id} delay={i*.06}>
                <div className="card" onClick={()=>{setSel(p);setII(0)}}>
                  <div style={{height:220,overflow:"hidden",background:"#f5f3ef",position:"relative"}}>
                    <img className="cimg" src={p.img[0]} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                    <div className="covr" style={{position:"absolute",inset:0,background:"rgba(50,107,47,.03)",opacity:0,transition:"opacity .3s",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{background:"#fff",padding:"7px 18px",borderRadius:18,fontSize:11,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Quick View</span>
                    </div>
                  </div>
                  <div style={{padding:"16px 18px 20px"}}>
                    <p style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:5,fontWeight:600}}>{CATS[p.cat]}</p>
                    <h3 className="f" style={{fontSize:17,fontWeight:500,marginBottom:4}}>{p.name}</h3>
                    <p style={{fontSize:11,color:"#8a9a88",marginBottom:10}}>{p.size}</p>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:16,fontWeight:700,color:G}}>${p.price.toFixed(2)}</span>
                      <button className="b bs bo" onClick={e=>{e.stopPropagation();add(p)}}>Add</button>
                    </div>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </section>
      )}

      {pg==="about"&&(
        <section style={{paddingTop:90,padding:"90px clamp(16px,4vw,48px) 60px",maxWidth:700,margin:"0 auto"}}>
          <R><div style={{textAlign:"center"}}>
            <p style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:G,marginBottom:12,fontWeight:600}}>About Us</p>
            <h1 className="f" style={{fontSize:"clamp(32px,5vw,48px)",fontWeight:300,marginBottom:24}}>Our Story</h1>
            <div style={{width:50,height:1.5,background:GL,margin:"0 auto 30px"}} />
          </div></R>
          <R delay={0.1}><p style={{fontSize:16,color:"#4a4a4a",lineHeight:2.1,textAlign:"center",marginBottom:20}}>MuraCha brings the art of Japanese and Chinese tea culture to Lebanon. Every leaf is carefully selected from heritage farms, honoring generations of craft and the meditative ritual of tea.</p></R>
          <R delay={0.2}><p style={{fontSize:16,color:"#4a4a4a",lineHeight:2.1,textAlign:"center",marginBottom:20}}>From the roasted warmth of hojicha to the artistic bloom of Chinese tea bombs, each product is an invitation to slow down, breathe, and savor the moment.</p></R>
          <R delay={0.3}><p style={{fontSize:16,color:"#4a4a4a",lineHeight:2.1,textAlign:"center",marginBottom:32}}>Our Japanese collection features premium first-harvest teas — Sencha, Tencha, and organic Bancha. Our Chinese collection showcases hand-rolled Pu&apos;erh tea balls wrapped with flowers — each one a unique sensory experience.</p></R>
          <R delay={0.35}><div style={{display:"flex",justifyContent:"center",gap:14}}>
            <a href="https://www.instagram.com/muracha.lb" target="_blank" rel="noopener noreferrer" className="b bo">Instagram</a>
            <a href="https://www.tiktok.com/@muracha.lb" target="_blank" rel="noopener noreferrer" className="b bo">TikTok</a>
          </div></R>
        </section>
      )}

      {pg==="checkout"&&(
        <section style={{paddingTop:90,padding:"90px clamp(16px,4vw,48px) 60px",maxWidth:560,margin:"0 auto"}}>
          <R><h1 className="f" style={{fontSize:36,fontWeight:300,textAlign:"center",marginBottom:6}}>Checkout</h1>
          <p style={{textAlign:"center",fontSize:13,color:"#8a9a88",marginBottom:32}}>Complete your order via WhatsApp</p></R>
          <R delay={0.1}><div style={{background:"#fff",borderRadius:14,padding:24,marginBottom:20,border:"1px solid rgba(50,107,47,.05)"}}>
            <h3 className="f" style={{fontSize:18,marginBottom:14}}>Order Summary</h3>
            {cart.map(item=>(
              <div key={item.id} style={{display:"flex",justifyContent:"space-between",paddingBottom:10,marginBottom:10,borderBottom:"1px solid rgba(50,107,47,.03)",fontSize:13}}>
                <span>{item.name} × {item.qty}</span>
                <span style={{fontWeight:700}}>${(item.price*item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#5a6e58",paddingTop:8}}>
              <span>Subtotal</span><span>${tot.toFixed(2)}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:delivery===0?G:"#5a6e58",paddingTop:4}}>
              <span>Delivery</span><span>{delivery===0?"Free":"$"+delivery.toFixed(2)}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:18,paddingTop:10,borderTop:"1px solid rgba(50,107,47,.06)",marginTop:8}} className="f">
              <span style={{fontWeight:600}}>Total</span><span style={{fontWeight:700,color:G}}>${grandTotal.toFixed(2)}</span>
            </div>
            {tot>=FREE_SHIP_MIN&&<p style={{fontSize:11,color:G,marginTop:6,fontWeight:600}}>✓ Free delivery</p>}
          </div></R>
          <R delay={0.2}><div style={{display:"flex",flexDirection:"column",gap:12}}>
            <input className="inp" placeholder="Full Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="inp" placeholder="Phone Number *" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            <input className="inp" placeholder="Delivery Address *" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
            <textarea className="inp" placeholder="Notes (optional)" rows={3} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{resize:"vertical"}} />
            <button className="b bp" style={{width:"100%",padding:16,fontSize:13,animation:form.name&&form.phone&&form.address?"pulse 2s infinite":""}} onClick={sendWA} disabled={!form.name||!form.phone||!form.address}>Send Order via WhatsApp →</button>
            <p style={{fontSize:11,color:"#8a9a88",textAlign:"center"}}>You&apos;ll be redirected to WhatsApp with your order details</p>
          </div></R>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{borderTop:"1px solid rgba(50,107,47,.05)",padding:"48px clamp(16px,4vw,48px) 28px",background:"rgba(232,240,230,.15)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"space-between",gap:32}}>
          <div>
            <img src="/images/logo.png" alt="MuraCha" style={{height:46,objectFit:"contain",marginBottom:8}} />
            <p style={{fontSize:12,color:"#8a9a88"}}>Pure Japanese Essence & Chinese Art</p>
          </div>
          <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
            <div>
              <p style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:12,fontWeight:700}}>Navigate</p>
              {[["home","Home"],["shop","Shop"],["about","About"]].map(([p,l])=>(
                <p key={p} onClick={()=>go(p)} style={{fontSize:12,color:"#5a6e58",cursor:"pointer",marginBottom:6,transition:"color .3s"}} onMouseEnter={e=>e.currentTarget.style.color=G} onMouseLeave={e=>e.currentTarget.style.color="#5a6e58"}>{l}</p>
              ))}
            </div>
            <div>
              <p style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:12,fontWeight:700}}>Contact</p>
              <a href="mailto:muracha.lb@gmail.com" style={{fontSize:12,color:"#5a6e58",display:"block",marginBottom:6}}>muracha.lb@gmail.com</a>
              <p style={{fontSize:12,color:"#5a6e58"}}>Lebanon</p>
            </div>
            <div>
              <p style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:G,marginBottom:12,fontWeight:700}}>Follow</p>
              {[["https://www.instagram.com/muracha.lb","Instagram"],["https://www.tiktok.com/@muracha.lb","TikTok"],["https://www.facebook.com/share/1B6JkrCKFt/","Facebook"]].map(([u,l])=>(
                <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"#5a6e58",display:"block",marginBottom:6,transition:"color .3s"}} onMouseEnter={e=>e.currentTarget.style.color=G} onMouseLeave={e=>e.currentTarget.style.color="#5a6e58"}>{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"28px auto 0",paddingTop:18,borderTop:"1px solid rgba(50,107,47,.04)",textAlign:"center"}}>
          <p style={{fontSize:10,color:"#a0afa0"}}>© 2026 MuraCha. All rights reserved.</p>
        </div>
      </footer>

      </div>
    </div>
  );
}
