import {ServiceFeeTermBase} from '../database-models/service-fee-term-base';
import {ServiceContractBase} from '../database-models/service-contract-base';
import {ServiceFeeTermTypeBase} from '../database-models/service-fee-term-type-base';
import {ServiceFeeCalculationBase} from '../database-models/service-fee-calculation-base';
import {CompanyVolumeMartBase} from '../database-models/company-volume-mart-base';
//Generated Imports
export class ServiceFeeTerm extends ServiceFeeTermBase 
{




//#region Generated Reference Properties
//#region serviceContract Prop
serviceContract : ServiceContractBase;
//#endregion serviceContract Prop
//#region serviceFeeTermType Prop
serviceFeeTermType : ServiceFeeTermTypeBase;
//#endregion serviceFeeTermType Prop
//#region serviceFeeCalculations Prop
serviceFeeCalculations : ServiceFeeCalculationBase[];
//#endregion serviceFeeCalculations Prop
//#region companyVolumeMarts Prop
companyVolumeMarts : CompanyVolumeMartBase[];
//#endregion companyVolumeMarts Prop

//#endregion Generated Reference Properties
}