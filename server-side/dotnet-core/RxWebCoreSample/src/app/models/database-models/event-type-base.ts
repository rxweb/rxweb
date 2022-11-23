import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EventTypeBase {

//#region eventTypeId Prop
        @prop()
        eventTypeId : any;
//#endregion eventTypeId Prop


//#region eN_EventTypeName Prop
        @required()
        @maxLength({value:500})
        eN_EventTypeName : string;
//#endregion eN_EventTypeName Prop


//#region fR_EventTypeName Prop
        @maxLength({value:500})
        fR_EventTypeName : string;
//#endregion fR_EventTypeName Prop



}