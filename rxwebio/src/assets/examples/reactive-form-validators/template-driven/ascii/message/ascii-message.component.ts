import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-ascii-message-template-driven',
    templateUrl: './ascii-message.component.html'
})
export class AsciiMessageTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}
