import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { debounceTime } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

import { Music } from "src/app/shared/models/music";
import { MusicService } from "src/app/core/music.service";
import { ConfigParams } from "src/app/shared/models/config-params";
import { SearchFields } from "src/app/shared/models/search-fields";


@Component({
    selector: "app-list-musics",
    templateUrl: "./list-musics.component.html",
    styleUrls: [
       "./list-musics.component.css",
       "../musics.component.css"
    ]
})
export class ListMusicsComponent implements OnInit {

    readonly noPicture = "assets/img/no-image.svg";

    musics: Music[] = [];
    musicFilter: FormGroup;

    configParams: ConfigParams = {
        page: 0,
        limit: 20

    } as ConfigParams;

    styles: Array<string> = [
        "Folk", 
        "Indie", 
        "Trance", 
        "Progressive", 
        "Other"
    ];

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private spinner: NgxSpinnerService,
                private musicService: MusicService) {

    }
    
    ngOnInit() {
        this.musicFilter = this.formBuilder.group({
            value: [''],
            style: ['']
        });
        

        this.musicFilter.get('value')?.valueChanges
                        .pipe(debounceTime(500))
                        .subscribe((change: string) => {
                            this.configParams.search = change;
                            this.resetList();
                        })
        
        this.musicFilter.get('style')?.valueChanges.subscribe((change: string) => {
            this.configParams.fields = {
                type: "style", 
                value: change
                
            } as SearchFields;
            
            this.resetList();
        })
        
        this.listMusics();
    }
    
    onScroll(): void {
        this.spinner.show();
        this.listMusics();
        this.spinner.hide();
    }
    
    openMoreInfo(id: number): void {
        this.router.navigateByUrl(`/musics/${id}`);
    }
    
    private listMusics(): void {
        this.configParams.page++;
        
        this.musicService.listByPage(this.configParams)
            .subscribe((m: Music[]) => {
                this.musics.push(...m);
        });

    }

    private resetList(): void {
        this.configParams.page = 0
        this.musics = [];
        this.listMusics();
    }
}