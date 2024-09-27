import { PrismaClient } from '@prisma/client';

export type * from '@prisma/client';

// Serverless prisma
const prismaClientSingleton = () => {
  return new PrismaClient({
    omit: {
      user: { password: true },
    },
  });
};

export type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>;

declare const globalThis: {
  prismaGlobal: ExtendedPrismaClient;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
