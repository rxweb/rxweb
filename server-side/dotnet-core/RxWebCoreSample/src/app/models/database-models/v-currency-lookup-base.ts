import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vCurrencyLookupBase {

//#region currencyid Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'currencyid', keyColumn: false})
        currencyid : any;
//#endregion currencyid Prop


//#region currencyName Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'currencyName', keyColumn: false})
        currencyName : string;
//#endregion currencyName Prop

}