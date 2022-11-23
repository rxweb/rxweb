import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StepBase {

//#region stepId Prop
        @prop()
        stepId : number;
//#endregion stepId Prop


//#region serviceId Prop
        @required()
        serviceId : any;
//#endregion serviceId Prop


//#region rightId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        rightId : number;
//#endregion rightId Prop


//#region displayGroup Prop
        @prop()
        displayGroup : number;
//#endregion displayGroup Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region htmlClass Prop
        @maxLength({value:100})
        htmlClass : string;
//#endregion htmlClass Prop


//#region htmlImage Prop
        @maxLength({value:100})
        htmlImage : string;
//#endregion htmlImage Prop


//#region stepTypeId Prop
        @prop()
        stepTypeId : number;
//#endregion stepTypeId Prop


//#region stepGroupId Prop
        @prop()
        stepGroupId : any;
//#endregion stepGroupId Prop


//#region manifestConstant Prop
        @maxLength({value:30})
        manifestConstant : string;
//#endregion manifestConstant Prop


//#region eN_StepName Prop
        @required()
        @maxLength({value:500})
        eN_StepName : string;
//#endregion eN_StepName Prop


//#region eN_AssignedUserNounName Prop
        @maxLength({value:500})
        eN_AssignedUserNounName : string;
//#endregion eN_AssignedUserNounName Prop


//#region eN_AssignedUserVerbName Prop
        @maxLength({value:500})
        eN_AssignedUserVerbName : string;
//#endregion eN_AssignedUserVerbName Prop


//#region fR_StepName Prop
        @maxLength({value:500})
        fR_StepName : string;
//#endregion fR_StepName Prop


//#region fR_AssignedUserNounName Prop
        @maxLength({value:500})
        fR_AssignedUserNounName : string;
//#endregion fR_AssignedUserNounName Prop


//#region fR_AssignedUserVerbName Prop
        @maxLength({value:500})
        fR_AssignedUserVerbName : string;
//#endregion fR_AssignedUserVerbName Prop



















}