import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class HelpTextBase {

//#region formName Prop
        @maxLength({value:40})
        formName : string;
//#endregion formName Prop


//#region fieldName Prop
        @maxLength({value:40})
        fieldName : string;
//#endregion fieldName Prop


//#region keyword Prop
        @maxLength({value:100})
        keyword : string;
//#endregion keyword Prop


//#region eN_Help Prop
        @prop()
        eN_Help : string;
//#endregion eN_Help Prop


//#region fR_Help Prop
        @prop()
        fR_Help : string;
//#endregion fR_Help Prop


//#region translate Prop
        @maxLength({value:100})
        translate : string;
//#endregion translate Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}