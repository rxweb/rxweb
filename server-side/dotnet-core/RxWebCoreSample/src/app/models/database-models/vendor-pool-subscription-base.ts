import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorPoolSubscriptionBase {

//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region vendorPoolId Prop
        @prop()
        vendorPoolId : number;
//#endregion vendorPoolId Prop


//#region subscriptionStatusId Prop
        @required()
        subscriptionStatusId : any;
//#endregion subscriptionStatusId Prop


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