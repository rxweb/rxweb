import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MoveBatchBase {

//#region moveBatchId Prop
        @prop()
        moveBatchId : number;
//#endregion moveBatchId Prop


//#region ownerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        ownerId : number;
//#endregion ownerId Prop


//#region startDate Prop
        @required()
        startDate : Date;
//#endregion startDate Prop


//#region completeDate Prop
        @prop()
        completeDate : Date;
//#endregion completeDate Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop

















}