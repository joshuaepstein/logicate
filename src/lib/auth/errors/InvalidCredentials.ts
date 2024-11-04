import { AuthError } from "next-auth"

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super("invalid-credentials", {
      message: "Invalid credentials",
      name: "InvalidCredentialsError",
      cause: {
        err: new Error("invalid-credentials"),
      },
      stack: new Error().stack,
    })
  }
}
