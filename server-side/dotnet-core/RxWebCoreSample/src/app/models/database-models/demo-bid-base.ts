import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DemoBidBase {

//#region templateJobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        templateJobId : number;
//#endregion templateJobId Prop


//#region bidPrice Prop
        @prop()
        bidPrice : number;
//#endregion bidPrice Prop

}