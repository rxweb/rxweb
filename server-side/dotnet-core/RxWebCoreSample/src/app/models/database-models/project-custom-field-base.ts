import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProjectCustomFieldBase {

//#region projectCustomFieldId Prop
        @prop()
        projectCustomFieldId : number;
//#endregion projectCustomFieldId Prop


//#region dataItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        dataItemId : number;
//#endregion dataItemId Prop


//#region projectId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        projectId : number;
//#endregion projectId Prop


//#region projectCustomFieldValue Prop
        @maxLength({value:4000})
        projectCustomFieldValue : string;
//#endregion projectCustomFieldValue Prop





}