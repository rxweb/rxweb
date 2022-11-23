import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceContractBase {

//#region serviceContractId Prop
        @prop()
        serviceContractId : number;
//#endregion serviceContractId Prop


//#region buyerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerId : number;
//#endregion buyerId Prop


//#region termSelectionStyleId Prop
        @prop()
        termSelectionStyleId : any;
//#endregion termSelectionStyleId Prop


//#region effectiveDate Prop
        @required()
        effectiveDate : any;
//#endregion effectiveDate Prop







}