import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class NoteDeliveryStatusBase {

//#region noteDeliveryStatusId Prop
        @prop()
        noteDeliveryStatusId : any;
//#endregion noteDeliveryStatusId Prop


//#region eN_NoteDeliveryStatusName Prop
        @required()
        @maxLength({value:500})
        eN_NoteDeliveryStatusName : string;
//#endregion eN_NoteDeliveryStatusName Prop


//#region fR_NoteDeliveryStatusName Prop
        @required()
        @maxLength({value:500})
        fR_NoteDeliveryStatusName : string;
//#endregion fR_NoteDeliveryStatusName Prop



}