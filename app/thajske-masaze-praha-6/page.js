import Content from './Content'

export const metadata = {
  title: 'Thajské masáže Praha 6 – Břevnov | GoldenZen',
  description: 'Tradiční thajská masáž v centru Břevnova. Uvolněte napětí, obnovte energii. Zkušení maséři, klidné prostředí, snadná rezervace online.',
  alternates: { canonical: 'https://www.goldenzen.cz/thajske-masaze-praha-6/' },
  openGraph: {
    title: 'Thajské masáže Praha 6 – Břevnov | GoldenZen',
    description: 'Tradiční thajská masáž v centru Břevnova — Praha 6.',
    url: 'https://www.goldenzen.cz/thajske-masaze-praha-6/',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function Page() {
  return <Content />
}
