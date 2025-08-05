import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AuditRecordBase {

//#region auditRecordId Prop
        @prop()
        auditRecordId : number;
//#endregion auditRecordId Prop


//#region auditRequestId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        auditRequestId : number;
//#endregion auditRequestId Prop


//#region keyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        keyId : number;
//#endregion keyId Prop


//#region compositeKeyId Prop
        @prop()
        compositeKeyId : number;
//#endregion compositeKeyId Prop


//#region eventType Prop
        @required()
        @maxLength({value:10})
        eventType : string;
//#endregion eventType Prop


//#region tableName Prop
        @required()
        @maxLength({value:100})
        tableName : string;
//#endregion tableName Prop





}