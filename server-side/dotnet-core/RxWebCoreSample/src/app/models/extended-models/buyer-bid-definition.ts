import {BuyerBidDefinitionBase} from '../database-models/buyer-bid-definition-base';
import {BidDefinitionTypeBase} from '../database-models/bid-definition-type-base';
import {BidTypeBase} from '../database-models/bid-type-base';
import {BuyerBase} from '../database-models/buyer-base';
import {BidSessionBase} from '../database-models/bid-session-base';
import {BidDefinitionDistributionBase} from '../database-models/bid-definition-distribution-base';
//Generated Imports
export class BuyerBidDefinition extends BuyerBidDefinitionBase 
{




//#region Generated Reference Properties
//#region bidDefinitionType Prop
bidDefinitionType : BidDefinitionTypeBase;
//#endregion bidDefinitionType Prop
//#region bidType Prop
bidType : BidTypeBase;
//#endregion bidType Prop
//#region buyer Prop
buyer : BuyerBase;
//#endregion buyer Prop
//#region bidSessions Prop
bidSessions : BidSessionBase[];
//#endregion bidSessions Prop
//#region bidDefinitionDistributions Prop
bidDefinitionDistributions : BidDefinitionDistributionBase[];
//#endregion bidDefinitionDistributions Prop

//#endregion Generated Reference Properties
}