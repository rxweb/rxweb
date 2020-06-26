import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobThreadBase {

//#region jobThreadId Prop
        @prop()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region threadTypeId Prop
        @required()
        threadTypeId : any;
//#endregion threadTypeId Prop


//#region threadDescription Prop
        @required()
        @maxLength({value:4000})
        threadDescription : string;
//#endregion threadDescription Prop


//#region threadStatusId Prop
        @required()
        threadStatusId : any;
//#endregion threadStatusId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region firstJobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        firstJobStepId : number;
//#endregion firstJobStepId Prop


//#region currentJobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        currentJobStepId : number;
//#endregion currentJobStepId Prop


//#region dueDate Prop
        @prop()
        dueDate : Date;
//#endregion dueDate Prop


//#region completeDate Prop
        @prop()
        completeDate : Date;
//#endregion completeDate Prop


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