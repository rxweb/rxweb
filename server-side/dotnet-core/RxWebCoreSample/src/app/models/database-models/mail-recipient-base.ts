import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MailRecipientBase {

//#region mailRecipientId Prop
        @prop()
        mailRecipientId : number;
//#endregion mailRecipientId Prop


//#region mailId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        mailId : number;
//#endregion mailId Prop


//#region emailAddress Prop
        @maxLength({value:4000})
        emailAddress : string;
//#endregion emailAddress Prop


//#region recipientId Prop
        @prop()
        recipientId : number;
//#endregion recipientId Prop





}