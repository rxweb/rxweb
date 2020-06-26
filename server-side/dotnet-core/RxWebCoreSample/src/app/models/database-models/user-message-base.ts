import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class UserMessageBase {

//#region messageId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        messageId : number;
//#endregion messageId Prop


//#region title Prop
        @maxLength({value:200})
        title : string;
//#endregion title Prop


//#region message Prop
        @maxLength({value:4000})
        message : string;
//#endregion message Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region statusId Prop
        @prop()
        statusId : any;
//#endregion statusId Prop

}