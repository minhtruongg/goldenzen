export const metadata = {
  title: 'Ochrana osobních údajů | GoldenZen',
  description:
    'Zásady ochrany osobních údajů GoldenZen — jaké údaje při rezervaci a nákupu poukazu zpracováváme, proč, a jaká máte práva podle GDPR.',
  alternates: { canonical: 'https://www.goldenzen.cz/ochrana-osobnich-udaju' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Ochrana osobních údajů | GoldenZen',
    description: 'Zásady ochrany osobních údajů GoldenZen podle GDPR.',
    url: 'https://www.goldenzen.cz/ochrana-osobnich-udaju',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function Page() {
  return <Content />
}

import Content from './Content'
