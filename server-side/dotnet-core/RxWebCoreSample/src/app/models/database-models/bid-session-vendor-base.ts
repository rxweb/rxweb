import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionVendorBase {

//#region bidSessionVendorId Prop
        @prop()
        bidSessionVendorId : number;
//#endregion bidSessionVendorId Prop


//#region bidSessionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region vendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorId : number;
//#endregion vendorId Prop


//#region bidSessionVendorStatusId Prop
        @prop()
        bidSessionVendorStatusId : any;
//#endregion bidSessionVendorStatusId Prop


//#region bidSessionTypeId Prop
        @prop()
        bidSessionTypeId : any;
//#endregion bidSessionTypeId Prop


//#region restrictionNotes Prop
        @maxLength({value:4000})
        restrictionNotes : string;
//#endregion restrictionNotes Prop


//#region restrictedBy Prop
        @maxLength({value:4000})
        restrictedBy : string;
//#endregion restrictedBy Prop


//#region restrictedDate Prop
        @prop()
        restrictedDate : Date;
//#endregion restrictedDate Prop


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