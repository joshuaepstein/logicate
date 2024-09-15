import sharedConfig from '@logicate/tailwind/tailwind.config';
import { type Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}', '../../packages/config/tailwind/tailwind.config.ts'],
  presets: [sharedConfig],
} satisfies Config;

export default config;
