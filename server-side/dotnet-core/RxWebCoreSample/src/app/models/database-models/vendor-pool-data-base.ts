import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorPoolDataBase {

//#region vendorPoolId Prop
        @prop()
        vendorPoolId : number;
//#endregion vendorPoolId Prop


//#region buyerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerId : number;
//#endregion buyerId Prop


//#region vendorId Prop
        @prop()
        vendorId : number;
//#endregion vendorId Prop


//#region serviceId Prop
        @required()
        serviceId : any;
//#endregion serviceId Prop


//#region vendorPoolDataStatusId Prop
        @required()
        vendorPoolDataStatusId : any;
//#endregion vendorPoolDataStatusId Prop


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