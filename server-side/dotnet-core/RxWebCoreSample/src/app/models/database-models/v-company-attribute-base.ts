import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vCompanyAttributeBase {

//#region companyId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'companyId', keyColumn: true})
        companyId : number;
//#endregion companyId Prop


//#region attributeId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'attributeId', keyColumn: false})
        attributeId : any;
//#endregion attributeId Prop


//#region statusTypeId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'statusTypeId', keyColumn: false})
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region createdBy Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'createdBy', keyColumn: false})
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'createdDateTime', keyColumn: false})
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'updatedBy', keyColumn: false})
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'updatedDateTime', keyColumn: false})
        updatedDateTime : any;
//#endregion updatedDateTime Prop


//#region attributeTypeId Prop
        @gridColumn({visible: true, columnIndex:7, allowSorting: true, headerKey: 'attributeTypeId', keyColumn: false})
        attributeTypeId : any;
//#endregion attributeTypeId Prop

}