import { prop } from "@rxweb/reactive-form-validators"

export class Role {

    @prop()
    id:number;

    @prop()
    name:string;
}