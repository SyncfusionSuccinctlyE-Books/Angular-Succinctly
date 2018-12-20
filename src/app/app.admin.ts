/*
 * app.admin
 * Joe Booth:  Angular Succinctly
 */
import { Component } from '@angular/core';         // Component metadata
import { ViewEncapsulation } from '@angular/core'; // Encapsulation enum
  @Component({
    encapsulation: ViewEncapsulation.ShadowDom,       // Use Shadow DOM
    template: '<h3>Admin</h3>'
   })
export class AppAdmin {}
