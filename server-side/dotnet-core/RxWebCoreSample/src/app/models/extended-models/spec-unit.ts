import {SpecUnitBase} from '../database-models/spec-unit-base';
import {SpecBase} from '../database-models/spec-base';
import {QualitySampleRuleBase} from '../database-models/quality-sample-rule-base';
import {QualitySampleRuleShipmentBase} from '../database-models/quality-sample-rule-shipment-base';
import {SpecUnitSpecItemBase} from '../database-models/spec-unit-spec-item-base';
import {DeliveryDetailBase} from '../database-models/delivery-detail-base';
import {EstimateSpecUnitBase} from '../database-models/estimate-spec-unit-base';
//Generated Imports
export class SpecUnit extends SpecUnitBase 
{




//#region Generated Reference Properties
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region qualitySampleRule Prop
qualitySampleRule : QualitySampleRuleBase[];
//#endregion qualitySampleRule Prop
//#region qualitySampleRuleShipments Prop
qualitySampleRuleShipments : QualitySampleRuleShipmentBase[];
//#endregion qualitySampleRuleShipments Prop
//#region specUnitSpecItems Prop
specUnitSpecItems : SpecUnitSpecItemBase[];
//#endregion specUnitSpecItems Prop
//#region deliveryDetails Prop
deliveryDetails : DeliveryDetailBase[];
//#endregion deliveryDetails Prop
//#region estimateSpecUnits Prop
estimateSpecUnits : EstimateSpecUnitBase[];
//#endregion estimateSpecUnits Prop

//#endregion Generated Reference Properties
}