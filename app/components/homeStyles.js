// Homepage CSS, moved verbatim from the former public/goldenzen.html.
// Rendered inline by app/page.js so it unmounts on navigation and cannot leak into other routes.
export const homeCSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#FAF6EF;--ink2:#F3EDE2;--ink3:#EBE2D3;--gold:#A0681A;--gold2:#C8852A;--gold3:#7A5010;--cream:#2E1F0A;--cream2:#4A3318;--cream3:#6B5035;--muted:#9A8468;--muted2:#C4AD8E;--border:rgba(160,104,26,0.18);--border2:rgba(160,104,26,0.38);--r:4px}
html{scroll-behavior:smooth;background:var(--ink)}
body{font-family:'DM Sans',sans-serif;background:var(--ink);color:var(--cream);font-size:17px;line-height:1.65;overflow-x:hidden}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 2.5rem;background:rgba(250,246,239,0.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:padding .3s}
nav.scrolled{padding:.9rem 2.5rem;box-shadow:0 2px 20px rgba(160,104,26,0.08)}
.nav-logo{font-family:'Playfair Display',serif;font-size:20px;font-weight:400;color:var(--cream);text-decoration:none}
.nav-logo em{font-style:italic;color:var(--gold2)}
.nav-links{display:flex;align-items:center;gap:1.75rem;position:absolute;left:50%;transform:translateX(-50%)}
.nav-links a{font-size:16px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.nav-links a:hover{color:var(--cream2)}
.nav-right{display:flex;align-items:center;gap:1rem}
.lang-btn{display:flex;gap:3px;background:rgba(0,0,0,0.04);border:1px solid var(--border);border-radius:20px;padding:3px}
.lb{padding:3px 12px;border-radius:16px;font-size:15px;letter-spacing:.06em;cursor:pointer;border:none;background:transparent;color:var(--muted);font-family:'DM Sans',sans-serif;font-weight:500;transition:all .2s}
.lb.a{background:var(--gold);color:#FAF6EF}
.nav-cta{padding:8px 18px;border:1px solid var(--gold);border-radius:var(--r);font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);text-decoration:none;transition:all .2s;font-weight:500}
.nav-cta:hover{background:var(--gold);color:#FAF6EF}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px}
.hamburger span{display:block;width:22px;height:1px;background:var(--cream)}

/* ── HERO ── */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:8rem 1.5rem 5rem;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;will-change:transform}
.hero-bg img{width:100%;height:110%;object-fit:cover;object-position:center;display:block;transform:translateY(0);transition:transform .1s linear}
.hero-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(to bottom,rgba(250,246,239,0.65) 0%,rgba(250,246,239,0.82) 55%,rgba(250,246,239,0.97) 100%)}
.hero-lines{position:absolute;inset:0;opacity:.03;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(160,104,26,.6) 60px)}
.hero-content{position:relative;max-width:760px}
.hero-eyebrow{font-size:15px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold2);margin-bottom:1.5rem;font-weight:400;opacity:0;animation:fadeUp .8s .2s ease forwards}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(44px,7vw,80px);font-weight:400;line-height:1.08;color:var(--cream);margin-bottom:1.5rem;opacity:0;animation:fadeUp .9s .4s ease forwards}
.hero-title em{font-style:italic;color:var(--gold2)}
.hero-sub{font-size:17px;color:var(--muted);max-width:460px;margin:0 auto 2.5rem;line-height:1.8;font-weight:300;opacity:0;animation:fadeUp .9s .6s ease forwards}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;opacity:0;animation:fadeUp .9s .8s ease forwards}
.btn-prim{display:inline-block;padding:14px 32px;background:var(--gold);border:1px solid var(--gold);border-radius:var(--r);font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:#FAF6EF;text-decoration:none;font-weight:500;transition:all .25s}
.btn-prim:hover{background:var(--gold2);border-color:var(--gold2);transform:translateY(-1px);box-shadow:0 6px 20px rgba(160,104,26,0.25)}
.btn-sec{display:inline-block;padding:14px 32px;border:1px solid var(--border2);border-radius:var(--r);font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:var(--cream2);text-decoration:none;font-weight:400;transition:all .25s}
.btn-sec:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-1px)}
.hero-scroll{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--muted2);font-size:15px;letter-spacing:.15em;text-transform:uppercase;opacity:0;animation:fadeUp .8s 1.2s ease forwards}
.scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,var(--gold),transparent);animation:scrollPulse 2s 1.5s infinite}

/* ── PHOTO STRIP ── */
.photo-strip{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:3px;height:420px;overflow:hidden}
.photo-strip-item{overflow:hidden;position:relative}
.photo-strip-item img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease}
.photo-strip-item:hover img{transform:scale(1.05)}
.photo-strip-item::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(46,31,10,0.3),transparent 50%)}
.photo-strip-item.tall{grid-row:span 1}

