import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RoleGroupBase {

//#region roleGroupId Prop
        @prop()
        roleGroupId : any;
//#endregion roleGroupId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_RoleGroupName Prop
        @required()
        @maxLength({value:500})
        eN_RoleGroupName : string;
//#endregion eN_RoleGroupName Prop


//#region fR_RoleGroupName Prop
        @maxLength({value:500})
        fR_RoleGroupName : string;
//#endregion fR_RoleGroupName Prop

}