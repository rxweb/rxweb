import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AddressBase {

//#region addressId Prop
        @prop()
        addressId : number;
//#endregion addressId Prop


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
        @prop()
        description : string;
//#endregion description Prop


//#region line1 Prop
        @maxLength({value:4000})
        line1 : string;
//#endregion line1 Prop


//#region line2 Prop
        @maxLength({value:4000})
        line2 : string;
//#endregion line2 Prop


//#region line3 Prop
        @maxLength({value:4000})
        line3 : string;
//#endregion line3 Prop


//#region city Prop
        @maxLength({value:100})
        city : string;
//#endregion city Prop


//#region stateId Prop
        @required()
        stateId : any;
//#endregion stateId Prop


//#region postalCode Prop
        @maxLength({value:50})
        postalCode : string;
//#endregion postalCode Prop


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