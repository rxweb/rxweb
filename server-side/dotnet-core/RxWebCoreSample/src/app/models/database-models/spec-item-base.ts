import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecItemBase {

//#region specItemId Prop
        @prop()
        specItemId : number;
//#endregion specItemId Prop


//#region specificationDetailId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specificationDetailId : number;
//#endregion specificationDetailId Prop


//#region parentSpecItemId Prop
        @prop()
        parentSpecItemId : number;
//#endregion parentSpecItemId Prop


//#region componentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        componentId : number;
//#endregion componentId Prop


//#region name Prop
        @maxLength({value:4000})
        name : string;
//#endregion name Prop


//#region identifier Prop
        @maxLength({value:4000})
        identifier : string;
//#endregion identifier Prop


//#region prepress Prop
        @maxLength({value:4000})
        prepress : string;
//#endregion prepress Prop


//#region proofs Prop
        @maxLength({value:4000})
        proofs : string;
//#endregion proofs Prop


//#region proofsets Prop
        @prop()
        proofsets : number;
//#endregion proofsets Prop


//#region pages Prop
        @prop()
        pages : number;
//#endregion pages Prop


//#region qualityId Prop
        @prop()
        qualityId : any;
//#endregion qualityId Prop


//#region quantityFilm Prop
        @prop()
        quantityFilm : number;
//#endregion quantityFilm Prop


//#region quantitySamples Prop
        @prop()
        quantitySamples : number;
//#endregion quantitySamples Prop


//#region sizeWidthFinish Prop
        @prop()
        sizeWidthFinish : number;
//#endregion sizeWidthFinish Prop


//#region sizeLengthFinish Prop
        @prop()
        sizeLengthFinish : number;
//#endregion sizeLengthFinish Prop


//#region sizeWidthFlat Prop
        @prop()
        sizeWidthFlat : number;
//#endregion sizeWidthFlat Prop


//#region sizeLengthFlat Prop
        @prop()
        sizeLengthFlat : number;
//#endregion sizeLengthFlat Prop


//#region ink Prop
        @maxLength({value:4000})
        ink : string;
//#endregion ink Prop


//#region inkLayoutId Prop
        @prop()
        inkLayoutId : any;
//#endregion inkLayoutId Prop


//#region inkInstructions Prop
        @maxLength({value:4000})
        inkInstructions : string;
//#endregion inkInstructions Prop


//#region inkProcessIn1Pass Prop
        @prop()
        inkProcessIn1Pass : any;
//#endregion inkProcessIn1Pass Prop


//#region inkOil Prop
        @prop()
        inkOil : any;
//#endregion inkOil Prop


//#region inkRegistration Prop
        @prop()
        inkRegistration : any;
//#endregion inkRegistration Prop


//#region inkMatch Prop
        @prop()
        inkMatch : any;
//#endregion inkMatch Prop


//#region inkLaser Prop
        @prop()
        inkLaser : any;
//#endregion inkLaser Prop


//#region stockManufacturer Prop
        @maxLength({value:4000})
        stockManufacturer : string;
//#endregion stockManufacturer Prop


//#region stockGrade Prop
        @maxLength({value:4000})
        stockGrade : string;
//#endregion stockGrade Prop


//#region stockColor Prop
        @maxLength({value:4000})
        stockColor : string;
//#endregion stockColor Prop


//#region stockBasisWeight Prop
        @prop()
        stockBasisWeight : number;
//#endregion stockBasisWeight Prop


//#region stockBasisWidth Prop
        @prop()
        stockBasisWidth : number;
//#endregion stockBasisWidth Prop


//#region stockBasisLength Prop
        @prop()
        stockBasisLength : number;
//#endregion stockBasisLength Prop


//#region stockInstructions Prop
        @maxLength({value:4000})
        stockInstructions : string;
//#endregion stockInstructions Prop


//#region stockType Prop
        @maxLength({value:4000})
        stockType : string;
//#endregion stockType Prop


//#region stockFinish Prop
        @maxLength({value:4000})
        stockFinish : string;
//#endregion stockFinish Prop


//#region stockWaste Prop
        @prop()
        stockWaste : number;
//#endregion stockWaste Prop


//#region stockSubstitutes Prop
        @prop()
        stockSubstitutes : any;
//#endregion stockSubstitutes Prop


//#region stockRecycledPaper Prop
        @prop()
        stockRecycledPaper : any;
//#endregion stockRecycledPaper Prop


//#region envelopeStyle Prop
        @maxLength({value:4000})
        envelopeStyle : string;
//#endregion envelopeStyle Prop


//#region envelopeWindows Prop
        @maxLength({value:4000})
        envelopeWindows : string;
//#endregion envelopeWindows Prop


//#region envelopeMarks Prop
        @maxLength({value:4000})
        envelopeMarks : string;
//#endregion envelopeMarks Prop


//#region envelopeOther Prop
        @maxLength({value:4000})
        envelopeOther : string;
//#endregion envelopeOther Prop


//#region labelAdhesiveId Prop
        @prop()
        labelAdhesiveId : any;
//#endregion labelAdhesiveId Prop


//#region labelAdhesiveFormula Prop
        @maxLength({value:4000})
        labelAdhesiveFormula : string;
//#endregion labelAdhesiveFormula Prop


//#region labelPerSheet Prop
        @prop()
        labelPerSheet : number;
//#endregion labelPerSheet Prop


//#region labelStyleId Prop
        @prop()
        labelStyleId : any;
//#endregion labelStyleId Prop


//#region labelLinerWidth Prop
        @prop()
        labelLinerWidth : number;
//#endregion labelLinerWidth Prop


//#region labelLinerLength Prop
        @prop()
        labelLinerLength : number;
//#endregion labelLinerLength Prop


//#region labelVerticalSpacing Prop
        @prop()
        labelVerticalSpacing : number;
//#endregion labelVerticalSpacing Prop


//#region labelHorizontalSpacing Prop
        @prop()
        labelHorizontalSpacing : number;
//#endregion labelHorizontalSpacing Prop


//#region labelShape Prop
        @maxLength({value:4000})
        labelShape : string;
//#endregion labelShape Prop


//#region marginalWords Prop
        @maxLength({value:4000})
        marginalWords : string;
//#endregion marginalWords Prop


//#region marginalWordColor Prop
        @maxLength({value:4000})
        marginalWordColor : string;
//#endregion marginalWordColor Prop


//#region carbon Prop
        @maxLength({value:4000})
        carbon : string;
//#endregion carbon Prop


//#region carbonColor Prop
        @maxLength({value:4000})
        carbonColor : string;
//#endregion carbonColor Prop


//#region rollCoreDiameter Prop
        @prop()
        rollCoreDiameter : number;
//#endregion rollCoreDiameter Prop


//#region rollOutsideDiameter Prop
        @prop()
        rollOutsideDiameter : number;
//#endregion rollOutsideDiameter Prop


//#region rollOrientationId Prop
        @prop()
        rollOrientationId : any;
//#endregion rollOrientationId Prop


//#region rollWarningStripe Prop
        @prop()
        rollWarningStripe : any;
//#endregion rollWarningStripe Prop


//#region variableImage Prop
        @maxLength({value:4000})
        variableImage : string;
//#endregion variableImage Prop


//#region perforate Prop
        @maxLength({value:4000})
        perforate : string;
//#endregion perforate Prop


//#region score Prop
        @maxLength({value:4000})
        score : string;
//#endregion score Prop


//#region fold Prop
        @maxLength({value:4000})
        fold : string;
//#endregion fold Prop


//#region drill Prop
        @maxLength({value:4000})
        drill : string;
//#endregion drill Prop


//#region numbering Prop
        @maxLength({value:4000})
        numbering : string;
//#endregion numbering Prop


//#region diecut Prop
        @maxLength({value:4000})
        diecut : string;
//#endregion diecut Prop


//#region productApp Prop
        @maxLength({value:4000})
        productApp : string;
//#endregion productApp Prop


//#region tab Prop
        @maxLength({value:4000})
        tab : string;
//#endregion tab Prop


//#region corner Prop
        @maxLength({value:4000})
        corner : string;
//#endregion corner Prop


//#region emboss Prop
        @maxLength({value:4000})
        emboss : string;
//#endregion emboss Prop


//#region foilStamp Prop
        @maxLength({value:4000})
        foilStamp : string;
//#endregion foilStamp Prop


//#region coat Prop
        @maxLength({value:4000})
        coat : string;
//#endregion coat Prop


//#region fasten Prop
        @maxLength({value:4000})
        fasten : string;
//#endregion fasten Prop


//#region pad Prop
        @maxLength({value:4000})
        pad : string;
//#endregion pad Prop


//#region bind Prop
        @maxLength({value:4000})
        bind : string;
//#endregion bind Prop


//#region other Prop
        @maxLength({value:4000})
        other : string;
//#endregion other Prop


//#region stockCaliper Prop
        @maxLength({value:4000})
        stockCaliper : string;
//#endregion stockCaliper Prop


//#region staticInkTypeId Prop
        @prop()
        staticInkTypeId : any;
//#endregion staticInkTypeId Prop


//#region variableInkTypeId Prop
        @prop()
        variableInkTypeId : any;
//#endregion variableInkTypeId Prop


//#region componentList Prop
        @maxLength({value:4000})
        componentList : string;
//#endregion componentList Prop


//#region insertionInstructions Prop
        @maxLength({value:4000})
        insertionInstructions : string;
//#endregion insertionInstructions Prop


//#region specialInstructions Prop
        @maxLength({value:4000})
        specialInstructions : string;
//#endregion specialInstructions Prop


//#region affixingInstructions Prop
        @maxLength({value:4000})
        affixingInstructions : string;
//#endregion affixingInstructions Prop


//#region matchComponents Prop
        @prop()
        matchComponents : any;
//#endregion matchComponents Prop


//#region recordCount Prop
        @maxLength({value:4000})
        recordCount : string;
//#endregion recordCount Prop


//#region mailTypeId Prop
        @maxLength({value:40})
        mailTypeId : string;
//#endregion mailTypeId Prop


//#region mailFileName Prop
        @maxLength({value:4000})
        mailFileName : string;
//#endregion mailFileName Prop


//#region seedListName Prop
        @maxLength({value:4000})
        seedListName : string;
//#endregion seedListName Prop


//#region stateForeignSuppressions Prop
        @prop()
        stateForeignSuppressions : any;
//#endregion stateForeignSuppressions Prop


//#region suppressionFile Prop
        @maxLength({value:4000})
        suppressionFile : string;
//#endregion suppressionFile Prop


//#region fileTransmissionMethod Prop
        @maxLength({value:4000})
        fileTransmissionMethod : string;
//#endregion fileTransmissionMethod Prop


//#region totalFilesSubmitted Prop
        @maxLength({value:4000})
        totalFilesSubmitted : string;
//#endregion totalFilesSubmitted Prop


//#region dataLayout Prop
        @maxLength({value:4000})
        dataLayout : string;
//#endregion dataLayout Prop


//#region caseConversion Prop
        @prop()
        caseConversion : any;
//#endregion caseConversion Prop


//#region additionMailServices Prop
        @prop()
        additionMailServices : any;
//#endregion additionMailServices Prop


//#region mailForeign Prop
        @prop()
        mailForeign : any;
//#endregion mailForeign Prop


//#region mailInvalid Prop
        @prop()
        mailInvalid : any;
//#endregion mailInvalid Prop


//#region dedupe Prop
        @prop()
        dedupe : any;
//#endregion dedupe Prop


//#region cassDpvNcoa Prop
        @prop()
        cassDpvNcoa : any;
//#endregion cassDpvNcoa Prop


//#region household Prop
        @prop()
        household : any;
//#endregion household Prop


//#region simplexDuplexId Prop
        @prop()
        simplexDuplexId : number;
//#endregion simplexDuplexId Prop


//#region generalInstructions Prop
        @maxLength({value:4000})
        generalInstructions : string;
//#endregion generalInstructions Prop


//#region preprintedStockProvided Prop
        @prop()
        preprintedStockProvided : any;
//#endregion preprintedStockProvided Prop


//#region preprintedStockDetails Prop
        @maxLength({value:4000})
        preprintedStockDetails : string;
//#endregion preprintedStockDetails Prop


//#region stockRequirements Prop
        @maxLength({value:4000})
        stockRequirements : string;
//#endregion stockRequirements Prop


//#region salutation Prop
        @maxLength({value:4000})
        salutation : string;
//#endregion salutation Prop


//#region address Prop
        @maxLength({value:4000})
        address : string;
//#endregion address Prop


//#region iMBBarcode Prop
        @prop()
        iMBBarcode : any;
//#endregion iMBBarcode Prop


//#region tipped Prop
        @prop()
        tipped : any;
//#endregion tipped Prop


//#region colorInkForTipping Prop
        @maxLength({value:4000})
        colorInkForTipping : string;
//#endregion colorInkForTipping Prop


//#region rowId Prop
        @required()
        rowId : any;
//#endregion rowId Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop

























}