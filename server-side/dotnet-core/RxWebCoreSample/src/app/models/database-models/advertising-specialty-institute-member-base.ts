import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AdvertisingSpecialtyInstituteMemberBase {

//#region advertisingSpecialtyInstituteUserId Prop
        @prop()
        advertisingSpecialtyInstituteUserId : number;
//#endregion advertisingSpecialtyInstituteUserId Prop


//#region firstName Prop
        @required()
        @maxLength({value:100})
        firstName : string;
//#endregion firstName Prop


//#region lastName Prop
        @required()
        @maxLength({value:100})
        lastName : string;
//#endregion lastName Prop


//#region userName Prop
        @required()
        @maxLength({value:200})
        userName : string;
//#endregion userName Prop


//#region email Prop
        @required()
        @maxLength({value:4000})
        email : string;
//#endregion email Prop


//#region asiNumber Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        asiNumber : number;
//#endregion asiNumber Prop


//#region companyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        companyId : number;
//#endregion companyId Prop


//#region companyName Prop
        @required()
        @maxLength({value:100})
        companyName : string;
//#endregion companyName Prop


//#region userToken Prop
        @required()
        userToken : string;
//#endregion userToken Prop


//#region accessToken Prop
        @required()
        accessToken : string;
//#endregion accessToken Prop


//#region memberUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        memberUserId : number;
//#endregion memberUserId Prop



}