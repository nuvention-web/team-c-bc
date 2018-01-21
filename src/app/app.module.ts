import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { RepoService } from './repo.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [RepoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
