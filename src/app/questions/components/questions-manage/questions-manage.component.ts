import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { Question } from '../../models/question.model';
import { Sort } from '../../services/question/model';

@Component({
  selector: 'app-questions-manage',
  templateUrl: './questions-manage.component.html',
  styleUrls: ['./questions-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsManageComponent implements OnInit {
  public questions: Question[];

  constructor(private questionService: QuestionService) { }

  public ngOnInit(): void {
    this.getQuestions();
  }

  public trackQuestions(index: number, question: Question) {
    return question.uuid;
  }

  public onDelete(uuid: string): void {
    this.questionService.delete(uuid);
    this.getQuestions();
  }

  private getQuestions(): void {
    this.questions = this.questionService.getList({ sort: Sort.desc });
  }
}
