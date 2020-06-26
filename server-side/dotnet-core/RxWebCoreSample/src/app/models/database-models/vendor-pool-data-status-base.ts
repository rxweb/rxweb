import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorPoolDataStatusBase {

//#region vendorPoolDataStatusId Prop
        @prop()
        vendorPoolDataStatusId : any;
//#endregion vendorPoolDataStatusId Prop


//#region eN_VendorPoolDataStatus Prop
        @required()
        @maxLength({value:500})
        eN_VendorPoolDataStatus : string;
//#endregion eN_VendorPoolDataStatus Prop


//#region fR_VendorPoolDataStatus Prop
        @required()
        @maxLength({value:500})
        fR_VendorPoolDataStatus : string;
//#endregion fR_VendorPoolDataStatus Prop



}