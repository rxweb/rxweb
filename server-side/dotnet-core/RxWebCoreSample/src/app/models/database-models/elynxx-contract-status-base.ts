import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ElynxxContractStatusBase {

//#region elynxxContractStatusId Prop
        @prop()
        elynxxContractStatusId : any;
//#endregion elynxxContractStatusId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region costSavings Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        costSavings : number;
//#endregion costSavings Prop


//#region costSavingsStartDate Prop
        @prop()
        costSavingsStartDate : Date;
//#endregion costSavingsStartDate Prop


//#region costSavingsEndDate Prop
        @prop()
        costSavingsEndDate : Date;
//#endregion costSavingsEndDate Prop


//#region eN_ElynxxContractStatusName Prop
        @required()
        @maxLength({value:500})
        eN_ElynxxContractStatusName : string;
//#endregion eN_ElynxxContractStatusName Prop


//#region fR_ElynxxContractStatusName Prop
        @required()
        @maxLength({value:500})
        fR_ElynxxContractStatusName : string;
//#endregion fR_ElynxxContractStatusName Prop

}