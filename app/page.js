import { homeCSS } from './components/homeStyles'
import HomeBehavior from './components/HomeBehavior'

const SITE = 'https://www.goldenzen.cz'
const TITLE = 'GoldenZen | Masáže, kadeřnictví a kosmetika Praha 6 – Břevnov'
const DESCRIPTION =
  'Wellness centrum v Praze 6 – Břevnově. Kadeřnictví, thajské masáže, kosmetika i péče o nehty pod jednou střechou. Rezervujte si termín online.'

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/` },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/`,
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
    images: [{ url: `${SITE}/images/goldenzen.jpg`, alt: 'GoldenZen – wellness centrum Praha 6' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE}/images/goldenzen.jpg`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['DaySpa', 'HairSalon'],
  '@id': `${SITE}/#business`,
  name: 'GOLDEN ZEN',
  alternateName: 'GoldenZen',
  url: `${SITE}/`,
  image: `${SITE}/images/goldenzen.jpg`,
  telephone: '+420778085666',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bělohorská 1686/118',
    addressLocality: 'Praha 6 – Břevnov',
    postalCode: '169 00',
    addressCountry: 'CZ',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 50.0852991, longitude: 14.363772 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '10:00', closes: '21:00' },
  ],
  sameAs: ['https://www.instagram.com/goldenzen.cz/', 'https://www.facebook.com/goldenzen.cz'],
}

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homeCSS }} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
<nav id="nav">
  <a href="/" className="nav-logo">Golden<em>Zen</em></a>
  <div className="nav-links">
    <a href="#services" id="nl-svc">Služby</a>
    <a href="#promos" id="nl-promo">Akce</a>
    <a href="#vouchers" id="nl-vouch">Dárkové poukazy</a>
    <a href="#contact" id="nl-contact">Kontakt</a>
  </div>
  <div className="nav-right">
    <div className="lang-btn">
      <button className="lb a" id="lb-cs" data-lang="cs">CZ</button>
      <button className="lb" id="lb-en" data-lang="en">EN</button>
    </div>
    <a href="/goldenzen-booking.html" className="nav-cta" id="nav-book">Rezervace</a>
  </div>
  <div className="hamburger" data-menu-toggle=""><span></span><span></span><span></span></div>
</nav>

{/* HERO */}
<section className="hero" id="home">
  <div className="hero-bg" id="heroBg">
    <img src="/images/goldenzen.jpg" alt="GoldenZen Spa" fetchPriority="high" />
  </div>
  <div className="hero-lines"></div>
  <div className="hero-content">
    <div className="hero-eyebrow" id="h-eyebrow">Wellness centrum · Praha 6 – Břevnov</div>
    <h1 className="hero-title" id="h-title">Místo, kde <em>tělo<br />& mysl</em> odpočinou</h1>
    <p className="hero-sub" id="h-sub">Thajské masáže, kosmetika, permanentní makeup a péče o nehty — vše pod jednou střechou s 17 lety zkušeností.</p>
    <div className="hero-btns">
      <a href="/goldenzen-booking.html" className="btn-prim" id="h-cta1">Rezervovat termín</a>
      <a href="#services" className="btn-sec" id="h-cta2">Naše služby</a>
    </div>
  </div>
  <div className="hero-scroll"><div className="scroll-line"></div><span id="h-scroll">Scroll</span></div>
</section>

{/* STATS */}
<div className="stats">
  <div className="stats-grid">
    <div className="reveal"><div className="stat-n">17+</div><div className="stat-l" id="s1">let zkušeností</div></div>
    <div className="reveal reveal-delay-1"><div className="stat-n">6</div><div className="stat-l" id="s2">druhů služeb</div></div>
    <div className="reveal reveal-delay-2"><div className="stat-n">7</div><div className="stat-l" id="s3">specialistů</div></div>
    <div className="reveal reveal-delay-3"><div className="stat-n">30%</div><div className="stat-l" id="s4">sleva při otevření</div></div>
  </div>
