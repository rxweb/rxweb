import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class QualitySampleRuleShipmentBase {

//#region qualitySampleRuleShipmentId Prop
        @prop()
        qualitySampleRuleShipmentId : number;
//#endregion qualitySampleRuleShipmentId Prop


//#region qualitySampleRuleId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        qualitySampleRuleId : number;
//#endregion qualitySampleRuleId Prop


//#region specUnitId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specUnitId : number;
//#endregion specUnitId Prop


//#region quantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        quantity : number;
//#endregion quantity Prop


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