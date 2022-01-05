import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface FormError {
  params: any;
  type: string;
}

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlErrorComponent implements OnInit, OnDestroy {
  public errors$ = new Subject<FormError[]>();
  @Input() public control: AbstractControl;

  private destroy$ = new Subject();

  public ngOnInit(): void {
    this.subscribeToErrors();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackByErrors(index: number, error: FormError) {
    return error.type;
  }

  private subscribeToErrors(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.setErrors());
  }

  private setErrors(): void {
    const errors = this.control.errors;

    if (!errors) {
      this.errors$.next(null);

      return;
    }

    const mappedErrors = Object.entries(errors)
      .map(([type, params]) => ({ type, params }));

    this.errors$.next(mappedErrors);
  }
}
