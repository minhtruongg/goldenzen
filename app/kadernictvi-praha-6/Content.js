'use client'
import { siteCSS } from '../components/siteStyles'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import { LocalBox } from '../components/localInfo'
import { LangProvider, useLang } from '../components/LangContext'

const T = {
  cs: {
    heroEy: 'Kadeřnictví · Praha 6 – Břevnov',
    heroPre: 'Kadeřnictví, kde ', heroEm: 'vlasy dostanou péči', heroSuf: '',
    heroSub: 'Střihy, barvení a vlasové kúry pro muže, ženy i děti — v salonu GoldenZen v srdci Břevnova.',
    book: 'Rezervovat termín', priceCta: 'Ceník',
    introEy: 'O kadeřnictví', introPre: 'Kadeřnický salon v ', introEm: 'Břevnově', introSuf: '',
    p1: 'Kadeřnictví GoldenZen v Praze 6 – Břevnově nabízí střihy, barvení a vlasovou péči pro celou rodinu. Pracujeme s muži, ženami i dětmi a každý střih přizpůsobujeme typu vlasů a tomu, co od nich chcete.',
    p2: 'Kromě klasických střihů a barvení se u nás poradíte i s výběrem odstínu, technikou baleáže nebo melíru a péčí, která vlasy po zákroku udrží v dobrém stavu. Salon najdete přímo na Bělohorské ulici, pár minut od zastávky Břevnovský klášter.',
    p3pre: 'Pro konkrétnější potřeby máte samostatné stránky pro ', p3link1: 'pánské', p3mid: ' a ', p3link2: 'dámské kadeřnictví', p3end: ' nebo ', p3link3: 'barvení vlasů', p3dot: '.',
    priceEy: 'Ceník', pricePre: 'Kadeřnické ', priceEm: 'služby', priceSuf: '',
    priceSub: 'Orientační ceny od — přesnou kalkulaci podle délky a hustoty vlasů dostanete při rezervaci nebo na místě.',
    prices: [ ['Pánský střih', 'od 100 Kč'], ['Dámský střih', 'od 100 Kč'], ['Barvení, baleáž, melír', 'dle konzultace'], ['Vlasové kúry', 'dle konzultace'] ],
    faqEy: 'Časté dotazy', faqPre: 'Kadeřnictví ', faqEm: 'Praha 6', faqSuf: '',
    faqs: [
      ['Je kadeřnictví GoldenZen otevřené i o víkendu?', 'Ano, salon je otevřený sedm dní v týdnu — o víkendu od 10:00 do 21:00, v týdnu od 9:00 do 21:00.'],
      ['Stříháte i děti?', 'Ano, dětské střihy jsou součástí nabídky vedle pánských a dámských.'],
      ['Kolik stojí barvení vlasů?', 'Cena barvení, baleáže nebo melíru se odvíjí od délky a hustoty vlasů, proto ji stanovujeme individuálně při rezervaci nebo na konzultaci v salonu.'],
    ],
    relEy: 'Vyberte si přesněji', relPre: 'Naše ', relEm: 'kadeřnické služby', relSuf: '',
    related: [
      ['/panske-kadernictvi-praha-6/', 'Pánské kadeřnictví', 'Střihy a úprava vousů pro muže v Břevnově.'],
      ['/damske-kadernictvi-praha-6/', 'Dámské kadeřnictví', 'Střihy, barvení a vlasové kúry pro ženy.'],
      ['/barveni-vlasu-praha-6/', 'Barvení vlasů', 'Baleáž, melír a celková barva na míru.'],
      ['/masaze-praha-6/', 'Masáže Praha 6', 'Relaxační a regenerační masáže v salonu.'],
    ],
    bookEy: 'Online rezervace', bookPre: 'Objednejte se ', bookEm: 'k nám', bookSuf: '',
    bookSub: 'Vyberte termín, který vám vyhovuje, a nechte zbytek na nás.', bookCta: 'Rezervovat kadeřnictví',
  },
  en: {
    heroEy: 'Hairdressing · Prague 6 – Břevnov',
    heroPre: 'A hair salon where ', heroEm: 'your hair gets real care', heroSuf: '',
    heroSub: 'Cuts, colouring and hair treatments for men, women and children — at GoldenZen, in the heart of Břevnov.',
    book: 'Book an appointment', priceCta: 'Pricing',
    introEy: 'About us', introPre: 'A hair salon in ', introEm: 'Břevnov', introSuf: '',
    p1: 'GoldenZen hairdressing in Prague 6 – Břevnov offers cuts, colouring and hair care for the whole family. We work with men, women and children, tailoring every cut to hair type and what you actually want from it.',
    p2: "Beyond classic cuts and colouring, we'll help you choose a shade, a balayage or highlights technique, and aftercare that keeps hair in good shape once you leave. The salon sits right on Bělohorská street, a few minutes from the Břevnovský klášter tram stop.",
    p3pre: 'Looking for something more specific? See our pages for ', p3link1: "men's", p3mid: ' and ', p3link2: "women's hairdressing", p3end: ' or ', p3link3: 'hair colouring', p3dot: '.',
    priceEy: 'Pricing', pricePre: 'Hairdressing ', priceEm: 'services', priceSuf: '',
    priceSub: "Starting prices — the exact cost depends on hair length and thickness, confirmed at booking or in the salon.",
    prices: [ ["Men's cut", 'from 100 CZK'], ["Women's cut", 'from 100 CZK'], ['Colouring, balayage, highlights', 'by consultation'], ['Hair treatments', 'by consultation'] ],
    faqEy: 'FAQ', faqPre: 'Hairdressing in ', faqEm: 'Prague 6', faqSuf: '',
    faqs: [
      ['Is GoldenZen open on weekends?', 'Yes, the salon is open seven days a week — weekends 10am to 9pm, weekdays 9am to 9pm.'],
      ['Do you cut children\u2019s hair?', "Yes, children's cuts are part of the offering alongside men's and women's."],
      ['How much does hair colouring cost?', 'The price of colouring, balayage or highlights depends on hair length and thickness, so we quote it individually at booking or during an in-salon consultation.'],
    ],
    relEy: 'Choose more precisely', relPre: 'Our ', relEm: 'hairdressing services', relSuf: '',
    related: [
      ['/panske-kadernictvi-praha-6/', "Men's hairdressing", "Cuts and beard grooming for men in Břevnov."],
      ['/damske-kadernictvi-praha-6/', "Women's hairdressing", 'Cuts, colouring and hair treatments for women.'],
      ['/barveni-vlasu-praha-6/', 'Hair colouring', 'Balayage, highlights and full colour, tailored to you.'],
      ['/masaze-praha-6/', 'Massages Prague 6', 'Relaxing and restorative massages at the salon.'],
    ],
    bookEy: 'Online booking', bookPre: 'Book your ', bookEm: 'visit', bookSuf: '',
    bookSub: "Pick a time that works for you, and we'll take care of the rest.", bookCta: 'Book hairdressing',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Kadeřnictví',
  name: 'Kadeřnictví Praha 6 – GoldenZen',
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
          <p>{t.p3pre}<a href="/panske-kadernictvi-praha-6/">{t.p3link1}</a>{t.p3mid}<a href="/damske-kadernictvi-praha-6/">{t.p3link2}</a>{t.p3end}<a href="/barveni-vlasu-praha-6/">{t.p3link3}</a>{t.p3dot}</p>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <div className="section-eyebrow">{t.priceEy}</div>
          <h2 className="section-title">{t.pricePre}<em>{t.priceEm}</em>{t.priceSuf}</h2>
          <p className="section-sub">{t.priceSub}</p>
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
