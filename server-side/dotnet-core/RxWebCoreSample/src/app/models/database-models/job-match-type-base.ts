import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobMatchTypeBase {

//#region jobMatchTypeId Prop
        @prop()
        jobMatchTypeId : any;
//#endregion jobMatchTypeId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_JobMatchTypeName Prop
        @required()
        @maxLength({value:500})
        eN_JobMatchTypeName : string;
//#endregion eN_JobMatchTypeName Prop


//#region fR_JobMatchTypeName Prop
        @maxLength({value:500})
        fR_JobMatchTypeName : string;
//#endregion fR_JobMatchTypeName Prop

}