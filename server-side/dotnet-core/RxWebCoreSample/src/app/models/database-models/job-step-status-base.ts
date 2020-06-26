import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobStepStatusBase {

//#region jobStepStatusId Prop
        @prop()
        jobStepStatusId : any;
//#endregion jobStepStatusId Prop


//#region stepId Prop
        @prop()
        stepId : number;
//#endregion stepId Prop


//#region eN_JobStepStatusName Prop
        @maxLength({value:500})
        eN_JobStepStatusName : string;
//#endregion eN_JobStepStatusName Prop


//#region fR_JobStepStatusName Prop
        @maxLength({value:500})
        fR_JobStepStatusName : string;
//#endregion fR_JobStepStatusName Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region image Prop
        @maxLength({value:200})
        image : string;
//#endregion image Prop



}