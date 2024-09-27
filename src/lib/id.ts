import { customAlphabet } from 'nanoid'

export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12)

export const randomid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12)

export const generateOtp = customAlphabet('0123456789', 6)

export const randomGateId = () => {
  var result = 'logicate-gate-'
  for (let i = 0; i < 3; i++) {
    result += nanoid(6)
    result += '-'
  }
  return result
}

export const randomWireId = () => {
  var result = 'logicate-wire-'
  for (let i = 0; i < 3; i++) {
    result += nanoid(6)
    result += '-'
  }
  return result.slice(0, -1) // Remove the last '-'
}

export const generateQuestionId = () => {
  var result = 'qu-'
  for (let i = 0; i < 2; i++) {
    result += nanoid(5)
    result += '-'
  }
  return result.slice(0, -1) // Remove the last '-'
}

export const generateLogicateSessionId = () => {
  var result = 'lc-'
  for (let i = 0; i < 2; i++) {
    result += nanoid(5)
    result += '-'
  }
  return result.slice(0, -1) // Remove the last '-'
}

export const generateClassroomId = () => {
  var result = 'cl-'
  for (let i = 0; i < 2; i++) {
    result += nanoid(5)
    result += '-'
  }
  return result.slice(0, -1) // Remove the last '-'
}
