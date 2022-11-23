import {QualitySampleRuleBase} from '../database-models/quality-sample-rule-base';
import {SpecDestinationBase} from '../database-models/spec-destination-base';
import {SpecUnitBase} from '../database-models/spec-unit-base';
import {TimeOffsetRuleBase} from '../database-models/time-offset-rule-base';
import {TimeOffsetUnitBase} from '../database-models/time-offset-unit-base';
import {QualitySampleRuleShipmentBase} from '../database-models/quality-sample-rule-shipment-base';
//Generated Imports
export class QualitySampleRule extends QualitySampleRuleBase 
{




//#region Generated Reference Properties
//#region specDestination Prop
specDestination : SpecDestinationDetailBase;
//#endregion specDestination Prop
//#region specUnit Prop
specUnit : SpecUnitBase;
//#endregion specUnit Prop
//#region timeOffsetRule Prop
timeOffsetRule : TimeOffSetRuleBase;
//#endregion timeOffsetRule Prop
//#region timeOffsetUnit Prop
timeOffsetUnit : TimeOffSetUnitBase;
//#endregion timeOffsetUnit Prop
//#region qualitySampleRuleShipments Prop
qualitySampleRuleShipments : QualitySampleRuleShipmentBase[];
//#endregion qualitySampleRuleShipments Prop

//#endregion Generated Reference Properties
}