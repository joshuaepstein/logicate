import NextAuth from "next-auth";
import { authConfig } from "./options";

export const nextAuth = NextAuth(authConfig);
