import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialXferTypeBase {

//#region financialXferTypeId Prop
        @prop()
        financialXferTypeId : any;
//#endregion financialXferTypeId Prop


//#region financialXferTypeName Prop
        @required()
        @maxLength({value:500})
        financialXferTypeName : string;
//#endregion financialXferTypeName Prop

}