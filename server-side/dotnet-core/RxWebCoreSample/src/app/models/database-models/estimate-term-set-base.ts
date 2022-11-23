import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateTermSetBase {

//#region estimateTermSetId Prop
        @prop()
        estimateTermSetId : number;
//#endregion estimateTermSetId Prop


//#region estimateId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateId : number;
//#endregion estimateId Prop


//#region termSetId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        termSetId : number;
//#endregion termSetId Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop





}