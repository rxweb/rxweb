import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SetupBase {

//#region setupId Prop
        @prop()
        setupId : any;
//#endregion setupId Prop


//#region eN_DescriptionName Prop
        @required()
        @maxLength({value:500})
        eN_DescriptionName : string;
//#endregion eN_DescriptionName Prop


//#region fR_DescriptionName Prop
        @required()
        @maxLength({value:500})
        fR_DescriptionName : string;
//#endregion fR_DescriptionName Prop





}