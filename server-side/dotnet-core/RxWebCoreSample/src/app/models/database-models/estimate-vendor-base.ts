import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateVendorBase {

//#region estimateVendorId Prop
        @prop()
        estimateVendorId : number;
//#endregion estimateVendorId Prop


//#region estimateId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateId : number;
//#endregion estimateId Prop


//#region jobThreadId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region estimateStatusId Prop
        @required()
        estimateStatusId : any;
//#endregion estimateStatusId Prop


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