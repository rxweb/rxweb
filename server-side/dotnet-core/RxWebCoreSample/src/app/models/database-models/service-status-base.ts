import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceStatusBase {

//#region serviceStatusId Prop
        @prop()
        serviceStatusId : any;
//#endregion serviceStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_ServiceStatus Prop
        @required()
        @maxLength({value:500})
        eN_ServiceStatus : string;
//#endregion eN_ServiceStatus Prop


//#region fR_ServiceStatus Prop
        @required()
        @maxLength({value:500})
        fR_ServiceStatus : string;
//#endregion fR_ServiceStatus Prop



}