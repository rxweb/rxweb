import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StepTypeBase {

//#region stepTypeId Prop
        @prop()
        stepTypeId : number;
//#endregion stepTypeId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_StepTypeName Prop
        @required()
        @maxLength({value:500})
        eN_StepTypeName : string;
//#endregion eN_StepTypeName Prop


//#region fR_StepTypeName Prop
        @maxLength({value:500})
        fR_StepTypeName : string;
//#endregion fR_StepTypeName Prop



}