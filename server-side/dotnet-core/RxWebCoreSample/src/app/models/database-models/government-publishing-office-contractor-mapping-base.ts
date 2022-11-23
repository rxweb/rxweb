import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class GovernmentPublishingOfficeContractorMappingBase {

//#region governmentPublishingOfficeContractorMappingId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        governmentPublishingOfficeContractorMappingId : number;
//#endregion governmentPublishingOfficeContractorMappingId Prop


//#region companyId Prop
        @prop()
        companyId : number;
//#endregion companyId Prop


//#region governmentPublishingOfficeContractorId Prop
        @prop()
        governmentPublishingOfficeContractorId : number;
//#endregion governmentPublishingOfficeContractorId Prop


//#region governmentPublishingOfficeStateId Prop
        @prop()
        governmentPublishingOfficeStateId : number;
//#endregion governmentPublishingOfficeStateId Prop


//#region name Prop
        @maxLength({value:100})
        name : string;
//#endregion name Prop


//#region zip Prop
        @maxLength({value:10})
        zip : string;
//#endregion zip Prop


//#region phoneAreaCode Prop
        @maxLength({value:3})
        phoneAreaCode : string;
//#endregion phoneAreaCode Prop


//#region phone Prop
        @maxLength({value:50})
        phone : string;
//#endregion phone Prop


//#region contactId Prop
        @prop()
        contactId : number;
//#endregion contactId Prop


//#region addressId Prop
        @prop()
        addressId : number;
//#endregion addressId Prop


//#region city Prop
        @maxLength({value:100})
        city : string;
//#endregion city Prop


//#region state Prop
        @maxLength({value:100})
        state : string;
//#endregion state Prop



}