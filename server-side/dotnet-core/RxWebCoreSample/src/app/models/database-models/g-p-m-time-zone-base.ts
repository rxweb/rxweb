import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class GPMTimeZoneBase {

//#region timeZoneId Prop
        @prop()
        timeZoneId : number;
//#endregion timeZoneId Prop


//#region timeZoneName Prop
        @required()
        @maxLength({value:40})
        timeZoneName : string;
//#endregion timeZoneName Prop


//#region gMTOffSet Prop
        @required()
        gMTOffSet : number;
//#endregion gMTOffSet Prop


//#region shortName Prop
        @maxLength({value:10})
        shortName : string;
//#endregion shortName Prop


//#region enableDaylightSavingsTime Prop
        @prop()
        enableDaylightSavingsTime : number;
//#endregion enableDaylightSavingsTime Prop


//#region oraUser Prop
        @maxLength({value:100})
        oraUser : string;
//#endregion oraUser Prop


//#region modDate Prop
        @prop()
        modDate : Date;
//#endregion modDate Prop

}