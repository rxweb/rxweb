import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MoveBidResultRemoveLogBase {

//#region moveBidResultRemoveLogId Prop
        @prop()
        moveBidResultRemoveLogId : number;
//#endregion moveBidResultRemoveLogId Prop


//#region moveBatchId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        moveBatchId : number;
//#endregion moveBatchId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region bidResultTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidResultTypeId : number;
//#endregion bidResultTypeId Prop



}