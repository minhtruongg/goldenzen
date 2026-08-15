export const LOCAL = {
  cs: {
    eyebrow: 'Kde nás najdete',
    title: ['Praha 6 – ', 'Břevnov'],
    addrLabel: 'Adresa', addr: 'Bělohorská 1686/118, 169 00 Praha 6 – Břevnov',
    phoneLabel: 'Telefon',
    hoursLabel: 'Otevřeno', hours: 'Po – Pá: 9:00 – 21:00 · So – Ne: 10:00 – 21:00',
  },
  en: {
    eyebrow: 'Find us',
    title: ['Prague 6 – ', 'Břevnov'],
    addrLabel: 'Address', addr: 'Bělohorská 1686/118, 169 00 Prague 6 – Břevnov',
    phoneLabel: 'Phone',
    hoursLabel: 'Open', hours: 'Mon – Fri: 9am – 9pm · Sat – Sun: 10am – 9pm',
  },
}

export function LocalBox({ lang }) {
  const t = LOCAL[lang]
  return (
    <section>
      <div className="container">
        <div className="section-eyebrow">{t.eyebrow}</div>
        <h2 className="section-title">{t.title[0]}<em>{t.title[1]}</em></h2>
        <div className="local-box">
          <div className="local-row"><b>{t.addrLabel}</b><span>{t.addr}</span></div>
          <div className="local-row"><b>{t.phoneLabel}</b><span><a href="tel:+420778085666" style={{ color: 'var(--gold)' }}>+420 778 085 666</a></span></div>
          <div className="local-row"><b>{t.hoursLabel}</b><span>{t.hours}</span></div>
        </div>
      </div>
    </section>
  )
}
