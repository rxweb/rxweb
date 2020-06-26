import {DeliveryDetailBase} from '../database-models/delivery-detail-base';
import {CurrentReconcileLogBase} from '../database-models/current-reconcile-log-base';
import {DeliveryDetailStatuBase} from '../database-models/delivery-detail-statu-base';
import {DeliveryBase} from '../database-models/delivery-base';
import {FinancialLineItemBase} from '../database-models/financial-line-item-base';
import {JobStepBase} from '../database-models/job-step-base';
import {QsrShipmentBase} from '../database-models/qsr-shipment-base';
import {QsSourceDeliveryDetailBase} from '../database-models/qs-source-delivery-detail-base';
import {SpecDestinationBase} from '../database-models/spec-destination-base';
import {SpecUnitBase} from '../database-models/spec-unit-base';
import {DeliveryFileAttachmentBase} from '../database-models/delivery-file-attachment-base';
import {ReconcileLogBase} from '../database-models/reconcile-log-base';
//Generated Imports
export class DeliveryDetail extends DeliveryDetailBase 
{




//#region Generated Reference Properties
//#region currentReconcileLog Prop
currentReconcileLog : ReconcileLogBase;
//#endregion currentReconcileLog Prop
//#region deliveryDetailStatus Prop
deliveryDetailStatus : DeliveryDetailStatusBase;
//#endregion deliveryDetailStatus Prop
//#region delivery Prop
delivery : DeliveryBase;
//#endregion delivery Prop
//#region financialLineItem Prop
financialLineItem : FinancialLineItemBase;
//#endregion financialLineItem Prop
//#region jobStep Prop
jobStep : JobStepBase;
//#endregion jobStep Prop
//#region qsrShipment Prop
qsrShipment : QualitySampleRuleShipmentBase;
//#endregion qsrShipment Prop
//#region qsSourceDeliveryDetail Prop
qsSourceDeliveryDetail : DeliveryDetailBase;
//#endregion qsSourceDeliveryDetail Prop
//#region specDestination Prop
specDestination : SpecDestinationDetailBase;
//#endregion specDestination Prop
//#region specUnit Prop
specUnit : SpecUnitBase;
//#endregion specUnit Prop
//#region deliveryFileAttachments Prop
deliveryFileAttachments : DeliveryFileAttachmentBase[];
//#endregion deliveryFileAttachments Prop
//#region reconcileLogs Prop
reconcileLogs : ReconcileLogBase[];
//#endregion reconcileLogs Prop
//#region deliveryDetails Prop
deliveryDetails : DeliveryDetailBase[];
//#endregion deliveryDetails Prop

//#endregion Generated Reference Properties
}