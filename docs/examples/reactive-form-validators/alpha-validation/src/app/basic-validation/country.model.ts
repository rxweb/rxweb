import { alpha } from "@rxweb/reactive-form-validators";
import { prop } from "@rxweb/reactive-form-validators";

export class Country {
   @prop() @alpha() countryName: string;
}
