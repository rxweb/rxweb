import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorStatusBase {

//#region vendorStatusId Prop
        @prop()
        vendorStatusId : any;
//#endregion vendorStatusId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region vendorAccountStatusId Prop
        @required()
        vendorAccountStatusId : any;
//#endregion vendorAccountStatusId Prop


//#region eN_VendorStatus Prop
        @required()
        @maxLength({value:500})
        eN_VendorStatus : string;
//#endregion eN_VendorStatus Prop


//#region fR_VendorStatus Prop
        @maxLength({value:500})
        fR_VendorStatus : string;
//#endregion fR_VendorStatus Prop





}