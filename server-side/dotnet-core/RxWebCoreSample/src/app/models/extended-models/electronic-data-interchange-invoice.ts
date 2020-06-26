import {ElectronicDataInterchangeInvoiceBase} from '../database-models/electronic-data-interchange-invoice-base';
import {BuyerCompanyBase} from '../database-models/buyer-company-base';
import {ElectronicDataInterchangeBatchBase} from '../database-models/electronic-data-interchange-batch-base';
import {ElectronicDataInterchangeInvoiceTypeBase} from '../database-models/electronic-data-interchange-invoice-type-base';
import {FinancialLineItemBase} from '../database-models/financial-line-item-base';
import {JobBase} from '../database-models/job-base';
//Generated Imports
export class ElectronicDataInterchangeInvoice extends ElectronicDataInterchangeInvoiceBase 
{




//#region Generated Reference Properties
//#region buyerCompany Prop
buyerCompany : UserBase;
//#endregion buyerCompany Prop
//#region electronicDataInterchangeBatch Prop
electronicDataInterchangeBatch : ElectronicDataInterchangeBatchBase;
//#endregion electronicDataInterchangeBatch Prop
//#region electronicDataInterchangeInvoiceType Prop
electronicDataInterchangeInvoiceType : ElectronicDataInterchangeInvoiceTypeBase;
//#endregion electronicDataInterchangeInvoiceType Prop
//#region financialLineItem Prop
financialLineItem : FinancialLineItemBase;
//#endregion financialLineItem Prop
//#region job Prop
job : JobBase;
//#endregion job Prop

//#endregion Generated Reference Properties
}