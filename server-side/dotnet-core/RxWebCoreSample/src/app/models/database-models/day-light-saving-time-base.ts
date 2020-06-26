import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DayLightSavingTimeBase {

//#region startDate Prop
        @required()
        startDate : Date;
//#endregion startDate Prop


//#region endDate Prop
        @required()
        endDate : Date;
//#endregion endDate Prop


//#region daylightSavingsTimeState Prop
        @maxLength({value:20})
        daylightSavingsTimeState : string;
//#endregion daylightSavingsTimeState Prop


//#region oraUser Prop
        @maxLength({value:100})
        oraUser : string;
//#endregion oraUser Prop


//#region modDate Prop
        @prop()
        modDate : Date;
//#endregion modDate Prop

}