import { customAlphabet } from "nanoid"

export const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12)

export const randomid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12)

export const generateOtp = customAlphabet("0123456789", 6)

export const randomGateId = () => {
  let result = "logicate-gate-"
  for (let i = 0; i < 3; i++) {
    result += nanoid(6)
    result += "-"
  }
  return result
}

export const randomWireId = () => {
  let result = "logicate-wire-"
  for (let i = 0; i < 3; i++) {
    result += nanoid(6)
    result += "-"
  }
  return result.slice(0, -1) // Remove the last '-'
}

export const generateQuestionId = () => {
  let result = "qu-"
  for (let i = 0; i < 2; i++) {
    result += nanoid(5)
    result += "-"
  }
  return result.slice(0, -1) // Remove the last '-'
}

export const generateLogicateSessionId = () => {
  let result = "lc-"
  for (let i = 0; i < 2; i++) {
    result += nanoid(5)
    result += "-"
  }
  return result.slice(0, -1) // Remove the last '-'
}

export const generateClassroomId = () => {
  let result = "cl-"
  for (let i = 0; i < 2; i++) {
    result += nanoid(5)
    result += "-"
  }
  return result.slice(0, -1) // Remove the last '-'
}

export const generateLockCode = () => {
  return nanoid(24)
}

export const changelogId = () => {
  return "cl_" + nanoid(8)
}

export const generateInviteCode = () => {
  // return nanoid(12)
  // has email.split("@")[0] and add in the random characters from nanoid(6) so that it is unique
  // return email.split("@")[0] + "-" + nanoid(6)
  // get the length of email.split("@")[0] and after every letter add a random character from nanoid(1)
  return nanoid(24)
}
