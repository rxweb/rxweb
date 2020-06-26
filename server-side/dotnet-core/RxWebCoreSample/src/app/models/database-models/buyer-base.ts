import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerBase {

//#region buyerId Prop
        @prop()
        buyerId : number;
//#endregion buyerId Prop


//#region vendorQualifierId Prop
        @prop()
        vendorQualifierId : number;
//#endregion vendorQualifierId Prop


//#region buyerDesignationId Prop
        @prop()
        buyerDesignationId : any;
//#endregion buyerDesignationId Prop


//#region buyerVendorSetupProcessId Prop
        @prop()
        buyerVendorSetupProcessId : any;
//#endregion buyerVendorSetupProcessId Prop


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