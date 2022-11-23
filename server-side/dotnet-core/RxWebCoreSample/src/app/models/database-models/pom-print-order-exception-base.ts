import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PomPrintOrderExceptionBase {

//#region rowId Prop
        @maxLength({value:4000})
        rowId : string;
//#endregion rowId Prop


//#region owner Prop
        @maxLength({value:30})
        owner : string;
//#endregion owner Prop


//#region tableName Prop
        @maxLength({value:30})
        tableName : string;
//#endregion tableName Prop


//#region constraint Prop
        @maxLength({value:30})
        constraint : string;
//#endregion constraint Prop

}