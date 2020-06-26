import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EquipmentTypeBase {

//#region equipmentTypeId Prop
        @prop()
        equipmentTypeId : any;
//#endregion equipmentTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region equipmentTypeStatusId Prop
        @required()
        equipmentTypeStatusId : any;
//#endregion equipmentTypeStatusId Prop


//#region eN_EquipmentTypeName Prop
        @required()
        @maxLength({value:500})
        eN_EquipmentTypeName : string;
//#endregion eN_EquipmentTypeName Prop


//#region fR_EquipmentTypeName Prop
        @required()
        @maxLength({value:500})
        fR_EquipmentTypeName : string;
//#endregion fR_EquipmentTypeName Prop



}