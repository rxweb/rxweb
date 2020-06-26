import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialCustomFieldTitleBase {

//#region financialCustomFieldTitleId Prop
        @prop()
        financialCustomFieldTitleId : number;
//#endregion financialCustomFieldTitleId Prop


//#region name Prop
        @required()
        @maxLength({value:100})
        name : string;
//#endregion name Prop


//#region financialXferPreferenceId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialXferPreferenceId : number;
//#endregion financialXferPreferenceId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region maxFieldWidth Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        maxFieldWidth : number;
//#endregion maxFieldWidth Prop


//#region requiredField Prop
        @required()
        requiredField : boolean;
//#endregion requiredField Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop





}