import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EmailTemplateBase {

//#region id Prop
        @prop()
        id : number;
//#endregion id Prop


//#region subject Prop
        @required()
        @maxLength({value:50})
        subject : string;
//#endregion subject Prop


//#region templateBody Prop
        @required()
        templateBody : string;
//#endregion templateBody Prop


//#region isActive Prop
        @required()
        isActive : boolean;
//#endregion isActive Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region mailTypeId Prop
        @prop()
        mailTypeId : number;
//#endregion mailTypeId Prop



}