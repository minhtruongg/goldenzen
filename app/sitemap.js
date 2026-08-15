export default function sitemap() {
  const base = 'https://www.goldenzen.cz'
  const routes = [
    '',
    'kadernictvi-praha-6',
    'panske-kadernictvi-praha-6',
    'damske-kadernictvi-praha-6',
    'barveni-vlasu-praha-6',
    'masaze-praha-6',
    'thajske-masaze-praha-6',
  ]
  return routes.map((route) => ({
    url: `${base}/${route}${route ? '/' : ''}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
  }))
}
