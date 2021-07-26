import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
    selector: "app-register-movies",
    templateUrl: "./register-movies.component.html",
    styleUrls: [
        "./register-movies.component.css"
    ]
})
export class RegisterMoviesComponent implements OnInit {

    options: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.options = this.formBuilder.group({
            hideRequired: false,
            floatLabel: "auto"
        });
    }
}