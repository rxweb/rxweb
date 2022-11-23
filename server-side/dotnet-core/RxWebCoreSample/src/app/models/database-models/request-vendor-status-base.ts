import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RequestVendorStatusBase {

//#region requestVendorStatusId Prop
        @prop()
        requestVendorStatusId : any;
//#endregion requestVendorStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_RequestVendorStatusName Prop
        @required()
        @maxLength({value:500})
        eN_RequestVendorStatusName : string;
//#endregion eN_RequestVendorStatusName Prop


//#region fR_RequestVendorStatusName Prop
        @required()
        @maxLength({value:500})
        fR_RequestVendorStatusName : string;
//#endregion fR_RequestVendorStatusName Prop

}