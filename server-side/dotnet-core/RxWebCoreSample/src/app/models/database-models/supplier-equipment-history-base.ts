import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SupplierEquipmentHistoryBase {

//#region vendorEquipmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorEquipmentId : number;
//#endregion vendorEquipmentId Prop


//#region vendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorId : number;
//#endregion vendorId Prop


//#region equipmentTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        equipmentTypeId : number;
//#endregion equipmentTypeId Prop


//#region vendorEquipment Prop
        @maxLength({value:4000})
        vendorEquipment : string;
//#endregion vendorEquipment Prop


//#region action Prop
        @required()
        @maxLength({value:50})
        action : string;
//#endregion action Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}