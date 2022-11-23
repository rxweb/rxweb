import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DateFormatMaskBase {

//#region dateFormatMaskId Prop
        @prop()
        dateFormatMaskId : any;
//#endregion dateFormatMaskId Prop


//#region dateFormatMaskName Prop
        @required()
        @maxLength({value:4000})
        dateFormatMaskName : string;
//#endregion dateFormatMaskName Prop


//#region dateFormatMaskDisplay Prop
        @required()
        @maxLength({value:4000})
        dateFormatMaskDisplay : string;
//#endregion dateFormatMaskDisplay Prop


//#region dateJsFormatMask Prop
        @required()
        @maxLength({value:4000})
        dateJsFormatMask : string;
//#endregion dateJsFormatMask Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop



}