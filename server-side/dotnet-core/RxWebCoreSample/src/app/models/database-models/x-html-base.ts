import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class xHtmlBase {

//#region htmlId Prop
        @prop()
        htmlId : number;
//#endregion htmlId Prop


//#region html Prop
        @required()
        html : any;
//#endregion html Prop









}