'use client'
import { siteCSS } from '../components/siteStyles'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import { LocalBox } from '../components/localInfo'
import { LangProvider, useLang } from '../components/LangContext'

const T = {
  cs: {
    heroEy: 'Masáže · Praha 6 – Břevnov',
    heroPre: 'Masáže, po kterých ', heroEm: 'tělo odpočine', heroSuf: '',
    heroSub: 'Thajské, olejové a masáže horkými kameny v salonu GoldenZen — s 17 lety zkušeností v oboru.',
    book: 'Rezervovat masáž', priceCta: 'Ceník',
    introEy: 'O masážích', introPre: 'Masáže v ', introEm: 'Břevnově', introSuf: '',
    p1: 'Masáže jsou srdcem GoldenZen. Nabízíme tradiční thajskou masáž, olejovou masáž, masáž horkými kameny i bylinnou a aromatickou masáž — každou volíme podle toho, co aktuálně potřebujete: uvolnit napětí ve svalech, zklidnit mysl, nebo obojí.',
    p2: 'Masáže provádí tým zkušených maséru a masérek v klidném prostředí salonu na Bělohorské ulici v Praze 6 – Břevnově. Otevřeno máme sedm dní v týdnu.',
    p3pre: 'Chcete masáž jen pro sebe, nebo raději pro dva? Kromě individuálních masáží nabízíme i párovou masáž — sdílený zážitek pro dva lidi ve stejné místnosti. Hledáte konkrétně thajskou masáž? Přejděte na ', p3link1: 'samostatnou stránku', p3dot: '.',
    priceEy: 'Ceník', pricePre: 'Druhy ', priceEm: 'masáží', priceSuf: '',
    prices: [ ['Thajská, olejová, horké kameny, bylinná, aromatická masáž', 'od 490 Kč'], ['Párová masáž', 'od 1 490 Kč'] ],
    faqEy: 'Časté dotazy', faqPre: 'Masáže ', faqEm: 'Praha 6', faqSuf: '',
    faqs: [
      ['Jakou masáž zvolit, když mám bolavá záda?', 'Doporučíme podle konkrétního problému, nejčastěji olejovou masáž nebo masáž horkými kameny — probereme to s vámi před začátkem procedury.'],
      ['Dá se objednat masáž pro dva zároveň?', 'Ano, párová masáž probíhá ve stejné místnosti pro dvě osoby najednou.'],
      ['Jak dlouho masáž trvá?', 'Délka se liší podle typu masáže — přesný čas i cenu potvrdíme při rezervaci.'],
    ],
    relEy: 'Vyberte si přesněji', relPre: 'Naše ', relEm: 'masáže', relSuf: '',
    related: [
      ['/thajske-masaze-praha-6/', 'Thajské masáže', 'Tradiční thajská masáž v centru Břevnova.'],
      ['/kadernictvi-praha-6/', 'Kadeřnictví Praha 6', 'Střihy, barvení a vlasová péče.'],
    ],
    bookEy: 'Online rezervace', bookPre: 'Rezervujte si ', bookEm: 'svůj čas', bookSuf: '',
    bookSub: 'Vyberte masáž, zvolte termín, my se postaráme o zbytek.', bookCta: 'Rezervovat masáž',
  },
  en: {
    heroEy: 'Massages · Prague 6 – Břevnov',
    heroPre: 'Massages that let your ', heroEm: 'body rest', heroSuf: '',
    heroSub: '17 years of experience with Thai, oil and hot stone massage at GoldenZen.',
    book: 'Book a massage', priceCta: 'Pricing',
    introEy: 'About our massages', introPre: 'Massages in ', introEm: 'Břevnov', introSuf: '',
    p1: 'Massage is at the heart of GoldenZen. We offer traditional Thai massage, oil massage, hot stone massage, and herbal and aromatic massage — each chosen based on what you actually need: releasing muscle tension, calming the mind, or both.',
    p2: 'Massages are performed by a team of experienced therapists in the calm surroundings of our salon on Bělohorská street in Prague 6 – Břevnov. Open seven days a week.',
    p3pre: 'Want a massage just for yourself, or for two? Alongside individual massages we also offer a couple massage — a shared experience in the same room. Looking specifically for Thai massage? See its ', p3link1: 'dedicated page', p3dot: '.',
    priceEy: 'Pricing', pricePre: 'Types of ', priceEm: 'massage', priceSuf: '',
    prices: [ ['Thai, oil, hot stone, herbal, aromatic massage', 'from 490 CZK'], ['Couple massage', 'from 1 490 CZK'] ],
    faqEy: 'FAQ', faqPre: 'Massages in ', faqEm: 'Prague 6', faqSuf: '',
    faqs: [
      ["Which massage should I choose for back pain?", 'We\u2019ll recommend based on your specific issue, most often an oil massage or hot stone massage — we\u2019ll talk it through with you before the treatment starts.'],
      ['Can I book a massage for two people?', 'Yes, our couple massage takes place in the same room for two people at once.'],
      ['How long does a massage take?', 'Duration varies by massage type — we\u2019ll confirm the exact time and price at booking.'],
    ],
    relEy: 'Choose more precisely', relPre: 'Our ', relEm: 'massages', relSuf: '',
    related: [
      ['/thajske-masaze-praha-6/', 'Thai massages', 'Traditional Thai massage in central Břevnov.'],
      ['/kadernictvi-praha-6/', 'Hairdressing Prague 6', 'Cuts, colouring and hair care.'],
    ],
    bookEy: 'Online booking', bookPre: 'Book your ', bookEm: 'time', bookSuf: '',
    bookSub: "Choose a massage, pick a slot, and we'll take care of the rest.", bookCta: 'Book a massage',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Masáže',
  name: 'Masáže Praha 6 – GoldenZen',
  areaServed: { '@type': 'City', name: 'Praha 6 – Břevnov' },
  offers: { '@type': 'Offer', priceCurrency: 'CZK', price: '490', description: 'Masáž, cena od' },
  provider: {
    '@type': 'DaySpa',
    name: 'GOLDEN ZEN',
    telephone: '+420778085666',
    address: { '@type': 'PostalAddress', streetAddress: 'Bělohorská 1686/118', addressLocality: 'Praha 6 – Břevnov', postalCode: '169 00', addressCountry: 'CZ' },
  },
}

function Inner() {
  const { lang } = useLang()
  const t = T[lang]
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCSS }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />

      <section className="hero">
        <div className="hero-lines"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">{t.heroEy}</div>
          <h1 className="hero-title">{t.heroPre}<em>{t.heroEm}</em>{t.heroSuf}</h1>
          <p className="hero-sub">{t.heroSub}</p>
          <div className="hero-btns">
            <a href="/goldenzen-booking.html?cat=massage" className="btn-prim">{t.book}</a>
            <a href="#pricing" className="btn-sec">{t.priceCta}</a>
          </div>
        </div>
      </section>

      <section>
        <div className="container body-copy">
          <div className="section-eyebrow">{t.introEy}</div>
          <h2 className="section-title">{t.introPre}<em>{t.introEm}</em>{t.introSuf}</h2>
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3pre}<a href="/thajske-masaze-praha-6/">{t.p3link1}</a>{t.p3dot}</p>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <div className="section-eyebrow">{t.priceEy}</div>
          <h2 className="section-title">{t.pricePre}<em>{t.priceEm}</em>{t.priceSuf}</h2>
          <div className="price-list">
            {t.prices.map(([name, val]) => (
              <div className="price-row" key={name}><span className="price-name">{name}</span><span className="price-val">{val}</span></div>
            ))}
          </div>
        </div>
      </section>

      <LocalBox lang={lang} />

      <section id="faq">
        <div className="container">
          <div className="section-eyebrow">{t.faqEy}</div>
          <h2 className="section-title">{t.faqPre}<em>{t.faqEm}</em>{t.faqSuf}</h2>
          {t.faqs.map(([q, a]) => (
            <div className="faq-item" key={q}>
              <div className="faq-q">{q}</div>
              <div className="faq-a">{a}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="related">
        <div className="container">
          <div className="section-eyebrow">{t.relEy}</div>
          <h2 className="section-title">{t.relPre}<em>{t.relEm}</em>{t.relSuf}</h2>
        </div>
        <div className="related-grid">
          {t.related.map(([href, name, desc]) => (
            <a href={href} className="related-card" key={href}>
              <div className="rc-name">{name}</div>
              <div className="rc-desc">{desc}</div>
            </a>
          ))}
        </div>
      </section>

      <section id="book">
        <div className="book-content">
          <div className="section-eyebrow">{t.bookEy}</div>
          <h2 className="book-title">{t.bookPre}<em>{t.bookEm}</em>{t.bookSuf}</h2>
          <p className="book-sub">{t.bookSub}</p>
          <a href="/goldenzen-booking.html?cat=massage" className="btn-prim">{t.bookCta}</a>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

export default function Content() {
  return (
    <LangProvider>
      <Inner />
    </LangProvider>
  )
}
