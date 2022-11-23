import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class UserStatusBase {

//#region userStatusId Prop
        @prop()
        userStatusId : any;
//#endregion userStatusId Prop


//#region userStatusName Prop
        @required()
        @maxLength({value:200})
        userStatusName : string;
//#endregion userStatusName Prop


//#region enumeration Prop
        @required()
        @maxLength({value:30})
        enumeration : string;
//#endregion enumeration Prop



}