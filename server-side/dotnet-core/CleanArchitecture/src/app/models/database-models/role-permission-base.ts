import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RolePermissionBase {

//#region rolePermissionId Prop
        @prop()
        rolePermissionId : number;
//#endregion rolePermissionId Prop


//#region roleId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        roleId : number;
//#endregion roleId Prop


//#region applicationModuleId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        applicationModuleId : number;
//#endregion applicationModuleId Prop


//#region canView Prop
        @prop()
        canView : boolean;
//#endregion canView Prop


//#region canAdd Prop
        @prop()
        canAdd : boolean;
//#endregion canAdd Prop


//#region canEdit Prop
        @prop()
        canEdit : boolean;
//#endregion canEdit Prop


//#region canDelete Prop
        @prop()
        canDelete : boolean;
//#endregion canDelete Prop


//#region permissionPriority Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        permissionPriority : number;
//#endregion permissionPriority Prop





}