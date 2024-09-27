import * as z from 'zod';

export const props_searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  locationId: z.string().optional(),
  quantity: z.coerce.number().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(['and', 'or']).optional(),
});

export const getPropsSchema = props_searchParamsSchema;

export type GetPropsSchema = z.infer<typeof getPropsSchema>;
