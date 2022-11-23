import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MailReturnedStatusBase {

//#region mailReturnedStatusId Prop
        @prop()
        mailReturnedStatusId : any;
//#endregion mailReturnedStatusId Prop


//#region eN_MailReturnedStatusName Prop
        @required()
        @maxLength({value:500})
        eN_MailReturnedStatusName : string;
//#endregion eN_MailReturnedStatusName Prop


//#region fR_MailReturnedStatusName Prop
        @required()
        @maxLength({value:500})
        fR_MailReturnedStatusName : string;
//#endregion fR_MailReturnedStatusName Prop

}