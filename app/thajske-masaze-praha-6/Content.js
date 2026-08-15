'use client'
import { siteCSS } from '../components/siteStyles'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import { LocalBox } from '../components/localInfo'
import { LangProvider, useLang } from '../components/LangContext'

const T = {
  cs: {
    heroEy: 'Thajské masáže · Praha 6',
    heroPre: 'Tradiční thajská masáž ', heroEm: 'v Břevnově', heroSuf: '',
    heroSub: 'Uvolněte napětí ve svalech a obnovte energii tradiční thajskou masáží v salonu GoldenZen.',
    book: 'Rezervovat masáž', priceCta: 'Ceník',
    introEy: 'O službě', introPre: 'Thajská masáž v ', introEm: 'GoldenZen', introSuf: '',
    p1: 'Thajská masáž kombinuje tlak na svaly, protahování a práci s dechem — výsledkem je uvolnění, které cítíte ještě dny po proceduře. V GoldenZen ji provádíme podle tradičních postupů, přizpůsobených tomu, jak moc napětí s sebou nesete.',
    p2: 'Masáž probíhá v klidném prostředí salonu na Bělohorské ulici v Praze 6 – Břevnově, otevřeno máme sedm dní v týdnu.',
    p3pre: 'Kromě thajské masáže nabízíme i olejovou masáž, masáž horkými kameny nebo párovou masáž — celý přehled najdete na stránce ', p3link1: 'masáže Praha 6', p3dot: '.',
    priceEy: 'Ceník', pricePre: 'Thajská ', priceEm: 'masáž', priceSuf: '',
    prices: [ ['Tradiční thajská masáž', 'od 490 Kč'], ['Thajská masáž pro dva', 'od 1 490 Kč'] ],
    faqEy: 'Časté dotazy', faqPre: 'Thajské masáže ', faqEm: 'Praha 6', faqSuf: '',
    faqs: [
      ['Bolí thajská masáž?', 'Intenzitu tlaku přizpůsobíme tomu, co vám vyhovuje — před masáží se vždy zeptáme, jak silný tlak preferujete.'],
      ['Můžu si objednat thajskou masáž pro dva?', 'Ano, thajskou masáž nabízíme i jako párovou proceduru ve stejné místnosti.'],
    ],
    relEy: 'Podívejte se i na', relPre: 'Další ', relEm: 'masáže', relSuf: '',
    related: [
      ['/masaze-praha-6/', 'Masáže Praha 6', 'Přehled všech druhů masáží v salonu.'],
      ['/kadernictvi-praha-6/', 'Kadeřnictví Praha 6', 'Střihy, barvení a vlasová péče.'],
    ],
    bookEy: 'Online rezervace', bookPre: 'Rezervujte si ', bookEm: 'svůj čas', bookSuf: '',
    bookSub: 'Vyberte termín, který vám vyhovuje, a nechte zbytek na nás.', bookCta: 'Rezervovat thajskou masáž',
  },
  en: {
    heroEy: 'Thai massage · Prague 6',
    heroPre: 'Traditional Thai massage ', heroEm: 'in Břevnov', heroSuf: '',
    heroSub: 'Release muscle tension and restore your energy with traditional Thai massage at GoldenZen.',
    book: 'Book a massage', priceCta: 'Pricing',
    introEy: 'About us', introPre: 'Thai massage at ', introEm: 'GoldenZen', introSuf: '',
    p1: 'Thai massage combines pressure on the muscles, stretching and breathwork — the result is a release you can still feel days after the treatment. At GoldenZen we follow traditional techniques, adjusted to how much tension you\u2019re carrying.',
    p2: 'The massage takes place in the calm surroundings of our salon on Bělohorská street in Prague 6 – Břevnov, open seven days a week.',
    p3pre: 'Beyond Thai massage we also offer oil massage, hot stone massage and couple massage — see the full overview on the ', p3link1: 'massages Prague 6', p3dot: ' page.',
    priceEy: 'Pricing', pricePre: 'Thai ', priceEm: 'massage', priceSuf: '',
    prices: [ ['Traditional Thai massage', 'from 490 CZK'], ['Thai massage for two', 'from 1 490 CZK'] ],
    faqEy: 'FAQ', faqPre: 'Thai massage in ', faqEm: 'Prague 6', faqSuf: '',
    faqs: [
      ['Does Thai massage hurt?', 'We adjust pressure to what works for you — we always ask beforehand how firm you\u2019d like it.'],
      ['Can I book Thai massage for two?', 'Yes, we also offer Thai massage as a couple treatment in the same room.'],
    ],
    relEy: 'Also see', relPre: 'Other ', relEm: 'massages', relSuf: '',
    related: [
      ['/masaze-praha-6/', 'Massages Prague 6', 'An overview of all massage types at the salon.'],
      ['/kadernictvi-praha-6/', 'Hairdressing Prague 6', 'Cuts, colouring and hair care.'],
    ],
    bookEy: 'Online booking', bookPre: 'Book your ', bookEm: 'time', bookSuf: '',
    bookSub: "Pick a time that works for you, and we'll take care of the rest.", bookCta: 'Book Thai massage',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Thajská masáž',
  name: 'Thajské masáže Praha 6 – GoldenZen',
  areaServed: { '@type': 'City', name: 'Praha 6 – Břevnov' },
  offers: { '@type': 'Offer', priceCurrency: 'CZK', price: '490', description: 'Thajská masáž, cena od' },
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
          <p>{t.p3pre}<a href="/masaze-praha-6/">{t.p3link1}</a>{t.p3dot}</p>
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
