import {SpecificationDetailBase} from '../database-models/specification-detail-base';
import {JobBase} from '../database-models/job-base';
import {SpecStatuBase} from '../database-models/spec-statu-base';
import {WorkingSpecificationBase} from '../database-models/working-specification-base';
import {SpecMilestoneTaskBase} from '../database-models/spec-milestone-task-base';
import {SpecDestinationBase} from '../database-models/spec-destination-base';
import {SpecFinancialItemBase} from '../database-models/spec-financial-item-base';
import {ChangeRevisionBase} from '../database-models/change-revision-base';
import {ShipmentBase} from '../database-models/shipment-base';
import {SpecDestinationDetailBase} from '../database-models/spec-destination-detail-base';
import {ChangeOrderBase} from '../database-models/change-order-base';
import {ShipmentAllocationBase} from '../database-models/shipment-allocation-base';
import {SpecItemBase} from '../database-models/spec-item-base';
import {SpecSpecItemMappingBase} from '../database-models/spec-spec-item-mapping-base';
import {JobStepBase} from '../database-models/job-step-base';
import {SpecProofBase} from '../database-models/spec-proof-base';
import {SpecBuyerFurnishedMaterialBase} from '../database-models/spec-buyer-furnished-material-base';
import {SpecDeliveryBase} from '../database-models/spec-delivery-base';
import {SpecUnitBase} from '../database-models/spec-unit-base';
//Generated Imports
export class SpecificationDetail extends SpecificationDetailBase 
{




//#region Generated Reference Properties
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region specStatus Prop
specStatus : SpecStatusBase;
//#endregion specStatus Prop
//#region workingSpecification Prop
workingSpecification : SpecificationDetailBase;
//#endregion workingSpecification Prop
//#region specMilestoneTasks Prop
specMilestoneTasks : SpecMilestoneTaskBase[];
//#endregion specMilestoneTasks Prop
//#region specDestinations Prop
specDestinations : SpecDestinationBase[];
//#endregion specDestinations Prop
//#region specFinancialItems Prop
specFinancialItems : SpecFinancialItemBase[];
//#endregion specFinancialItems Prop
//#region changeRevisions Prop
changeRevisions : ChangeRevisionBase[];
//#endregion changeRevisions Prop
//#region shipments Prop
shipments : ShipmentBase[];
//#endregion shipments Prop
//#region specDestinationDetails Prop
specDestinationDetails : SpecDestinationDetailBase[];
//#endregion specDestinationDetails Prop
//#region changeOrders Prop
changeOrders : ChangeOrderBase[];
//#endregion changeOrders Prop
//#region shipmentAllocations Prop
shipmentAllocations : ShipmentAllocationBase[];
//#endregion shipmentAllocations Prop
//#region specItems Prop
specItems : SpecItemBase[];
//#endregion specItems Prop
//#region specSpecItemMappings Prop
specSpecItemMappings : SpecSpecItemMappingBase[];
//#endregion specSpecItemMappings Prop
//#region jobSteps Prop
jobSteps : JobStepBase[];
//#endregion jobSteps Prop
//#region specProofs Prop
specProofs : SpecProofBase[];
//#endregion specProofs Prop
//#region specBuyerFurnishedMaterial Prop
specBuyerFurnishedMaterial : SpecBuyerFurnishedMaterialBase[];
//#endregion specBuyerFurnishedMaterial Prop
//#region specDeliveries Prop
specDeliveries : SpecDeliveryBase[];
//#endregion specDeliveries Prop
//#region specUnits Prop
specUnits : SpecUnitBase[];
//#endregion specUnits Prop
//#region specificationDetails Prop
specificationDetails : SpecificationDetailBase[];
//#endregion specificationDetails Prop

//#endregion Generated Reference Properties
}