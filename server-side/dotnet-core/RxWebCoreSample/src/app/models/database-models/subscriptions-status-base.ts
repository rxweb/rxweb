import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SubscriptionsStatusBase {

//#region subscriptionsStatusId Prop
        @prop()
        subscriptionsStatusId : any;
//#endregion subscriptionsStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_SubscriptionsStatusName Prop
        @required()
        @maxLength({value:500})
        eN_SubscriptionsStatusName : string;
//#endregion eN_SubscriptionsStatusName Prop


//#region fR_SubscriptionsStatusName Prop
        @required()
        @maxLength({value:500})
        fR_SubscriptionsStatusName : string;
//#endregion fR_SubscriptionsStatusName Prop



}