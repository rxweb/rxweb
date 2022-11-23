import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vActiveUserAsstBase {

//#region userId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'userId', keyColumn: true})
        userId : number;
//#endregion userId Prop


//#region departmentId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'departmentId', keyColumn: false})
        departmentId : number;
//#endregion departmentId Prop


//#region roleCompanyMappingId Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'roleCompanyMappingId', keyColumn: false})
        roleCompanyMappingId : number;
//#endregion roleCompanyMappingId Prop


//#region abilityId Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'abilityId', keyColumn: false})
        abilityId : number;
//#endregion abilityId Prop


//#region scopeId Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'scopeId', keyColumn: false})
        scopeId : any;
//#endregion scopeId Prop


//#region stepId Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'stepId', keyColumn: false})
        stepId : number;
//#endregion stepId Prop


//#region teamRightId Prop
        @gridColumn({visible: true, columnIndex:7, allowSorting: true, headerKey: 'teamRightId', keyColumn: false})
        teamRightId : number;
//#endregion teamRightId Prop


//#region rightId Prop
        @gridColumn({visible: true, columnIndex:8, allowSorting: true, headerKey: 'rightId', keyColumn: false})
        rightId : number;
//#endregion rightId Prop

}