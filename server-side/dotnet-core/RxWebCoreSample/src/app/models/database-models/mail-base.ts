import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MailBase {

//#region mailid Prop
        @prop()
        mailid : number;
//#endregion mailid Prop


//#region senderName Prop
        @maxLength({value:4000})
        senderName : string;
//#endregion senderName Prop


//#region senderEmail Prop
        @maxLength({value:4000})
        senderEmail : string;
//#endregion senderEmail Prop


//#region senderReplyEmail Prop
        @maxLength({value:4000})
        senderReplyEmail : string;
//#endregion senderReplyEmail Prop


//#region senderOrganization Prop
        @maxLength({value:4000})
        senderOrganization : string;
//#endregion senderOrganization Prop


//#region subject Prop
        @maxLength({value:4000})
        subject : string;
//#endregion subject Prop


//#region priority Prop
        @required()
        priority : any;
//#endregion priority Prop


//#region machineName Prop
        @maxLength({value:100})
        machineName : string;
//#endregion machineName Prop


//#region sentDate Prop
        @prop()
        sentDate : Date;
//#endregion sentDate Prop


//#region mailTypeId Prop
        @prop()
        mailTypeId : number;
//#endregion mailTypeId Prop


//#region senderId Prop
        @prop()
        senderId : number;
//#endregion senderId Prop


//#region textBody Prop
        @prop()
        textBody : string;
//#endregion textBody Prop


//#region jobId Prop
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region sentStatusId Prop
        @prop()
        sentStatusId : number;
//#endregion sentStatusId Prop


//#region htmlBody Prop
        @prop()
        htmlBody : string;
//#endregion htmlBody Prop


//#region createDate Prop
        @prop()
        createDate : Date;
//#endregion createDate Prop









}