export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  progressLevel: number;
  accountType: AccountType;
  createdAt: Date;
  updatedAt: Date;
  invalidLoginAttempts: number;
  lockedAt?: Date;
  client_showBackground: boolean;
};

export enum AccountType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}
