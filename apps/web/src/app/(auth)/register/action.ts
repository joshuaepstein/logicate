"use server";

import { signIn } from "@/lib/auth";
import { Failure, Success } from "@/types/api";
import { prisma } from "@logicate/database";
import { hashPassword } from "@logicate/utils/encrypt";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(1),
});

// Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export async function registerAction(
  prevState: Failure<string> | Success<string> | undefined,
  formData: FormData,
) {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors;
    return Failure("Missing fields: " + Object.keys(error).join(", "));
  }

  const { name, email, username, password } = validatedFields.data;

  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
  });
  const existingUserByUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUserByEmail || existingUserByUsername) {
    return Failure("User already exists");
  }

  if (password.length < 8) {
    return Failure("Password must be at least 8 characters long");
  } else if (!/[A-Z]/.test(password)) {
    return Failure("Password must contain at least one uppercase letter");
  } else if (!/[a-z]/.test(password)) {
    return Failure("Password must contain at least one lowercase letter");
  } else if (!/\d/.test(password)) {
    return Failure("Password must contain at least one number");
  } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return Failure("Password must contain at least one special character");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      name,
      password: hashedPassword,
      accountType: "TEACHER",
      publicDisplay: {
        create: {},
      },
    },
  });

  try {
    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (login) {
      redirect("/?newLogin=true");
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return Failure(
        error?.cause?.err?.message || error.message || "An error occurred",
      );
    }
    throw error;
  }

  return Success("User created successfully");
}
