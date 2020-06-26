import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ChangeOrderStatusBase {

//#region changeOrderStatusId Prop
        @prop()
        changeOrderStatusId : any;
//#endregion changeOrderStatusId Prop


//#region eN_ChangeOrderStatusName Prop
        @required()
        @maxLength({value:500})
        eN_ChangeOrderStatusName : string;
//#endregion eN_ChangeOrderStatusName Prop


//#region fR_ChangeOrderStatusName Prop
        @required()
        @maxLength({value:500})
        fR_ChangeOrderStatusName : string;
//#endregion fR_ChangeOrderStatusName Prop



}