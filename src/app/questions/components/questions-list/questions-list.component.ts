import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { Question } from '../../models/question.model';
import { Sort } from '../../services/question/model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsListComponent implements OnInit {
  public answeredQuestions: Question[];
  public unansweredQuestions: Question[];

  constructor(private questionsService: QuestionService) { }

  public ngOnInit(): void {
    this.getQuestions();
  }

  public removeAnswer(question: Question): void {
    this.questionsService.edit({
      ...question,
      isAnswered: false,
      answer: null
    });
    this.getQuestions();
  }

  public trackByQuestions(index: number, question: Question) {
    return question.uuid;
  }

  public onQuestionAnswerChange(): void {
    this.getQuestions();
  }

  private getQuestions(): void {
    const questions = this.questionsService.getList({ sort: Sort.desc });

    this.answeredQuestions = questions.filter(({ isAnswered }) => isAnswered);
    this.unansweredQuestions = questions.filter(({ isAnswered }) => !isAnswered);
  }
}
