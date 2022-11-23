import {VendorQualifierBase} from '../database-models/vendor-qualifier-base';
import {CompanyBase} from '../database-models/company-base';
import {DestinationTypeBase} from '../database-models/destination-type-base';
import {FobTypeBase} from '../database-models/fob-type-base';
import {StateBase} from '../database-models/state-base';
import {BuyerBase} from '../database-models/buyer-base';
//Generated Imports
export class VendorQualifier extends VendorQualifierBase 
{




//#region Generated Reference Properties
//#region company Prop
company : UserBase;
//#endregion company Prop
//#region destinationType Prop
destinationType : DestinationTypeBase;
//#endregion destinationType Prop
//#region fobType Prop
fobType : FobTypeBase;
//#endregion fobType Prop
//#region state Prop
state : StateBase;
//#endregion state Prop
//#region buyers Prop
buyers : BuyerBase[];
//#endregion buyers Prop

//#endregion Generated Reference Properties
}