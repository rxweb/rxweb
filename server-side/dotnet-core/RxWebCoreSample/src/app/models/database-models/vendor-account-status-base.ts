import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorAccountStatusBase {

//#region vendorAccountStatusId Prop
        @prop()
        vendorAccountStatusId : any;
//#endregion vendorAccountStatusId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_VendorAccountStatus Prop
        @required()
        @maxLength({value:500})
        eN_VendorAccountStatus : string;
//#endregion eN_VendorAccountStatus Prop


//#region fR_VendorAccountStatus Prop
        @maxLength({value:500})
        fR_VendorAccountStatus : string;
//#endregion fR_VendorAccountStatus Prop



}