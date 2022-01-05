import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import { Question, QuestionType } from '../../models/question.model';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Option } from '../../../shared/models/option';
import { markAsDirtyAndValidate } from '../../../shared/models/form';

@Component({
  selector: 'question-answer-form',
  templateUrl: 'question-answer-form.component.html',
  styleUrls: ['question-answer-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionAnswerFormComponent implements OnInit {
  @Input() public question: Question;
  @Output() public answer = new EventEmitter();
  public form: FormGroup;
  public questionType = QuestionType;
  public options: Option[] = [];

  private checkedCheckboxesMap = {};

  constructor(private questionService: QuestionService) {
  }

  public ngOnInit() {
    this.createForm();
    this.options = this.question.options;
  }

  public onSubmit(): void {
    markAsDirtyAndValidate(this.form);

    if (this.form.invalid) {
      return;
    }

    const question = {
      ...this.question,
      isAnswered: true,
      answer: this.getAnswerValue()
    };

    this.questionService.edit(question);
    this.answer.emit();
  }

  public trackByOptions(index: number, option: Option) {
    return option.value;
  }

  public onCheckboxChange(option: Option): void {
    this.checkedCheckboxesMap[option.value] = !this.checkedCheckboxesMap[option.value];

    const values = Object.values(this.checkedCheckboxesMap);
    const isAnyChecked = values.some(Boolean);

    if (!isAnyChecked) {
      this.form.setValue({ answer: null });
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      answer: new FormControl(null, this.getAnswerValidators()),
    })
  }

  private getAnswerValue(): string[] | string {
    if (this.question.type === QuestionType.multipleChoice) {
      return Object.keys(this.checkedCheckboxesMap);
    }

    return this.form.value.answer;
  }

  private getAnswerValidators(): ValidatorFn[] {
    if (this.question.type === QuestionType.open) {
      return [Validators.required, Validators.maxLength(255)];
    }

    return [Validators.required];
  }

}
