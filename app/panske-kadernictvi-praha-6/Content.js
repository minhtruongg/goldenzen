'use client'
import { siteCSS } from '../components/siteStyles'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import { LocalBox } from '../components/localInfo'
import { LangProvider, useLang } from '../components/LangContext'

const T = {
  cs: {
    heroEy: 'Pánské kadeřnictví · Praha 6',
    heroPre: 'Pánské střihy ', heroEm: 'bez kompromisů', heroSuf: '',
    heroSub: 'Klasické i moderní pánské střihy a úprava vousů v salonu GoldenZen v Břevnově.',
    book: 'Rezervovat termín', priceCta: 'Ceník',
    introEy: 'O službě', introPre: 'Pánský ', introEm: 'kadeřník', introSuf: ' v Břevnově',
    p1: 'Pánské kadeřnictví GoldenZen se drží jednoho principu — přesný střih, který funguje i po týdnu, ne jen v den, kdy vyjdete ze salonu. Ať přijdete na pravidelné zastřižení nebo chcete změnu, poradíme se s vámi přímo na místě.',
    p2: 'Nabízíme klasické i moderní pánské střihy, úpravu vousů a účesy pro kluky. Salon je v Praze 6 – Břevnově, otevřeno máme každý den v týdnu včetně víkendu.',
    p3pre: 'Hledáte spíš ', p3link1: 'dámský', p3mid: ' střih? Podívejte se na ', p3link2: 'dámské kadeřnictví', p3end: ' nebo na celý přehled ', p3link3: 'kadeřnických služeb', p3dot: '.',
    priceEy: 'Ceník', pricePre: 'Pánské ', priceEm: 'střihy', priceSuf: '',
    prices: [ ['Pánský střih', 'od 100 Kč'], ['Úprava vousů', 'dle konzultace'], ['Dětský střih', 'dle konzultace'] ],
    faqEy: 'Časté dotazy', faqPre: 'Pánské kadeřnictví ', faqEm: 'Praha 6', faqSuf: '',
    faqs: [
      ['Musím se objednat předem?', 'Doporučujeme rezervaci online, ať máte jistý termín — v případě volné kapacity vás ale rádi obsloužíme i bez objednání.'],
      ['Upravujete i vousy?', 'Ano, úprava vousů je součástí pánské nabídky vedle klasických i moderních střihů.'],
    ],
    relEy: 'Podívejte se i na', relPre: 'Další ', relEm: 'služby', relSuf: '',
    related: [
      ['/damske-kadernictvi-praha-6/', 'Dámské kadeřnictví', 'Střihy, barvení a vlasové kúry pro ženy.'],
      ['/barveni-vlasu-praha-6/', 'Barvení vlasů', 'Baleáž, melír a celková barva na míru.'],
      ['/masaze-praha-6/', 'Masáže Praha 6', 'Relaxační a regenerační masáže v salonu.'],
    ],
    bookEy: 'Online rezervace', bookPre: 'Objednejte se ', bookEm: 'k nám', bookSuf: '',
    bookSub: 'Vyberte termín, který vám vyhovuje, a nechte zbytek na nás.', bookCta: 'Rezervovat pánský střih',
  },
  en: {
    heroEy: "Men's hairdressing · Prague 6",
    heroPre: "Men's cuts, ", heroEm: 'no compromises', heroSuf: '',
    heroSub: "Classic and modern men's cuts and beard grooming at GoldenZen in Břevnov.",
    book: 'Book an appointment', priceCta: 'Pricing',
    introEy: 'About us', introPre: "A men's ", introEm: 'barber', introSuf: ' in Břevnov',
    p1: "GoldenZen's men's hairdressing sticks to one principle — a precise cut that still works a week later, not just the day you leave the salon. Whether you're here for a regular trim or a change, we'll talk it through on the spot.",
    p2: "We offer classic and modern men's cuts, beard grooming and cuts for boys. The salon is in Prague 6 – Břevnov, open every day of the week including weekends.",
    p3pre: 'Looking for a ', p3link1: "women's", p3mid: ' cut instead? See ', p3link2: "women's hairdressing", p3end: ' or the full ', p3link3: 'hairdressing overview', p3dot: '.',
    priceEy: 'Pricing', pricePre: "Men's ", priceEm: 'cuts', priceSuf: '',
    prices: [ ["Men's cut", 'from 100 CZK'], ['Beard grooming', 'by consultation'], ["Children's cut", 'by consultation'] ],
    faqEy: 'FAQ', faqPre: "Men's hairdressing in ", faqEm: 'Prague 6', faqSuf: '',
    faqs: [
      ['Do I need to book ahead?', "We recommend booking online to guarantee a slot — if we have capacity, we're happy to take walk-ins too."],
      ['Do you do beard trims?', "Yes, beard grooming is part of the men's offering alongside classic and modern cuts."],
    ],
    relEy: 'Also see', relPre: 'Other ', relEm: 'services', relSuf: '',
    related: [
      ['/damske-kadernictvi-praha-6/', "Women's hairdressing", 'Cuts, colouring and hair treatments for women.'],
      ['/barveni-vlasu-praha-6/', 'Hair colouring', 'Balayage, highlights and full colour, tailored to you.'],
      ['/masaze-praha-6/', 'Massages Prague 6', 'Relaxing and restorative massages at the salon.'],
    ],
    bookEy: 'Online booking', bookPre: 'Book your ', bookEm: 'visit', bookSuf: '',
    bookSub: "Pick a time that works for you, and we'll take care of the rest.", bookCta: "Book a men's cut",
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Pánské kadeřnictví',
  name: 'Pánské kadeřnictví Praha 6 – GoldenZen',
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
          <p>{t.p3pre}<a href="/damske-kadernictvi-praha-6/">{t.p3link1}</a>{t.p3mid}<a href="/damske-kadernictvi-praha-6/">{t.p3link2}</a>{t.p3end}<a href="/kadernictvi-praha-6/">{t.p3link3}</a>{t.p3dot}</p>
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
