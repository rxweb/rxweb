import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RegionBase {

//#region regionId Prop
        @prop()
        regionId : number;
//#endregion regionId Prop


//#region regionName Prop
        @maxLength({value:100})
        regionName : string;
//#endregion regionName Prop


//#region regionShortName Prop
        @maxLength({value:10})
        regionShortName : string;
//#endregion regionShortName Prop


//#region timedDiff Prop
        @prop()
        timedDiff : number;
//#endregion timedDiff Prop


//#region gMTOffSet Prop
        @required()
        gMTOffSet : any;
//#endregion gMTOffSet Prop


//#region productId Prop
        @prop()
        productId : any;
//#endregion productId Prop







}