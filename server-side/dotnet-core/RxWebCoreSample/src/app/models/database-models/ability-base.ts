import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AbilityBase {

//#region abilityId Prop
        @prop()
        abilityId : number;
//#endregion abilityId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region eN_AbilityName Prop
        @required()
        @maxLength({value:500})
        eN_AbilityName : string;
//#endregion eN_AbilityName Prop


//#region eN_OptionDescription Prop
        @maxLength({value:500})
        eN_OptionDescription : string;
//#endregion eN_OptionDescription Prop


//#region eN_AbilityNoun Prop
        @maxLength({value:500})
        eN_AbilityNoun : string;
//#endregion eN_AbilityNoun Prop


//#region eN_AbilityVerb Prop
        @maxLength({value:500})
        eN_AbilityVerb : string;
//#endregion eN_AbilityVerb Prop


//#region fR_AbilityName Prop
        @maxLength({value:500})
        fR_AbilityName : string;
//#endregion fR_AbilityName Prop


//#region fR_OptionDescription Prop
        @maxLength({value:500})
        fR_OptionDescription : string;
//#endregion fR_OptionDescription Prop


//#region fR_AbilityNoun Prop
        @maxLength({value:500})
        fR_AbilityNoun : string;
//#endregion fR_AbilityNoun Prop


//#region fR_AbilityVerb Prop
        @maxLength({value:500})
        fR_AbilityVerb : string;
//#endregion fR_AbilityVerb Prop







}