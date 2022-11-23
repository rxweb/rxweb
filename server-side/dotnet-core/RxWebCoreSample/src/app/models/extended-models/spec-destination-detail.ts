import {SpecDestinationDetailBase} from '../database-models/spec-destination-detail-base';
import {DefaultApproveUserBase} from '../database-models/default-approve-user-base';
import {DefaultReceiveUserBase} from '../database-models/default-receive-user-base';
import {DestinationTypeBase} from '../database-models/destination-type-base';
import {FobTypeBase} from '../database-models/fob-type-base';
import {SpecBase} from '../database-models/spec-base';
import {StateBase} from '../database-models/state-base';
import {DeliveryDetailBase} from '../database-models/delivery-detail-base';
import {BuyerFurnishedMaterialBase} from '../database-models/buyer-furnished-material-base';
import {BuyerFurnishedMaterialReturnSpecDestinationBase} from '../database-models/buyer-furnished-material-return-spec-destination-base';
import {DeliveryBase} from '../database-models/delivery-base';
import {QualitySampleRuleBase} from '../database-models/quality-sample-rule-base';
import {SpecDestinationBase} from '../database-models/spec-destination-base';
//Generated Imports
export class SpecDestinationDetail extends SpecDestinationDetailBase 
{




//#region Generated Reference Properties
//#region defaultApproveUser Prop
defaultApproveUser : UserBase;
//#endregion defaultApproveUser Prop
//#region defaultReceiveUser Prop
defaultReceiveUser : UserBase;
//#endregion defaultReceiveUser Prop
//#region destinationType Prop
destinationType : DestinationTypeBase;
//#endregion destinationType Prop
//#region fobType Prop
fobType : FobTypeBase;
//#endregion fobType Prop
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region state Prop
state : StateBase;
//#endregion state Prop
//#region deliveryDetails Prop
deliveryDetails : DeliveryDetailBase[];
//#endregion deliveryDetails Prop
//#region buyerFurnishedMaterial Prop
buyerFurnishedMaterial : BuyerFurnishedMaterialBase[];
//#endregion buyerFurnishedMaterial Prop
//#region buyerFurnishedMaterialReturnSpecDestination Prop
buyerFurnishedMaterialReturnSpecDestination : BuyerFurnishedMaterialBase[];
//#endregion buyerFurnishedMaterialReturnSpecDestination Prop
//#region deliveries Prop
deliveries : DeliveryBase[];
//#endregion deliveries Prop
//#region qualitySampleRule Prop
qualitySampleRule : QualitySampleRuleBase[];
//#endregion qualitySampleRule Prop
//#region specDestinations Prop
specDestinations : SpecDestinationBase[];
//#endregion specDestinations Prop

//#endregion Generated Reference Properties
}