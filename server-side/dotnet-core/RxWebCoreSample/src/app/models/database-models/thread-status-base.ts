import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ThreadStatusBase {

//#region threadStatusId Prop
        @prop()
        threadStatusId : any;
//#endregion threadStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_ThreadStatus Prop
        @required()
        @maxLength({value:500})
        eN_ThreadStatus : string;
//#endregion eN_ThreadStatus Prop


//#region fR_ThreadStatus Prop
        @required()
        @maxLength({value:500})
        fR_ThreadStatus : string;
//#endregion fR_ThreadStatus Prop



}