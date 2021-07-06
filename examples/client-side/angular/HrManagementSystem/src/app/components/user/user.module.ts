import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule} from '@angular/router';

import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import {  RxRoutingModule} from "@rxweb/angular-router"

import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { USER_ROUTES } from "./user.routing";


@NgModule({
    declarations: [UserComponent],
    imports: [FormsModule, ReactiveFormsModule, RxReactiveFormsModule,
        RouterModule.forChild(USER_ROUTES), RxRoutingModule, CommonModule
    ],
    exports: [RouterModule]
})
export class UserModule { }