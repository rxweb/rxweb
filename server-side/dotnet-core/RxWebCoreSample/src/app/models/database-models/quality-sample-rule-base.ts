import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class QualitySampleRuleBase {

//#region qualitySampleRuleId Prop
        @prop()
        qualitySampleRuleId : number;
//#endregion qualitySampleRuleId Prop


//#region description Prop
        @required()
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region timeOffsetUnitQuantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        timeOffsetUnitQuantity : number;
//#endregion timeOffsetUnitQuantity Prop


//#region timeOffsetUnitId Prop
        @required()
        timeOffsetUnitId : any;
//#endregion timeOffsetUnitId Prop


//#region timeOffsetRuleId Prop
        @required()
        timeOffsetRuleId : any;
//#endregion timeOffsetRuleId Prop


//#region specUnitId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specUnitId : number;
//#endregion specUnitId Prop


//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region creatdDateTime Prop
        @required()
        creatdDateTime : Date;
//#endregion creatdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatdDateTime Prop
        @required()
        updatdDateTime : Date;
//#endregion updatdDateTime Prop











}