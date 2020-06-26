import {BidSessionBidderBase} from '../database-models/bid-session-bidder-base';
import {AwardStatuBase} from '../database-models/award-statu-base';
import {BidSessionVendorBase} from '../database-models/bid-session-vendor-base';
import {BidStatuBase} from '../database-models/bid-statu-base';
import {BidUserBase} from '../database-models/bid-user-base';
import {ErroneousBidStatuBase} from '../database-models/erroneous-bid-statu-base';
import {JobStepBase} from '../database-models/job-step-base';
import {ReasonForNoBidBase} from '../database-models/reason-for-no-bid-base';
import {VendorAssignedTeamMemberBase} from '../database-models/vendor-assigned-team-member-base';
import {BidSessionFileAttachmentBase} from '../database-models/bid-session-file-attachment-base';
import {BidSessionPriceBase} from '../database-models/bid-session-price-base';
import {ErroneousBidBase} from '../database-models/erroneous-bid-base';
//Generated Imports
export class BidSessionBidder extends BidSessionBidderBase 
{




//#region Generated Reference Properties
//#region awardStatus Prop
awardStatus : AwardStatusBase;
//#endregion awardStatus Prop
//#region bidSessionVendor Prop
bidSessionVendor : BidSessionVendorBase;
//#endregion bidSessionVendor Prop
//#region bidStatus Prop
bidStatus : BidStatusBase;
//#endregion bidStatus Prop
//#region bidUser Prop
bidUser : UserBase;
//#endregion bidUser Prop
//#region erroneousBidStatus Prop
erroneousBidStatus : ErroneousBidStatusBase;
//#endregion erroneousBidStatus Prop
//#region jobStep Prop
jobStep : JobStepBase;
//#endregion jobStep Prop
//#region reasonForNoBid Prop
reasonForNoBid : ReasonForNoBidBase;
//#endregion reasonForNoBid Prop
//#region vendorAssignedTeamMembers Prop
vendorAssignedTeamMembers : VendorAssignedTeamMemberBase[];
//#endregion vendorAssignedTeamMembers Prop
//#region bidSessionFileAttachments Prop
bidSessionFileAttachments : BidSessionFileAttachmentBase[];
//#endregion bidSessionFileAttachments Prop
//#region bidSessionPrices Prop
bidSessionPrices : BidSessionPriceBase[];
//#endregion bidSessionPrices Prop
//#region erroneousBids Prop
erroneousBids : ErroneousBidBase[];
//#endregion erroneousBids Prop

//#endregion Generated Reference Properties
}