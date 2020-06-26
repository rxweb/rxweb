import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class NoteBase {

//#region noteId Prop
        @prop()
        noteId : number;
//#endregion noteId Prop


//#region parentNoteId Prop
        @prop()
        parentNoteId : number;
//#endregion parentNoteId Prop


//#region subject Prop
        @maxLength({value:4000})
        subject : string;
//#endregion subject Prop


//#region body Prop
        @maxLength({value:4000})
        body : string;
//#endregion body Prop


//#region authorUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        authorUserId : number;
//#endregion authorUserId Prop


//#region jobStepId Prop
        @prop()
        jobStepId : number;
//#endregion jobStepId Prop


//#region jobThreadId Prop
        @prop()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region noteTypeId Prop
        @prop()
        noteTypeId : any;
//#endregion noteTypeId Prop


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