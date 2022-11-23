import { prop,propObject } from "@rxweb/reactive-form-validators"
import { User } from './'
export class Party {
    @prop()
    id: number;

    @prop()
    name: string;

    @propObject(User)
    user: User;
}