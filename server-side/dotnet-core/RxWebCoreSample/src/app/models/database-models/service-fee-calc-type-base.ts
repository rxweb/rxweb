import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeCalcTypeBase {

//#region serviceFeeCalcTypeId Prop
        @prop()
        serviceFeeCalcTypeId : any;
//#endregion serviceFeeCalcTypeId Prop


//#region eN_ServiceFeeCalcTypeName Prop
        @required()
        @maxLength({value:500})
        eN_ServiceFeeCalcTypeName : string;
//#endregion eN_ServiceFeeCalcTypeName Prop


//#region fR_ServiceFeeCalcTypeName Prop
        @maxLength({value:500})
        fR_ServiceFeeCalcTypeName : string;
//#endregion fR_ServiceFeeCalcTypeName Prop

}