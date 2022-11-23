import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vVendorEquipmentBase {

//#region vendorEquipmentId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'vendorEquipmentId', keyColumn: true})
        vendorEquipmentId : number;
//#endregion vendorEquipmentId Prop


//#region vendorId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'vendorId', keyColumn: false})
        vendorId : number;
//#endregion vendorId Prop


//#region equipmentTypeId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'equipmentTypeId', keyColumn: false})
        equipmentTypeId : any;
//#endregion equipmentTypeId Prop


//#region vendorEquipmentName Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'vendorEquipmentName', keyColumn: false})
        vendorEquipmentName : string;
//#endregion vendorEquipmentName Prop


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