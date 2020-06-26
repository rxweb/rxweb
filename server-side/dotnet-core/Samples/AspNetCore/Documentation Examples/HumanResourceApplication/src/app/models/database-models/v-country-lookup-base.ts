import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vCountryLookupBase {

//#region countryId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'countryId', keyColumn: true})
        countryId : number;
//#endregion countryId Prop


//#region countryName Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'countryName', keyColumn: false})
        countryName : string;
//#endregion countryName Prop

}