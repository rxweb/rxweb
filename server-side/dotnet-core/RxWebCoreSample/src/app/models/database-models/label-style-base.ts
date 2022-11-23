import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LabelStyleBase {

//#region labelStyleId Prop
        @prop()
        labelStyleId : any;
//#endregion labelStyleId Prop


//#region statusId Prop
        @required()
        statusId : any;
//#endregion statusId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_LabelStyleName Prop
        @required()
        @maxLength({value:500})
        eN_LabelStyleName : string;
//#endregion eN_LabelStyleName Prop


//#region fR_LabelStyleName Prop
        @maxLength({value:500})
        fR_LabelStyleName : string;
//#endregion fR_LabelStyleName Prop



}