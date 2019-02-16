
import {  image } from "@rxweb/reactive-form-validators"
export class User {

    @image({maxHeight:500  ,maxWidth:500 })
    profilePhoto:string;
}
