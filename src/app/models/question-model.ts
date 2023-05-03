import { QuestionType } from './question-type';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  nextQuestionId?: string;
  validator?: OptionValidator;
  options?: Option[];
  value?: string | string[] | Option | Option[] | boolean;
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
