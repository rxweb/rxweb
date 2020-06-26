import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProductBase {

//#region productId Prop
        @prop()
        productId : any;
//#endregion productId Prop


//#region productName Prop
        @required()
        @maxLength({value:100})
        productName : string;
//#endregion productName Prop





}