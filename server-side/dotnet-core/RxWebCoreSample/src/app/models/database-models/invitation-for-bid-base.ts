import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidBase {

//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region lastAmendmentNumber Prop
        @required()
        lastAmendmentNumber : any;
//#endregion lastAmendmentNumber Prop


//#region regionId Prop
        @prop()
        regionId : number;
//#endregion regionId Prop


//#region ifbTypeId Prop
        @prop()
        ifbTypeId : number;
//#endregion ifbTypeId Prop


//#region qualityId Prop
        @prop()
        qualityId : number;
//#endregion qualityId Prop


//#region quantity Prop
        @prop()
        quantity : any;
//#endregion quantity Prop


//#region invitationForBidFormat Prop
        @maxLength({value:20})
        invitationForBidFormat : string;
//#endregion invitationForBidFormat Prop


//#region invitationForBidInstance Prop
        @prop()
        invitationForBidInstance : number;
//#endregion invitationForBidInstance Prop


//#region title Prop
        @maxLength({value:100})
        title : string;
//#endregion title Prop


//#region materialAvailableDate Prop
        @prop()
        materialAvailableDate : Date;
//#endregion materialAvailableDate Prop


//#region termBeginDate Prop
        @prop()
        termBeginDate : Date;
//#endregion termBeginDate Prop


//#region termEndDate Prop
        @prop()
        termEndDate : Date;
//#endregion termEndDate Prop


//#region agencyName Prop
        @maxLength({value:100})
        agencyName : string;
//#endregion agencyName Prop


//#region agencyCity Prop
        @maxLength({value:100})
        agencyCity : string;
//#endregion agencyCity Prop


//#region agencyState Prop
        @maxLength({value:100})
        agencyState : string;
//#endregion agencyState Prop


//#region smallDisadvantagedBusiness Prop
        @required()
        smallDisadvantagedBusiness : boolean;
//#endregion smallDisadvantagedBusiness Prop


//#region deliveryShip Prop
        @maxLength({value:10})
        deliveryShip : string;
//#endregion deliveryShip Prop


//#region daysToProduce Prop
        @prop()
        daysToProduce : number;
//#endregion daysToProduce Prop


//#region fobId Prop
        @prop()
        fobId : number;
//#endregion fobId Prop


//#region mail Prop
        @maxLength({value:5})
        mail : string;
//#endregion mail Prop


//#region deliverZip Prop
        @maxLength({value:9})
        deliverZip : string;
//#endregion deliverZip Prop


//#region deliverNumber Prop
        @prop()
        deliverNumber : number;
//#endregion deliverNumber Prop


//#region bidPages Prop
        @prop()
        bidPages : number;
//#endregion bidPages Prop


//#region asProg Prop
        @prop()
        asProg : boolean;
//#endregion asProg Prop


//#region gpoCategoryId Prop
        @prop()
        gpoCategoryId : number;
//#endregion gpoCategoryId Prop


//#region gpoRegion Prop
        @prop()
        gpoRegion : number;
//#endregion gpoRegion Prop


//#region strapMaster Prop
        @prop()
        strapMaster : number;
//#endregion strapMaster Prop


//#region trim Prop
        @prop()
        trim : any;
//#endregion trim Prop


//#region detached Prop
        @prop()
        detached : any;
//#endregion detached Prop


//#region pageSparts Prop
        @prop()
        pageSparts : number;
//#endregion pageSparts Prop


//#region printSides Prop
        @maxLength({value:1})
        printSides : string;
//#endregion printSides Prop


//#region foldIns Prop
        @prop()
        foldIns : number;
//#endregion foldIns Prop


//#region drill Prop
        @prop()
        drill : boolean;
//#endregion drill Prop


//#region shrinkWrap Prop
        @prop()
        shrinkWrap : boolean;
//#endregion shrinkWrap Prop


//#region paperBand Prop
        @prop()
        paperBand : boolean;
//#endregion paperBand Prop


//#region pad Prop
        @prop()
        pad : boolean;
//#endregion pad Prop


//#region textWeight Prop
        @prop()
        textWeight : number;
//#endregion textWeight Prop


//#region textColorId Prop
        @prop()
        textColorId : number;
//#endregion textColorId Prop


//#region textSurfaceId Prop
        @prop()
        textSurfaceId : number;
//#endregion textSurfaceId Prop


//#region textTypeId Prop
        @prop()
        textTypeId : number;
//#endregion textTypeId Prop


//#region specialText Prop
        @prop()
        specialText : number;
//#endregion specialText Prop


//#region textJointCommitteeOnPrinting Prop
        @maxLength({value:10})
        textJointCommitteeOnPrinting : string;
//#endregion textJointCommitteeOnPrinting Prop


//#region coverWeight Prop
        @prop()
        coverWeight : number;
//#endregion coverWeight Prop


//#region coverColorId Prop
        @prop()
        coverColorId : number;
//#endregion coverColorId Prop


//#region coverSurfaceId Prop
        @prop()
        coverSurfaceId : number;
//#endregion coverSurfaceId Prop


//#region coverTypeId Prop
        @prop()
        coverTypeId : number;
//#endregion coverTypeId Prop


//#region specialCoverTypeId Prop
        @prop()
        specialCoverTypeId : number;
//#endregion specialCoverTypeId Prop


//#region coverJointCommitteeOnPrinting Prop
        @maxLength({value:10})
        coverJointCommitteeOnPrinting : string;
//#endregion coverJointCommitteeOnPrinting Prop


//#region textInkId Prop
        @prop()
        textInkId : number;
//#endregion textInkId Prop


//#region coverInkId Prop
        @prop()
        coverInkId : number;
//#endregion coverInkId Prop


//#region pSI Prop
        @required()
        pSI : boolean;
//#endregion pSI Prop


//#region composition Prop
        @prop()
        composition : any;
//#endregion composition Prop


//#region compositionId Prop
        @prop()
        compositionId : any;
//#endregion compositionId Prop


//#region canceled Prop
        @required()
        canceled : any;
//#endregion canceled Prop


//#region daysToBid Prop
        @prop()
        daysToBid : number;
//#endregion daysToBid Prop


//#region shipDate Prop
        @prop()
        shipDate : Date;
//#endregion shipDate Prop


//#region openDate Prop
        @prop()
        openDate : Date;
//#endregion openDate Prop


//#region description Prop
        @maxLength({value:70})
        description : string;
//#endregion description Prop



































}