import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobProcessJobStepMappingBase {

//#region jobProcessJobStepMappingId Prop
        @prop()
        jobProcessJobStepMappingId : number;
//#endregion jobProcessJobStepMappingId Prop


//#region jobProcessId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobProcessId : number;
//#endregion jobProcessId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop





}