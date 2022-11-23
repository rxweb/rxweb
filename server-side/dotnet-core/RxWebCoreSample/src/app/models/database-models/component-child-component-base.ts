import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ComponentChildComponentBase {

//#region parentComponentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        parentComponentId : number;
//#endregion parentComponentId Prop


//#region childComponentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        childComponentId : number;
//#endregion childComponentId Prop





}