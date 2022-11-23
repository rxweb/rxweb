import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BulkNotifySelectionTypeBase {

//#region bulkNotifySelectionTypesId Prop
        @prop()
        bulkNotifySelectionTypesId : any;
//#endregion bulkNotifySelectionTypesId Prop


//#region bulkNotifyTypeId Prop
        @required()
        bulkNotifyTypeId : any;
//#endregion bulkNotifyTypeId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_BulkNotifySelectionTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BulkNotifySelectionTypeName : string;
//#endregion eN_BulkNotifySelectionTypeName Prop


//#region fR_BulkNotifySelectionTypeName Prop
        @maxLength({value:500})
        fR_BulkNotifySelectionTypeName : string;
//#endregion fR_BulkNotifySelectionTypeName Prop





}