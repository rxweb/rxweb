import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorEquipmentBase {

//#region vendorEquipmentId Prop
        @prop()
        vendorEquipmentId : number;
//#endregion vendorEquipmentId Prop


//#region vendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorId : number;
//#endregion vendorId Prop


//#region equipmentTypeId Prop
        @required()
        equipmentTypeId : any;
//#endregion equipmentTypeId Prop


//#region vendorEquipmentName Prop
        @prop()
        vendorEquipmentName : string;
//#endregion vendorEquipmentName Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop





}