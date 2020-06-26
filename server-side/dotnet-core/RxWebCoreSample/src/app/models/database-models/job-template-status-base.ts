import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobTemplateStatusBase {

//#region jobTemplateStatusId Prop
        @prop()
        jobTemplateStatusId : any;
//#endregion jobTemplateStatusId Prop


//#region eN_JobTemplateStatusName Prop
        @required()
        @maxLength({value:500})
        eN_JobTemplateStatusName : string;
//#endregion eN_JobTemplateStatusName Prop


//#region fR_JobTemplateStatusName Prop
        @required()
        @maxLength({value:500})
        fR_JobTemplateStatusName : string;
//#endregion fR_JobTemplateStatusName Prop



}