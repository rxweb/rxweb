import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ContractBase {

//#region contractId Prop
        @prop()
        contractId : number;
//#endregion contractId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region title Prop
        @maxLength({value:4000})
        title : string;
//#endregion title Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region beginDate Prop
        @prop()
        beginDate : Date;
//#endregion beginDate Prop


//#region endDate Prop
        @prop()
        endDate : Date;
//#endregion endDate Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : any;
//#endregion statusTypeId Prop


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