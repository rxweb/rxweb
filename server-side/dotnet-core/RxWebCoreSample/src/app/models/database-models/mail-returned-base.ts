import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MailReturnedBase {

//#region mailId Prop
        @prop()
        mailId : number;
//#endregion mailId Prop


//#region recipientId Prop
        @prop()
        recipientId : number;
//#endregion recipientId Prop


//#region mailTypeId Prop
        @prop()
        mailTypeId : number;
//#endregion mailTypeId Prop


//#region recipientEmail Prop
        @maxLength({value:4000})
        recipientEmail : string;
//#endregion recipientEmail Prop


//#region body Prop
        @maxLength({value:4000})
        body : string;
//#endregion body Prop


//#region returnedDate Prop
        @prop()
        returnedDate : Date;
//#endregion returnedDate Prop


//#region senderId Prop
        @prop()
        senderId : number;
//#endregion senderId Prop


//#region mailReturnedStatusId Prop
        @prop()
        mailReturnedStatusId : any;
//#endregion mailReturnedStatusId Prop









}