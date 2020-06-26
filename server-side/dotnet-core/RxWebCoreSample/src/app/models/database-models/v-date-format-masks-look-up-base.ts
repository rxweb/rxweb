import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vDateFormatMasksLookUpBase {

//#region dateFormatMaskId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'dateFormatMaskId', keyColumn: false})
        dateFormatMaskId : any;
//#endregion dateFormatMaskId Prop


//#region dateFormatMaskDisplay Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'dateFormatMaskDisplay', keyColumn: false})
        dateFormatMaskDisplay : string;
//#endregion dateFormatMaskDisplay Prop

}