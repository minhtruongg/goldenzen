import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://www.goldenzen.cz'),
  title: {
    default: 'Kadeřnictví a masáže Praha 6 – Břevnov | GoldenZen',
    template: '%s | GoldenZen',
  },
  description: 'Wellness centrum v Praze 6 – Břevnově. Kadeřnictví, thajské masáže, kosmetika i péče o nehty pod jednou střechou. Rezervujte si termín online.',
  openGraph: {
    title: 'Kadeřnictví a masáže Praha 6 – Břevnov | GoldenZen',
    description: 'Wellness centrum v Praze 6 – Břevnově. Kadeřnictví, thajské masáže, kosmetika i péče o nehty pod jednou střechou.',
    siteName: 'GoldenZen',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <head>
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/98c3f84c2fe316d31d65da7fc9426808/script.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17694983340"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17694983340');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}