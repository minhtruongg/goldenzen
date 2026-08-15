import Content from './Content'

export const metadata = {
  title: 'Masáže Praha 6 – Břevnov | Thajské, olejové, párové | GoldenZen',
  description: 'Relaxační i regenerační masáže v Praze 6. Thajské, olejové, masáž horkými kameny nebo párová masáž. Ceny od 490 Kč, rezervace online.',
  alternates: { canonical: 'https://www.goldenzen.cz/masaze-praha-6/' },
  openGraph: {
    title: 'Masáže Praha 6 – Břevnov | GoldenZen',
    description: 'Relaxační i regenerační masáže v Praze 6 – Břevnově. Ceny od 490 Kč.',
    url: 'https://www.goldenzen.cz/masaze-praha-6/',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function Page() {
  return <Content />
}
