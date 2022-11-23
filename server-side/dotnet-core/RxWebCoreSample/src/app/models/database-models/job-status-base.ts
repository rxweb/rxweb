import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobStatusBase {

//#region jobStatusId Prop
        @prop()
        jobStatusId : any;
//#endregion jobStatusId Prop


//#region eN_JobStatusName Prop
        @required()
        @maxLength({value:500})
        eN_JobStatusName : string;
//#endregion eN_JobStatusName Prop


//#region fR_JobStatusName Prop
        @maxLength({value:500})
        fR_JobStatusName : string;
//#endregion fR_JobStatusName Prop



}