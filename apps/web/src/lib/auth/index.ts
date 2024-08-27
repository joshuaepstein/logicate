import NextAuth from "next-auth";
import { authConfig } from "./options";

export const {
  signIn,
  signOut,
  auth,
  handlers: { GET, POST },
  unstable_update,
} = NextAuth(authConfig);
