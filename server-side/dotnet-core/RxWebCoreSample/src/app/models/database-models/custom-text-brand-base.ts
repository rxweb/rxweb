import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CustomTextBrandBase {

//#region customTextBrandId Prop
        @prop()
        customTextBrandId : number;
//#endregion customTextBrandId Prop


//#region customTextItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        customTextItemId : number;
//#endregion customTextItemId Prop


//#region brandId Prop
        @required()
        brandId : any;
//#endregion brandId Prop


//#region customTextId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        customTextId : number;
//#endregion customTextId Prop







}