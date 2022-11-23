import { Component, ViewEncapsulation, Input  } from '@angular/core';

@Component({
  selector: 'simple-demo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './simple-demo.component.html'
})
export class SimpleDemoComponent {
  value: Number = 15;
  str: string = 'Hello';
}
