import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialHistoryBase {

//#region buyerFurnishedMaterialId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerFurnishedMaterialId : number;
//#endregion buyerFurnishedMaterialId Prop


//#region jobThreadId Prop
        @prop()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region description Prop
        @required()
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region buyerFurnishedMaterialTypeId Prop
        @required()
        buyerFurnishedMaterialTypeId : any;
//#endregion buyerFurnishedMaterialTypeId Prop


//#region buyerFurnishedMaterialDistributionTypeId Prop
        @required()
        buyerFurnishedMaterialDistributionTypeId : any;
//#endregion buyerFurnishedMaterialDistributionTypeId Prop


//#region buyerFurnishedMaterialReturnTypeId Prop
        @required()
        buyerFurnishedMaterialReturnTypeId : any;
//#endregion buyerFurnishedMaterialReturnTypeId Prop


//#region pickupSpecDestinationId Prop
        @prop()
        pickupSpecDestinationId : number;
//#endregion pickupSpecDestinationId Prop


//#region returnSpecDestinationId Prop
        @prop()
        returnSpecDestinationId : number;
//#endregion returnSpecDestinationId Prop


//#region buyerFurnishedMaterialPreparationTypeId Prop
        @prop()
        buyerFurnishedMaterialPreparationTypeId : any;
//#endregion buyerFurnishedMaterialPreparationTypeId Prop


//#region buyerFurnishedMaterialCompositionId Prop
        @prop()
        buyerFurnishedMaterialCompositionId : any;
//#endregion buyerFurnishedMaterialCompositionId Prop


//#region buyerFurnishedMaterialFormatId Prop
        @prop()
        buyerFurnishedMaterialFormatId : any;
//#endregion buyerFurnishedMaterialFormatId Prop


//#region trapPingCheck Prop
        @prop()
        trapPingCheck : any;
//#endregion trapPingCheck Prop


//#region shootCheck Prop
        @prop()
        shootCheck : any;
//#endregion shootCheck Prop


//#region vendorSetCheck Prop
        @prop()
        vendorSetCheck : any;
//#endregion vendorSetCheck Prop


//#region platformText Prop
        @maxLength({value:4000})
        platformText : string;
//#endregion platformText Prop


//#region transmissionText Prop
        @maxLength({value:4000})
        transmissionText : string;
//#endregion transmissionText Prop


//#region numberText Prop
        @maxLength({value:4000})
        numberText : string;
//#endregion numberText Prop


//#region softwareText Prop
        @maxLength({value:4000})
        softwareText : string;
//#endregion softwareText Prop


//#region manipulationText Prop
        @maxLength({value:4000})
        manipulationText : string;
//#endregion manipulationText Prop


//#region specialText Prop
        @maxLength({value:4000})
        specialText : string;
//#endregion specialText Prop


//#region buyerFurnishedMaterialAvailableRuleId Prop
        @prop()
        buyerFurnishedMaterialAvailableRuleId : any;
//#endregion buyerFurnishedMaterialAvailableRuleId Prop


//#region returnUpdatedFiles Prop
        @prop()
        returnUpdatedFiles : any;
//#endregion returnUpdatedFiles Prop


//#region filesSolicitationEstimate Prop
        @required()
        @maxLength({value:1})
        filesSolicitationEstimate : string;
//#endregion filesSolicitationEstimate Prop


//#region provideUserId Prop
        @prop()
        provideUserId : number;
//#endregion provideUserId Prop


//#region provideDate Prop
        @prop()
        provideDate : Date;
//#endregion provideDate Prop


//#region receiveUserId Prop
        @prop()
        receiveUserId : number;
//#endregion receiveUserId Prop


//#region receiveDate Prop
        @prop()
        receiveDate : Date;
//#endregion receiveDate Prop


//#region vendorAdjustable Prop
        @prop()
        vendorAdjustable : any;
//#endregion vendorAdjustable Prop


//#region requireConfimation Prop
        @prop()
        requireConfimation : any;
//#endregion requireConfimation Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}