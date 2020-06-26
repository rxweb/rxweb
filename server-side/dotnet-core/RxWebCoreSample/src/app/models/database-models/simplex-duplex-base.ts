import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SimplexDuplexBase {

//#region simplexDuplexId Prop
        @prop()
        simplexDuplexId : number;
//#endregion simplexDuplexId Prop


//#region eN_SimplexDuplexName Prop
        @required()
        @maxLength({value:500})
        eN_SimplexDuplexName : string;
//#endregion eN_SimplexDuplexName Prop


//#region fR_SimplexDuplexName Prop
        @maxLength({value:500})
        fR_SimplexDuplexName : string;
//#endregion fR_SimplexDuplexName Prop

}