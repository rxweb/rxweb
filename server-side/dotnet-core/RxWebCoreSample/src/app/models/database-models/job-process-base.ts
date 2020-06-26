import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobProcessBase {

//#region jobProcessId Prop
        @prop()
        jobProcessId : number;
//#endregion jobProcessId Prop


//#region primaryJobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        primaryJobStepId : number;
//#endregion primaryJobStepId Prop


//#region specHtmlId Prop
        @prop()
        specHtmlId : number;
//#endregion specHtmlId Prop











}