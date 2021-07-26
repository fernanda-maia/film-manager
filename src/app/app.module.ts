import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MoviesModule } from './movies/movies.module';
import { MaterialModule } from './shared/material/material.module';
import { HeaderComponet } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponet,
    FooterComponent
  ],
  imports: [
    LayoutModule,
    MoviesModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, 
      useValue: "pt"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
