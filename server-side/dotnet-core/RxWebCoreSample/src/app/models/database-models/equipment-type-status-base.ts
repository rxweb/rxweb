import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EquipmentTypeStatusBase {

//#region equiptypeStatusId Prop
        @prop()
        equiptypeStatusId : number;
//#endregion equiptypeStatusId Prop


//#region eN_EquipmentTypeStatusName Prop
        @required()
        @maxLength({value:500})
        eN_EquipmentTypeStatusName : string;
//#endregion eN_EquipmentTypeStatusName Prop


//#region fR_EquipmentTypeStatusName Prop
        @required()
        @maxLength({value:500})
        fR_EquipmentTypeStatusName : string;
//#endregion fR_EquipmentTypeStatusName Prop

}