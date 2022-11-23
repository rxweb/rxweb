import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vVendorLateJobTaskCountBase {

//#region cnt Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'cnt', keyColumn: false})
        cnt : any;
//#endregion cnt Prop


//#region vENDORID Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'vENDORID', keyColumn: true})
        vENDORID : number;
//#endregion vENDORID Prop

}