import type { HTMLInputTypeAttribute } from "react"

export type FieldId =
  | "code"
  | "confirmPassword"
  | "currentPassword"
  | "emailAddress"
  | "firstName"
  | "identifier"
  | "lastName"
  | "name"
  | "newPassword"
  | "password"
  | "phoneNumber"
  | "username"

export type InputType = HTMLInputTypeAttribute | "otp"

export const FIELD_STATES = {
  success: "success",
  error: "error",
  idle: "idle",
  warning: "warning",
  info: "info",
} as const

export type FieldStates = (typeof FIELD_STATES)[keyof typeof FIELD_STATES]

export const FIELD_VALIDITY = {
  valid: "valid",
  invalid: "invalid",
} as const

export type FieldValidity = (typeof FIELD_VALIDITY)[keyof typeof FIELD_VALIDITY]

/**
 * Enables autocompletion for a union type, while keeping the ability to use any string
 * or type of `T`
 */
export type Autocomplete<U extends T, T = string> = U | (T & Record<never, never>)
