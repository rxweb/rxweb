import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EventLogBase {

//#region eventLogId Prop
        @prop()
        eventLogId : number;
//#endregion eventLogId Prop


//#region eventId Prop
        @required()
        eventId : any;
//#endregion eventId Prop


//#region eventUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        eventUserId : number;
//#endregion eventUserId Prop


//#region eventLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        eventLoginId : number;
//#endregion eventLoginId Prop


//#region eventDate Prop
        @required()
        eventDate : Date;
//#endregion eventDate Prop


//#region details Prop
        @maxLength({value:4000})
        details : string;
//#endregion details Prop


//#region targetUserId Prop
        @prop()
        targetUserId : number;
//#endregion targetUserId Prop


//#region jobId Prop
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region mailId Prop
        @prop()
        mailId : number;
//#endregion mailId Prop











}