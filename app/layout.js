export const metadata = {
  metadataBase: new URL('https://www.goldenzen.cz'),
  title: {
    default: 'Kadeřnictví a masáže Praha 6 – Břevnov | GoldenZen',
    template: '%s | GoldenZen',
  },
  description: 'Wellness centrum v Praze 6 – Břevnově. Kadeřnictví, thajské masáže, kosmetika i péče o nehty pod jednou střechou. Rezervujte si termín online.',
  alternates: { canonical: 'https://www.goldenzen.cz/' },
  openGraph: {
    title: 'Kadeřnictví a masáže Praha 6 – Břevnov | GoldenZen',
    description: 'Wellness centrum v Praze 6 – Břevnově. Kadeřnictví, thajské masáže, kosmetika i péče o nehty pod jednou střechou.',
    url: 'https://www.goldenzen.cz/',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
