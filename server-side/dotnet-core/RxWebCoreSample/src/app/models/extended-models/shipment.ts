import {ShipmentBase} from '../database-models/shipment-base';
import {ShipperLoginBase} from '../database-models/shipper-login-base';
import {ShipperUserBase} from '../database-models/shipper-user-base';
import {SpecDestinationBase} from '../database-models/spec-destination-base';
import {SpecBase} from '../database-models/spec-base';
import {SpecSpecItemBase} from '../database-models/spec-spec-item-base';
import {ShipmentAllocationBase} from '../database-models/shipment-allocation-base';
//Generated Imports
export class Shipment extends ShipmentBase 
{




//#region Generated Reference Properties
//#region shipperLogin Prop
shipperLogin : UserBase;
//#endregion shipperLogin Prop
//#region shipperUser Prop
shipperUser : UserBase;
//#endregion shipperUser Prop
//#region specDestination Prop
specDestination : SpecDestinationBase;
//#endregion specDestination Prop
//#region spec Prop
spec : SpecDestinationBase;
//#endregion spec Prop
//#region specSpecItem Prop
specSpecItem : SpecSpecItemMappingBase;
//#endregion specSpecItem Prop
//#region shipmentAllocations Prop
shipmentAllocations : ShipmentAllocationBase[];
//#endregion shipmentAllocations Prop

//#endregion Generated Reference Properties
}