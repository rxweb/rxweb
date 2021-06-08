import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { access } from "@rxweb/angular-router";
import { RxFormBuilder } from "@rxweb/reactive-form-validators";
import { translate } from "@rxweb/translate";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
@access({accessLevel:1,action:'post'})

export class UserComponent implements OnInit{
    result : any;
    userFormGroup : FormGroup ;
    @translate({translationName:'user'}) user:any;
    constructor(private formBuilder:RxFormBuilder,private userService : UserService){ }

    ngOnInit(){
        this.userFormGroup = this.formBuilder.formGroup(User);
    }
    AddProducts(){
        this.result = this.userService.addUser();
     }
}