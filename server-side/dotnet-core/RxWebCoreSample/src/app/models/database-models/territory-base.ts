import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TerritoryBase {

//#region territoryId Prop
        @prop()
        territoryId : any;
//#endregion territoryId Prop


//#region territoryName Prop
        @required()
        @maxLength({value:500})
        territoryName : string;
//#endregion territoryName Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region description Prop
        @maxLength({value:1000})
        description : string;
//#endregion description Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region nLSNumericCharacters Prop
        @maxLength({value:2})
        nLSNumericCharacters : string;
//#endregion nLSNumericCharacters Prop





}