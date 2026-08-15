'use client'
import { siteCSS } from '../components/siteStyles'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import { LocalBox } from '../components/localInfo'
import { LangProvider, useLang } from '../components/LangContext'

const T = {
  cs: {
    heroEy: 'Barvení vlasů · Praha 6',
    heroPre: 'Barva, která ', heroEm: 'vlasům sluší', heroSuf: '',
    heroSub: 'Baleáž, melír i celková barva v salonu GoldenZen — s péčí, která vlasy po zákroku udrží v dobrém stavu.',
    book: 'Rezervovat termín', priceCta: 'Ceník',
    introEy: 'O službě', introPre: 'Barvení vlasů v ', introEm: 'Břevnově', introSuf: '',
    p1: 'Barvení vlasů v GoldenZen začíná konzultací — probereme s vámi odstín, techniku a to, jak barva zapadne do vašeho běžného účesu. Nabízíme celkovou barvu, melír i baleáž, včetně péče, která vlasy po zákroku zklidní.',
    p2: 'Pracujeme s vlasy všech délek a hustot, proto přesnou cenu i délku procedury stanovujeme individuálně — nejlépe na místě, kde vidíme, s čím pracujeme.',
    p3pre: 'Chcete k barvení i střih? Podívejte se na ', p3link1: 'dámské', p3mid: ' nebo ', p3link2: 'pánské kadeřnictví', p3end: ', případně na celý přehled ', p3link3: 'kadeřnických služeb', p3dot: '.',
    priceEy: 'Ceník', pricePre: 'Techniky ', priceEm: 'barvení', priceSuf: '',
    priceSub: 'Cena se odvíjí od délky a hustoty vlasů — přesnou částku dostanete při rezervaci nebo na konzultaci v salonu.',
    prices: [ ['Celková barva', 'dle konzultace'], ['Melír', 'dle konzultace'], ['Baleáž', 'dle konzultace'] ],
    faqEy: 'Časté dotazy', faqPre: 'Barvení vlasů ', faqEm: 'Praha 6', faqSuf: '',
    faqs: [
      ['Jaký je rozdíl mezi baleáží a melírem?', 'Baleáž rozjasňuje konce a vytváří plynulý přechod, melír zesvětluje jednotlivé prameny po celé délce. Kterou techniku zvolit, doporučíme podle vašich vlasů na konzultaci.'],
      ['Barvíte i poškozené nebo suché vlasy?', 'Ano, u citlivějších vlasů volíme šetrnější postup a doporučíme vlasovou kúru, která barvu podpoří.'],
    ],
    relEy: 'Podívejte se i na', relPre: 'Další ', relEm: 'služby', relSuf: '',
    related: [
      ['/damske-kadernictvi-praha-6/', 'Dámské kadeřnictví', 'Střihy, barvení a vlasové kúry pro ženy.'],
      ['/kadernictvi-praha-6/', 'Kadeřnictví Praha 6', 'Přehled všech kadeřnických služeb.'],
      ['/masaze-praha-6/', 'Masáže Praha 6', 'Relaxační a regenerační masáže v salonu.'],
    ],
    bookEy: 'Online rezervace', bookPre: 'Objednejte se ', bookEm: 'k nám', bookSuf: '',
    bookSub: 'Vyberte termín, který vám vyhovuje, a nechte zbytek na nás.', bookCta: 'Rezervovat barvení',
  },
  en: {
    heroEy: 'Hair colouring · Prague 6',
    heroPre: 'Colour that ', heroEm: 'actually suits your hair', heroSuf: '',
    heroSub: 'Balayage, highlights and full colour at GoldenZen — with aftercare that keeps hair in good shape.',
    book: 'Book an appointment', priceCta: 'Pricing',
    introEy: 'About us', introPre: 'Hair colouring in ', introEm: 'Břevnov', introSuf: '',
    p1: "Colouring at GoldenZen starts with a consultation — we'll talk through shade, technique, and how the colour will fit your everyday style. We offer full colour, highlights and balayage, plus aftercare that settles hair once the treatment is done.",
    p2: 'We work with all hair lengths and thicknesses, so exact pricing and treatment time are set individually — best done in person, where we can actually see what we\u2019re working with.',
    p3pre: 'Want a cut with your colour? See ', p3link1: "women's", p3mid: ' or ', p3link2: "men's hairdressing", p3end: ', or the full ', p3link3: 'hairdressing overview', p3dot: '.',
    priceEy: 'Pricing', pricePre: 'Colouring ', priceEm: 'techniques', priceSuf: '',
    priceSub: 'Price depends on hair length and thickness — the exact amount is confirmed at booking or during an in-salon consultation.',
    prices: [ ['Full colour', 'by consultation'], ['Highlights', 'by consultation'], ['Balayage', 'by consultation'] ],
    faqEy: 'FAQ', faqPre: 'Hair colouring in ', faqEm: 'Prague 6', faqSuf: '',
    faqs: [
      ["What's the difference between balayage and highlights?", 'Balayage brightens the ends for a soft gradient, while highlights lighten individual strands along the full length. We\u2019ll recommend the right technique for your hair at the consultation.'],
      ['Do you colour damaged or dry hair?', "Yes, for more sensitive hair we use a gentler process and recommend a hair treatment to support the colour."],
    ],
    relEy: 'Also see', relPre: 'Other ', relEm: 'services', relSuf: '',
    related: [
      ['/damske-kadernictvi-praha-6/', "Women's hairdressing", 'Cuts, colouring and hair treatments for women.'],
      ['/kadernictvi-praha-6/', 'Hairdressing Prague 6', 'An overview of all hairdressing services.'],
      ['/masaze-praha-6/', 'Massages Prague 6', 'Relaxing and restorative massages at the salon.'],
    ],
    bookEy: 'Online booking', bookPre: 'Book your ', bookEm: 'visit', bookSuf: '',
    bookSub: "Pick a time that works for you, and we'll take care of the rest.", bookCta: 'Book colouring',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Barvení vlasů',
  name: 'Barvení vlasů Praha 6 – GoldenZen',
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
          <p>{t.p3pre}<a href="/damske-kadernictvi-praha-6/">{t.p3link1}</a>{t.p3mid}<a href="/panske-kadernictvi-praha-6/">{t.p3link2}</a>{t.p3end}<a href="/kadernictvi-praha-6/">{t.p3link3}</a>{t.p3dot}</p>
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
