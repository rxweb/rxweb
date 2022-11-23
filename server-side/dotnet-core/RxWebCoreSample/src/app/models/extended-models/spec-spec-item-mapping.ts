import {SpecSpecItemMappingBase} from '../database-models/spec-spec-item-mapping-base';
import {SpecBase} from '../database-models/spec-base';
import {SpecItemCurrentStatuBase} from '../database-models/spec-item-current-statu-base';
import {SpecItemBase} from '../database-models/spec-item-base';
import {SpecItemInitialStatuBase} from '../database-models/spec-item-initial-statu-base';
import {WorkingSpecItemBase} from '../database-models/working-spec-item-base';
import {CompositeSpecItemBase} from '../database-models/composite-spec-item-base';
import {CompositeSpecItemsSpecSpecItemBase} from '../database-models/composite-spec-items-spec-spec-item-base';
import {ShipmentBase} from '../database-models/shipment-base';
import {SpecOrderItemBase} from '../database-models/spec-order-item-base';
//Generated Imports
export class SpecSpecItemMapping extends SpecSpecItemMappingBase 
{




//#region Generated Reference Properties

//#region parent Prop
        parent : SpecSpecItemMappingBase;
//#endregion parent Prop
//#region spec Prop
spec : SpecSpecItemMappingBase;
//#endregion spec Prop
//#region specItemCurrentStatus Prop
specItemCurrentStatus : SpecItemCurrentStatusBase;
//#endregion specItemCurrentStatus Prop
//#region specItem Prop
specItem : SpecItemBase;
//#endregion specItem Prop
//#region specItemInitialStatus Prop
specItemInitialStatus : SpecItemInitialStatusBase;
//#endregion specItemInitialStatus Prop
//#region workingSpecItem Prop
workingSpecItem : SpecItemBase;
//#endregion workingSpecItem Prop
//#region compositeSpecItems Prop
compositeSpecItems : CompositeSpecItemBase[];
//#endregion compositeSpecItems Prop
//#region compositeSpecItemsSpecSpecItem Prop
compositeSpecItemsSpecSpecItem : CompositeSpecItemBase[];
//#endregion compositeSpecItemsSpecSpecItem Prop
//#region shipments Prop
shipments : ShipmentBase[];
//#endregion shipments Prop
//#region specOrderItems Prop
specOrderItems : SpecOrderItemBase[];
//#endregion specOrderItems Prop

//#region specSpecItemMappings Prop
        specSpecItemMappings : SpecSpecItemMappingBase[];
//#endregion specSpecItemMappings Prop

//#endregion Generated Reference Properties
}