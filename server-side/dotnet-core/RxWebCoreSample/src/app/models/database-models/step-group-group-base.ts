import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StepGroupGroupBase {

//#region stepGroupGroupId Prop
        @prop()
        stepGroupGroupId : any;
//#endregion stepGroupGroupId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_StepGroupGroupsName Prop
        @required()
        @maxLength({value:500})
        eN_StepGroupGroupsName : string;
//#endregion eN_StepGroupGroupsName Prop


//#region fR_StepGroupGroupsName Prop
        @maxLength({value:500})
        fR_StepGroupGroupsName : string;
//#endregion fR_StepGroupGroupsName Prop



}