/* ── STATS ── */
.stats{background:var(--ink2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:2.25rem 1.5rem}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:2rem;max-width:800px;margin:0 auto;text-align:center}
.stat-n{font-family:'Playfair Display',serif;font-size:32px;font-weight:400;color:var(--gold);line-height:1}
.stat-l{font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:6px}

/* ── SECTIONS ── */
section{padding:5rem 1.5rem}
.container{max-width:1060px;margin:0 auto}
.section-eyebrow{font-size:15px;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;font-weight:400}
.section-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,40px);font-weight:400;color:var(--cream);margin-bottom:1rem;line-height:1.2}
.section-title em{font-style:italic;color:var(--gold2)}
.section-sub{font-size:16px;color:var(--muted);max-width:520px;line-height:1.8;font-weight:300;margin-bottom:3rem}

/* ── SERVICES ── */
#services{background:var(--ink3)}
.svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1px;background:var(--border)}
.svc-card{background:var(--ink3);padding:2rem;transition:background .25s,transform .25s,box-shadow .25s;cursor:pointer;position:relative;overflow:hidden;text-decoration:none;display:flex;flex-direction:column;color:inherit}
.svc-img{width:calc(100% + 4rem);margin:auto -2rem -2rem;height:180px;object-fit:cover;display:block;opacity:.85;transition:opacity .3s}
.svc-card:hover .svc-img{opacity:1}
.svc-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold2),transparent);transform:scaleX(0);transition:transform .4s ease}
.svc-card:hover{background:var(--ink2);transform:translateY(-2px);box-shadow:0 8px 32px rgba(160,104,26,0.1)}
.svc-card:hover::before{transform:scaleX(1)}
.svc-icon{font-size:18px;color:var(--gold2);margin-bottom:1rem;opacity:.9}
.svc-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:400;color:var(--cream);margin-bottom:.5rem}
.svc-desc{font-size:15px;color:var(--muted);line-height:1.7;margin-bottom:1.25rem}
.svc-price{font-size:16px;color:var(--gold);font-weight:500;letter-spacing:.04em}
.svc-border{border:1px solid var(--border);background:var(--ink2)}
.svc-border:hover{background:var(--ink3);border-color:var(--border2)}
.svc-more{display:inline-block;font-size:15px;color:var(--gold);text-decoration:none;margin-bottom:1.25rem;font-weight:500}
.svc-more:hover{color:var(--gold2);text-decoration:underline}

/* ── SPA FEATURE IMAGE ── */
.spa-feature{position:relative;height:480px;overflow:hidden;margin:0}
.spa-feature img{width:100%;height:110%;object-fit:cover;object-position:center 30%;display:block}
.spa-feature::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(250,246,239,0.95) 30%,rgba(250,246,239,0.4) 70%,transparent)}
.spa-feature-text{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:center;padding:3rem 4rem;max-width:600px}
.spa-feature-text .section-sub{margin-bottom:2rem}

/* ── PROMOS ── */
#promos{background:var(--ink)}
.promo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.promo-card{border:1px solid var(--border);border-radius:var(--r);padding:1.75rem;background:var(--ink2);position:relative;overflow:hidden;transition:border-color .25s,box-shadow .25s,transform .25s}
.promo-card:hover{border-color:var(--border2);box-shadow:0 6px 24px rgba(160,104,26,0.12);transform:translateY(-2px)}
.promo-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold2),transparent)}
.promo-badge{display:inline-block;padding:3px 10px;background:rgba(160,104,26,0.1);border:1px solid rgba(160,104,26,0.25);border-radius:2px;font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;font-weight:500}
.promo-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:400;color:var(--cream);margin-bottom:.5rem}
.promo-desc{font-size:15px;color:var(--muted);line-height:1.7}
.promo-highlight{font-size:15px;color:var(--gold2);margin-top:.75rem;font-weight:400}

/* ── VOUCHERS ── */
#vouchers{background:var(--ink2);position:relative;overflow:hidden}
#vouchers::before{content:'';position:absolute;top:-100px;right:-100px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(200,133,42,0.08),transparent 70%)}
.voucher-inner{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
.voucher-card{border:1px solid var(--border2);border-radius:var(--r);padding:2rem;background:linear-gradient(135deg,rgba(200,133,42,0.07),transparent);box-shadow:0 2px 24px rgba(160,104,26,0.08);position:relative}
.voucher-card::after{content:'';position:absolute;inset:4px;border:1px solid rgba(160,104,26,0.1);border-radius:var(--r);pointer-events:none}
.voucher-label{font-size:15px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem}
.voucher-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:400;color:var(--cream);margin-bottom:.25rem}
.voucher-name em{font-style:italic;color:var(--gold2)}
.voucher-val{font-size:15px;color:var(--muted);margin-bottom:1.5rem}
.voucher-amounts{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:1.5rem}
.va{padding:5px 12px;border:1px solid var(--border);border-radius:2px;font-size:16px;color:var(--cream3);background:var(--ink);transition:all .2s;cursor:default}
.va:hover{border-color:var(--gold);color:var(--gold);background:rgba(160,104,26,0.05)}
.voucher-bonus{padding:.75rem 1rem;background:rgba(160,104,26,0.07);border-left:2px solid var(--gold);font-size:15px;color:var(--cream2);line-height:1.6}
.voucher-bonus strong{color:var(--gold);font-weight:500}

