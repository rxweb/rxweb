import { prop, propObject } from "@rxweb/reactive-form-validators"

export class Address {
    @prop({defaultValue:'Ahmedabad'})
    city: string;
  
    @prop({defaultValue:'India'})
    country: string;
  }
  
  export class User {
  
    @prop({defaultValue:'abc@gmail.com'})
    emailAddress: string;
    
    @propObject(Address)
    address: Address;
  }