</div>

{/* PHOTO STRIP */}
<div className="photo-strip">
  <div className="photo-strip-item">
    <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80&auto=format&fit=crop" alt="Spa relaxation" loading="lazy" decoding="async" />
  </div>
  <div className="photo-strip-item">
    <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80&auto=format&fit=crop" alt="Wellness treatment" loading="lazy" decoding="async" />
  </div>
  <div className="photo-strip-item">
    <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80&auto=format&fit=crop" alt="Nail care" loading="lazy" decoding="async" />
  </div>
</div>

{/* SERVICES */}
<section id="services">
  <div className="container">
    <div className="section-eyebrow reveal" id="svc-ey">Naše služby</div>
    <h2 className="section-title reveal reveal-delay-1" id="svc-ttl">Péče, která <em>opravdu funguje</em></h2>
    <p className="section-sub reveal reveal-delay-2" id="svc-sub">Od relaxačních masáží po kosmetické zákroky — tým odborníků se postará o každý detail.</p>
    <div className="svc-grid svc-border">
      <div className="svc-card svc-border reveal"><div className="svc-icon">♨</div><div className="svc-name" id="sc1-n">Masáže</div><div className="svc-desc" id="sc1-d">Tradiční thajské masáže, olejové, horké kameny, bylinná a aromatická masáž. Uvolněte napětí a obnovte rovnováhu těla.</div><div className="svc-price" id="sc1-p">od 490 Kč</div><a href="/masaze-praha-6" className="svc-more" id="sc1-more">Zjistit více →</a><img className="svc-img" src="https://images.unsplash.com/photo-1741522509438-a120c0bb5e88?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Masáže" loading="lazy" /></div>
      <a href="/goldenzen-booking.html?cat=couple" className="svc-card svc-border reveal reveal-delay-1"><div className="svc-icon">◇</div><div className="svc-name" id="sc2-n">Párová masáž</div><div className="svc-desc" id="sc2-d">Relaxace pro dva — sdílený zážitek plný pohody a klidu. Ideální dárek pro páry i přátele.</div><div className="svc-price" id="sc2-p">od 1 490 Kč</div><img className="svc-img" src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80" alt="Párová masáž" loading="lazy" /></a>
      <a href="/goldenzen-booking.html?cat=cosm" className="svc-card svc-border reveal reveal-delay-2"><div className="svc-icon">✦</div><div className="svc-name" id="sc3-n">Kosmetika</div><div className="svc-desc" id="sc3-d">Hloubkové ošetření pleti, léčba akné, anti-aging procedury, depilace a líčení pro každou příležitost.</div><div className="svc-price" id="sc3-p">od 180 Kč</div><img className="svc-img" src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80" alt="Kosmetika" loading="lazy" /></a>
      <a href="/goldenzen-booking.html?cat=pmu" className="svc-card svc-border reveal"><div className="svc-icon">◈</div><div className="svc-name" id="sc4-n">Permanentní makeup</div><div className="svc-desc" id="sc4-d">Mikroblading obočí, PMU rty a obočí. Přirozený výsledek, který vydrží.</div><div className="svc-price" id="sc4-p">od 3 500 Kč</div><img className="svc-img" src="/images/pmu.jpg" alt="Permanentní makeup" loading="lazy" /></a>
      <a href="/goldenzen-booking.html?cat=brows" className="svc-card svc-border reveal reveal-delay-1"><div className="svc-icon">◉</div><div className="svc-name" id="sc5-n">Obočí & řasy</div><div className="svc-desc" id="sc5-d">Laminace, prodlužování řas, lash lifting, barvení a úprava tvaru. Dokonalý pohled každý den.</div><div className="svc-price" id="sc5-p">od 150 Kč</div><img className="svc-img" src="https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=600&q=80" alt="Obočí a řasy" loading="lazy" /></a>
      <a href="/goldenzen-booking.html?cat=nails" className="svc-card svc-border reveal reveal-delay-2"><div className="svc-icon">◆</div><div className="svc-name" id="sc6-n">Nehty</div><div className="svc-desc" id="sc6-d">Manikúra, pedikúra, Shellac/Gellac, Footlogix a gelové nehty. Péče o vaše ruce a nohy od špiček.</div><div className="svc-price" id="sc6-p">od 250 Kč</div><img className="svc-img" src="/images/nails.jpg" alt="Nehty" loading="lazy" /></a>
      <div className="svc-card svc-border reveal"><div className="svc-icon">✂</div><div className="svc-name" id="sc7-n">Kadeřnictví</div><div className="svc-desc" id="sc7-d">Střihy, barvení, baleáž a vlasové kúry pro muže, ženy i děti. Profesionální péče o vaše vlasy.</div><div className="svc-price" id="sc7-p">od 100 Kč</div><a href="/kadernictvi-praha-6" className="svc-more" id="sc7-more">Zjistit více →</a><img className="svc-img" src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80" alt="Kadeřnictví" loading="lazy" /></div>
    </div>
    <div style={{ textAlign: 'center', marginTop: '2.5rem' }} className="reveal"><a href="/goldenzen-booking.html" className="btn-prim" id="svc-book">Rezervovat službu</a></div>
  </div>
