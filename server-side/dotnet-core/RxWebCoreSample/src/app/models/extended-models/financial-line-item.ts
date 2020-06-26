import {FinancialLineItemBase} from '../database-models/financial-line-item-base';
import {BuyerJobStepBase} from '../database-models/buyer-job-step-base';
import {FinancialLineItemStatuBase} from '../database-models/financial-line-item-statu-base';
import {FinancialLineItemTypeBase} from '../database-models/financial-line-item-type-base';
import {JobBase} from '../database-models/job-base';
import {VendorJobStepBase} from '../database-models/vendor-job-step-base';
import {FinancialCustomFieldBase} from '../database-models/financial-custom-field-base';
import {PaymentTransferDetailBase} from '../database-models/payment-transfer-detail-base';
import {TaxItemBase} from '../database-models/tax-item-base';
import {DeliveryDetailBase} from '../database-models/delivery-detail-base';
import {ShipLogBase} from '../database-models/ship-log-base';
import {FinancialPayshipBase} from '../database-models/financial-payship-base';
import {FinancialPayshipsFinancialShipBase} from '../database-models/financial-payships-financial-ship-base';
import {JobStepBase} from '../database-models/job-step-base';
import {JobStepsPendingFinancialLineItemBase} from '../database-models/job-steps-pending-financial-line-item-base';
import {ElectronicDataInterchangeInvoiceBase} from '../database-models/electronic-data-interchange-invoice-base';
import {FinancialCostAllocationBase} from '../database-models/financial-cost-allocation-base';
//Generated Imports
export class FinancialLineItem extends FinancialLineItemBase 
{




//#region Generated Reference Properties
//#region buyerJobStep Prop
buyerJobStep : JobStepBase;
//#endregion buyerJobStep Prop
//#region financialLineItemStatus Prop
financialLineItemStatus : FinancialLineItemStatusBase;
//#endregion financialLineItemStatus Prop
//#region financialLineItemType Prop
financialLineItemType : FinancialLineItemTypeBase;
//#endregion financialLineItemType Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region vendorJobStep Prop
vendorJobStep : JobStepBase;
//#endregion vendorJobStep Prop
//#region financialCustomFields Prop
financialCustomFields : FinancialCustomFieldBase[];
//#endregion financialCustomFields Prop
//#region paymentTransferDetails Prop
paymentTransferDetails : PaymentTransferDetailBase[];
//#endregion paymentTransferDetails Prop
//#region taxItems Prop
taxItems : TaxItemBase[];
//#endregion taxItems Prop
//#region deliveryDetails Prop
deliveryDetails : DeliveryDetailBase[];
//#endregion deliveryDetails Prop
//#region shipLogs Prop
shipLogs : ShipLogBase[];
//#endregion shipLogs Prop
//#region financialPayships Prop
financialPayships : FinancialPayshipBase[];
//#endregion financialPayships Prop
//#region financialPayshipsFinancialShip Prop
financialPayshipsFinancialShip : FinancialPayshipBase[];
//#endregion financialPayshipsFinancialShip Prop
//#region jobSteps Prop
jobSteps : JobStepBase[];
//#endregion jobSteps Prop
//#region jobStepsPendingFinancialLineItem Prop
jobStepsPendingFinancialLineItem : JobStepBase[];
//#endregion jobStepsPendingFinancialLineItem Prop
//#region electronicDataInterchangeInvoices Prop
electronicDataInterchangeInvoices : ElectronicDataInterchangeInvoiceBase[];
//#endregion electronicDataInterchangeInvoices Prop
//#region financialCostAllocations Prop
financialCostAllocations : FinancialCostAllocationBase[];
//#endregion financialCostAllocations Prop

//#endregion Generated Reference Properties
}