import { TypedForm, required } from "@rxweb/reactive-form-validators";

//Extending class with 'TypedForm' is only required when you want to access the FormGroup Object in the model Instance
export class Address extends TypedForm<Address> {

    @required()
    countryName: string;
}
