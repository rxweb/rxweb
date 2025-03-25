import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AuditRecordDetailBase {

//#region auditRecordDetailId Prop
        @prop()
        auditRecordDetailId : number;
//#endregion auditRecordDetailId Prop


//#region auditRecordId Prop
        @prop()
        auditRecordId : number;
//#endregion auditRecordId Prop


//#region columnName Prop
        @required()
        @maxLength({value:100})
        columnName : string;
//#endregion columnName Prop


//#region oldValue Prop
        @prop()
        oldValue : string;
//#endregion oldValue Prop


//#region newValue Prop
        @prop()
        newValue : string;
//#endregion newValue Prop



}