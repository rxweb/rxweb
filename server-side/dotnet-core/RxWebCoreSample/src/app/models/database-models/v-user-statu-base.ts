import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vUserStatuBase {

//#region userId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'userId', keyColumn: true})
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


//#region bidResultTypeMaskId Prop
        @gridColumn({visible: true, columnIndex:17, allowSorting: true, headerKey: 'bidResultTypeMaskId', keyColumn: false})
        bidResultTypeMaskId : any;
//#endregion bidResultTypeMaskId Prop


//#region currencyId Prop
        @gridColumn({visible: true, columnIndex:18, allowSorting: true, headerKey: 'currencyId', keyColumn: false})
        currencyId : any;
//#endregion currencyId Prop


//#region territoryId Prop
        @gridColumn({visible: true, columnIndex:19, allowSorting: true, headerKey: 'territoryId', keyColumn: false})
        territoryId : any;
//#endregion territoryId Prop


//#region currencyFormatMaskId Prop
        @gridColumn({visible: true, columnIndex:20, allowSorting: true, headerKey: 'currencyFormatMaskId', keyColumn: false})
        currencyFormatMaskId : any;
//#endregion currencyFormatMaskId Prop


//#region dateFormatMaskId Prop
        @gridColumn({visible: true, columnIndex:21, allowSorting: true, headerKey: 'dateFormatMaskId', keyColumn: false})
        dateFormatMaskId : any;
//#endregion dateFormatMaskId Prop


//#region languageId Prop
        @gridColumn({visible: true, columnIndex:22, allowSorting: true, headerKey: 'languageId', keyColumn: false})
        languageId : any;
//#endregion languageId Prop


//#region customText Prop
        @gridColumn({visible: true, columnIndex:23, allowSorting: true, headerKey: 'customText', keyColumn: false})
        customText : string;
//#endregion customText Prop


//#region statusTypeId Prop
        @gridColumn({visible: true, columnIndex:24, allowSorting: true, headerKey: 'statusTypeId', keyColumn: false})
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region status Prop
        @gridColumn({visible: true, columnIndex:25, allowSorting: true, headerKey: 'status', keyColumn: false})
        status : any;
//#endregion status Prop

}