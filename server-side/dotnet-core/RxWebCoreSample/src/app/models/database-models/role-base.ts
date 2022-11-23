import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RoleBase {

//#region roleId Prop
        @prop()
        roleId : number;
//#endregion roleId Prop


//#region eN_RoleName Prop
        @maxLength({value:500})
        eN_RoleName : string;
//#endregion eN_RoleName Prop


//#region fR_RoleName Prop
        @maxLength({value:500})
        fR_RoleName : string;
//#endregion fR_RoleName Prop


//#region oldRoleId Prop
        @prop()
        oldRoleId : number;
//#endregion oldRoleId Prop



}