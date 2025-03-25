import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vUserBase {

//#region userId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'userId', keyColumn: true})
        userId : number;
//#endregion userId Prop


//#region applicationTimeZoneName Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'applicationTimeZoneName', keyColumn: false})
        applicationTimeZoneName : string;
//#endregion applicationTimeZoneName Prop


//#region languageCode Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'languageCode', keyColumn: false})
        languageCode : string;
//#endregion languageCode Prop


//#region userName Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'userName', keyColumn: false})
        userName : string;
//#endregion userName Prop


//#region password Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'password', keyColumn: false})
        password : any;
//#endregion password Prop


//#region salt Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'salt', keyColumn: false})
        salt : any;
//#endregion salt Prop


//#region loginBlocked Prop
        @gridColumn({visible: true, columnIndex:7, allowSorting: true, headerKey: 'loginBlocked', keyColumn: false})
        loginBlocked : boolean;
//#endregion loginBlocked Prop


//#region localeCode Prop
        @gridColumn({visible: true, columnIndex:8, allowSorting: true, headerKey: 'localeCode', keyColumn: false})
        localeCode : string;
//#endregion localeCode Prop

}