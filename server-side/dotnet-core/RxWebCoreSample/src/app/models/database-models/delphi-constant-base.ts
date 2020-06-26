import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DelphiConstantBase {

//#region delphiConstantId Prop
        @prop()
        delphiConstantId : number;
//#endregion delphiConstantId Prop


//#region constantName Prop
        @maxLength({value:2000})
        constantName : string;
//#endregion constantName Prop


//#region eN_Constant Prop
        @required()
        @maxLength({value:2000})
        eN_Constant : string;
//#endregion eN_Constant Prop


//#region fR_Constant Prop
        @maxLength({value:2000})
        fR_Constant : string;
//#endregion fR_Constant Prop

}