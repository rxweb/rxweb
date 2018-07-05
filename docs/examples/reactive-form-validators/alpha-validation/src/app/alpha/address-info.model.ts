import { prop, alpha } from "@rxweb/reactive-form-validators"

export class AddressInfo {

    @prop() @alpha() countryName: string;

    @prop() @alpha({ conditionalExpressions: (x, y) => { return x.countryName == 'Australia' } }) countryCode: string;

    @prop() @alpha({ allowWhiteSpace: true }) stateName: string;

    @prop() @alpha({ message: "You can enter only alphabets." }) stateCode: string;
}
