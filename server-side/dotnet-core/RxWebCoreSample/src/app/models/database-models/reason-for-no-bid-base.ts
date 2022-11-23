import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ReasonForNoBidBase {

//#region reasonForNoBidId Prop
        @prop()
        reasonForNoBidId : any;
//#endregion reasonForNoBidId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_ReasonForNoBidName Prop
        @required()
        @maxLength({value:500})
        eN_ReasonForNoBidName : string;
//#endregion eN_ReasonForNoBidName Prop


//#region fR_ReasonForNoBidName Prop
        @maxLength({value:500})
        fR_ReasonForNoBidName : string;
//#endregion fR_ReasonForNoBidName Prop



}