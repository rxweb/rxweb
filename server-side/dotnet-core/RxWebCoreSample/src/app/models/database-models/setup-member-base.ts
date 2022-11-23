import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SetupMemberBase {

//#region setupId Prop
        @prop()
        setupId : any;
//#endregion setupId Prop


//#region memberId Prop
        @prop()
        memberId : number;
//#endregion memberId Prop


//#region setupMemberStatusId Prop
        @required()
        setupMemberStatusId : any;
//#endregion setupMemberStatusId Prop


//#region stepsRemaining Prop
        @prop()
        stepsRemaining : any;
//#endregion stepsRemaining Prop


//#region secondaryId Prop
        @prop()
        secondaryId : number;
//#endregion secondaryId Prop


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