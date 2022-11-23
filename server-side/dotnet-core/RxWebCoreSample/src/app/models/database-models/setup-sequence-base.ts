import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SetupSequenceBase {

//#region setupId Prop
        @prop()
        setupId : any;
//#endregion setupId Prop


//#region sequenceId Prop
        @prop()
        sequenceId : any;
//#endregion sequenceId Prop


//#region setupSequenceId Prop
        @required()
        setupSequenceId : any;
//#endregion setupSequenceId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region urlAction Prop
        @required()
        @maxLength({value:200})
        urlAction : string;
//#endregion urlAction Prop


//#region urlSuffix Prop
        @maxLength({value:200})
        urlSuffix : string;
//#endregion urlSuffix Prop


//#region isOptional Prop
        @required()
        isOptional : any;
//#endregion isOptional Prop


//#region eN_DescriptionName Prop
        @maxLength({value:500})
        eN_DescriptionName : string;
//#endregion eN_DescriptionName Prop


//#region eN_GroupName Prop
        @maxLength({value:500})
        eN_GroupName : string;
//#endregion eN_GroupName Prop


//#region eN_DetailsName Prop
        @maxLength({value:500})
        eN_DetailsName : string;
//#endregion eN_DetailsName Prop


//#region fR_DescriptionName Prop
        @maxLength({value:500})
        fR_DescriptionName : string;
//#endregion fR_DescriptionName Prop


//#region fR_GroupName Prop
        @maxLength({value:500})
        fR_GroupName : string;
//#endregion fR_GroupName Prop


//#region fR_DetailsName Prop
        @maxLength({value:500})
        fR_DetailsName : string;
//#endregion fR_DetailsName Prop





}