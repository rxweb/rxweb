import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerVendorSetupStatusBase {

//#region buyerVendorSetupStatusId Prop
        @prop()
        buyerVendorSetupStatusId : any;
//#endregion buyerVendorSetupStatusId Prop


//#region buyerVendorStatusId Prop
        @prop()
        buyerVendorStatusId : any;
//#endregion buyerVendorStatusId Prop


//#region nextSetupStatusId Prop
        @prop()
        nextSetupStatusId : any;
//#endregion nextSetupStatusId Prop


//#region previousSetupStatusId Prop
        @prop()
        previousSetupStatusId : any;
//#endregion previousSetupStatusId Prop


//#region durationInDays Prop
        @prop()
        durationInDays : number;
//#endregion durationInDays Prop


//#region instructions Prop
        @maxLength({value:4000})
        instructions : string;
//#endregion instructions Prop


//#region buyerVendorSetupProcessId Prop
        @prop()
        buyerVendorSetupProcessId : any;
//#endregion buyerVendorSetupProcessId Prop













}