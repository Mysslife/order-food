/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      "d1yy4cwyokq5tq.cloudfront.net",
      "b.zmtcdn.com",
      "cdn.shopify.com",
      "images.deliveryhero.io",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
