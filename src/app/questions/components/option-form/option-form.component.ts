import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Option } from '../../../shared/models/option';
import { markAsDirtyAndValidate } from '../../../shared/models/form';

@Component({
  selector: 'app-option-form',
  styleUrls: ['option-form.component.scss'],
  templateUrl: 'option-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OptionFormComponent {
  public form: FormGroup;
  public options: Option[] = [];

  @Output() private optionsChange = new EventEmitter<Option[]>();

  constructor() {
    this.createForm();
  }

  public onSubmit(): void {
    markAsDirtyAndValidate(this.form);

    if (this.form.invalid) {
      return;
    }

    if (this.isOptionAlreadyExists()) {
      alert('Such option already exists');

      return;
    }

    const value = this.form.value.text;

    this.options.push({ value, label: value })
    this.optionsChange.emit(this.options);
    this.form.setValue({ text: '' }, { emitEvent: false });
  }

  public trackByOptions(index: number, option: Option) {
    return option.value;
  }

  public removeOption(option): void {
    this.options = this.options.filter(({ value }) => value !== option.value);

    this.optionsChange.emit(this.options);
  }

  private createForm(): void {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.required]),
    })
  }

  private isOptionAlreadyExists(): boolean {
    const value = this.form.value.text;

    return this.options.some(option => option.value === value);
  }
}
