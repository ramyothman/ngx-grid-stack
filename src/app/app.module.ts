import { GridStackModule } from 'grid-stack';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridStackModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
