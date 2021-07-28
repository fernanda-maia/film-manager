import { Component, Input} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FieldValidatorService } from '../field-validator.service';


@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: [
    './input-textarea.component.css',
    '../fields.component.css'
  ]
})
export class InputTextareaComponent {

  @Input() fieldName: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup

  constructor(public validator: FieldValidatorService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
