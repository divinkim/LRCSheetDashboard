/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  // experimental: { appDir: true }, // Vous pouvez probablement supprimer cette ligne si vous êtes en v13.4+
  assetPrefix: process.env.NODE_ENV === "production" ? "/_next/" : undefined,

  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
};

export default nextConfig;