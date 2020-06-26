import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SchemaSequenceBase {

//#region fromOwner Prop
        @maxLength({value:30})
        fromOwner : string;
//#endregion fromOwner Prop


//#region fromSequence Prop
        @maxLength({value:30})
        fromSequence : string;
//#endregion fromSequence Prop


//#region toOwner Prop
        @maxLength({value:30})
        toOwner : string;
//#endregion toOwner Prop


//#region toSequence Prop
        @maxLength({value:30})
        toSequence : string;
//#endregion toSequence Prop


//#region renameDone Prop
        @prop()
        renameDone : Date;
//#endregion renameDone Prop


//#region createDone Prop
        @prop()
        createDone : Date;
//#endregion createDone Prop


//#region dropOldDone Prop
        @prop()
        dropOldDone : Date;
//#endregion dropOldDone Prop

}