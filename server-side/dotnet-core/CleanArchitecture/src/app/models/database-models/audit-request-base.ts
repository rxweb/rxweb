import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AuditRequestBase {

//#region auditRequestId Prop
        @prop()
        auditRequestId : number;
//#endregion auditRequestId Prop


//#region traceIdentifier Prop
        @required()
        @maxLength({value:50})
        traceIdentifier : string;
//#endregion traceIdentifier Prop


//#region keyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        keyId : number;
//#endregion keyId Prop


//#region compositeKeyId Prop
        @prop()
        compositeKeyId : number;
//#endregion compositeKeyId Prop



}