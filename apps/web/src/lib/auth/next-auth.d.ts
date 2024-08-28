import "next-auth";
import { User as UserType } from "@logicate/database";
declare module "next-auth" {
  interface User extends Omit<UserType, "password"> {}
}
