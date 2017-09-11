import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Configuration } from './app.config';

import { SafePipe } from './app.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    RouterModule,
    CommonModule,
    HttpModule,
  ],
  providers: [Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
