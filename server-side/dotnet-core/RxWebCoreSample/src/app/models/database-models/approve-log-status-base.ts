import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApproveLogStatusBase {

//#region approveLogStatusId Prop
        @prop()
        approveLogStatusId : any;
//#endregion approveLogStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_ApproveLogStatusName Prop
        @required()
        @maxLength({value:500})
        eN_ApproveLogStatusName : string;
//#endregion eN_ApproveLogStatusName Prop


//#region fR_ApproveLogStatusName Prop
        @required()
        @maxLength({value:500})
        fR_ApproveLogStatusName : string;
//#endregion fR_ApproveLogStatusName Prop



}