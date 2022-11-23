import { prop } from "@rxweb/reactive-form-validators";

export class UserCredentialModel{
    @prop()
    userName:string= 'abc@gmail.com';

    @prop()
    password:string = 'admin@123';
}