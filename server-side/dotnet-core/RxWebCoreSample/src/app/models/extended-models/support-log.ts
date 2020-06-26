import {SupportLogBase} from '../database-models/support-log-base';
import {AuthorBase} from '../database-models/author-base';
import {BuyerBase} from '../database-models/buyer-base';
import {SupportTypeBase} from '../database-models/support-type-base';
import {UserBase} from '../database-models/user-base';
import {VendorBase} from '../database-models/vendor-base';
//Generated Imports
export class SupportLog extends SupportLogBase 
{




//#region Generated Reference Properties
//#region author Prop
author : UserBase;
//#endregion author Prop
//#region buyer Prop
buyer : BuyerBase;
//#endregion buyer Prop
//#region supportType Prop
supportType : SupportTypeBase;
//#endregion supportType Prop
//#region user Prop
user : UserBase;
//#endregion user Prop
//#region vendor Prop
vendor : VendorBase;
//#endregion vendor Prop

//#endregion Generated Reference Properties
}