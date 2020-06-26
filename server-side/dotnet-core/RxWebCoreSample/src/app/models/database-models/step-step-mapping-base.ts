import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StepStepMappingBase {

//#region stepId Prop
        @prop()
        stepId : number;
//#endregion stepId Prop


//#region childStepId Prop
        @prop()
        childStepId : number;
//#endregion childStepId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop







}