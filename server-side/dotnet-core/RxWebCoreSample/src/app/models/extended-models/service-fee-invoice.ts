import {ServiceFeeInvoiceBase} from '../database-models/service-fee-invoice-base';
import {CreatedByNavigationBase} from '../database-models/created-by-navigation-base';
import {UpdatedByNavigationBase} from '../database-models/updated-by-navigation-base';
import {ServiceFeeBase} from '../database-models/service-fee-base';
import {ServiceFeeInvoiceFeeBase} from '../database-models/service-fee-invoice-fee-base';
//Generated Imports
export class ServiceFeeInvoice extends ServiceFeeInvoiceBase 
{




//#region Generated Reference Properties
//#region createdByNavigation Prop
createdByNavigation : UserBase;
//#endregion createdByNavigation Prop
//#region updatedByNavigation Prop
updatedByNavigation : UserBase;
//#endregion updatedByNavigation Prop
//#region serviceFees Prop
serviceFees : ServiceFeeBase[];
//#endregion serviceFees Prop
//#region serviceFeeInvoiceFees Prop
serviceFeeInvoiceFees : ServiceFeeInvoiceFeeBase[];
//#endregion serviceFeeInvoiceFees Prop

//#endregion Generated Reference Properties
}