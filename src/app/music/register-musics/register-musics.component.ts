import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

    id: number;
    register: FormGroup;
    styles: Array<string> = [
        "Folk", 
        "Indie", 
        "Trance", 
        "Progressive", 
        "Other"
    ];

    constructor(public validator: FieldValidatorService, 
                public dialog: MatDialog,
                private formBuilder: FormBuilder,
                private musicService: MusicService,
                private router: Router,
                private activetedRoute: ActivatedRoute) {

    }

    get f() {
        return this.register.controls;
    }

    ngOnInit() {
        
        this.createNewForm();
        this.id = this.activetedRoute.snapshot.params["id"];
        
        if(this.id) {
            
            this.musicService
            .getById(this.id)
            .subscribe((music: Music) => {
                this.createNewForm(music);
            });


        } 
    }

    submit(): void {
        this.register.markAllAsTouched();
        if(!this.register.invalid) {
            const music = this.register.getRawValue() as Music;
            
            if(this.id) {
                this.edit(music);
            } else {
                this.save(music);
            }
        }
    }

    cancel(): void {
        if(this.id) {
            this.router.navigateByUrl(`/musics/${this.id}`)
        } else {
            this.register.reset();
        }
    }

    private changeURL(music: Music): Music {
        let id = music.linkYoutube.split("v=")[1] || 
                 music.linkYoutube.split("embed/")[1];

        let endPosition = id? id.indexOf("&") : -1;
        
        if(endPosition != -1) {
            id =  id.substring(0, endPosition);
        }

        music.linkYoutube = "https://www.youtube-nocookie.com/embed/" + id;

        return music;
    }

    private save(music: Music): void {
        let musicToSave = this.changeURL(music);

        this.musicService.save(musicToSave).subscribe(() => {
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
                    cancelBtn: "Back",
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

    private edit(music: Music): void {
        let musicToUpdate = this.changeURL(music);

        this.musicService.update(musicToUpdate, this.id).subscribe(() => {
            this.router.navigateByUrl(`/musics/${this.id}`);
        },
        () => {
            const config = {
                data: {
                    title: "Something went wrong",
                    description: "Service Unavailable",
                    okBtn: "Try again",
                    cancelBtn: "Back",
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

    private createNewForm(music?: Music): void {

        this.register = this.formBuilder.group({
            title: [music?.title || "", [
                    Validators.required, 
                    Validators.minLength(2), 
                    Validators.maxLength(25)
                ]
            ],
            author: [music?.author || "",
                [
                    Validators.required, 
                    Validators.minLength(2), 
                    Validators.maxLength(25)
                ]
            ],
            imageURL: [music?.imageURL || "assets/img/no-image.svg", 
                [
                    Validators.minLength(4)
                ]
            ],
            releaseDate: [music?.releaseDate || new Date()],
            duration: [music?.duration || 0, 
                [
                    Validators.required, 
                    Validators.min(0)
                ]
            ],
            linkYoutube: [music?.linkYoutube || "https://www.youtube.com/", 
                [
                    Validators.required, 
                    Validators.minLength(20)
                ]
            ],
            style: [music?.style || "", [Validators.required]],
            moreInfo: [music?.moreInfo || "", [Validators.maxLength(255)]]
        });
    }
}