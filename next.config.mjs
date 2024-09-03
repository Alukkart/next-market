/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  //   experimental: {
  //     missingSuspenseWithCSRBailout: false,
  //   },
};

export default nextConfig;
