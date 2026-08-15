import Content from './Content'

export const metadata = {
  title: 'Pánské kadeřnictví Praha 6 – Břevnov | GoldenZen',
  description: 'Pánské střihy a úprava vousů v Praze 6. Rychlé objednání, zkušení kadeřníci, příjemné prostředí v srdci Břevnova.',
  alternates: { canonical: 'https://www.goldenzen.cz/panske-kadernictvi-praha-6/' },
  openGraph: {
    title: 'Pánské kadeřnictví Praha 6 – Břevnov | GoldenZen',
    description: 'Pánské střihy a úprava vousů v Praze 6 – Břevnově.',
    url: 'https://www.goldenzen.cz/panske-kadernictvi-praha-6/',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function Page() {
  return <Content />
}
