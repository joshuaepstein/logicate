import { Job } from '@pierre/recipes/vercel';

export const label = 'Vercel';

export default Job({
  VERCEL_ORG_ID: env.VERCEL_ORG_ID,
  VERCEL_PROJECT_ID: env.VERCEL_PROJECT_ID,
});
