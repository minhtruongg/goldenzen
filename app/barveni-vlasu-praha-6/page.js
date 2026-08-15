import Content from './Content'

export const metadata = {
  title: 'Barvení vlasů Praha 6 | Baleáž, melír, celková barva | GoldenZen',
  description: 'Profesionální barvení vlasů v salonu GoldenZen, Praha 6 – Břevnov. Baleáž, melír i celková barva s péčí o vlasy. Rezervace online.',
  alternates: { canonical: 'https://www.goldenzen.cz/barveni-vlasu-praha-6/' },
  openGraph: {
    title: 'Barvení vlasů Praha 6 | GoldenZen',
    description: 'Baleáž, melír i celková barva s péčí o vlasy — Praha 6, Břevnov.',
    url: 'https://www.goldenzen.cz/barveni-vlasu-praha-6/',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function Page() {
  return <Content />
}
