import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorComponentStatusBase {

//#region vendorComponentStatusId Prop
        @prop()
        vendorComponentStatusId : any;
//#endregion vendorComponentStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_VendorComponentStatus Prop
        @required()
        @maxLength({value:500})
        eN_VendorComponentStatus : string;
//#endregion eN_VendorComponentStatus Prop


//#region fR_VendorComponentStatus Prop
        @required()
        @maxLength({value:500})
        fR_VendorComponentStatus : string;
//#endregion fR_VendorComponentStatus Prop



}