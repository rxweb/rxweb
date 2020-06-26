import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ReceiveLogStatusBase {

//#region receiveLogStatusId Prop
        @prop()
        receiveLogStatusId : any;
//#endregion receiveLogStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_ReceiveLogStatusName Prop
        @required()
        @maxLength({value:500})
        eN_ReceiveLogStatusName : string;
//#endregion eN_ReceiveLogStatusName Prop


//#region fR_ReceiveLogStatusName Prop
        @required()
        @maxLength({value:500})
        fR_ReceiveLogStatusName : string;
//#endregion fR_ReceiveLogStatusName Prop



}