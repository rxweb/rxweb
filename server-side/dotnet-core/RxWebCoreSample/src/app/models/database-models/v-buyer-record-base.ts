import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vBuyerRecordBase {

//#region buyerId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'buyerId', keyColumn: true})
        buyerId : number;
//#endregion buyerId Prop


//#region vendorQualifierId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'vendorQualifierId', keyColumn: false})
        vendorQualifierId : any;
//#endregion vendorQualifierId Prop


//#region buyerDesignationId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'buyerDesignationId', keyColumn: false})
        buyerDesignationId : any;
//#endregion buyerDesignationId Prop


//#region buyerVendorSetupProcessId Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'buyerVendorSetupProcessId', keyColumn: false})
        buyerVendorSetupProcessId : any;
//#endregion buyerVendorSetupProcessId Prop


//#region createdBy Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'createdBy', keyColumn: false})
        createdBy : any;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'createdDateTime', keyColumn: false})
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'updatedBy', keyColumn: false})
        updatedBy : any;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @gridColumn({visible: true, columnIndex:7, allowSorting: true, headerKey: 'updatedDateTime', keyColumn: false})
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}