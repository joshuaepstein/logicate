"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      return error.cause?.err?.message || error.message || "An Error Occured";
    }
    throw error;
  }
};
