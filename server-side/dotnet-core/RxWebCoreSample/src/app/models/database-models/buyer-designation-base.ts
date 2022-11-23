import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerDesignationBase {

//#region buyerDesignationId Prop
        @prop()
        buyerDesignationId : any;
//#endregion buyerDesignationId Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop


//#region eN_BuyerDesignationName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerDesignationName : string;
//#endregion eN_BuyerDesignationName Prop


//#region fR_BuyerDesignationName Prop
        @maxLength({value:500})
        fR_BuyerDesignationName : string;
//#endregion fR_BuyerDesignationName Prop



}