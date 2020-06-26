import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FeatureBase {

//#region featureId Prop
        @prop()
        featureId : any;
//#endregion featureId Prop


//#region name Prop
        @required()
        @maxLength({value:4000})
        name : string;
//#endregion name Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : number;
//#endregion statusTypeId Prop



}