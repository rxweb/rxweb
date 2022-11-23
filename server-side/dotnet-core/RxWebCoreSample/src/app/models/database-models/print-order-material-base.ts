import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PrintOrderMaterialBase {

//#region printOrderId Prop
        @prop()
        printOrderId : number;
//#endregion printOrderId Prop


//#region materialId Prop
        @prop()
        materialId : number;
//#endregion materialId Prop


//#region quantity Prop
        @prop()
        quantity : number;
//#endregion quantity Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop





}