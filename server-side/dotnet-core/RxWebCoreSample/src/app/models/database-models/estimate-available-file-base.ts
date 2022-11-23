import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateAvailableFileBase {

//#region estimateAvailableFileId Prop
        @prop()
        estimateAvailableFileId : number;
//#endregion estimateAvailableFileId Prop


//#region estimateId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateId : number;
//#endregion estimateId Prop


//#region logicalFileInstanceId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileInstanceId : number;
//#endregion logicalFileInstanceId Prop





}