import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MilestoneTaskHistoryBase {

//#region milestoneTaskId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        milestoneTaskId : number;
//#endregion milestoneTaskId Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region vendorTask Prop
        @required()
        @maxLength({value:1})
        vendorTask : string;
//#endregion vendorTask Prop


//#region vendorAdjustable Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorAdjustable : number;
//#endregion vendorAdjustable Prop


//#region assignedUserId Prop
        @prop()
        assignedUserId : number;
//#endregion assignedUserId Prop


//#region dueDate Prop
        @prop()
        dueDate : Date;
//#endregion dueDate Prop


//#region jobStepId Prop
        @prop()
        jobStepId : number;
//#endregion jobStepId Prop


//#region specItemCurrentStatusId Prop
        @prop()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region workingMilestoneTaskId Prop
        @prop()
        workingMilestoneTaskId : number;
//#endregion workingMilestoneTaskId Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}