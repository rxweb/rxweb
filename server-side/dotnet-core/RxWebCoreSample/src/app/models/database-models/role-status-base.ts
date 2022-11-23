import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RoleStatusBase {

//#region roleStatusId Prop
        @prop()
        roleStatusId : any;
//#endregion roleStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_RoleStatusName Prop
        @required()
        @maxLength({value:500})
        eN_RoleStatusName : string;
//#endregion eN_RoleStatusName Prop


//#region fR_RoleStatusName Prop
        @required()
        @maxLength({value:500})
        fR_RoleStatusName : string;
//#endregion fR_RoleStatusName Prop



}