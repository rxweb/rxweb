import { prop,propArray } from "@rxweb/reactive-form-validators"
import { User } from "./"
export class Role {

    @prop()
    id:number;

    @prop()
    name: string;

    @propArray(User)
    users:User[]
}