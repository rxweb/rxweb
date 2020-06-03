import { prop,propObject,propArray } from "@rxweb/reactive-form-validators"
import { Role,Party } from "./index"

export class User{
    @prop()
    id:number;

    @prop()
    userName:string;

    @propObject(Party)
    party:Party

    @propArray(Role)
    roles:Array<Role>
}