/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.kino-gu.ru',
                port: '',
            }
        ]
    }
};

export default nextConfig;
