import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StepGroupBase {

//#region stepGroupId Prop
        @prop()
        stepGroupId : any;
//#endregion stepGroupId Prop


//#region eN_StepGroupName Prop
        @maxLength({value:500})
        eN_StepGroupName : string;
//#endregion eN_StepGroupName Prop


//#region fR_StepGroupName Prop
        @maxLength({value:500})
        fR_StepGroupName : string;
//#endregion fR_StepGroupName Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop


//#region stepGroupGroupId Prop
        @prop()
        stepGroupGroupId : any;
//#endregion stepGroupGroupId Prop





}