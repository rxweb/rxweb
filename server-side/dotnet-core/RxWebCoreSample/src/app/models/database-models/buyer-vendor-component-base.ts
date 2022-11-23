import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerVendorComponentBase {

//#region buyerVendorComponentId Prop
        @prop()
        buyerVendorComponentId : number;
//#endregion buyerVendorComponentId Prop


//#region buyerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerId : number;
//#endregion buyerId Prop


//#region vendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorId : number;
//#endregion vendorId Prop


//#region componentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        componentId : number;
//#endregion componentId Prop


//#region processColor Prop
        @required()
        processColor : any;
//#endregion processColor Prop


//#region qualityId Prop
        @prop()
        qualityId : any;
//#endregion qualityId Prop


//#region buyerVendorComponentStatusId Prop
        @required()
        buyerVendorComponentStatusId : any;
//#endregion buyerVendorComponentStatusId Prop


//#region componentEvaluationId Prop
        @prop()
        componentEvaluationId : number;
//#endregion componentEvaluationId Prop


//#region buyerVendorId Prop
        @prop()
        buyerVendorId : number;
//#endregion buyerVendorId Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop











}