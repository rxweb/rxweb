import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PrintOrderBase {

//#region pOId Prop
        @prop()
        pOId : number;
//#endregion pOId Prop


//#region invitationForBidId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region printOrderId Prop
        @prop()
        printOrderId : number;
//#endregion printOrderId Prop


//#region purchaseOrder Prop
        @maxLength({value:5})
        purchaseOrder : string;
//#endregion purchaseOrder Prop


//#region qualityId Prop
        @prop()
        qualityId : number;
//#endregion qualityId Prop


//#region quantity Prop
        @prop()
        quantity : number;
//#endregion quantity Prop


//#region issuedDate Prop
        @prop()
        issuedDate : Date;
//#endregion issuedDate Prop


//#region agencyName Prop
        @maxLength({value:12})
        agencyName : string;
//#endregion agencyName Prop


//#region agencyCity Prop
        @maxLength({value:20})
        agencyCity : string;
//#endregion agencyCity Prop


//#region agencyState Prop
        @maxLength({value:2})
        agencyState : string;
//#endregion agencyState Prop


//#region governmentPublishingOfficeContractorId Prop
        @prop()
        governmentPublishingOfficeContractorId : number;
//#endregion governmentPublishingOfficeContractorId Prop


//#region governmentPublishingOfficeStateId Prop
        @prop()
        governmentPublishingOfficeStateId : number;
//#endregion governmentPublishingOfficeStateId Prop


//#region price Prop
        @prop()
        price : any;
//#endregion price Prop


//#region invoicePrice Prop
        @prop()
        invoicePrice : any;
//#endregion invoicePrice Prop


//#region governmentPublishingOfficeProd Prop
        @maxLength({value:5})
        governmentPublishingOfficeProd : string;
//#endregion governmentPublishingOfficeProd Prop


//#region jacket Prop
        @maxLength({value:20})
        jacket : string;
//#endregion jacket Prop


//#region compositionId Prop
        @prop()
        compositionId : number;
//#endregion compositionId Prop


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


//#region textJcp Prop
        @maxLength({value:50})
        textJcp : string;
//#endregion textJcp Prop


//#region textInkId Prop
        @prop()
        textInkId : number;
//#endregion textInkId Prop


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


//#region coverJcp Prop
        @maxLength({value:50})
        coverJcp : string;
//#endregion coverJcp Prop


//#region coverInkId Prop
        @prop()
        coverInkId : number;
//#endregion coverInkId Prop


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


//#region foldins Prop
        @prop()
        foldins : boolean;
//#endregion foldins Prop


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


//#region mail Prop
        @prop()
        mail : any;
//#endregion mail Prop


//#region deliverZip Prop
        @maxLength({value:10})
        deliverZip : string;
//#endregion deliverZip Prop


//#region deliveryShip Prop
        @maxLength({value:10})
        deliveryShip : string;
//#endregion deliveryShip Prop


//#region deliverNumber Prop
        @prop()
        deliverNumber : number;
//#endregion deliverNumber Prop


//#region printSides Prop
        @maxLength({value:1})
        printSides : string;
//#endregion printSides Prop


//#region deliveryDate Prop
        @prop()
        deliveryDate : Date;
//#endregion deliveryDate Prop



























}