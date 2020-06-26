import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AuditTypeBase {

//#region auditTypeId Prop
        @prop()
        auditTypeId : any;
//#endregion auditTypeId Prop


//#region auditTypeName Prop
        @maxLength({value:500})
        auditTypeName : string;
//#endregion auditTypeName Prop

}