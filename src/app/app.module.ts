import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MusicsModule } from './music/musics.module';
import { MaterialModule } from './shared/material/material.module';
import { HeaderComponet } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AlertComponent } from './shared/components/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponet,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    HttpClientModule,
    LayoutModule,
    MusicsModule,
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
