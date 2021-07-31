import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-film-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert = {
    title: "Yaay, successfull!",
    description: "",
    okBtn: "Ok",
    cancelBtn: "Cancel",
    hasCloseBtn:  false

  } as Alert;


  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Alert) {
  }

  ngOnInit(): void {
    if(this.data) {
      this.alert.title = this.data.title || this.alert.title;
      this.alert.description = this.data.description || this.alert.description;
      this.alert.okBtn = this.data.okBtn || this.alert.okBtn;
      this.alert.cancelBtn = this.data.cancelBtn || this.alert.cancelBtn;
      this.alert.hasCloseBtn = this.data.hasCloseBtn || this.alert.hasCloseBtn;
    }
  }

}
