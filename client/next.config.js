const withNextI18N = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  }
}

module.exports = withNextI18N(nextConfig)
