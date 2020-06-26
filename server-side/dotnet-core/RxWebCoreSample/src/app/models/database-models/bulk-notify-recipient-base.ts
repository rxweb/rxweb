import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BulkNotifyRecipientBase {

//#region bulkNotifyRecipientId Prop
        @prop()
        bulkNotifyRecipientId : number;
//#endregion bulkNotifyRecipientId Prop


//#region bulkNotifyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bulkNotifyId : number;
//#endregion bulkNotifyId Prop


//#region jobThreadId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobThreadId : number;
//#endregion jobThreadId Prop



}