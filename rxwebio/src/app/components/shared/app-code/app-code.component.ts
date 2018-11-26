import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './app-code.component.html',
})
export class AppCodeComponent {
  @Input() content:string;
}

