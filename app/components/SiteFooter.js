const LABEL = { cs: 'Ochrana osobních údajů', en: 'Privacy Policy' }

export default function SiteFooter({ lang = 'cs' }) {
  return (
    <footer>
      <div className="footer-logo">Golden<em>Zen</em></div>
      <div className="footer-copy">© 2026 GoldenZen · Bělohorská 1686/118, Praha 6 – Břevnov</div>
      <a href="/ochrana-osobnich-udaju" className="footer-legal">{LABEL[lang] || LABEL.cs}</a>
    </footer>
  )
}