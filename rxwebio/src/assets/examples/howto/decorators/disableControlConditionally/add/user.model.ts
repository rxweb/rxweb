import {  required,disable,prop } from "@rxweb/reactive-form-validators"
import { AbstractControl } from "@angular/forms"

export class User{

    @prop()
    modeType:string;

    @disable({conditionalExpression:function(control:AbstractControl){return this.modeType == "View"; }})
    @prop()
    fullName:string;
 
}