</section>

{/* PROMOS */}
<section id="promos">
  <div className="container">
    <div className="section-eyebrow reveal" id="pr-ey">Aktuální akce</div>
    <h2 className="section-title reveal reveal-delay-1" id="pr-ttl">Výhodné <em>nabídky</em></h2>
    <p className="section-sub reveal reveal-delay-2" id="pr-sub">Využijte naše aktuální akce a dopřejte si více za méně.</p>
    <div className="promo-grid">
      <div className="promo-card reveal"><div className="promo-badge" id="pb1">Otevření</div><div className="promo-title" id="pt1">30 % sleva</div><div className="promo-desc" id="pd1">Při otevření salonu získáte 30% slevu na veškeré služby a produkty.</div><div className="promo-highlight" id="ph1">Platí na všechny služby</div></div>
      <div className="promo-card reveal reveal-delay-1"><div className="promo-badge" id="pb2">Věrnostní program</div><div className="promo-title" id="pt2">10 masáží + 1 zdarma</div><div className="promo-desc" id="pd2">Přijďte desetkrát a jedenáctá masáž je na nás. Odměňujeme věrné zákazníky.</div><div className="promo-highlight" id="ph2">Platí na všechny masáže</div></div>
      <div className="promo-card reveal reveal-delay-2"><div className="promo-badge" id="pb3">Měsíční nabídka</div><div className="promo-title" id="pt3">30 % na delší procedury</div><div className="promo-desc" id="pd3">Tento měsíc získáte 30% slevu na všechny procedury trvající déle než 60 minut.</div><div className="promo-highlight" id="ph3">Procedury nad 60 minut</div></div>
    </div>
  </div>
</section>

{/* VOUCHERS */}
<section id="vouchers">
  <div className="container">
    <div className="voucher-inner">
      <div>
        <div className="section-eyebrow reveal" id="vo-ey">Dárkové poukazy</div>
        <h2 className="section-title reveal reveal-delay-1" id="vo-ttl">Darujte <em>zážitek</em>,<br />ne věc</h2>
        <p className="section-sub reveal reveal-delay-2" id="vo-sub">Dárkový poukaz GoldenZen je ideální dárek pro každou příležitost — narozeniny, výročí nebo jen proto, že na někoho myslíte.</p>
        <div className="reveal reveal-delay-3"><a href="/goldenzen-voucher.html" className="btn-prim" id="vo-cta">Objednat poukaz</a></div>
      </div>
      <div className="reveal-scale">
        <div className="voucher-card">
          <div className="voucher-label" id="vc-lbl">GoldenZen · Dárkový poukaz</div>
          <div className="voucher-name">Golden<em>Zen</em></div>
          <div className="voucher-val" id="vc-val">Wellness centrum Praha 6</div>
          <div className="voucher-amounts">
            <div className="va">500 Kč</div><div className="va">1 000 Kč</div><div className="va">2 000 Kč</div><div className="va">5 000 Kč</div><div className="va">10 000 Kč</div><div className="va">15 000 Kč</div>
          </div>
          <div className="voucher-bonus" id="vc-bonus"><strong id="vc-b1">Bonus 30 %</strong> <span id="vc-b2">při nákupu nad 5 000 Kč</span><br /><strong id="vc-b3">Bonus 40 %</strong> <span id="vc-b4">při nákupu nad 15 000 Kč</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CONTACT */}
