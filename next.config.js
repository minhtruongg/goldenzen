/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The homepage used to live at /goldenzen.html. One permanent hop to the canonical root.
      { source: '/goldenzen.html', destination: '/', permanent: true },
      // Old inbound links (e.g. a Facebook post) point at /goldenzen/ and hit a 404.
      { source: '/goldenzen', destination: '/', permanent: true },
    ]
  },
}
module.exports = nextConfig
