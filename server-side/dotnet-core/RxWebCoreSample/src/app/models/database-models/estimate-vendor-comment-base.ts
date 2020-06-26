import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateVendorCommentBase {

//#region estimateVendorCommentId Prop
        @prop()
        estimateVendorCommentId : number;
//#endregion estimateVendorCommentId Prop


//#region estimateVendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateVendorId : number;
//#endregion estimateVendorId Prop


//#region estimateSpecUnitId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateSpecUnitId : number;
//#endregion estimateSpecUnitId Prop


//#region vendorComments Prop
        @maxLength({value:4000})
        vendorComments : string;
//#endregion vendorComments Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop





}