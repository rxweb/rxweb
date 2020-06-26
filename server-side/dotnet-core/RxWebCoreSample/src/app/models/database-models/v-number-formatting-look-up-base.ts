import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vNumberFormattingLookUpBase {

//#region territoryId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'territoryId', keyColumn: false})
        territoryId : any;
//#endregion territoryId Prop


//#region numberFormat Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'numberFormat', keyColumn: false})
        numberFormat : string;
//#endregion numberFormat Prop

}