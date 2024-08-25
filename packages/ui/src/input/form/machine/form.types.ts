import type { JFSTechElementsFieldError } from '../errors';
import type { FieldStates } from '../types';
import type { ErrorMessagesKey } from '../../../../../lib/generate-password-error-text';

export type FormDefaultValues = Map<string, FieldDetails['value']>;

interface FeedbackBase {
  codes?: Array<ErrorMessagesKey>;
}

export interface FeedbackErrorType extends FeedbackBase {
  type: Extract<FieldStates, 'error'>;
  message: JFSTechElementsFieldError;
}

export interface FeedbackOtherType extends FeedbackBase {
  type: Exclude<FieldStates, 'idle' | 'error'>;
  message: string;
}

export type FieldDetails = {
  name?: string;
  value?: string | readonly string[] | number;
  feedback?: FeedbackErrorType | FeedbackOtherType;
};

export type FormFields = Map<string, FieldDetails>;
