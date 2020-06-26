import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorPoolStatusBase {

//#region vendorPoolStatusId Prop
        @prop()
        vendorPoolStatusId : any;
//#endregion vendorPoolStatusId Prop


//#region statusId Prop
        @required()
        statusId : any;
//#endregion statusId Prop


//#region eN_VendorPoolStatus Prop
        @required()
        @maxLength({value:500})
        eN_VendorPoolStatus : string;
//#endregion eN_VendorPoolStatus Prop


//#region fR_VendorPoolStatus Prop
        @required()
        @maxLength({value:500})
        fR_VendorPoolStatus : string;
//#endregion fR_VendorPoolStatus Prop



}