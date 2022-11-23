import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateUnitBase {

//#region unitId Prop
        @prop()
        unitId : number;
//#endregion unitId Prop


//#region estimateId Prop
        @prop()
        estimateId : number;
//#endregion estimateId Prop


//#region specSpecItemId Prop
        @prop()
        specSpecItemId : number;
//#endregion specSpecItemId Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


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