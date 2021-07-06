import { alpha, prop, required } from "@rxweb/reactive-form-validators";

export class User{
     @alpha()
     @required()
     firstName : string = '';

     @prop()
    
     lastName:string ='';

     @prop()

     password:string='';

     @prop()
     email:string='';

     @prop()
     city:string='';

     @prop()
     state:string='';

     @prop()
     zip:string='';
}