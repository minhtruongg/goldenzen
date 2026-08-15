import Content from './Content'

export const metadata = {
  title: 'Dámské kadeřnictví Praha 6 – Břevnov | GoldenZen',
  description: 'Dámské střihy, barvení a vlasové kúry v Praze 6 – Břevnově. Individuální přístup a moderní techniky. Objednejte se online ještě dnes.',
  alternates: { canonical: 'https://www.goldenzen.cz/damske-kadernictvi-praha-6/' },
  openGraph: {
    title: 'Dámské kadeřnictví Praha 6 – Břevnov | GoldenZen',
    description: 'Dámské střihy, barvení a vlasové kúry v Praze 6 – Břevnově.',
    url: 'https://www.goldenzen.cz/damske-kadernictvi-praha-6/',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function Page() {
  return <Content />
}
