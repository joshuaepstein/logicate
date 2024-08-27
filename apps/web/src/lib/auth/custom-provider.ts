import { PrismaAdapter } from "@auth/prisma-adapter";
import { ExtendedPrismaClient, PrismaClient } from "@logicate/database";
import { Adapter } from "next-auth/adapters";

export function CustomPrismaAdapter(client: ExtendedPrismaClient): Adapter {
  return {
    ...PrismaAdapter(client as PrismaClient),
  };
}