<section id="contact">
  <div className="container">
    <div className="section-eyebrow reveal" id="ct-ey">Kontakt</div>
    <h2 className="section-title reveal reveal-delay-1" id="ct-ttl">Navštivte <em>nás</em></h2>
    <div className="contact-grid">
      <div className="contact-info">
        <div className="ci-row reveal"><div className="ci-icon">📍</div><div><div className="ci-lbl" id="ci-addr-l">Adresa</div><div className="ci-val">Bělohorská 1686/118<br />169 00 Praha 6 – Břevnov</div></div></div>
        <div className="ci-row reveal reveal-delay-1"><div className="ci-icon">📞</div><div><div className="ci-lbl" id="ci-ph-l">Telefon</div><div className="ci-val"><a href="tel:+420778085666">+420 778 085 666</a></div></div></div>
        <div className="ci-row reveal reveal-delay-2"><div className="ci-icon">🕐</div><div><div className="ci-lbl" id="ci-hrs-l">Otevírací doba</div><div className="ci-val" id="ci-hrs-v">Po – Pá: 9:00 – 21:00<br />So – Ne: 10:00 – 21:00</div></div></div>
        <div className="ci-row reveal reveal-delay-3"><div className="ci-icon">📸</div><div><div className="ci-lbl" id="ci-ig-l">Instagram</div><div className="ci-val"><a href="https://www.instagram.com/goldenzen.cz/" target="_blank" rel="noopener">@goldenzen.cz</a></div></div></div>
        <div className="ci-row reveal reveal-delay-4"><div className="ci-icon">📘</div><div><div className="ci-lbl" id="ci-fb-l">Facebook</div><div className="ci-val"><a href="https://www.facebook.com/goldenzen.cz?mibextid=wwXIfr&rdid=5ZeauVKZFZUZvEtw&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E2rkigbYs%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener">goldenzen.cz</a></div></div></div>
      </div>
      <div className="map-wrap reveal reveal-delay-1">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3620.4613289150025!2d14.363772035099144!3d50.0852991134115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b95aa30fb52b7%3A0xcdbb843f79cd562!2sGolden%20Zen!5e0!3m2!1sen!2sus!4v1775898236659!5m2!1sen!2sus" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  </div>
</section>

{/* BOOK CTA */}
<section id="book">
  <div className="book-content">
    <div className="section-eyebrow reveal" id="bk-ey">Online rezervace</div>
    <h2 className="book-title reveal reveal-delay-1" id="bk-ttl">Rezervujte si <em>svůj čas</em><br />ještě dnes</h2>
    <p className="book-sub reveal reveal-delay-2" id="bk-sub">Vyberte službu, zvolte termín a my se postaráme o zbytek. Rychle, jednoduše, online.</p>
    <div className="reveal reveal-delay-3"><a href="/goldenzen-booking.html" className="btn-prim" id="bk-cta">Přejít na rezervaci</a></div>
  </div>
</section>

<footer>
  <div className="footer-logo">Golden<em>Zen</em></div>
  <div className="footer-copy" id="ft-copy">© 2026 GoldenZen · Bělohorská 1686/118, Praha 6 – Břevnov</div>
  <a href="/ochrana-osobnich-udaju" className="footer-legal" id="ft-legal">Ochrana osobních údajů</a>
</footer>
      <HomeBehavior />
    </>
  )
}
