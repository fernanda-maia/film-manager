import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FieldValidatorService } from '../field-validator.service';


@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: [
    './input-select.component.css',
    '../fields.component.css'
  ]
})
export class InputSelectComponent {

  @Input() fieldName: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() options: Array<string>;

  constructor(public validator: FieldValidatorService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
