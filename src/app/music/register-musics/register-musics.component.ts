import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialog } from "@angular/material/dialog";

import { Alert } from "src/app/shared/models/alert";
import { Music } from "src/app/shared/models/music";
import { MusicService } from "src/app/core/music.service";
import { AlertComponent } from "src/app/shared/components/alert/alert.component";
import { FieldValidatorService } from "src/app/shared/components/fields/field-validator.service";


@Component({
    selector: "app-register-musics",
    templateUrl: "./register-musics.component.html",
    styleUrls: [
        "./register-musics.component.css",
        "../musics.component.css"
    ]
})
export class RegisterMusicsComponent implements OnInit {

    register: FormGroup;
    styles: Array<string>;

    constructor(public validator: FieldValidatorService, 
                public dialog: MatDialog,
                private formBuilder: FormBuilder,
                private musicService: MusicService,
                private router: Router) {

    }

    get f() {
        return this.register.controls;
    }

    ngOnInit() {
        this.styles = ["Folk", "Indie", "Trance", "Progressive", "Other"];

        this.register = this.formBuilder.group({
            title: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            author: ["",[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            imageURL: ["assets/img/no-image.svg", [Validators.required, Validators.minLength(4)]],
            releaseDate: [new Date()],
            duration: [0, [Validators.required, Validators.min(0)]],
            linkYoutube: ["https://youtube.com/", [Validators.required, Validators.minLength(20)]],
            style: ["", [Validators.required]],
            moreInfo: ["", [Validators.maxLength(255)]]
        });
    }

    submit(): void {
        this.register.markAllAsTouched();
        if(!this.register.invalid) {
            const music = this.register.getRawValue() as Music;
            this.save(music);
        }
    }

    cancel(): void {
        this.register.reset();
    }

    private save(music: Music): void {
        this.musicService.save(music).subscribe(() => {
            const config = {
                data: {
                    description: "Register another one?",
                    okBtn: "Sure",
                    cancelBtn: "Nope",
                    hasCloseBtn:  true
                } as Alert
            };
            const dialogRef = this.dialog.open(AlertComponent, config);
            dialogRef.afterClosed().subscribe((opt: boolean) => {
                if(!opt) {
                    this.backToList();
                } else {
                    this.cancel();
                }
            })
        },
        () => {
            const config = {
                data: {
                    title: "Something went wrong",
                    description: "Service Unavailable",
                    okBtn: "Try again",
                    cancelBtn: "Back to List",
                    hasCloseBtn: true
                } as Alert
            };
            const dialogRef = this.dialog.open(AlertComponent, config);
            dialogRef.afterClosed().subscribe((opt: boolean) => {
                if(!opt) {
                    this.backToList();
                } 
            })
        }
        );
    }

    private backToList(): void {
        this.router.navigateByUrl('musics');
    }
}