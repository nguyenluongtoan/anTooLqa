import { Component } from '@angular/core';

@Component({
  selector: 'my-rat',
  template: `<span>Hello {{name}}</span>`,
})
export class RatComponent  { name = 'Mickey'; }
