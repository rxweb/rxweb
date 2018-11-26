import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './app-notes.component.html',
})

export class AppNotesComponent  {
  @Input() content;
}

