module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/reports',
        destination: '/reports/mrr',
        permanent: false,
      },
    ]
  },
  future: { webpack5: true, strictPostcssConfiguration: true },
}
