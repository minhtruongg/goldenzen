'use client'
import { siteCSS } from '../components/siteStyles'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import { LangProvider, useLang } from '../components/LangContext'

const T = {
  cs: {
    h1: 'Ochrana osobních údajů',
    updated: 'Platné od 2. 10. 2026',
    intro:
      'Tyto zásady popisují, jaké osobní údaje GoldenZen zpracovává při rezervaci termínu ' +
      'a při nákupu dárkového poukazu přes web www.goldenzen.cz, proč je zpracovává a jaká ' +
      'máte v souvislosti s tím práva podle nařízení GDPR (EU) 2016/679.',
    sections: [
      {
        h: 'Kdo je správcem údajů',
        p: [
          'Správcem osobních údajů je GoldenZen, Bělohorská 1686/118, 169 00 Praha 6 – Břevnov. ' +
            'Tel. +420 778 085 666. Email: goldenzensalon@gmail.com. V záležitostech ochrany osobních údajů nás můžete kontaktovat ' +
            'telefonicky na tomto čísle nebo emailem.',
        ],
      },
      {
        h: 'Jaké údaje zpracováváme',
        p: [
          'Při rezervaci termínu: jméno, telefonní číslo, nepovinně e-mail, a poznámka k rezervaci, pokud ji vyplníte.',
          'Při nákupu dárkového poukazu: jméno, telefonní číslo, e-mail a údaje o zvolené hodnotě poukazu.',
        ],
      },
      {
        h: 'Proč údaje zpracováváme',
        list: [
          'Abychom mohli potvrdit a zajistit vaši rezervaci nebo vyřídit objednávku poukazu.',
          'Abychom vás mohli v případě potřeby kontaktovat ohledně termínu nebo objednávky.',
          'Pro vedení evidence zákazníků a rezervací v rámci běžného provozu salonu.',
        ],
        p: [
          'Právním základem zpracování je plnění smlouvy, respektive jednání o jejím uzavření ' +
            '(čl. 6 odst. 1 písm. b) GDPR), v případě evidence zákazníků náš oprávněný zájem na ' +
            'řádném vedení provozu salonu.',
        ],
      },
      {
        h: 'Komu údaje předáváme',
        p: [
          'Údaje nikomu neprodáváme ani nepoužíváme k marketingu třetích stran. Zpracovávají je ' +
            'pro nás výhradně poskytovatelé technických služeb, které používáme k provozu webu ' +
            'a rezervačního systému: hosting webu (Vercel), databáze rezervací a zákazníků ' +
            '(Supabase) a interní upozornění na novou rezervaci, která odesíláme prostřednictvím ' +
            'služby Telegram. U těchto poskytovatelů může docházet ke zpracování i mimo Evropskou ' +
            'unii, vždy však pouze v rozsahu nutném k zajištění uvedených služeb.',
        ],
      },
      {
        h: 'Jak dlouho údaje uchováváme',
        p: [
          'Údaje uchováváme po dobu nezbytnou k vyřízení rezervace či objednávky a k vedení ' +
            'navazující zákaznické evidence, nejdéle však po dobu vyžadovanou právními předpisy.',
        ],
      },
      {
        h: 'Cookies',
        p: [
          'Web nepoužívá žádné marketingové ani analytické cookies. Jediné cookie, které ' +
            'používáme, je technické přihlašovací cookie pro administraci salonu — běžný ' +
            'návštěvník webu se s ním nesetká.',
        ],
      },
      {
        h: 'Vaše práva',
        p: ['V souladu s GDPR máte právo na:'],
        list: [
          'přístup ke svým osobním údajům,',
          'opravu nepřesných údajů,',
          'výmaz údajů, pokud k jejich zpracování již není důvod,',
          'omezení zpracování a vznesení námitky proti němu,',
          'přenositelnost údajů,',
          'podání stížnosti u Úřadu pro ochranu osobních údajů (uoou.cz), pokud se domníváte, že bylo porušeno vaše právo na ochranu osobních údajů.',
        ],
        pAfter: ['Svá práva můžete uplatnit telefonicky na čísle uvedeném výše nebo emailem.'],
      },
    ],
  },
  en: {
    h1: 'Privacy Policy',
    updated: 'Effective from 2 Oct 2026',
    intro:
      'This policy describes what personal data GoldenZen processes when you book an appointment ' +
      'or buy a gift voucher through www.goldenzen.cz, why we process it, and what rights you have ' +
      'in connection with that under the GDPR (EU Regulation 2016/679).',
    sections: [
      {
        h: 'Who the data controller is',
        p: [
          'The data controller is GoldenZen, Bělohorská 1686/118, 169 00 Prague 6 – Břevnov. ' +
            'Tel: +420 778 085 666. Email: goldenzensalon@gmail.com. For anything related to data protection, you can reach us by ' +
            'phone at this number or email.',
        ],
      },
      {
        h: 'What data we process',
        p: [
          'For an appointment booking: name, phone number, optionally an email address, and a booking note if you add one.',
          'For a gift voucher purchase: name, phone number, email address, and the chosen voucher value.',
        ],
      },
      {
        h: 'Why we process it',
        list: [
          'To confirm and secure your booking, or to process a voucher order.',
          'To contact you if needed about an appointment or an order.',
          "To keep customer and booking records as part of the salon's normal operation.",
        ],
        p: [
          'The legal basis for processing is performance of a contract, or steps taken prior to ' +
            'entering one (Art. 6(1)(b) GDPR); for customer records, it is our legitimate interest ' +
            'in running the salon properly.',
        ],
      },
      {
        h: 'Who we share data with',
        p: [
          'We do not sell your data or use it for third-party marketing. It is processed solely by ' +
            'the technical service providers we use to run the website and booking system: website ' +
            'hosting (Vercel), the booking and customer database (Supabase), and internal ' +
            'notifications about new bookings, which we send via Telegram. Processing by these ' +
            'providers may take place outside the European Union, but only to the extent necessary ' +
            'to provide those services.',
        ],
      },
      {
        h: 'How long we keep data',
        p: [
          'We keep data for as long as necessary to process a booking or order and to maintain the ' +
            'related customer records, and in any case no longer than required by law.',
        ],
      },
      {
        h: 'Cookies',
        p: [
          'The website does not use any marketing or analytics cookies. The only cookie we use is a ' +
            'technical login cookie for salon administration — an ordinary visitor to the site never ' +
            'encounters it.',
        ],
      },
      {
        h: 'Your rights',
        p: ['Under the GDPR, you have the right to:'],
        list: [
          'access your personal data,',
          'have inaccurate data corrected,',
          'have your data erased once there is no longer a reason to process it,',
          'restrict processing and object to it,',
          'data portability,',
          'lodge a complaint with the Czech Office for Personal Data Protection (uoou.cz) if you believe your data protection rights have been violated.',
        ],
        pAfter: ['You can exercise your rights by phone, at the number above, or by email.'],
      },
    ],
  },
}

