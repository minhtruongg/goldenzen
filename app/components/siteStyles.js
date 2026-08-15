// Shared design tokens + CSS, lifted from public/goldenzen.html so every
// new landing page looks like the same site instead of a bolted-on clone.
export const siteCSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#FAF6EF;--ink2:#F3EDE2;--ink3:#EBE2D3;--gold:#A0681A;--gold2:#C8852A;--gold3:#7A5010;--cream:#2E1F0A;--cream2:#4A3318;--cream3:#6B5035;--muted:#9A8468;--muted2:#C4AD8E;--border:rgba(160,104,26,0.18);--border2:rgba(160,104,26,0.38);--r:4px}
html{scroll-behavior:smooth;background:var(--ink)}
body{font-family:'DM Sans',sans-serif;background:var(--ink);color:var(--cream);font-size:17px;line-height:1.65;overflow-x:hidden}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 2.5rem;background:rgba(250,246,239,0.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
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
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none}
.hamburger span{display:block;width:22px;height:1px;background:var(--cream)}

.hero{min-height:70vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:9rem 1.5rem 4rem;position:relative;overflow:hidden}
.hero-lines{position:absolute;inset:0;opacity:.03;background-image:repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(160,104,26,.6) 60px)}
.hero-content{position:relative;max-width:760px}
.hero-eyebrow{font-size:15px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold2);margin-bottom:1.5rem;font-weight:400}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(38px,6vw,64px);font-weight:400;line-height:1.12;color:var(--cream);margin-bottom:1.5rem}
.hero-title em{font-style:italic;color:var(--gold2)}
.hero-sub{font-size:17px;color:var(--muted);max-width:520px;margin:0 auto 2.5rem;line-height:1.8;font-weight:300}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-prim{display:inline-block;padding:14px 32px;background:var(--gold);border:1px solid var(--gold);border-radius:var(--r);font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:#FAF6EF;text-decoration:none;font-weight:500;transition:all .25s}
.btn-prim:hover{background:var(--gold2);border-color:var(--gold2)}
.btn-sec{display:inline-block;padding:14px 32px;border:1px solid var(--border2);border-radius:var(--r);font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:var(--cream2);text-decoration:none;font-weight:400;transition:all .25s}
.btn-sec:hover{border-color:var(--gold);color:var(--gold)}

section{padding:5rem 1.5rem}
.container{max-width:920px;margin:0 auto}
.section-eyebrow{font-size:15px;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;font-weight:400}
.section-title{font-family:'Playfair Display',serif;font-size:clamp(26px,4vw,36px);font-weight:400;color:var(--cream);margin-bottom:1rem;line-height:1.25}
.section-title em{font-style:italic;color:var(--gold2)}
.section-sub{font-size:16px;color:var(--muted);max-width:640px;line-height:1.85;font-weight:300;margin-bottom:2rem}
.body-copy p{font-size:16px;color:var(--cream3);line-height:1.9;font-weight:300;margin-bottom:1.25rem;max-width:680px}

#pricing{background:var(--ink3)}
.price-list{display:flex;flex-direction:column;border:1px solid var(--border);border-radius:var(--r);overflow:hidden;background:var(--ink2)}
.price-row{display:flex;justify-content:space-between;align-items:center;padding:1.1rem 1.5rem;border-bottom:1px solid var(--border)}
.price-row:last-child{border-bottom:none}
.price-name{font-size:16px;color:var(--cream2)}
.price-val{font-size:16px;color:var(--gold);font-weight:500;white-space:nowrap;margin-left:1rem;text-align:right}

.local-box{border:1px solid var(--border);border-radius:var(--r);background:var(--ink2);padding:1.75rem;display:flex;flex-direction:column;gap:.9rem}
.local-row{display:flex;gap:.75rem;font-size:15px;color:var(--cream2)}
.local-row b{color:var(--muted);font-weight:500;min-width:110px;text-transform:uppercase;letter-spacing:.06em;font-size:14px}

#faq{background:var(--ink)}
.faq-item{border-bottom:1px solid var(--border);padding:1.5rem 0}
.faq-q{font-family:'Playfair Display',serif;font-size:18px;color:var(--cream);margin-bottom:.6rem}
.faq-a{font-size:15px;color:var(--muted2);line-height:1.8;font-weight:300}

#related{background:var(--ink3)}
.related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:var(--border)}
.related-card{display:block;background:var(--ink3);padding:1.75rem;text-decoration:none;color:inherit;transition:background .2s}
.related-card:hover{background:var(--ink2)}
.related-card .rc-name{font-family:'Playfair Display',serif;font-size:17px;color:var(--cream);margin-bottom:.4rem}
.related-card .rc-desc{font-size:14px;color:var(--muted);line-height:1.6}

#book{background:var(--ink2);text-align:center;padding:6rem 1.5rem;position:relative;overflow:hidden}
.book-content{position:relative;max-width:560px;margin:0 auto}
.book-title{font-family:'Playfair Display',serif;font-size:clamp(28px,5vw,42px);font-weight:400;color:var(--cream);margin-bottom:1rem;line-height:1.15}
.book-title em{font-style:italic;color:var(--gold2)}
.book-sub{font-size:16px;color:var(--muted);margin-bottom:2.5rem;line-height:1.8;font-weight:300}

footer{background:var(--ink2);border-top:1px solid var(--border);padding:2rem 1.5rem;text-align:center}
.footer-logo{font-family:'Playfair Display',serif;font-size:18px;font-weight:400;color:var(--muted);margin-bottom:.5rem}
.footer-logo em{font-style:italic}
.footer-copy{font-size:15px;color:var(--muted);letter-spacing:.06em}

@media(max-width:760px){
  nav{padding:1rem 1.25rem}
  .nav-links{display:none}
  .nav-links.open{display:flex;flex-direction:column;position:fixed;top:60px;left:0;right:0;background:rgba(250,246,239,0.98);padding:1.5rem 2rem;gap:1.25rem;border-bottom:1px solid rgba(160,104,26,0.18);z-index:99}
  .hamburger{display:flex}
  .local-row{flex-direction:column;gap:.15rem}
  .local-row b{min-width:0}
}
`
