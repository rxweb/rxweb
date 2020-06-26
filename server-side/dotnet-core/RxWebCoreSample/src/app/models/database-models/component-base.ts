import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ComponentBase {

//#region componentId Prop
        @prop()
        componentId : number;
//#endregion componentId Prop


//#region parentComponentId Prop
        @prop()
        parentComponentId : number;
//#endregion parentComponentId Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop


//#region hasQuality Prop
        @required()
        hasQuality : boolean;
//#endregion hasQuality Prop


//#region hasPages Prop
        @required()
        hasPages : boolean;
//#endregion hasPages Prop


//#region hasQuantity Prop
        @required()
        hasQuantity : boolean;
//#endregion hasQuantity Prop


//#region hasProductApp Prop
        @required()
        hasProductApp : boolean;
//#endregion hasProductApp Prop


//#region hasSize Prop
        @required()
        hasSize : boolean;
//#endregion hasSize Prop


//#region hasStock Prop
        @required()
        hasStock : boolean;
//#endregion hasStock Prop


//#region hasInk Prop
        @required()
        hasInk : boolean;
//#endregion hasInk Prop


//#region hasInkGeneral Prop
        @required()
        hasInkGeneral : boolean;
//#endregion hasInkGeneral Prop


//#region hasEnvelope Prop
        @required()
        hasEnvelope : boolean;
//#endregion hasEnvelope Prop


//#region hasForm Prop
        @required()
        hasForm : boolean;
//#endregion hasForm Prop


//#region hasLabel Prop
        @required()
        hasLabel : boolean;
//#endregion hasLabel Prop


//#region hasRoll Prop
        @required()
        hasRoll : boolean;
//#endregion hasRoll Prop


//#region hasVariableImage Prop
        @required()
        hasVariableImage : boolean;
//#endregion hasVariableImage Prop


//#region hasBinder Prop
        @required()
        hasBinder : boolean;
//#endregion hasBinder Prop


//#region hasPerforate Prop
        @required()
        hasPerforate : boolean;
//#endregion hasPerforate Prop


//#region hasScore Prop
        @required()
        hasScore : boolean;
//#endregion hasScore Prop


//#region hasFold Prop
        @required()
        hasFold : boolean;
//#endregion hasFold Prop


//#region hasDrill Prop
        @required()
        hasDrill : boolean;
//#endregion hasDrill Prop


//#region hasNumber Prop
        @required()
        hasNumber : boolean;
//#endregion hasNumber Prop


//#region hasDiecut Prop
        @required()
        hasDiecut : boolean;
//#endregion hasDiecut Prop


//#region hasTab Prop
        @required()
        hasTab : boolean;
//#endregion hasTab Prop


//#region hasCorner Prop
        @required()
        hasCorner : boolean;
//#endregion hasCorner Prop


//#region hasEmboss Prop
        @required()
        hasEmboss : boolean;
//#endregion hasEmboss Prop


//#region hasFoilstamp Prop
        @required()
        hasFoilstamp : boolean;
//#endregion hasFoilstamp Prop


//#region hasCoat Prop
        @required()
        hasCoat : boolean;
//#endregion hasCoat Prop


//#region hasFasten Prop
        @required()
        hasFasten : boolean;
//#endregion hasFasten Prop


//#region hasPad Prop
        @required()
        hasPad : boolean;
//#endregion hasPad Prop


//#region hasBind Prop
        @required()
        hasBind : boolean;
//#endregion hasBind Prop


//#region hasOther Prop
        @required()
        hasOther : boolean;
//#endregion hasOther Prop


//#region componentGroupId Prop
        @prop()
        componentGroupId : any;
//#endregion componentGroupId Prop


//#region hasStaticInk Prop
        @prop()
        hasStaticInk : boolean;
//#endregion hasStaticInk Prop


//#region hasVariableInk Prop
        @prop()
        hasVariableInk : boolean;
//#endregion hasVariableInk Prop


//#region childOnly Prop
        @required()
        @maxLength({value:1})
        childOnly : string;
//#endregion childOnly Prop


//#region eN_ComponentName Prop
        @required()
        @maxLength({value:500})
        eN_ComponentName : string;
//#endregion eN_ComponentName Prop


//#region fR_ComponentName Prop
        @required()
        @maxLength({value:500})
        fR_ComponentName : string;
//#endregion fR_ComponentName Prop





















}