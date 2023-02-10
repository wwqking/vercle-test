/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_KEY: process.env.NEXT_KEY ,
    NEXT_IV: process.env.NEXT_IV ,
    NEXT_X2Y2API: process.env.NEXT_X2Y2API ,
    NEXT_OSAPI: process.env.NEXT_OSAPI ,
    NEXT_MONGO: process.env.NEXT_MONGO ,
    NEXT_ETHERAPI: process.env.NEXT_ETHERAPI,
    NEXT_ETHERAPI2: process.env.NEXT_ETHERAPI2,
  },
}

module.exports = nextConfig