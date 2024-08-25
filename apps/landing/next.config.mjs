/** @type {import('next').NextConfig} */
const config = {
    transpilePackages: [
        "@logicate/ui",
        "@logicate/tailwind",
        "@logicate/utils"
    ],
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"]
        })

        return config;
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async redirects() {
        return []
    },
    experimental: {
        typedRoutes: true,
    },
};

export default config;
