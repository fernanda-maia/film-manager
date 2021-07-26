import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/material/material.module";
import { ListMoviesComponent } from "./list-movies/list-movies.component";
import { RegisterMoviesComponent } from "./register-movies/register-movies.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        RegisterMoviesComponent,
        ListMoviesComponent
    ]
})
export class MoviesModule {

}