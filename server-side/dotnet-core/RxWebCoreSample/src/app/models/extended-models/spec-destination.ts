import {SpecDestinationBase} from '../database-models/spec-destination-base';
import {SpecBase} from '../database-models/spec-base';
import {SpecItemCurrentStatuBase} from '../database-models/spec-item-current-statu-base';
import {SpecItemInitialStatuBase} from '../database-models/spec-item-initial-statu-base';
import {WorkingDestinationBase} from '../database-models/working-destination-base';
import {ShipmentBase} from '../database-models/shipment-base';
import {SpecOrderItemBase} from '../database-models/spec-order-item-base';
//Generated Imports
export class SpecDestination extends SpecDestinationBase 
{




//#region Generated Reference Properties
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region specItemCurrentStatus Prop
specItemCurrentStatus : SpecItemCurrentStatusBase;
//#endregion specItemCurrentStatus Prop
//#region specItemInitialStatus Prop
specItemInitialStatus : SpecItemInitialStatusBase;
//#endregion specItemInitialStatus Prop
//#region workingDestination Prop
workingDestination : SpecDestinationDetailBase;
//#endregion workingDestination Prop
//#region shipments Prop
shipments : ShipmentBase[];
//#endregion shipments Prop
//#region specOrderItems Prop
specOrderItems : SpecOrderItemBase[];
//#endregion specOrderItems Prop

//#endregion Generated Reference Properties
}