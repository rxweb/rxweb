import {SpecOrderItemBase} from '../database-models/spec-order-item-base';
import {OrderItemBase} from '../database-models/order-item-base';
import {SpecDestinationBase} from '../database-models/spec-destination-base';
import {SpecItemCurrentStatuBase} from '../database-models/spec-item-current-statu-base';
import {SpecItemInitialStatuBase} from '../database-models/spec-item-initial-statu-base';
import {SpecSpecItemBase} from '../database-models/spec-spec-item-base';
import {WorkingOrderItemBase} from '../database-models/working-order-item-base';
import {ShipmentAllocationBase} from '../database-models/shipment-allocation-base';
//Generated Imports
export class SpecOrderItem extends SpecOrderItemBase 
{




//#region Generated Reference Properties
//#region orderItem Prop
orderItem : OrderItemBase;
//#endregion orderItem Prop
//#region specDestination Prop
specDestination : SpecDestinationBase;
//#endregion specDestination Prop
//#region specItemCurrentStatus Prop
specItemCurrentStatus : SpecItemCurrentStatusBase;
//#endregion specItemCurrentStatus Prop
//#region specItemInitialStatus Prop
specItemInitialStatus : SpecItemInitialStatusBase;
//#endregion specItemInitialStatus Prop
//#region specSpecItem Prop
specSpecItem : SpecSpecItemMappingBase;
//#endregion specSpecItem Prop
//#region workingOrderItem Prop
workingOrderItem : OrderItemBase;
//#endregion workingOrderItem Prop
//#region shipmentAllocations Prop
shipmentAllocations : ShipmentAllocationBase[];
//#endregion shipmentAllocations Prop

//#endregion Generated Reference Properties
}