import { QuestionType } from './question-type';

export interface Question {
  id: string | number;
  type: QuestionType;
  question: string;
  nextQuestionId: string | number | null;
  validator?: OptionValidator;
  options?: Option[];
  value?: string | Option | Option[];
}

export interface Option {
  label: string;
  value: string;
  nextQuestionId?: string | null | undefined;
}

export interface OptionValidator {
  min?: string;
  max?: string;
  regEx?: string;
}
