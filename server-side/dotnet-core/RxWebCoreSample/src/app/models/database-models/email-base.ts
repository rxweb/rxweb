import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EmailBase {

//#region emailId Prop
        @prop()
        emailId : number;
//#endregion emailId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region emailAddress Prop
        @required()
        @maxLength({value:100})
        emailAddress : string;
//#endregion emailAddress Prop


//#region isDefault Prop
        @prop()
        isDefault : boolean;
//#endregion isDefault Prop


//#region description Prop
        @maxLength({value:100})
        description : string;
//#endregion description Prop



}