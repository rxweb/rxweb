import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateUnitQuantityBase {

//#region quantityId Prop
        @prop()
        quantityId : number;
//#endregion quantityId Prop


//#region unitId Prop
        @prop()
        unitId : number;
//#endregion unitId Prop


//#region quantity Prop
        @prop()
        quantity : number;
//#endregion quantity Prop


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