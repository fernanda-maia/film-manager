import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FieldValidatorService } from '../field-validator.service';


@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: [
    './input-date.component.css',
    '../fields.component.css'
]
})
export class InputDateComponent {

  @Input() fieldName: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;

  constructor(public validator: FieldValidatorService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
