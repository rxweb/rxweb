import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecUnitSpecItemBase {

//#region specUnitId Prop
        @prop()
        specUnitId : number;
//#endregion specUnitId Prop


//#region specItemId Prop
        @prop()
        specItemId : number;
//#endregion specItemId Prop


//#region baseQuantity Prop
        @required()
        baseQuantity : number;
//#endregion baseQuantity Prop


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