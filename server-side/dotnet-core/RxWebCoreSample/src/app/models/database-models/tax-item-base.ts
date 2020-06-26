import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TaxItemBase {

//#region taxItemId Prop
        @prop()
        taxItemId : number;
//#endregion taxItemId Prop


//#region amount Prop
        @required()
        amount : number;
//#endregion amount Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region taxItemTypeId Prop
        @required()
        taxItemTypeId : any;
//#endregion taxItemTypeId Prop


//#region financialLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialLineItemId : number;
//#endregion financialLineItemId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


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