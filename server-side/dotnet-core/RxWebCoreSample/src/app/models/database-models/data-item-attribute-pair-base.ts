import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataItemAttributePairBase {

//#region dataItemAttributePairId Prop
        @prop()
        dataItemAttributePairId : number;
//#endregion dataItemAttributePairId Prop


//#region dataItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        dataItemId : number;
//#endregion dataItemId Prop


//#region name Prop
        @maxLength({value:100})
        name : string;
//#endregion name Prop


//#region value Prop
        @maxLength({value:4000})
        value : string;
//#endregion value Prop


//#region dataItemAttributeNameId Prop
        @prop()
        dataItemAttributeNameId : any;
//#endregion dataItemAttributeNameId Prop


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