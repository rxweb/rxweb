import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SchemaTableBase {

//#region fromOwner Prop
        @maxLength({value:30})
        fromOwner : string;
//#endregion fromOwner Prop


//#region fromTableName Prop
        @maxLength({value:30})
        fromTableName : string;
//#endregion fromTableName Prop


//#region toOwner Prop
        @maxLength({value:30})
        toOwner : string;
//#endregion toOwner Prop


//#region toTableName Prop
        @maxLength({value:30})
        toTableName : string;
//#endregion toTableName Prop


//#region createDone Prop
        @prop()
        createDone : Date;
//#endregion createDone Prop


//#region primaryKeyDone Prop
        @prop()
        primaryKeyDone : Date;
//#endregion primaryKeyDone Prop


//#region indexDone Prop
        @prop()
        indexDone : Date;
//#endregion indexDone Prop


//#region checkConstraintDone Prop
        @prop()
        checkConstraintDone : Date;
//#endregion checkConstraintDone Prop


//#region foreignKeyDone Prop
        @prop()
        foreignKeyDone : Date;
//#endregion foreignKeyDone Prop


//#region dropOldDone Prop
        @prop()
        dropOldDone : Date;
//#endregion dropOldDone Prop

}