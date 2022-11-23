import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ContractItemBase {

//#region contractItemId Prop
        @prop()
        contractItemId : number;
//#endregion contractItemId Prop


//#region contractId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        contractId : number;
//#endregion contractId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region caption Prop
        @maxLength({value:4000})
        caption : string;
//#endregion caption Prop


//#region details Prop
        @maxLength({value:4000})
        details : string;
//#endregion details Prop


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