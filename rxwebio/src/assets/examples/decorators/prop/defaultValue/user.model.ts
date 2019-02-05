import {  prop } from "@rxweb/reactive-form-validators"
export class User {

@prop({defaultValue:'abc@gmail.com'})
emailAddress:string

}
