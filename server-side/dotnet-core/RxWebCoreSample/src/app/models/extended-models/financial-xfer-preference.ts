import {FinancialXferPreferenceBase} from '../database-models/financial-xfer-preference-base';
import {FinancialLineItemTypeBase} from '../database-models/financial-line-item-type-base';
import {UserBase} from '../database-models/user-base';
import {FinancialCustomFieldTitleBase} from '../database-models/financial-custom-field-title-base';
//Generated Imports
export class FinancialXferPreference extends FinancialXferPreferenceBase 
{




//#region Generated Reference Properties
//#region financialLineItemType Prop
financialLineItemType : FinancialLineItemTypeBase;
//#endregion financialLineItemType Prop
//#region user Prop
user : UserBase;
//#endregion user Prop
//#region financialCustomFieldTitles Prop
financialCustomFieldTitles : FinancialCustomFieldTitleBase[];
//#endregion financialCustomFieldTitles Prop

//#endregion Generated Reference Properties
}