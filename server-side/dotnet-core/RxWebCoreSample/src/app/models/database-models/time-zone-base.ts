import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TimeZoneBase {

//#region timeZoneId Prop
        @prop()
        timeZoneId : any;
//#endregion timeZoneId Prop


//#region gmtOffSet Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        gmtOffSet : number;
//#endregion gmtOffSet Prop


//#region enableDaylightSavingsTime Prop
        @required()
        enableDaylightSavingsTime : any;
//#endregion enableDaylightSavingsTime Prop


//#region eN_TimeZone Prop
        @required()
        @maxLength({value:500})
        eN_TimeZone : string;
//#endregion eN_TimeZone Prop


//#region eN_ShortName Prop
        @required()
        @maxLength({value:500})
        eN_ShortName : string;
//#endregion eN_ShortName Prop


//#region fR_TimeZone Prop
        @required()
        @maxLength({value:500})
        fR_TimeZone : string;
//#endregion fR_TimeZone Prop


//#region fR_ShortName Prop
        @required()
        @maxLength({value:500})
        fR_ShortName : string;
//#endregion fR_ShortName Prop





}