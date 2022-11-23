import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ComponentQualityBase {

//#region componentId Prop
        @prop()
        componentId : number;
//#endregion componentId Prop


//#region qualityId Prop
        @prop()
        qualityId : any;
//#endregion qualityId Prop


//#region status Prop
        @required()
        status : any;
//#endregion status Prop





}