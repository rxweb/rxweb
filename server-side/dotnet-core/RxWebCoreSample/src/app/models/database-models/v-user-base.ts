import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vUserBase {

//#region userId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'userId', keyColumn: true})
        userId : number;
//#endregion userId Prop


//#region departmentId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'departmentId', keyColumn: false})
        departmentId : number;
//#endregion departmentId Prop


//#region companyId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'companyId', keyColumn: false})
        companyId : number;
//#endregion companyId Prop


//#region memberTypeName Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'memberTypeName', keyColumn: false})
        memberTypeName : string;
//#endregion memberTypeName Prop


//#region memberStatusId Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'memberStatusId', keyColumn: false})
        memberStatusId : any;
//#endregion memberStatusId Prop


//#region name Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'name', keyColumn: false})
        name : string;
//#endregion name Prop


//#region description Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'description', keyColumn: false})
        description : string;
//#endregion description Prop


//#region username Prop
        @gridColumn({visible: true, columnIndex:7, allowSorting: true, headerKey: 'username', keyColumn: false})
        username : string;
//#endregion username Prop


//#region email Prop
        @gridColumn({visible: true, columnIndex:8, allowSorting: true, headerKey: 'email', keyColumn: false})
        email : string;
//#endregion email Prop


//#region actingUserId Prop
        @gridColumn({visible: true, columnIndex:9, allowSorting: true, headerKey: 'actingUserId', keyColumn: false})
        actingUserId : any;
//#endregion actingUserId Prop


//#region failureCount Prop
        @gridColumn({visible: true, columnIndex:10, allowSorting: true, headerKey: 'failureCount', keyColumn: false})
        failureCount : number;
//#endregion failureCount Prop


//#region sessionKey Prop
        @gridColumn({visible: true, columnIndex:11, allowSorting: true, headerKey: 'sessionKey', keyColumn: false})
        sessionKey : string;
//#endregion sessionKey Prop


//#region timezoneId Prop
        @gridColumn({visible: true, columnIndex:12, allowSorting: true, headerKey: 'timezoneId', keyColumn: false})
        timezoneId : any;
//#endregion timezoneId Prop


//#region hasDaylightSavingsTime Prop
        @gridColumn({visible: true, columnIndex:13, allowSorting: true, headerKey: 'hasDaylightSavingsTime', keyColumn: false})
        hasDaylightSavingsTime : boolean;
//#endregion hasDaylightSavingsTime Prop


//#region parentid Prop
        @gridColumn({visible: true, columnIndex:14, allowSorting: true, headerKey: 'parentid', keyColumn: false})
        parentid : any;
//#endregion parentid Prop


//#region contractId Prop
        @gridColumn({visible: true, columnIndex:15, allowSorting: true, headerKey: 'contractId', keyColumn: false})
        contractId : any;
//#endregion contractId Prop


//#region jobGroupId Prop
        @gridColumn({visible: true, columnIndex:16, allowSorting: true, headerKey: 'jobGroupId', keyColumn: false})
        jobGroupId : any;
//#endregion jobGroupId Prop


//#region defaultsJobId Prop
        @gridColumn({visible: true, columnIndex:17, allowSorting: true, headerKey: 'defaultsJobId', keyColumn: false})
        defaultsJobId : any;
//#endregion defaultsJobId Prop


//#region bidResultTypeMaskId Prop
        @gridColumn({visible: true, columnIndex:18, allowSorting: true, headerKey: 'bidResultTypeMaskId', keyColumn: false})
        bidResultTypeMaskId : any;
//#endregion bidResultTypeMaskId Prop


//#region lastPortalAccessDate Prop
        @gridColumn({visible: true, columnIndex:19, allowSorting: true, headerKey: 'lastPortalAccessDate', keyColumn: false})
        lastPortalAccessDate : any;
//#endregion lastPortalAccessDate Prop


//#region customText Prop
        @gridColumn({visible: true, columnIndex:20, allowSorting: true, headerKey: 'customText', keyColumn: false})
        customText : string;
//#endregion customText Prop


//#region currencyFormatMaskId Prop
        @gridColumn({visible: true, columnIndex:21, allowSorting: true, headerKey: 'currencyFormatMaskId', keyColumn: false})
        currencyFormatMaskId : any;
//#endregion currencyFormatMaskId Prop


//#region dateFormatMaskId Prop
        @gridColumn({visible: true, columnIndex:22, allowSorting: true, headerKey: 'dateFormatMaskId', keyColumn: false})
        dateFormatMaskId : any;
//#endregion dateFormatMaskId Prop


//#region territoryId Prop
        @gridColumn({visible: true, columnIndex:23, allowSorting: true, headerKey: 'territoryId', keyColumn: false})
        territoryId : any;
//#endregion territoryId Prop


//#region currencyId Prop
        @gridColumn({visible: true, columnIndex:24, allowSorting: true, headerKey: 'currencyId', keyColumn: false})
        currencyId : any;
//#endregion currencyId Prop


//#region languageId Prop
        @gridColumn({visible: true, columnIndex:25, allowSorting: true, headerKey: 'languageId', keyColumn: false})
        languageId : any;
//#endregion languageId Prop


//#region brandId Prop
        @gridColumn({visible: true, columnIndex:26, allowSorting: true, headerKey: 'brandId', keyColumn: false})
        brandId : any;
//#endregion brandId Prop


//#region session_IPAddress Prop
        @gridColumn({visible: true, columnIndex:27, allowSorting: true, headerKey: 'session_IPAddress', keyColumn: false})
        session_IPAddress : string;
//#endregion session_IPAddress Prop


//#region createdDate Prop
        @gridColumn({visible: true, columnIndex:28, allowSorting: true, headerKey: 'createdDate', keyColumn: false})
        createdDate : any;
//#endregion createdDate Prop


//#region note Prop
        @gridColumn({visible: true, columnIndex:29, allowSorting: true, headerKey: 'note', keyColumn: false})
        note : string;
//#endregion note Prop


//#region password Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'password', keyColumn: false})
        password : any;
//#endregion password Prop


//#region salt Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'salt', keyColumn: false})
        salt : any;
//#endregion salt Prop


//#region registrationEmailDate Prop
        @gridColumn({visible: true, columnIndex:32, allowSorting: true, headerKey: 'registrationEmailDate', keyColumn: false})
        registrationEmailDate : any;
//#endregion registrationEmailDate Prop


//#region registrationEmailKey Prop
        @gridColumn({visible: true, columnIndex:33, allowSorting: true, headerKey: 'registrationEmailKey', keyColumn: false})
        registrationEmailKey : string;
//#endregion registrationEmailKey Prop


//#region reportAccessId Prop
        @gridColumn({visible: true, columnIndex:34, allowSorting: true, headerKey: 'reportAccessId', keyColumn: false})
        reportAccessId : any;
//#endregion reportAccessId Prop


//#region firstLoginDateTime Prop
        @gridColumn({visible: true, columnIndex:35, allowSorting: true, headerKey: 'firstLoginDateTime', keyColumn: false})
        firstLoginDateTime : any;
//#endregion firstLoginDateTime Prop


//#region webAddress Prop
        @gridColumn({visible: true, columnIndex:36, allowSorting: true, headerKey: 'webAddress', keyColumn: false})
        webAddress : string;
//#endregion webAddress Prop


//#region useDevelopmentCode Prop
        @gridColumn({visible: true, columnIndex:37, allowSorting: true, headerKey: 'useDevelopmentCode', keyColumn: false})
        useDevelopmentCode : string;
//#endregion useDevelopmentCode Prop


//#region rowId Prop
        @gridColumn({visible: true, columnIndex:38, allowSorting: true, headerKey: 'rowId', keyColumn: false})
        rowId : any;
//#endregion rowId Prop


//#region languageCode Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'languageCode', keyColumn: false})
        languageCode : string;
//#endregion languageCode Prop


//#region timeZone Prop
        @gridColumn({visible: true, columnIndex:40, allowSorting: true, headerKey: 'timeZone', keyColumn: false})
        timeZone : string;
//#endregion timeZone Prop


//#region applicationTimeZoneName Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'applicationTimeZoneName', keyColumn: false})
        applicationTimeZoneName : string;
//#endregion applicationTimeZoneName Prop

}