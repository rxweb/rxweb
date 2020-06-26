import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class IncomingMailBase {

//#region incomingMailId Prop
        @prop()
        incomingMailId : number;
//#endregion incomingMailId Prop


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
        @maxLength({value:4000})
        machineName : string;
//#endregion machineName Prop


//#region receivedDate Prop
        @prop()
        receivedDate : Date;
//#endregion receivedDate Prop


//#region sentDate Prop
        @prop()
        sentDate : Date;
//#endregion sentDate Prop


//#region mailBody Prop
        @prop()
        mailBody : any;
//#endregion mailBody Prop

}