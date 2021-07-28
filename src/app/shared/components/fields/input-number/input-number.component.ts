import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FieldValidatorService } from '../field-validator.service';


@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: [
    './input-number.component.css',
    '../fields.component.css'
  ]
})
export class InputNumberComponent {

  @Input() fieldName: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() min: number = 0;
  @Input() max: number = 999;
  @Input() step: number = 0.1;

  constructor(public validator: FieldValidatorService) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

}