/* ── CONTACT ── */
#contact{background:var(--ink)}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
.contact-info{display:flex;flex-direction:column;gap:1.5rem}
.ci-row{display:flex;gap:1rem;align-items:flex-start}
.ci-icon{width:32px;height:32px;border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;color:var(--gold);flex-shrink:0;margin-top:2px}
.ci-lbl{font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
.ci-val{font-size:16px;color:var(--cream2);line-height:1.6}
.ci-val a{color:var(--gold);text-decoration:none}
.ci-val a:hover{color:var(--gold2);text-decoration:underline}
.map-wrap{border:1px solid var(--border);border-radius:var(--r);overflow:hidden;height:300px;background:var(--ink2)}
.map-wrap iframe{width:100%;height:100%;border:none}

/* ── BOOK CTA ── */
#book{background:var(--ink3);text-align:center;padding:6rem 1.5rem;position:relative;overflow:hidden}
#book::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(200,133,42,0.08),transparent 70%)}
.book-content{position:relative;max-width:560px;margin:0 auto}
.book-title{font-family:'Playfair Display',serif;font-size:clamp(30px,5vw,48px);font-weight:400;color:var(--cream);margin-bottom:1rem;line-height:1.15}
.book-title em{font-style:italic;color:var(--gold2)}
.book-sub{font-size:16px;color:var(--muted);margin-bottom:2.5rem;line-height:1.8;font-weight:300}

/* ── FOOTER ── */
footer{background:var(--ink2);border-top:1px solid var(--border);padding:2rem 1.5rem;text-align:center}
.footer-logo{font-family:'Playfair Display',serif;font-size:18px;font-weight:400;color:var(--muted);margin-bottom:.5rem}
.footer-logo em{font-style:italic}
.footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:.4rem 1.4rem;margin-bottom:1rem}
.footer-links a{font-size:14px;color:var(--muted);text-decoration:none}
.footer-links a:hover{text-decoration:underline}
.footer-copy{font-size:15px;color:var(--muted);letter-spacing:.06em}
.footer-legal{display:inline-block;margin-top:.6rem;font-size:13px;color:var(--muted);text-decoration:underline;opacity:.75}

/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scrollPulse{0%,100%{opacity:.4;transform:scaleY(.8)}50%{opacity:1;transform:scaleY(1)}}

.reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}
.reveal-delay-4{transition-delay:.4s}
.reveal-scale{opacity:0;transform:scale(.97);transition:opacity .7s ease,transform .7s ease}
.reveal-scale.visible{opacity:1;transform:scale(1)}

/* ── RESPONSIVE ── */
@media(max-width:760px){
  nav{padding:1rem 1.25rem}
  .nav-links{display:none}
  .nav-links.open{display:flex;flex-direction:column;position:fixed;top:60px;left:0;right:0;width:100%;background:rgba(250,246,239,0.98);padding:1.5rem 2rem;gap:1.25rem;border-bottom:1px solid rgba(160,104,26,0.18);z-index:99;transform:none}
  .hamburger{display:flex}
  .voucher-inner{grid-template-columns:1fr}
  .contact-grid{grid-template-columns:1fr}
  .hero-title{font-size:clamp(36px,10vw,56px)}
  .photo-strip{grid-template-columns:1fr 1fr;height:280px}
  .photo-strip-item:last-child{display:none}
  .spa-feature{height:auto}
  .spa-feature img{height:320px;position:relative}
  .spa-feature::before{background:linear-gradient(to bottom,rgba(250,246,239,0.9),rgba(250,246,239,0.6))}
  .spa-feature-text{position:relative;padding:2rem 1.5rem;max-width:100%}
}
@media(max-width:500px){
  .svc-grid{grid-template-columns:1fr;gap:1rem;background:transparent}
  .svc-card{border-radius:8px}
  .promo-grid{grid-template-columns:1fr}
  section{padding:4rem 1.25rem}
  .photo-strip{grid-template-columns:1fr;height:220px}
  .photo-strip-item:not(:first-child){display:none}
}

.related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:var(--border);margin-top:2rem}
.related-card{display:block;background:var(--ink3);padding:1.75rem;text-decoration:none;color:inherit;transition:background .2s}
.related-card:hover{background:var(--ink2)}
.related-card .rc-name{font-family:'Playfair Display',serif;font-size:17px;color:var(--cream);margin-bottom:.4rem}
.related-card .rc-desc{font-size:14px;color:var(--muted);line-height:1.6}

`
