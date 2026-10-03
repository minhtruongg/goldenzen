const base = 'https://www.goldenzen.cz'

// Canonical, publicly indexable pages only. Service URLs have no trailing slash,
// matching Next.js's default routing (a trailing slash 308-redirects).
const services = [
  'kadernictvi-praha-6',
  'panske-kadernictvi-praha-6',
  'damske-kadernictvi-praha-6',
  'barveni-vlasu-praha-6',
  'masaze-praha-6',
  'thajske-masaze-praha-6',
]

export default function sitemap() {
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    ...services.map((slug) => ({ url: `${base}/${slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    { url: `${base}/ochrana-osobnich-udaju`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
