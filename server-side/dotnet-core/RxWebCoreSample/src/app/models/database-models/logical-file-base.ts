import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LogicalFileBase {

//#region logicalFileId Prop
        @prop()
        logicalFileId : number;
//#endregion logicalFileId Prop


//#region logicalFileTypeId Prop
        @required()
        logicalFileTypeId : any;
//#endregion logicalFileTypeId Prop


//#region logicalFileInstanceId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileInstanceId : number;
//#endregion logicalFileInstanceId Prop


//#region ownerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        ownerId : number;
//#endregion ownerId Prop


//#region ownerJobStepId Prop
        @prop()
        ownerJobStepId : number;
//#endregion ownerJobStepId Prop

















}