import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProofTeamReivewBase {

//#region jobThreadId Prop
        @prop()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region parentJobStepId Prop
        @prop()
        parentJobStepId : number;
//#endregion parentJobStepId Prop

}