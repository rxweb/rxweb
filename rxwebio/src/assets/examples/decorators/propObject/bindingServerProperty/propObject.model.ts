import { prop, propObject } from "@rxweb/reactive-form-validators"

export class Address {
    @prop({name:'City'})
    city: string;
  
    @prop({name:'Country'})
    country: string;
  }
  
  export class User {
  
    @prop({name:'email_address'})
    emailAddress: string;
    
    @propObject(Address)
    address: Address;
  }
