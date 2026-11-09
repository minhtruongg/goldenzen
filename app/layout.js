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
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
            gtag('js', new Date());
            gtag('config', 'AW-17694983340');
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('consent', 'revoke');
            fbq('init', '911690525075195');
            fbq('track', 'PageView');

            document.addEventListener('cookieyes_consent_update', function (e) {
              var accepted = (e.detail && e.detail.accepted) || [];
              fbq('consent', accepted.indexOf('advertisement') !== -1 ? 'grant' : 'revoke');
            });
          `}
        </Script>
        {/* End Meta Pixel Code */}
      </head>
      <body>{children}</body>
    </html>
  )
}
