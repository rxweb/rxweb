import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MessageRecipientBase {

//#region messageRecipientId Prop
        @prop()
        messageRecipientId : number;
//#endregion messageRecipientId Prop


//#region messageId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        messageId : number;
//#endregion messageId Prop


//#region recipientUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        recipientUserId : number;
//#endregion recipientUserId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region responseRequiredDate Prop
        @prop()
        responseRequiredDate : Date;
//#endregion responseRequiredDate Prop







}