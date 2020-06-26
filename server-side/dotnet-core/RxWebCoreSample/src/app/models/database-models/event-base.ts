import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EventBase {

//#region eventId Prop
        @prop()
        eventId : any;
//#endregion eventId Prop


//#region eventTypeId Prop
        @prop()
        eventTypeId : any;
//#endregion eventTypeId Prop


//#region manifestConstant Prop
        @required()
        @maxLength({value:30})
        manifestConstant : string;
//#endregion manifestConstant Prop


//#region eN_EventName Prop
        @required()
        @maxLength({value:500})
        eN_EventName : string;
//#endregion eN_EventName Prop


//#region fR_EventName Prop
        @maxLength({value:500})
        fR_EventName : string;
//#endregion fR_EventName Prop





}