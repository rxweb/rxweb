import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeBatchBase {

//#region serviceFeeBatchId Prop
        @prop()
        serviceFeeBatchId : number;
//#endregion serviceFeeBatchId Prop


//#region buyerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerId : number;
//#endregion buyerId Prop


//#region batchDate Prop
        @required()
        batchDate : Date;
//#endregion batchDate Prop


//#region processedByUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        processedByUserId : number;
//#endregion processedByUserId Prop


//#region processedByLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        processedByLoginId : number;
//#endregion processedByLoginId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop









}