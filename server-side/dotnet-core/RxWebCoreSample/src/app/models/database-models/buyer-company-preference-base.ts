import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerCompanyPreferenceBase {

//#region buyerCompanyPreferenceId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerCompanyPreferenceId : number;
//#endregion buyerCompanyPreferenceId Prop


//#region buyerId Prop
        @prop()
        buyerId : number;
//#endregion buyerId Prop


//#region companyPreferenceId Prop
        @prop()
        companyPreferenceId : any;
//#endregion companyPreferenceId Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : number;
//#endregion statusTypeId Prop


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