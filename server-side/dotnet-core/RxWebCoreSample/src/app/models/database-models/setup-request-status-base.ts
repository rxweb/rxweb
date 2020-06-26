import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SetupRequestStatusBase {

//#region setupRequestStatusId Prop
        @prop()
        setupRequestStatusId : any;
//#endregion setupRequestStatusId Prop


//#region eN_SetupRequestStatusName Prop
        @required()
        @maxLength({value:500})
        eN_SetupRequestStatusName : string;
//#endregion eN_SetupRequestStatusName Prop


//#region fR_SetupRequestStatusName Prop
        @required()
        @maxLength({value:500})
        fR_SetupRequestStatusName : string;
//#endregion fR_SetupRequestStatusName Prop



}