import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LoginLogStatusBase {

//#region loginLogStatusId Prop
        @prop()
        loginLogStatusId : any;
//#endregion loginLogStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_LoginLogStatusName Prop
        @required()
        @maxLength({value:500})
        eN_LoginLogStatusName : string;
//#endregion eN_LoginLogStatusName Prop


//#region fR_LoginLogStatusName Prop
        @required()
        @maxLength({value:500})
        fR_LoginLogStatusName : string;
//#endregion fR_LoginLogStatusName Prop



}