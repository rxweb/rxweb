import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorPoolBase {

//#region vendorPoolId Prop
        @prop()
        vendorPoolId : number;
//#endregion vendorPoolId Prop


//#region buyerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerId : number;
//#endregion buyerId Prop


//#region poolName Prop
        @required()
        @maxLength({value:4000})
        poolName : string;
//#endregion poolName Prop


//#region poolDescription Prop
        @maxLength({value:4000})
        poolDescription : string;
//#endregion poolDescription Prop


//#region vendorPoolStatusId Prop
        @required()
        vendorPoolStatusId : any;
//#endregion vendorPoolStatusId Prop


//#region ownerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        ownerId : number;
//#endregion ownerId Prop


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