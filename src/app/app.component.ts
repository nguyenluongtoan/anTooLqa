import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<span>Hello {{name}}</span>`,
})
export class AppComponent  { name = 'Angular'; }
