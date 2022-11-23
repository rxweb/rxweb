import { TypedForm, propObject, maxLength, required, propArray, toDate } from "@rxweb/reactive-form-validators";
import { Address } from './address';
import { Skill } from './skill';

//Extending class with 'TypedForm' is only required when you want to access the FormGroup Object in the model Instance
export class User extends TypedForm<User> {

    private _firstName: string;

    @required()
    @maxLength({ value: 10 })
    set firstName(value: string) {
        this._firstName = value;
    }

    get firstName() { return this._firstName }

    @toDate()
    @required()
    dob: Date;

    @propObject(Address)
    address: Address;

    @propArray(Skill)
    skills: Skill[]
}
