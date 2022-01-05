import { Pipe, PipeTransform } from '@angular/core';
import { questionOptions, QuestionType } from '../models/question.model';

@Pipe({
  name: 'questionType',
})

export class QuestionTypePipe implements PipeTransform {
  public transform(type: QuestionType): string {
    return questionOptions.find(({ value }) => value === type).label;
  }
}
