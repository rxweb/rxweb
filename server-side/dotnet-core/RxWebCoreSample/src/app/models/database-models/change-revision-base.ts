import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ChangeRevisionBase {

//#region changeRevisionId Prop
        @prop()
        changeRevisionId : number;
//#endregion changeRevisionId Prop


//#region changeOrderId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        changeOrderId : number;
//#endregion changeOrderId Prop


//#region createJobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createJobStepId : number;
//#endregion createJobStepId Prop


//#region changeRevisionStatusId Prop
        @required()
        changeRevisionStatusId : any;
//#endregion changeRevisionStatusId Prop


//#region priorChangeRevisionId Prop
        @prop()
        priorChangeRevisionId : number;
//#endregion priorChangeRevisionId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region amount Prop
        @prop()
        amount : number;
//#endregion amount Prop


//#region amountDescription Prop
        @maxLength({value:4000})
        amountDescription : string;
//#endregion amountDescription Prop













}