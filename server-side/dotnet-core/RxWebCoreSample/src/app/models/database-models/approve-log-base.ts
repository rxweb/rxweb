import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApproveLogBase {

//#region approveLogId Prop
        @prop()
        approveLogId : number;
//#endregion approveLogId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region approveDate Prop
        @prop()
        approveDate : Date;
//#endregion approveDate Prop


//#region quantity Prop
        @prop()
        quantity : number;
//#endregion quantity Prop


//#region approveLogStatusId Prop
        @required()
        approveLogStatusId : any;
//#endregion approveLogStatusId Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region approveUserId Prop
        @prop()
        approveUserId : number;
//#endregion approveUserId Prop


//#region approveLoginId Prop
        @prop()
        approveLoginId : number;
//#endregion approveLoginId Prop


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