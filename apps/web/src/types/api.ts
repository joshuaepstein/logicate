export interface Failure<T> {
  success: false;
  error: T;
}

export interface Success<T> {
  success: true;
  value: T;
}

export const Failure = <T>(error: T): Failure<T> => ({
  success: false,
  error,
});

export const Success = <T>(value: T): Success<T> => ({
  success: true,
  value,
});
