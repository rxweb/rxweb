import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class UserRightOptionBase {

//#region userRightOptionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userRightOptionId : number;
//#endregion userRightOptionId Prop


//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region rightId Prop
        @prop()
        rightId : number;
//#endregion rightId Prop


//#region optionValue Prop
        @prop()
        optionValue : any;
//#endregion optionValue Prop





}