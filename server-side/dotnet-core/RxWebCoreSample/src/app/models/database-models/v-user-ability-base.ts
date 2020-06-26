import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vUserAbilityBase {

//#region userId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'userId', keyColumn: true})
        userId : number;
//#endregion userId Prop


//#region departmentId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'departmentId', keyColumn: false})
        departmentId : number;
//#endregion departmentId Prop


//#region roleCompanyMappingId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'roleCompanyMappingId', keyColumn: false})
        roleCompanyMappingId : number;
//#endregion roleCompanyMappingId Prop


//#region aBILITYID Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'aBILITYID', keyColumn: false})
        aBILITYID : number;
//#endregion aBILITYID Prop


//#region sTATUSTYPEID Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'sTATUSTYPEID', keyColumn: false})
        sTATUSTYPEID : any;
//#endregion sTATUSTYPEID Prop

}