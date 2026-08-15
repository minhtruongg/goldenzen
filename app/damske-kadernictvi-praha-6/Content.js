'use client'
import { siteCSS } from '../components/siteStyles'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import { LocalBox } from '../components/localInfo'
import { LangProvider, useLang } from '../components/LangContext'

const T = {
  cs: {
    heroEy: 'Dámské kadeřnictví · Praha 6',
    heroPre: 'Střih a barva, ', heroEm: 'které vám sedí', heroSuf: '',
    heroSub: 'Dámské střihy, barvení a vlasová péče v salonu GoldenZen — Praha 6, Břevnov.',
    book: 'Rezervovat termín', priceCta: 'Ceník',
    introEy: 'O službě', introPre: 'Dámský ', introEm: 'kadeřník', introSuf: ' v Břevnově',
    p1: 'Ať přicházíte na pravidelné zastřižení, nebo chcete kompletní proměnu, kadeřnice GoldenZen se s vámi nejdřív poradí, co vlasy skutečně unesou a co bude fungovat i za týden.',
    p2: 'Nabízíme dámské střihy, barvení, baleáž, melír i vlasové kúry pro poškozené nebo suché vlasy. Salon najdete v Praze 6 – Břevnově, otevřeno máme sedm dní v týdnu.',
    p3pre: 'Chcete konkrétně jen barvu? Přejděte na stránku ', p3link1: 'barvení vlasů', p3mid: ', nebo se podívejte na celý přehled ', p3link2: 'kadeřnických služeb', p3dot: '.',
    priceEy: 'Ceník', pricePre: 'Dámské ', priceEm: 'služby', priceSuf: '',
    prices: [ ['Dámský střih', 'od 100 Kč'], ['Barvení, baleáž, melír', 'dle konzultace'], ['Vlasová kúra', 'dle konzultace'] ],
    faqEy: 'Časté dotazy', faqPre: 'Dámské kadeřnictví ', faqEm: 'Praha 6', faqSuf: '',
    faqs: [
      ['Poradíte s výběrem odstínu?', 'Ano, konzultace odstínu a techniky (baleáž, melír, celková barva) je součástí každého objednání na barvení.'],
      ['Kolik trvá barvení s baleáží?', 'Délka záleží na délce a hustotě vlasů — přesný odhad dostanete při rezervaci nebo na konzultaci v salonu.'],
    ],
    relEy: 'Podívejte se i na', relPre: 'Další ', relEm: 'služby', relSuf: '',
    related: [
      ['/barveni-vlasu-praha-6/', 'Barvení vlasů', 'Baleáž, melír a celková barva na míru.'],
      ['/panske-kadernictvi-praha-6/', 'Pánské kadeřnictví', 'Střihy a úprava vousů pro muže.'],
      ['/masaze-praha-6/', 'Masáže Praha 6', 'Relaxační a regenerační masáže v salonu.'],
    ],
    bookEy: 'Online rezervace', bookPre: 'Objednejte se ', bookEm: 'k nám', bookSuf: '',
    bookSub: 'Vyberte termín, který vám vyhovuje, a nechte zbytek na nás.', bookCta: 'Rezervovat dámský střih',
  },
  en: {
    heroEy: "Women's hairdressing · Prague 6",
    heroPre: 'A cut and colour ', heroEm: 'that actually suits you', heroSuf: '',
    heroSub: "Women's cuts, colouring and hair care at GoldenZen — Prague 6, Břevnov.",
    book: 'Book an appointment', priceCta: 'Pricing',
    introEy: 'About us', introPre: "A women's ", introEm: 'hairdresser', introSuf: ' in Břevnov',
    p1: "Whether you're here for a regular trim or a full change, our stylists will talk through what your hair can actually handle, and what will still work a week later.",
    p2: "We offer women's cuts, colouring, balayage, highlights and treatments for damaged or dry hair. The salon is in Prague 6 – Břevnov, open seven days a week.",
    p3pre: 'Looking for colour specifically? See ', p3link1: 'hair colouring', p3mid: ', or the full ', p3link2: 'hairdressing overview', p3dot: '.',
    priceEy: 'Pricing', pricePre: "Women's ", priceEm: 'services', priceSuf: '',
    prices: [ ["Women's cut", 'from 100 CZK'], ['Colouring, balayage, highlights', 'by consultation'], ['Hair treatment', 'by consultation'] ],
    faqEy: 'FAQ', faqPre: "Women's hairdressing in ", faqEm: 'Prague 6', faqSuf: '',
    faqs: [
      ['Can you help me choose a shade?', 'Yes, a consultation on shade and technique (balayage, highlights, full colour) is part of every colouring appointment.'],
      ['How long does colouring with balayage take?', 'It depends on hair length and thickness — we\u2019ll give you an accurate estimate at booking or during an in-salon consultation.'],
    ],
    relEy: 'Also see', relPre: 'Other ', relEm: 'services', relSuf: '',
    related: [
      ['/barveni-vlasu-praha-6/', 'Hair colouring', 'Balayage, highlights and full colour, tailored to you.'],
      ['/panske-kadernictvi-praha-6/', "Men's hairdressing", 'Cuts and beard grooming for men.'],
      ['/masaze-praha-6/', 'Massages Prague 6', 'Relaxing and restorative massages at the salon.'],
    ],
    bookEy: 'Online booking', bookPre: 'Book your ', bookEm: 'visit', bookSuf: '',
    bookSub: "Pick a time that works for you, and we'll take care of the rest.", bookCta: "Book a women's cut",
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Dámské kadeřnictví',
  name: 'Dámské kadeřnictví Praha 6 – GoldenZen',
  areaServed: { '@type': 'City', name: 'Praha 6 – Břevnov' },
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
            <a href="/goldenzen-booking.html?cat=hair" className="btn-prim">{t.book}</a>
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
          <p>{t.p3pre}<a href="/barveni-vlasu-praha-6/">{t.p3link1}</a>{t.p3mid}<a href="/kadernictvi-praha-6/">{t.p3link2}</a>{t.p3dot}</p>
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
          <a href="/goldenzen-booking.html?cat=hair" className="btn-prim">{t.bookCta}</a>
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
