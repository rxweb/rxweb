import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CompositionBase {

//#region compositionId Prop
        @prop()
        compositionId : any;
//#endregion compositionId Prop


//#region compositionName Prop
        @maxLength({value:50})
        compositionName : string;
//#endregion compositionName Prop


//#region legacyId Prop
        @maxLength({value:3})
        legacyId : string;
//#endregion legacyId Prop

}