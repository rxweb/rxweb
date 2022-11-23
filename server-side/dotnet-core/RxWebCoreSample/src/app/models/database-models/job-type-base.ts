import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobTypeBase {

//#region jobTypeId Prop
        @prop()
        jobTypeId : any;
//#endregion jobTypeId Prop


//#region eN_JobTypeName Prop
        @required()
        @maxLength({value:500})
        eN_JobTypeName : string;
//#endregion eN_JobTypeName Prop


//#region fR_JobTypeName Prop
        @maxLength({value:500})
        fR_JobTypeName : string;
//#endregion fR_JobTypeName Prop





}