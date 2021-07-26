import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesModule } from './movies/movies.module';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { RegisterMoviesComponent } from './movies/register-movies/register-movies.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "videos",
    pathMatch: "full"
  },
  {
    path: "videos",
    children: [
      {
        path: "",
        component: ListMoviesComponent
      },
      {
        path: "register",
        component: RegisterMoviesComponent,
        pathMatch: "full"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "videos"
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MoviesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
