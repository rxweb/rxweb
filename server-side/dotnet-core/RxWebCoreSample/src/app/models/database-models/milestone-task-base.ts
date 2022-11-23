import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MilestoneTaskBase {

//#region milestoneTaskId Prop
        @prop()
        milestoneTaskId : number;
//#endregion milestoneTaskId Prop


//#region jobStepId Prop
        @prop()
        jobStepId : number;
//#endregion jobStepId Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region vendorAdjustable Prop
        @prop()
        vendorAdjustable : number;
//#endregion vendorAdjustable Prop


//#region vendorTask Prop
        @required()
        @maxLength({value:1})
        vendorTask : string;
//#endregion vendorTask Prop


//#region assignedUserId Prop
        @prop()
        assignedUserId : number;
//#endregion assignedUserId Prop


//#region dueDate Prop
        @prop()
        dueDate : Date;
//#endregion dueDate Prop









}