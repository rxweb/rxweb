import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataItemDataItemOptionBase {

//#region dataItemDataItemOptionId Prop
        @prop()
        dataItemDataItemOptionId : number;
//#endregion dataItemDataItemOptionId Prop


//#region dataItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        dataItemId : number;
//#endregion dataItemId Prop


//#region dataItemOptionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        dataItemOptionId : number;
//#endregion dataItemOptionId Prop


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