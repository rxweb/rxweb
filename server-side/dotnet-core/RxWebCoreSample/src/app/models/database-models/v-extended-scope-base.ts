import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vExtendedScopeBase {

//#region ownerScopeId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'ownerScopeId', keyColumn: false})
        ownerScopeId : any;
//#endregion ownerScopeId Prop


//#region scopeId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'scopeId', keyColumn: false})
        scopeId : any;
//#endregion scopeId Prop


//#region scopeLevel Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'scopeLevel', keyColumn: false})
        scopeLevel : any;
//#endregion scopeLevel Prop

}