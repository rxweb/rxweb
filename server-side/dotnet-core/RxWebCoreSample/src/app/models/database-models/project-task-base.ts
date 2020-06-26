import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProjectTaskBase {

//#region projectTaskId Prop
        @prop()
        projectTaskId : number;
//#endregion projectTaskId Prop


//#region taskName Prop
        @required()
        @maxLength({value:4000})
        taskName : string;
//#endregion taskName Prop


//#region taskDescription Prop
        @required()
        @maxLength({value:4000})
        taskDescription : string;
//#endregion taskDescription Prop


//#region assignedUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        assignedUserId : number;
//#endregion assignedUserId Prop


//#region taskDueDate Prop
        @prop()
        taskDueDate : Date;
//#endregion taskDueDate Prop


//#region projectId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        projectId : number;
//#endregion projectId Prop





}