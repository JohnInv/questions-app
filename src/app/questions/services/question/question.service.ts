import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DataService, DataServiceKeys } from '../../../shared/services/data.service';
import { Question } from '../../models/question.model';
import { CreateQuestionParams, GetQuestionListParams, Sort } from './model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private dataService: DataService) {
  }

  public getList(params: GetQuestionListParams): Question[] {
    const questions: Question[] = this.dataService.get(DataServiceKeys.questions) || [];
    const sort = params.sort || Sort.desc;

    return questions.sort((a, b) => {
      return sort === Sort.desc ? b.createdAt - a.createdAt : a.createdAt - b.createdAt;
    });
  }

  public getOne(uuid: string): Question {
    const questions: Question[] = this.dataService.get(DataServiceKeys.questions) || [];

    return questions.find(question => question.uuid === uuid);
  }

  public create({ title, type, options }: CreateQuestionParams): Question {
    const question: Question = {
      uuid: uuidv4(),
      createdAt: +new Date(),
      isAnswered: false,
      title,
      type,
      options
    }

    const currentQuestions = this.dataService.get<Question[]>(DataServiceKeys.questions) || [];

    this.dataService.set(DataServiceKeys.questions, [...currentQuestions, question]);

    return question;
  }

  public edit(question: Question): Question {
    const currentQuestions = this.dataService.get<Question[]>(DataServiceKeys.questions);
    const questionToEditIndex = currentQuestions.findIndex(({ uuid }) => uuid === question.uuid);

    currentQuestions.splice(questionToEditIndex, 1, question);

    this.dataService.set(DataServiceKeys.questions, currentQuestions);

    return question;
  }

  public delete(uuid: string): void {
    const currentQuestions = this.dataService.get<Question[]>(DataServiceKeys.questions);
    const filteredQuestions = currentQuestions.filter(question => question.uuid !== uuid);

    this.dataService.set(DataServiceKeys.questions, filteredQuestions);
  }
}
