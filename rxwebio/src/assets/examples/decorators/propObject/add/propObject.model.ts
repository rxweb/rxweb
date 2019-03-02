import { prop, propObject } from "@rxweb/reactive-form-validators"

export class Address {
  @prop()
  city: string;

  @prop()
  country: string;
}

export class User {

  @prop()
  emailAddress: string;

  @propObject(Address)
  address: Address;
}
