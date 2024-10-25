export interface Failure<T> {
  success: false
  error: T
}

export interface Success<T> {
  success: true
  value: T
  data?: any
}

export const Failure = <T>(error: T): Failure<T> => ({
  success: false,
  error,
})

export const Success = <T>(value: T, data?: any): Success<T> => ({
  success: true,
  value,
  data,
})
