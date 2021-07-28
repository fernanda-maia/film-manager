import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../shared/material/material.module";

import { FieldsModule } from "../shared/components/fields/fields.module";
import { ListMusicsComponent } from "./list-musics/list-musics.component";
import { RegisterMusicsComponent } from "./register-musics/register-musics.component";


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FieldsModule
    ],
    declarations: [
        RegisterMusicsComponent,
        ListMusicsComponent
    ]
})
export class MusicsModule {

}