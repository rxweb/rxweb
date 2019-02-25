import {  required ,password,alpha} from "@rxweb/reactive-form-validators"
export class User {

   @required()
    userName: string;

  @alpha()
  @password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true }})
  password : string;
              
}
