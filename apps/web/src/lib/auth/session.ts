import { prisma } from "@logicate/database";
import { getSearchParams } from "@logicate/utils/urls";
import { waitUntil } from "@vercel/functions";
import { NextRequest } from "next/server";
import { handleAndReturnErrorResponse, LogicateError } from "../api/error";
import { hashToken } from "./hash-token";
import { getSession, Session } from "./utils";

interface WithSessionHandler {
  ({
    req,
    params,
    searchParams,
    session,
  }: {
    req: Request;
    params: Record<string, string>;
    searchParams: Record<string, string>;
    session: Session;
  }): Promise<Response>;
}

export const withSession =
  (handler: WithSessionHandler) =>
  async (
    req: NextRequest,
    { params = {} }: { params: Record<string, string> | undefined },
  ) => {
    try {
      let session: Session | undefined;
      let headers = {};

      const authorizationHeader = req.headers.get("Authorization");
      if (authorizationHeader) {
        if (!authorizationHeader.includes("Bearer ")) {
          throw new LogicateError({
            code: "bad_request",
            message:
              "Misconfigured authorization header. Did you forget to add 'Bearer '? Learn more: https://d.to/auth",
          });
        }
        const apiKey = authorizationHeader.replace("Bearer ", "");

        const hashedKey = await hashToken(apiKey);

        const user = await prisma.user.findFirst({
          where: {
            tokens: {
              some: {
                hashedKey,
              },
            },
          },
        });

        if (!user) {
          throw new LogicateError({
            code: "unauthorized",
            message: "Unauthorized: Invalid API Key.",
          });
        }

        waitUntil(
          prisma.token.update({
            where: { hashedKey },
            data: {
              lastUsed: new Date(),
            },
          }),
        );
        session = {
          user: {
            id: user.id,
            accountType: user.accountType,
            createdAt: user.createdAt,
            email: user.email,
            name: user.name,
            progressLevel: user.progressLevel,
            updatedAt: user.updatedAt,
            username: user.username,
          },
        };
      } else {
        session = await getSession();
        if (!session?.user.id) {
          throw new LogicateError({
            code: "unauthorized",
            message: "Unauthorized: Login required.",
          });
        }
      }

      const searchParams = getSearchParams(req.url);
      return await handler({ req, searchParams, params, session });
    } catch (error) {
      return handleAndReturnErrorResponse(error);
    }
  };
