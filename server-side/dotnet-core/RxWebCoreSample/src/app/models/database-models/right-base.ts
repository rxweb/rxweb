import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RightBase {

//#region rightId Prop
        @prop()
        rightId : number;
//#endregion rightId Prop


//#region serviceId Prop
        @required()
        serviceId : any;
//#endregion serviceId Prop


//#region rightGroupId Prop
        @prop()
        rightGroupId : any;
//#endregion rightGroupId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region rightUrl Prop
        @maxLength({value:100})
        rightUrl : string;
//#endregion rightUrl Prop


//#region reqForService Prop
        @prop()
        reqForService : boolean;
//#endregion reqForService Prop


//#region description Prop
        @maxLength({value:2000})
        description : string;
//#endregion description Prop


//#region hasOption Prop
        @prop()
        hasOption : boolean;
//#endregion hasOption Prop


//#region optionType Prop
        @maxLength({value:1})
        optionType : string;
//#endregion optionType Prop


//#region optionDefault Prop
        @prop()
        optionDefault : number;
//#endregion optionDefault Prop


//#region manifestConstant Prop
        @maxLength({value:40})
        manifestConstant : string;
//#endregion manifestConstant Prop


//#region rightTypeId Prop
        @prop()
        rightTypeId : any;
//#endregion rightTypeId Prop


//#region enablePersona Prop
        @prop()
        enablePersona : boolean;
//#endregion enablePersona Prop


//#region eN_RightName Prop
        @required()
        @maxLength({value:500})
        eN_RightName : string;
//#endregion eN_RightName Prop


//#region eN_ConfirmMessageName Prop
        @maxLength({value:500})
        eN_ConfirmMessageName : string;
//#endregion eN_ConfirmMessageName Prop


//#region eN_OptionDescription Prop
        @maxLength({value:500})
        eN_OptionDescription : string;
//#endregion eN_OptionDescription Prop


//#region eN_VerbName Prop
        @maxLength({value:500})
        eN_VerbName : string;
//#endregion eN_VerbName Prop


//#region fR_RightName Prop
        @maxLength({value:500})
        fR_RightName : string;
//#endregion fR_RightName Prop


//#region fR_ConfirmMessageName Prop
        @maxLength({value:500})
        fR_ConfirmMessageName : string;
//#endregion fR_ConfirmMessageName Prop


//#region fR_OptionDescription Prop
        @maxLength({value:500})
        fR_OptionDescription : string;
//#endregion fR_OptionDescription Prop


//#region fR_VerbName Prop
        @maxLength({value:500})
        fR_VerbName : string;
//#endregion fR_VerbName Prop





























}