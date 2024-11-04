import { AuthError } from "next-auth"

export class NotVerifiedError extends AuthError {
  constructor() {
    super("not-verified", {
      message: "Account not verified",
    })
  }
}
