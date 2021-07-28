import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FieldValidatorService } from '../field-validator.service';


@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: [
    './input-text.component.css',
    '../fields.component.css'
  ]
})
export class InputTextComponent {

  @Input() fieldName: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;

  constructor(public validator: FieldValidatorService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
