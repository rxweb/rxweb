import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SanityCheckBase {

//#region sanityCheckId Prop
        @prop()
        sanityCheckId : any;
//#endregion sanityCheckId Prop


//#region query Prop
        @required()
        @maxLength({value:4000})
        query : string;
//#endregion query Prop


//#region tableName Prop
        @required()
        @maxLength({value:100})
        tableName : string;
//#endregion tableName Prop


//#region columnName Prop
        @required()
        @maxLength({value:100})
        columnName : string;
//#endregion columnName Prop


//#region notes Prop
        @maxLength({value:4000})
        notes : string;
//#endregion notes Prop

}