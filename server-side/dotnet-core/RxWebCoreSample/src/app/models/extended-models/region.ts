import {RegionBase} from '../database-models/region-base';
import {ProductBase} from '../database-models/product-base';
import {PlanInvitationForBidTypeRegionMappingBase} from '../database-models/plan-invitation-for-bid-type-region-mapping-base';
import {InvitationForBidBase} from '../database-models/invitation-for-bid-base';
//Generated Imports
export class Region extends RegionBase 
{




//#region Generated Reference Properties
//#region product Prop
product : ProductBase;
//#endregion product Prop
//#region planInvitationForBidTypeRegionMappings Prop
planInvitationForBidTypeRegionMappings : PlanInvitationForBidTypeRegionMappingBase[];
//#endregion planInvitationForBidTypeRegionMappings Prop
//#region invitationForBids Prop
invitationForBids : InvitationForBidBase[];
//#endregion invitationForBids Prop

//#endregion Generated Reference Properties
}