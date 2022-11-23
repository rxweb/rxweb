import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MigrationMappingTableBase {

//#region tableName Prop
        @maxLength({value:100})
        tableName : string;
//#endregion tableName Prop


//#region columnName Prop
        @maxLength({value:100})
        columnName : string;
//#endregion columnName Prop


//#region columnId Prop
        @prop()
        columnId : number;
//#endregion columnId Prop


//#region tableId Prop
        @prop()
        tableId : number;
//#endregion tableId Prop


//#region oldTable Prop
        @maxLength({value:100})
        oldTable : string;
//#endregion oldTable Prop

}