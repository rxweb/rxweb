import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceBase {

//#region serviceId Prop
        @prop()
        serviceId : any;
//#endregion serviceId Prop


//#region eN_ServiceName Prop
        @required()
        @maxLength({value:500})
        eN_ServiceName : string;
//#endregion eN_ServiceName Prop


//#region fR_ServiceName Prop
        @maxLength({value:500})
        fR_ServiceName : string;
//#endregion fR_ServiceName Prop











}