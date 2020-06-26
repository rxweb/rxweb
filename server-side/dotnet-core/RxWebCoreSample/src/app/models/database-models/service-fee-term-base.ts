import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeTermBase {

//#region serviceFeeTermId Prop
        @prop()
        serviceFeeTermId : number;
//#endregion serviceFeeTermId Prop


//#region serviceContractId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        serviceContractId : number;
//#endregion serviceContractId Prop


//#region serviceFeeTermTypeId Prop
        @required()
        serviceFeeTermTypeId : any;
//#endregion serviceFeeTermTypeId Prop


//#region assignedMemberId Prop
        @prop()
        assignedMemberId : number;
//#endregion assignedMemberId Prop


//#region customIdentifier Prop
        @maxLength({value:4000})
        customIdentifier : string;
//#endregion customIdentifier Prop


//#region thresholdCalcBeginDate Prop
        @prop()
        thresholdCalcBeginDate : Date;
//#endregion thresholdCalcBeginDate Prop


//#region thresholdCalcRepeatMonths Prop
        @prop()
        thresholdCalcRepeatMonths : number;
//#endregion thresholdCalcRepeatMonths Prop


//#region isLowBidNotAcceptedUseGreater Prop
        @required()
        isLowBidNotAcceptedUseGreater : boolean;
//#endregion isLowBidNotAcceptedUseGreater Prop









}