import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeStatusBase {

//#region serviceFeeStatusId Prop
        @prop()
        serviceFeeStatusId : any;
//#endregion serviceFeeStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_ServiceFeeStatusName Prop
        @required()
        @maxLength({value:500})
        eN_ServiceFeeStatusName : string;
//#endregion eN_ServiceFeeStatusName Prop


//#region fR_ServiceFeeStatusName Prop
        @maxLength({value:500})
        fR_ServiceFeeStatusName : string;
//#endregion fR_ServiceFeeStatusName Prop



}