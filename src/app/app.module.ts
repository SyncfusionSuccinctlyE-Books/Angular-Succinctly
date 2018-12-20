/*
 * app.module
 * Joe Booth:  Angular Succinctly
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStandings } from './app.standings';
import { AppScoring } from './app.scoring';
import { AppAdmin } from './app.admin';
import { PageNotFound } from './app.PageNotFound';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [ AppComponent, AppStandings, AppAdmin, AppScoring, PageNotFound ],
  imports:      [ BrowserModule, AppRoutingModule, HttpModule ],
  providers:    [],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
