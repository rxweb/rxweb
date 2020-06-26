import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MailTypeBase {

//#region mailTypeId Prop
        @prop()
        mailTypeId : number;
//#endregion mailTypeId Prop


//#region repairUrl Prop
        @maxLength({value:500})
        repairUrl : string;
//#endregion repairUrl Prop


//#region eN_MailTypeName Prop
        @required()
        @maxLength({value:500})
        eN_MailTypeName : string;
//#endregion eN_MailTypeName Prop


//#region fR_MailTypeName Prop
        @required()
        @maxLength({value:500})
        fR_MailTypeName : string;
//#endregion fR_MailTypeName Prop





}