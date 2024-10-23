import { default as withBundleAnalyzer } from '@next/bundle-analyzer';
import dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
});

/** @type {import('next').NextConfig} */
const config = {
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
