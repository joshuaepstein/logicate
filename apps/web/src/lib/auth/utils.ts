import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { LogicateError } from "../api/error";
import { authConfig } from "./options";
import { User } from "@logicate/database";

export interface Session {
  user: Omit<User, "password" | "invalidLoginAttempts" | "lockedAt">;
}

export const getSession = async () => {
  return getServerSession(authConfig) as Promise<Session>;
};

export const getAuthTokenOrThrow = (
  req: Request | NextRequest,
  type: "Bearer" | "Basic" = "Bearer",
) => {
  const authorizationHeader = req.headers.get("Authorization");

  if (!authorizationHeader) {
    throw new LogicateError({
      code: "bad_request",
      message:
        "Misconfigured authorization header. Did you forget to add 'Bearer '?",
    });
  }

  return authorizationHeader.replace(`${type} `, "");
};
