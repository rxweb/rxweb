import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LabelAdhesiveBase {

//#region labelAdhesiveId Prop
        @prop()
        labelAdhesiveId : any;
//#endregion labelAdhesiveId Prop


//#region statusId Prop
        @required()
        statusId : any;
//#endregion statusId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_LabelAdhesiveName Prop
        @required()
        @maxLength({value:500})
        eN_LabelAdhesiveName : string;
//#endregion eN_LabelAdhesiveName Prop


//#region fR_LabelAdhesiveName Prop
        @required()
        @maxLength({value:500})
        fR_LabelAdhesiveName : string;
//#endregion fR_LabelAdhesiveName Prop



}