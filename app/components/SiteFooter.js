const LABEL = { cs: 'Ochrana osobních údajů', en: 'Privacy Policy' }

const SERVICES = [
  ['/kadernictvi-praha-6', { cs: 'Kadeřnictví', en: "Hairdressing" }],
  ['/panske-kadernictvi-praha-6', { cs: 'Pánské kadeřnictví', en: "Men's hairdressing" }],
  ['/damske-kadernictvi-praha-6', { cs: 'Dámské kadeřnictví', en: "Women's hairdressing" }],
  ['/barveni-vlasu-praha-6', { cs: 'Barvení vlasů', en: "Hair colouring" }],
  ['/masaze-praha-6', { cs: 'Masáže', en: "Massages" }],
  ['/thajske-masaze-praha-6', { cs: 'Thajské masáže', en: "Thai massages" }],
]

export default function SiteFooter({ lang = 'cs' }) {
  return (
    <footer>
      <div className="footer-logo">Golden<em>Zen</em></div>
      <div className="footer-links" role="navigation" aria-label={lang === 'en' ? 'Services' : 'Služby'}>
        {SERVICES.map(([href, name]) => (
          <a key={href} href={href}>{name[lang] || name.cs}</a>
        ))}
      </div>
      <div className="footer-copy">© 2026 GoldenZen · Bělohorská 1686/118, Praha 6 – Břevnov</div>
      <a href="/ochrana-osobnich-udaju" className="footer-legal">{LABEL[lang] || LABEL.cs}</a>
    </footer>
  )
}