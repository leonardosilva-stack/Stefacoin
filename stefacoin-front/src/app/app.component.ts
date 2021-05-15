import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <app-header></app-header>
    <div class="container">
      <router-outlet></router-outlet>
      <router-outlet name="public"></router-outlet>
    </div>`,
  styles: [],
})
export class AppComponent {
  title = 'stefacoin-front';
}
