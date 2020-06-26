import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InkLayoutBase {

//#region inkLayoutId Prop
        @prop()
        inkLayoutId : any;
//#endregion inkLayoutId Prop


//#region statusId Prop
        @required()
        statusId : any;
//#endregion statusId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_InkLayoutName Prop
        @required()
        @maxLength({value:500})
        eN_InkLayoutName : string;
//#endregion eN_InkLayoutName Prop


//#region fR_InkLayoutName Prop
        @required()
        @maxLength({value:500})
        fR_InkLayoutName : string;
//#endregion fR_InkLayoutName Prop



}