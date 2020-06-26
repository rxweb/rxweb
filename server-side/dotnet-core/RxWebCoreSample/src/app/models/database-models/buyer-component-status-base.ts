import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerComponentStatusBase {

//#region buyerComponentStatusId Prop
        @prop()
        buyerComponentStatusId : any;
//#endregion buyerComponentStatusId Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_BuyerComponentStatusName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerComponentStatusName : string;
//#endregion eN_BuyerComponentStatusName Prop


//#region fR_BuyerComponentStatusName Prop
        @maxLength({value:500})
        fR_BuyerComponentStatusName : string;
//#endregion fR_BuyerComponentStatusName Prop



}