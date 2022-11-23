import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ShipmentHistoryStatusBase {

//#region statusId Prop
        @prop()
        statusId : any;
//#endregion statusId Prop


//#region eN_Status Prop
        @maxLength({value:10})
        eN_Status : string;
//#endregion eN_Status Prop


//#region fR_Status Prop
        @maxLength({value:10})
        fR_Status : string;
//#endregion fR_Status Prop

}