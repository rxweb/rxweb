import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ExportQueueBase {

//#region planId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        planId : number;
//#endregion planId Prop


//#region exportRecordTypeId Prop
        @required()
        exportRecordTypeId : any;
//#endregion exportRecordTypeId Prop


//#region key1 Prop
        @maxLength({value:50})
        key1 : string;
//#endregion key1 Prop


//#region key2 Prop
        @maxLength({value:50})
        key2 : string;
//#endregion key2 Prop


//#region key3 Prop
        @maxLength({value:50})
        key3 : string;
//#endregion key3 Prop


//#region key4 Prop
        @maxLength({value:50})
        key4 : string;
//#endregion key4 Prop


//#region processStartDate Prop
        @prop()
        processStartDate : Date;
//#endregion processStartDate Prop


//#region processCompleteDate Prop
        @prop()
        processCompleteDate : Date;
//#endregion processCompleteDate Prop


//#region insertDate Prop
        @required()
        insertDate : Date;
//#endregion insertDate Prop


//#region rowId Prop
        @required()
        rowId : any;
//#endregion rowId Prop



}