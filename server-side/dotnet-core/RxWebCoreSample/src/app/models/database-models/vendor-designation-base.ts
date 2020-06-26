import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorDesignationBase {

//#region vendorDesignationId Prop
        @prop()
        vendorDesignationId : any;
//#endregion vendorDesignationId Prop


//#region eN_VendorDesignation Prop
        @required()
        @maxLength({value:500})
        eN_VendorDesignation : string;
//#endregion eN_VendorDesignation Prop


//#region fR_VendorDesignation Prop
        @required()
        @maxLength({value:500})
        fR_VendorDesignation : string;
//#endregion fR_VendorDesignation Prop



}