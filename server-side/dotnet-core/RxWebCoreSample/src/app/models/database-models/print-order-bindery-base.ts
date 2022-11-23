import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PrintOrderBinderyBase {

//#region poId Prop
        @prop()
        poId : number;
//#endregion poId Prop


//#region binderyId Prop
        @prop()
        binderyId : any;
//#endregion binderyId Prop


//#region subBinderyId Prop
        @prop()
        subBinderyId : number;
//#endregion subBinderyId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop







}