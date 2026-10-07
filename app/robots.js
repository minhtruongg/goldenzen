export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    sitemap: 'https://www.goldenzen.cz/sitemap.xml',
    host: 'https://www.goldenzen.cz',
  }
}
