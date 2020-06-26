import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialPayshipBase {

//#region financialPayshipId Prop
        @prop()
        financialPayshipId : number;
//#endregion financialPayshipId Prop


//#region financialPayId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialPayId : number;
//#endregion financialPayId Prop


//#region financialShipId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialShipId : number;
//#endregion financialShipId Prop


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