import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RecentPageHistoryAmBase {

//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region vk Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vk : number;
//#endregion vk Prop


//#region submitTime Prop
        @required()
        submitTime : Date;
//#endregion submitTime Prop

}