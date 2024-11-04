import { AuthError } from "next-auth"

export class NoCredentialsError extends AuthError {
  constructor() {
    super("no-credentials")
  }
}
