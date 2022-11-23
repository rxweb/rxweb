import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ExportRecordTypeBase {

//#region exportRecordTypeId Prop
        @prop()
        exportRecordTypeId : any;
//#endregion exportRecordTypeId Prop


//#region exportRecordTypeName Prop
        @required()
        @maxLength({value:40})
        exportRecordTypeName : string;
//#endregion exportRecordTypeName Prop

}