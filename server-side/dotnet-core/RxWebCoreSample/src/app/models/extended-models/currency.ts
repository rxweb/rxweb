import {CurrencyBase} from '../database-models/currency-base';
import {TerritoryBase} from '../database-models/territory-base';
import {UserBase} from '../database-models/user-base';
import {ProcurementJobBase} from '../database-models/procurement-job-base';
import {CurrencyFormatMaskBase} from '../database-models/currency-format-mask-base';
//Generated Imports
export class Currency extends CurrencyBase 
{




//#region Generated Reference Properties
//#region territory Prop
territory : TerritoryBase;
//#endregion territory Prop
//#region users Prop
users : UserBase[];
//#endregion users Prop
//#region procurementJobs Prop
procurementJobs : ProcurementJobBase[];
//#endregion procurementJobs Prop
//#region currencyFormatMasks Prop
currencyFormatMasks : CurrencyFormatMaskBase[];
//#endregion currencyFormatMasks Prop

//#endregion Generated Reference Properties
}