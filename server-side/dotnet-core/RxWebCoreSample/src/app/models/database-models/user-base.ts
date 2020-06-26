import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class UserBase {

//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region departmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        departmentId : number;
//#endregion departmentId Prop


//#region companyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        companyId : number;
//#endregion companyId Prop


//#region memberTypeName Prop
        @required()
        @maxLength({value:1})
        memberTypeName : string;
//#endregion memberTypeName Prop


//#region memberStatusId Prop
        @required()
        memberStatusId : any;
//#endregion memberStatusId Prop


//#region name Prop
        @maxLength({value:100})
        name : string;
//#endregion name Prop


//#region description Prop
        @prop()
        description : string;
//#endregion description Prop


//#region username Prop
        @maxLength({value:200})
        username : string;
//#endregion username Prop


//#region email Prop
        @maxLength({value:500})
        email : string;
//#endregion email Prop


//#region actingUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        actingUserId : number;
//#endregion actingUserId Prop


//#region failureCount Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        failureCount : number;
//#endregion failureCount Prop


//#region sessionKey Prop
        @maxLength({value:40})
        sessionKey : string;
//#endregion sessionKey Prop


//#region timezoneId Prop
        @required()
        timezoneId : any;
//#endregion timezoneId Prop


//#region hasDaylightSavingsTime Prop
        @required()
        hasDaylightSavingsTime : boolean;
//#endregion hasDaylightSavingsTime Prop


//#region parentid Prop
        @prop()
        parentid : number;
//#endregion parentid Prop


//#region contractId Prop
        @prop()
        contractId : number;
//#endregion contractId Prop


//#region jobGroupId Prop
        @prop()
        jobGroupId : number;
//#endregion jobGroupId Prop


//#region defaultsJobId Prop
        @prop()
        defaultsJobId : number;
//#endregion defaultsJobId Prop


//#region bidResultTypeMaskId Prop
        @prop()
        bidResultTypeMaskId : any;
//#endregion bidResultTypeMaskId Prop


//#region lastPortalAccessDate Prop
        @prop()
        lastPortalAccessDate : any;
//#endregion lastPortalAccessDate Prop


//#region customText Prop
        @maxLength({value:500})
        customText : string;
//#endregion customText Prop


//#region currencyFormatMaskId Prop
        @prop()
        currencyFormatMaskId : any;
//#endregion currencyFormatMaskId Prop


//#region dateFormatMaskId Prop
        @required()
        dateFormatMaskId : any;
//#endregion dateFormatMaskId Prop


//#region territoryId Prop
        @required()
        territoryId : any;
//#endregion territoryId Prop


//#region currencyId Prop
        @required()
        currencyId : any;
//#endregion currencyId Prop


//#region languageId Prop
        @required()
        languageId : any;
//#endregion languageId Prop


//#region brandId Prop
        @prop()
        brandId : any;
//#endregion brandId Prop


//#region session_IPAddress Prop
        @maxLength({value:100})
        session_IPAddress : string;
//#endregion session_IPAddress Prop


//#region createdDate Prop
        @prop()
        createdDate : any;
//#endregion createdDate Prop


//#region note Prop
        @prop()
        note : string;
//#endregion note Prop


//#region password Prop
        @maxLength({value:132})
        password : any;
//#endregion password Prop


//#region salt Prop
        @maxLength({value:140})
        salt : any;
//#endregion salt Prop


//#region registrationEmailDate Prop
        @prop()
        registrationEmailDate : any;
//#endregion registrationEmailDate Prop


//#region registrationEmailKey Prop
        @maxLength({value:100})
        registrationEmailKey : string;
//#endregion registrationEmailKey Prop


//#region reportAccessId Prop
        @prop()
        reportAccessId : any;
//#endregion reportAccessId Prop


//#region firstLoginDateTime Prop
        @prop()
        firstLoginDateTime : any;
//#endregion firstLoginDateTime Prop


//#region webAddress Prop
        @maxLength({value:200})
        webAddress : string;
//#endregion webAddress Prop


//#region useDevelopmentCode Prop
        @required()
        @maxLength({value:1})
        useDevelopmentCode : string;
//#endregion useDevelopmentCode Prop


//#region rowId Prop
        @required()
        rowId : any;
//#endregion rowId Prop


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


//#region loginBlocked Prop
        @required()
        loginBlocked : boolean;
//#endregion loginBlocked Prop

































































































































































































































































































}