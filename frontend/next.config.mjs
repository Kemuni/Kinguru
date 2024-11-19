/** @type {import('next').NextConfig} */
const nextConfig = {
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
