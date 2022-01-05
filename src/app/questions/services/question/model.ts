import { QuestionType } from '../../models/question.model';
import { Option } from '../../../shared/models/option';

export interface CreateQuestionParams {
  type: QuestionType;
  title: string;
  options: Option[];
}

export interface GetQuestionListParams {
  sort: Sort
}

export enum Sort {
  asc,
  desc
}
