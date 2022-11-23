import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ReceiveLogBase {

//#region receiveLogId Prop
        @prop()
        receiveLogId : number;
//#endregion receiveLogId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region receiveDate Prop
        @prop()
        receiveDate : Date;
//#endregion receiveDate Prop


//#region quantity Prop
        @prop()
        quantity : number;
//#endregion quantity Prop


//#region receiveLogStatusId Prop
        @required()
        receiveLogStatusId : any;
//#endregion receiveLogStatusId Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region receiveUserId Prop
        @prop()
        receiveUserId : number;
//#endregion receiveUserId Prop


//#region receiveLoginId Prop
        @prop()
        receiveLoginId : number;
//#endregion receiveLoginId Prop


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