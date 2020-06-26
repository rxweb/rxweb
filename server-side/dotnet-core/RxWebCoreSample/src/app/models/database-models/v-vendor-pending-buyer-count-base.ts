import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vVendorPendingBuyerCountBase {

//#region cnt Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'cnt', keyColumn: false})
        cnt : any;
//#endregion cnt Prop


//#region vendorId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'vendorId', keyColumn: true})
        vendorId : number;
//#endregion vendorId Prop

}