import { Option } from '../../shared/models/option';

export interface Question {
  title: string;
  type: QuestionType;
  isAnswered: boolean;
  answer?: QuestionAnswer;
  uuid: string;
  createdAt: number;
  options?: Option[];
}

export type QuestionAnswer = SingleChoiceAnswer | MultipleChoiceAnswer | OpenAnswer;

type SingleChoiceAnswer = string;
type MultipleChoiceAnswer = string[];
type OpenAnswer = string;

export enum QuestionType {
  singleChoice,
  multipleChoice,
  open
}

export const questionOptions: Option[] = [
  { value: QuestionType.singleChoice, label: 'Single Choice' },
  { value: QuestionType.multipleChoice, label: 'Multiple Choice' },
  { value: QuestionType.open, label: 'Open answer' }
];
