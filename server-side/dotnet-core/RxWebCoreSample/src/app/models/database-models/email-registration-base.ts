import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EmailRegistrationBase {

//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region email Prop
        @required()
        @maxLength({value:4000})
        email : string;
//#endregion email Prop


//#region emailRegistrationKey Prop
        @prop()
        emailRegistrationKey : number;
//#endregion emailRegistrationKey Prop


//#region statusTypeId Prop
        @prop()
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