import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PhoneBase {

//#region phoneId Prop
        @prop()
        phoneId : number;
//#endregion phoneId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop


//#region description Prop
        @maxLength({value:500})
        description : string;
//#endregion description Prop


//#region phoneTypeId Prop
        @required()
        phoneTypeId : any;
//#endregion phoneTypeId Prop


//#region formattedPhone Prop
        @maxLength({value:50})
        formattedPhone : string;
//#endregion formattedPhone Prop


//#region compressedPhone Prop
        @maxLength({value:50})
        compressedPhone : string;
//#endregion compressedPhone Prop


//#region extension Prop
        @maxLength({value:50})
        extension : string;
//#endregion extension Prop


//#region countryId Prop
        @required()
        countryId : any;
//#endregion countryId Prop


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