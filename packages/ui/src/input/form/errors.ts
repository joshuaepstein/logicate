import { JFSApiError } from '@/lib/api/errors';

export abstract class JFSTechElementsErrorBase extends Error {
  jfstechError = true;
  jfstechElementsError = true;
  rawMessage: string;

  constructor(
    readonly code: string,
    message: string
  ) {
    super(message);

    this.name = 'JFSTechElementsError';
    this.rawMessage = message;
  }

  toString() {
    return `[${this.name}]\nCode: ${this.code}\nMessage: ${this.message}`;
  }
}

export class JFSTechElementsError extends JFSTechElementsErrorBase {
  static fromAPIError(error: JFSApiError) {
    return new JFSTechElementsError(error.code, error.message);
  }

  constructor(code: string, message: string) {
    super(code, message);
    this.name = 'JFSTechElementsError';
  }
}

export class JFSTechElementsRuntimeError extends JFSTechElementsErrorBase {
  constructor(message: string) {
    super('elements_runtime_error', message);
    this.name = 'JFSTechElementsRuntimeError';
  }
}

export class JFSTechElementsFieldError extends JFSTechElementsErrorBase {
  static fromAPIError(error: JFSApiError) {
    return new JFSTechElementsFieldError(error.code, error.message);
  }

  constructor(code: string, message: string) {
    super(code, message);
    this.name = 'JFSTechElementsFieldError';
  }

  get validityState() {
    return this.code;
  }

  get forceMatch() {
    return true;
  }

  matchFn = () => true;
}
