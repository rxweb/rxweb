import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BulkNotifyTypeBase {

//#region bulkNotifyTypeId Prop
        @prop()
        bulkNotifyTypeId : any;
//#endregion bulkNotifyTypeId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_BulkNotifyTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BulkNotifyTypeName : string;
//#endregion eN_BulkNotifyTypeName Prop


//#region fR_BulkNotifyTypeName Prop
        @maxLength({value:500})
        fR_BulkNotifyTypeName : string;
//#endregion fR_BulkNotifyTypeName Prop





}