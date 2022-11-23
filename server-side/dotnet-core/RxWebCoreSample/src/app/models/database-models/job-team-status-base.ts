import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobTeamStatusBase {

//#region jobTeamStatusId Prop
        @prop()
        jobTeamStatusId : any;
//#endregion jobTeamStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_JobTeamStatusName Prop
        @required()
        @maxLength({value:500})
        eN_JobTeamStatusName : string;
//#endregion eN_JobTeamStatusName Prop


//#region fR_JobTeamStatusName Prop
        @required()
        @maxLength({value:500})
        fR_JobTeamStatusName : string;
//#endregion fR_JobTeamStatusName Prop



}