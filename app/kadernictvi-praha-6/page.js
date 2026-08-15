import Content from './Content'

export const metadata = {
  title: 'Kadeřnictví Praha 6 – Břevnov | Střihy, barvení, baleáž | GoldenZen',
  description: 'Pánské i dámské kadeřnictví v Praze 6 – Břevnově. Střihy, barvení, baleáž a vlasové kúry od zkušených kadeřníků. Objednejte se online.',
  alternates: { canonical: 'https://www.goldenzen.cz/kadernictvi-praha-6/' },
  openGraph: {
    title: 'Kadeřnictví Praha 6 – Břevnov | GoldenZen',
    description: 'Pánské i dámské kadeřnictví v Praze 6 – Břevnově. Střihy, barvení, baleáž a vlasové kúry.',
    url: 'https://www.goldenzen.cz/kadernictvi-praha-6/',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function Page() {
  return <Content />
}
