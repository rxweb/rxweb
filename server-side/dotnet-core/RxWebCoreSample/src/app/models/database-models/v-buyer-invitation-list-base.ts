import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vBuyerInvitationListBase {

//#region buyerId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'buyerId', keyColumn: true})
        buyerId : number;
//#endregion buyerId Prop


//#region buyerVendorId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'buyerVendorId', keyColumn: false})
        buyerVendorId : number;
//#endregion buyerVendorId Prop


//#region name Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'name', keyColumn: false})
        name : string;
//#endregion name Prop


//#region vendorId Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'vendorId', keyColumn: false})
        vendorId : number;
//#endregion vendorId Prop


//#region userId Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'userId', keyColumn: false})
        userId : number;
//#endregion userId Prop

}