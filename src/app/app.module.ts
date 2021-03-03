import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicePdfComponent } from './invoice-pdf/invoice-pdf.component';
import {HttpClientModule} from '@angular/common/http';
import {CurrencyPipe, DatePipe, TitleCasePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    InvoicePdfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    TitleCasePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
