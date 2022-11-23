import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeTypeBase {

//#region serviceFeeTypesId Prop
        @prop()
        serviceFeeTypesId : any;
//#endregion serviceFeeTypesId Prop


//#region eN_ServiceFeeTypeName Prop
        @required()
        @maxLength({value:500})
        eN_ServiceFeeTypeName : string;
//#endregion eN_ServiceFeeTypeName Prop


//#region fR_ServiceFeeTypeName Prop
        @maxLength({value:500})
        fR_ServiceFeeTypeName : string;
//#endregion fR_ServiceFeeTypeName Prop



}