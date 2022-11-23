import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InkBase {

//#region inkId Prop
        @prop()
        inkId : number;
//#endregion inkId Prop


//#region inkName Prop
        @maxLength({value:50})
        inkName : string;
//#endregion inkName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop


//#region inkShortName Prop
        @maxLength({value:50})
        inkShortName : string;
//#endregion inkShortName Prop









}