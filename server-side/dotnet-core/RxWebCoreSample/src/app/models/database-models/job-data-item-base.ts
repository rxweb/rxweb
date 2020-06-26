import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobDataItemBase {

//#region jobId Prop
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region dataItemId Prop
        @prop()
        dataItemId : number;
//#endregion dataItemId Prop


//#region value Prop
        @maxLength({value:4000})
        value : string;
//#endregion value Prop


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