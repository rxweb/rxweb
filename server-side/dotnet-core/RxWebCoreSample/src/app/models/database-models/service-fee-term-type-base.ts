import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeTermTypeBase {

//#region serviceFeeTermTypeId Prop
        @prop()
        serviceFeeTermTypeId : any;
//#endregion serviceFeeTermTypeId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_ServiceFeeTermTypeName Prop
        @required()
        @maxLength({value:500})
        eN_ServiceFeeTermTypeName : string;
//#endregion eN_ServiceFeeTermTypeName Prop


//#region fR_ServiceFeeTermTypeName Prop
        @maxLength({value:500})
        fR_ServiceFeeTermTypeName : string;
//#endregion fR_ServiceFeeTermTypeName Prop



}