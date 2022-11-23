import {ServiceFeeBatchBase} from '../database-models/service-fee-batch-base';
import {BuyerBase} from '../database-models/buyer-base';
import {ProcessedByLoginBase} from '../database-models/processed-by-login-base';
import {ProcessedByUserBase} from '../database-models/processed-by-user-base';
import {ServiceFeeBase} from '../database-models/service-fee-base';
//Generated Imports
export class ServiceFeeBatch extends ServiceFeeBatchBase 
{




//#region Generated Reference Properties
//#region buyer Prop
buyer : BuyerBase;
//#endregion buyer Prop
//#region processedByLogin Prop
processedByLogin : UserBase;
//#endregion processedByLogin Prop
//#region processedByUser Prop
processedByUser : UserBase;
//#endregion processedByUser Prop
//#region serviceFees Prop
serviceFees : ServiceFeeBase[];
//#endregion serviceFees Prop

//#endregion Generated Reference Properties
}