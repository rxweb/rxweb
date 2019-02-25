import { required,error,prop } from "@rxweb/reactive-form-validators"
import {AbstractControl } from "@angular/forms"
export class FormField{
  
  @prop()
  action:string;

  @error({conditionalExpression:function(control:AbstractControl){ return this.action === "submit"}})
  @required()
  firstName:string;

  @error({conditionalExpression:function(control:AbstractControl){ return this.action == "submit"}})
  @required()
  userName:string;
 
}