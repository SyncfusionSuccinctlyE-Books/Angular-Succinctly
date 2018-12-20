/*
 * app-routing.module
 * Joe Booth:  Angular Succinctly
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppStandings } from './app.standings';
import { AppScoring } from './app.scoring';
import { AppAdmin } from './app.admin';
import { PageNotFound } from './app.PageNotFound';

const routes: Routes = [
  { path: 'Standings', component: AppStandings },
  { path: 'Scoring', component: AppScoring },
  { path: 'Admin', component: AppAdmin },
  { path: '',   redirectTo: '/Standings', pathMatch: 'full' },
  { path: '"**', component: PageNotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
