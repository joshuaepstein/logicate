import { default as withBundleAnalyzer } from '@next/bundle-analyzer';
// const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';
import dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
});

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ['@logicate/database', '@logicate/ui', '@logicate/tailwind', '@logicate/utils', '@logicate/emails', '@logicate/questions', '@logicate/types'],
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }


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
