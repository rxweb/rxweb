import {BidSessionVendorBase} from '../database-models/bid-session-vendor-base';
import {BidSessionBase} from '../database-models/bid-session-base';
import {BidSessionTypeBase} from '../database-models/bid-session-type-base';
import {BidSessionVendorStatuBase} from '../database-models/bid-session-vendor-statu-base';
import {VendorBase} from '../database-models/vendor-base';
import {BidSessionBidderBase} from '../database-models/bid-session-bidder-base';
//Generated Imports
export class BidSessionVendor extends BidSessionVendorBase 
{




//#region Generated Reference Properties
//#region bidSession Prop
bidSession : BidSessionBase;
//#endregion bidSession Prop
//#region bidSessionType Prop
bidSessionType : BidSessionTypeBase;
//#endregion bidSessionType Prop
//#region bidSessionVendorStatus Prop
bidSessionVendorStatus : BidSessionVendorStatusBase;
//#endregion bidSessionVendorStatus Prop
//#region vendor Prop
vendor : VendorBase;
//#endregion vendor Prop
//#region bidSessionBidders Prop
bidSessionBidders : BidSessionBidderBase[];
//#endregion bidSessionBidders Prop

//#endregion Generated Reference Properties
}