import { GridStackModule } from './../../projects/grid-stack/src/lib/grid-stack.module';
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
