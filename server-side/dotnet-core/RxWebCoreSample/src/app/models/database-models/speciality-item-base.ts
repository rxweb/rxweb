import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecialityItemBase {

//#region specialityItemId Prop
        @prop()
        specialityItemId : number;
//#endregion specialityItemId Prop


//#region specialtiyItemName Prop
        @maxLength({value:50})
        specialtiyItemName : string;
//#endregion specialtiyItemName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop

}