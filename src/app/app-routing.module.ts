import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MusicsModule } from './music/musics.module';
import { ListMusicsComponent } from './music/list-musics/list-musics.component';
import { RegisterMusicsComponent } from './music/register-musics/register-musics.component';
import { InfoMusicsComponent } from './music/info-musics/info-musics.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "musics",
    pathMatch: "full"
  },
  {
    path: "musics",
    children: [
      {
        path: "",
        component: ListMusicsComponent
      }, 
      {
        path: "register",
        children: [
          {
            path: "",
            component: RegisterMusicsComponent
          },
          {
            path: ":id",
            component: RegisterMusicsComponent
          }
        ]
      },
      {
        path: ":id",
        component:InfoMusicsComponent,
        pathMatch: "full"
      }
    
    ]
  },
  {
    path: "**",
    redirectTo: "musics"
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MusicsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
