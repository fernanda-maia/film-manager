import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FieldValidatorService } from "src/app/shared/components/fields/field-validator.service";


@Component({
    selector: "app-register-movies",
    templateUrl: "./register-movies.component.html",
    styleUrls: [
        "./register-movies.component.css"
    ]
})
export class RegisterMoviesComponent implements OnInit {

    register: FormGroup;
    styles: Array<string>;

    constructor(public validator: FieldValidatorService, 
                private formBuilder: FormBuilder) {}

    get f() {
        return this.register.controls;
    }

    ngOnInit() {
        this.styles = ["Folk", "Indie", "Trance", "Progressive", "Other"];

        this.register = this.formBuilder.group({
            title: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
            author: ["",[Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
            imageURL: ["assets/img/no-image.svg", [Validators.required, Validators.minLength(4)]],
            releaseDate: [new Date()],
            duration: [0, [Validators.required, Validators.min(0)]],
            linkYoutube: ["https://youtube.com/", [Validators.required, Validators.minLength(20)]],
            style: ["", [Validators.required]],
            moreInfo: ["", [Validators.maxLength(255)]]
        });
    }

    save(): void {
        this.register.markAllAsTouched();
        if(!this.register.invalid) {
            alert("Saved: " + JSON.stringify(this.register.value, null, 4));
        }
    }

    cancel(): void {
        this.register.reset();
    }
}