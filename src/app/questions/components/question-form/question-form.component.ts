import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question, questionOptions, QuestionType } from '../../models/question.model';
import { Option } from '../../../shared/models/option';
import { markAsDirtyAndValidate } from '../../../shared/models/form';
import { QuestionService } from '../../services/question/question.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionFormComponent {
  public form: FormGroup;
  public questionTypeOptions = questionOptions;
  public question: Question;
  public title: string;
  public questionOptions: Option[] = [];

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.setInitialValues();
    this.createForm();
    this.setTitle();
  }

  public onSubmit(): void {
    markAsDirtyAndValidate(this.form);

    if (this.form.invalid) {
      return;
    }

    if (this.enableQuestionOptions && this.questionOptions?.length < 2) {
      alert('Please, create at least 2 question options')

      return;
    }

    const { type, title } = this.form.value;

    if (this.question) {
      const editedQuestion = { ...this.question, type, title };

      this.questionService.edit(editedQuestion);
    } else {
      const options = this.enableQuestionOptions ? this.questionOptions : [];
      this.questionService.create({ type, title, options });
    }

    this.router.navigate(['/manage']);
  }

  public trackBy(index: number, option: Option) {
    return option.value;
  }

  public get enableQuestionOptions(): boolean {
    const type = this.form.value.type;

    return type === QuestionType.singleChoice || type === QuestionType.multipleChoice;
  }

  public onQuestionOptionsChange(options: Option[]): void {
    this.questionOptions = options;
  }

  private createForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.question?.title || '', [Validators.required, Validators.maxLength(255)]),
      type: new FormControl(this.question?.type, [Validators.required]),
    })
  }

  private setInitialValues(): void {
    this.question = this.route.snapshot.data.question;
  }

  private setTitle(): void {
    this.title = this.question ? 'Edit question' : 'Create question';
  }
}
