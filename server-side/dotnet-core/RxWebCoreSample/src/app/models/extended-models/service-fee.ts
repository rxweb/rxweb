import {ServiceFeeBase} from '../database-models/service-fee-base';
import {CompletedByLoginBase} from '../database-models/completed-by-login-base';
import {CompletedByUserBase} from '../database-models/completed-by-user-base';
import {CreatedByLoginBase} from '../database-models/created-by-login-base';
import {CreatedByUserBase} from '../database-models/created-by-user-base';
import {JobBase} from '../database-models/job-base';
import {ServiceFeeBatchBase} from '../database-models/service-fee-batch-base';
import {ServiceFeeInvoiceBase} from '../database-models/service-fee-invoice-base';
import {ServiceFeeStatuBase} from '../database-models/service-fee-statu-base';
import {ServiceFeeTypeBase} from '../database-models/service-fee-type-base';
import {ServiceFeeInvoiceFeeBase} from '../database-models/service-fee-invoice-fee-base';
//Generated Imports
export class ServiceFee extends ServiceFeeBase 
{




//#region Generated Reference Properties
//#region completedByLogin Prop
completedByLogin : UserBase;
//#endregion completedByLogin Prop
//#region completedByUser Prop
completedByUser : UserBase;
//#endregion completedByUser Prop
//#region createdByLogin Prop
createdByLogin : UserBase;
//#endregion createdByLogin Prop
//#region createdByUser Prop
createdByUser : UserBase;
//#endregion createdByUser Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region serviceFeeBatch Prop
serviceFeeBatch : ServiceFeeBatchBase;
//#endregion serviceFeeBatch Prop
//#region serviceFeeInvoice Prop
serviceFeeInvoice : ServiceFeeInvoiceBase;
//#endregion serviceFeeInvoice Prop
//#region serviceFeeStatus Prop
serviceFeeStatus : ServiceFeeStatusBase;
//#endregion serviceFeeStatus Prop
//#region serviceFeeType Prop
serviceFeeType : ServiceFeeTypeBase;
//#endregion serviceFeeType Prop
//#region serviceFeeInvoiceFees Prop
serviceFeeInvoiceFees : ServiceFeeInvoiceFeeBase[];
//#endregion serviceFeeInvoiceFees Prop

//#endregion Generated Reference Properties
}