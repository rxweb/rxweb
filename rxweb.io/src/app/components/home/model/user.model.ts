import { required,different,compare, maxLength,password, email } from "@rxweb/reactive-form-validators"

export class User{

  @required()
  @maxLength({value:20})
  firstName:string;

  @different({fieldName:'firstName' })
  @required()
  userName:string;

  @password({validation:{alphabet:true,digit:true,minLength:6, maxLength:10, lowerCase:true,upperCase:true }})
  @required()
  password:string;

  @compare({fieldName:'password'})
  confirmPassword:string;

  @email()
  email:string;

  
}