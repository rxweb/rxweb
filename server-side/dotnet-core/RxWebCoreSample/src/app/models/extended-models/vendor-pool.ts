import {VendorPoolBase} from '../database-models/vendor-pool-base';
import {BuyerBase} from '../database-models/buyer-base';
import {OwnerBase} from '../database-models/owner-base';
import {VendorPoolStatuBase} from '../database-models/vendor-pool-statu-base';
import {ProcurementJobBase} from '../database-models/procurement-job-base';
import {VendorPoolDataBase} from '../database-models/vendor-pool-data-base';
import {VendorPoolSubscriptionBase} from '../database-models/vendor-pool-subscription-base';
import {BidSessionBase} from '../database-models/bid-session-base';
//Generated Imports
export class VendorPool extends VendorPoolBase 
{




//#region Generated Reference Properties
//#region buyer Prop
buyer : BuyerBase;
//#endregion buyer Prop
//#region owner Prop
owner : UserBase;
//#endregion owner Prop
//#region vendorPoolStatus Prop
vendorPoolStatus : VendorPoolStatusBase;
//#endregion vendorPoolStatus Prop
//#region procurementJobs Prop
procurementJobs : ProcurementJobBase[];
//#endregion procurementJobs Prop
//#region vendorPoolData Prop
vendorPoolData : VendorPoolDataBase[];
//#endregion vendorPoolData Prop
//#region vendorPoolSubscriptions Prop
vendorPoolSubscriptions : VendorPoolSubscriptionBase[];
//#endregion vendorPoolSubscriptions Prop
//#region bidSessions Prop
bidSessions : BidSessionBase[];
//#endregion bidSessions Prop

//#endregion Generated Reference Properties
}