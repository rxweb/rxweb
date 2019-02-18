import {  required ,password,alpha,prop} from "@rxweb/reactive-form-validators"
export class User {

    @required()
    firstName:string;

     @required() 
     lastName : string;

     @required()
     userName: string;

     @password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } })
      password : string;
              
}
