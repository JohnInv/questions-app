import { NgModule, PLATFORM_ID } from '@angular/core';
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component';
import { LOCAL_STORAGE, localStorageFactory } from './injectors/local-storage';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FormControlErrorComponent],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: LOCAL_STORAGE,
      useFactory: localStorageFactory,
      deps: [PLATFORM_ID],
    }
  ],
  exports: [FormControlErrorComponent],
})
export class SharedModule {
}
