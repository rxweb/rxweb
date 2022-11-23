import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class UserRoleCommentBase {

//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region roleId Prop
        @prop()
        roleId : number;
//#endregion roleId Prop


//#region comment Prop
        @required()
        @maxLength({value:50})
        comment : string;
//#endregion comment Prop


//#region auditUserId Prop
        @prop()
        auditUserId : number;
//#endregion auditUserId Prop


//#region currentUserId Prop
        @prop()
        currentUserId : number;
//#endregion currentUserId Prop


//#region parentUserId Prop
        @prop()
        parentUserId : number;
//#endregion parentUserId Prop


//#region nextUserId Prop
        @prop()
        nextUserId : number;
//#endregion nextUserId Prop







}