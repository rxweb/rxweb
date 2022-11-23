import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vFeatureLookupBase {

//#region featureId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'featureId', keyColumn: false})
        featureId : any;
//#endregion featureId Prop


//#region featureName Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'featureName', keyColumn: false})
        featureName : string;
//#endregion featureName Prop

}