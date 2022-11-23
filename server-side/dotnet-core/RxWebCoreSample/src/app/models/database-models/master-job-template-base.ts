import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MasterJobTemplateBase {

//#region jobTemplateId Prop
        @prop()
        jobTemplateId : number;
//#endregion jobTemplateId Prop


//#region jobTemplateName Prop
        @required()
        @maxLength({value:100})
        jobTemplateName : string;
//#endregion jobTemplateName Prop

}