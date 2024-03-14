/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.artfol-image.me',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
