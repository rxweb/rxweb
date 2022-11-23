import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ContractStatusBase {

//#region contractStatusId Prop
        @prop()
        contractStatusId : any;
//#endregion contractStatusId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_ContractStatusName Prop
        @required()
        @maxLength({value:500})
        eN_ContractStatusName : string;
//#endregion eN_ContractStatusName Prop


//#region fR_ContractStatusName Prop
        @required()
        @maxLength({value:500})
        fR_ContractStatusName : string;
//#endregion fR_ContractStatusName Prop



}