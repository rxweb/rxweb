import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class UserDataItemBase {

//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region dataItemId Prop
        @prop()
        dataItemId : number;
//#endregion dataItemId Prop


//#region jobTypeId Prop
        @required()
        jobTypeId : any;
//#endregion jobTypeId Prop


//#region defaultValue Prop
        @maxLength({value:4000})
        defaultValue : string;
//#endregion defaultValue Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop







}