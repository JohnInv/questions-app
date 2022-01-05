import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsListComponent } from './questions/components/questions-list/questions-list.component';
import { QuestionFormComponent } from './questions/components/question-form/question-form.component';
import { QuestionsManageComponent } from './questions/components/questions-manage/questions-manage.component';
import { QuestionResolver } from './questions/resolvers/question.resolver';

const routes: Routes = [
  { path: '', component: QuestionsListComponent, pathMatch: 'full' },
  { path: 'manage', component: QuestionsManageComponent },
  { path: 'create', component: QuestionFormComponent },
  {
    path: 'edit/:id',
    component: QuestionFormComponent,
    resolve: {
      question: QuestionResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
