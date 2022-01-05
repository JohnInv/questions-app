import { FormGroup } from '@angular/forms';

export function markAsDirtyAndValidate(form: FormGroup): void {
  Object.values(form.controls).forEach(control => {
    control.markAsDirty();
    control.updateValueAndValidity();
  });
}
