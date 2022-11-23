import {SpecDeliveryBase} from '../database-models/spec-delivery-base';
import {DeliveryBase} from '../database-models/delivery-base';
import {SpecBase} from '../database-models/spec-base';
import {SpecItemCurrentStatuBase} from '../database-models/spec-item-current-statu-base';
import {SpecItemInitialStatuBase} from '../database-models/spec-item-initial-statu-base';
import {WorkingDeliveryBase} from '../database-models/working-delivery-base';
//Generated Imports
export class SpecDelivery extends SpecDeliveryBase 
{




//#region Generated Reference Properties
//#region delivery Prop
delivery : DeliveryBase;
//#endregion delivery Prop
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region specItemCurrentStatus Prop
specItemCurrentStatus : SpecItemCurrentStatusBase;
//#endregion specItemCurrentStatus Prop
//#region specItemInitialStatus Prop
specItemInitialStatus : SpecItemInitialStatusBase;
//#endregion specItemInitialStatus Prop
//#region workingDelivery Prop
workingDelivery : DeliveryBase;
//#endregion workingDelivery Prop

//#endregion Generated Reference Properties
}