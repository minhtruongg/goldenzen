'use client'
import { useState } from 'react'
import { useLang } from './LangContext'

const NAV = {
  cs: { hair: 'Kadeřnictví', massage: 'Masáže', vouchers: 'Dárkové poukazy', contact: 'Kontakt', book: 'Rezervace' },
  en: { hair: 'Hairdressing', massage: 'Massages', vouchers: 'Gift vouchers', contact: 'Contact', book: 'Book now' },
}

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLang()
  const t = NAV[lang]
  return (
    <nav>
      <a href="/" className="nav-logo">Golden<em>Zen</em></a>
      <div className={`nav-links${open ? ' open' : ''}`}>
        <a href="/kadernictvi-praha-6/">{t.hair}</a>
        <a href="/masaze-praha-6/">{t.massage}</a>
        <a href="/#vouchers">{t.vouchers}</a>
        <a href="/#contact">{t.contact}</a>
      </div>
      <div className="nav-right">
        <div className="lang-btn">
          <button className={`lb${lang === 'cs' ? ' a' : ''}`} onClick={() => setLang('cs')}>CZ</button>
          <button className={`lb${lang === 'en' ? ' a' : ''}`} onClick={() => setLang('en')}>EN</button>
        </div>
        <a href="/goldenzen-booking.html" className="nav-cta">{t.book}</a>
      </div>
      <button className="hamburger" aria-label="Menu" onClick={() => setOpen(!open)}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  )
}
