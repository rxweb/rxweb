import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vStateRecordBase {

//#region stateId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'stateId', keyColumn: true})
        stateId : number;
//#endregion stateId Prop


//#region stateName Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'stateName', keyColumn: false})
        stateName : string;
//#endregion stateName Prop


//#region statusId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'statusId', keyColumn: false})
        statusId : number;
//#endregion statusId Prop

}