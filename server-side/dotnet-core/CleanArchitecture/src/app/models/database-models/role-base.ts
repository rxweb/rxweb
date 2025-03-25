import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RoleBase {

//#region roleId Prop
        @prop()
        roleId : number;
//#endregion roleId Prop


//#region roleName Prop
        @required()
        @maxLength({value:50})
        roleName : string;
//#endregion roleName Prop


//#region statusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusId : number;
//#endregion statusId Prop





}