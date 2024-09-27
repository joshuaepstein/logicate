import { default as withBundleAnalyzer } from '@next/bundle-analyzer';
import dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
});

/** @type {import('next').NextConfig} */
const config = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [];
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
