import { Question } from '../models/question.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { QuestionService } from '../services/question/question.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolver implements Resolve<Question> {
  constructor(private questionService: QuestionService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Question {
    const id = route.paramMap.get('id');

    return this.questionService.getOne(id);
  }
}
