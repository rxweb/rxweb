import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vOrganizationRolesLookupBase {

//#region userId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'userId', keyColumn: true})
        userId : number;
//#endregion userId Prop


//#region name Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'name', keyColumn: false})
        name : string;
//#endregion name Prop


//#region brandId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'brandId', keyColumn: false})
        brandId : any;
//#endregion brandId Prop

}