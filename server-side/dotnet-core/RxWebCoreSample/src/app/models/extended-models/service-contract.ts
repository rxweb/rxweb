import {ServiceContractBase} from '../database-models/service-contract-base';
import {BuyerBase} from '../database-models/buyer-base';
import {TermSelectionStyleBase} from '../database-models/term-selection-style-base';
import {ServiceFeeTermBase} from '../database-models/service-fee-term-base';
//Generated Imports
export class ServiceContract extends ServiceContractBase 
{




//#region Generated Reference Properties
//#region buyer Prop
buyer : BuyerBase;
//#endregion buyer Prop
//#region termSelectionStyle Prop
termSelectionStyle : TermSelectionStyleBase;
//#endregion termSelectionStyle Prop
//#region serviceFeeTerms Prop
serviceFeeTerms : ServiceFeeTermBase[];
//#endregion serviceFeeTerms Prop

//#endregion Generated Reference Properties
}