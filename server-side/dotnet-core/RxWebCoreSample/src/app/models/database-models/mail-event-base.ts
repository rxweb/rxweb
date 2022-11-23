import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MailEventBase {

//#region eventId Prop
        @prop()
        eventId : number;
//#endregion eventId Prop


//#region eventType Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        eventType : number;
//#endregion eventType Prop


//#region eventDate Prop
        @prop()
        eventDate : Date;
//#endregion eventDate Prop


//#region eventText Prop
        @maxLength({value:4000})
        eventText : string;
//#endregion eventText Prop


//#region mailId Prop
        @prop()
        mailId : number;
//#endregion mailId Prop


//#region machineName Prop
        @maxLength({value:4000})
        machineName : string;
//#endregion machineName Prop

}