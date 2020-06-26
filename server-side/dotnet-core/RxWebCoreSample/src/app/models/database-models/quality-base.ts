import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class QualityBase {

//#region qualityId Prop
        @prop()
        qualityId : any;
//#endregion qualityId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusId Prop
        @required()
        statusId : any;
//#endregion statusId Prop


//#region eN_QualityName Prop
        @maxLength({value:500})
        eN_QualityName : string;
//#endregion eN_QualityName Prop


//#region eN_DescriptionName Prop
        @maxLength({value:500})
        eN_DescriptionName : string;
//#endregion eN_DescriptionName Prop


//#region fR_QualityName Prop
        @required()
        @maxLength({value:500})
        fR_QualityName : string;
//#endregion fR_QualityName Prop


//#region fR_DescriptionName Prop
        @maxLength({value:500})
        fR_DescriptionName : string;
//#endregion fR_DescriptionName Prop













}