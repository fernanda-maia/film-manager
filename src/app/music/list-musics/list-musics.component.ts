import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { debounceTime } from 'rxjs/operators';

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

    configParams: ConfigParams = {
        page: 0,
        limit: 9

    } as ConfigParams;

    musics: Music[] = [];
    musicFilter: FormGroup;
    styles: Array<string>;

    constructor(private musicService: MusicService,
                private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.musicFilter = this.formBuilder.group({
            value: [''],
            style: ['']
        });

        this.musicFilter.get('value')?.valueChanges
            .pipe(debounceTime(400))
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

        this.styles = ["Folk", "Indie", "Trance", "Progressive", "Other"];

        this.listMusics();
    }

    onScroll(): void {
        this.listMusics();
    }

    private listMusics(): void {
        this.configParams.page++;
        this.musicService.listByPage(this.configParams)
        . subscribe((m: Music[]) => this.musics.push(...m));
    }

    private resetList(): void {
        this.configParams.page = 0
        this.musics = [];
        this.listMusics();
    }

}