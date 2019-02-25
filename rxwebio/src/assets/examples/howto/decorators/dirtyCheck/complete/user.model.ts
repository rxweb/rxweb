import {  prop } from "@rxweb/reactive-form-validators"
export class User {

  @prop({defaultValue:1})
  id: number;

  @prop({defaultValue:"Bharat"})
  name: string;

 @prop({defaultValue:"Software Engg."})
 designation: string;
}
