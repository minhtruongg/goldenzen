/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The homepage used to live at /goldenzen.html. One permanent hop to the canonical root.
      { source: '/goldenzen.html', destination: '/', permanent: true },
    ]
  },
}
module.exports = nextConfig