function Inner() {
  const { lang } = useLang()
  const t = T[lang]
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCSS }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
.legal{max-width:760px;margin:0 auto;padding:7rem 1.5rem 4rem}
.legal h1{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,40px);font-weight:400;margin-bottom:.5rem}
.legal .updated{color:var(--muted);font-size:14px;margin-bottom:2.5rem}
.legal h2{font-family:'Playfair Display',serif;font-size:22px;font-weight:500;margin:2.25rem 0 .75rem}
.legal p,.legal li{font-size:16px;line-height:1.7;color:var(--muted)}
.legal ul{padding-left:1.25rem;margin:.5rem 0}
.legal li{margin-bottom:.4rem}
.legal a{color:var(--gold)}
`,
        }}
      />
      <SiteNav />
      <main className="legal">
        <h1>{t.h1}</h1>
        <p className="updated">{t.updated}</p>
        <p>{t.intro}</p>

        {t.sections.map((s) => (
          <div key={s.h}>
            <h2>{s.h}</h2>
            {s.p && s.p.map((para) => <p key={para}>{para}</p>)}
            {s.list && (
              <ul>
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {s.pAfter && s.pAfter.map((para) => <p key={para}>{para}</p>)}
          </div>
        ))}
      </main>
      <SiteFooter lang={lang} />
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