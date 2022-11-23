import {ProcurementJobBase} from '../database-models/procurement-job-base';
import {CurrencyBase} from '../database-models/currency-base';
import {DefaultBidResultTypeBase} from '../database-models/default-bid-result-type-base';
import {JobBase} from '../database-models/job-base';
import {JobStatuBase} from '../database-models/job-statu-base';
import {ServiceFeeCalculationBase} from '../database-models/service-fee-calculation-base';
import {VendorPoolBase} from '../database-models/vendor-pool-base';
//Generated Imports
export class ProcurementJob extends ProcurementJobBase 
{




//#region Generated Reference Properties
//#region currency Prop
currency : CurrencyBase;
//#endregion currency Prop
//#region defaultBidResultType Prop
defaultBidResultType : BidResultTypeBase;
//#endregion defaultBidResultType Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region jobStatus Prop
jobStatus : JobStatusBase;
//#endregion jobStatus Prop
//#region serviceFeeCalculation Prop
serviceFeeCalculation : ServiceFeeCalculationBase;
//#endregion serviceFeeCalculation Prop
//#region vendorPool Prop
vendorPool : VendorPoolBase;
//#endregion vendorPool Prop

//#endregion Generated Reference Properties
}