import { AuthError } from "next-auth"

export class ExceededLoginAttemptsError extends AuthError {
  constructor() {
    super("exceeded-login-attempts", {
      message: "Exceeded login attempts",
    })
  }
}
