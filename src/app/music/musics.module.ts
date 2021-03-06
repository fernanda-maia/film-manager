import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxSpinnerModule } from "ngx-spinner";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { MaterialModule } from "../shared/material/material.module";
import { FieldsModule } from "../shared/components/fields/fields.module";
import { InfoMusicsComponent } from './info-musics/info-musics.component';
import { ListMusicsComponent } from "./list-musics/list-musics.component";
import { RegisterMusicsComponent } from "./register-musics/register-musics.component";


@NgModule({
    imports: [
        NgxSpinnerModule,
        FormsModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FieldsModule,
        InfiniteScrollModule
    ],
    declarations: [
        RegisterMusicsComponent,
        ListMusicsComponent,
        InfoMusicsComponent
    ]
})
export class MusicsModule {

}