import { NgModule } from '@angular/core';
import { QuestionsManageComponent } from './components/questions-manage/questions-manage.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.modules';
import { RouterModule } from '@angular/router';
import { QuestionTypePipe } from './pipes/question-type.pipe';
import { QuestionAnswerFormComponent } from './components/question-answer-form/question-answer-form.component';
import { OptionFormComponent } from './components/option-form/option-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule],
  exports: [],
  declarations: [
    QuestionsManageComponent,
    QuestionFormComponent,
    QuestionsListComponent,
    QuestionAnswerFormComponent,
    OptionFormComponent,
    QuestionTypePipe
  ],
  providers: [],
})
export class QuestionsModule {}
