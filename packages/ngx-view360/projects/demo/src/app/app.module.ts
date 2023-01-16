import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { NgxView360Module } from '../../../ngx-view360/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxView360Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
