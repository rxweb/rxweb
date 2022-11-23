import {DeliveryBase} from '../database-models/delivery-base';
import {JobStepBase} from '../database-models/job-step-base';
import {SpecDestinationBase} from '../database-models/spec-destination-base';
import {SpecDeliveryBase} from '../database-models/spec-delivery-base';
import {SpecDeliveriesWorkingDeliveryBase} from '../database-models/spec-deliveries-working-delivery-base';
import {DeliveryDetailBase} from '../database-models/delivery-detail-base';
//Generated Imports
export class Delivery extends DeliveryBase 
{




//#region Generated Reference Properties
//#region jobStep Prop
jobStep : JobStepBase;
//#endregion jobStep Prop
//#region specDestination Prop
specDestination : SpecDestinationDetailBase;
//#endregion specDestination Prop
//#region specDeliveries Prop
specDeliveries : SpecDeliveryBase[];
//#endregion specDeliveries Prop
//#region specDeliveriesWorkingDelivery Prop
specDeliveriesWorkingDelivery : SpecDeliveryBase[];
//#endregion specDeliveriesWorkingDelivery Prop
//#region deliveryDetails Prop
deliveryDetails : DeliveryDetailBase[];
//#endregion deliveryDetails Prop

//#endregion Generated Reference Properties
}