import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataItemBase {

//#region dataItemId Prop
        @prop()
        dataItemId : number;
//#endregion dataItemId Prop


//#region dataItemOwnerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        dataItemOwnerId : number;
//#endregion dataItemOwnerId Prop


//#region dataItemTypeId Prop
        @required()
        dataItemTypeId : any;
//#endregion dataItemTypeId Prop


//#region parentDataItemId Prop
        @prop()
        parentDataItemId : number;
//#endregion parentDataItemId Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region dataItemVisibilityId Prop
        @prop()
        dataItemVisibilityId : any;
//#endregion dataItemVisibilityId Prop


//#region glossaryEntry Prop
        @maxLength({value:4000})
        glossaryEntry : string;
//#endregion glossaryEntry Prop


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