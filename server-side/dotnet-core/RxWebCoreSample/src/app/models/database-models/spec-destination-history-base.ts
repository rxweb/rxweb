import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecDestinationHistoryBase {

//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region specId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specId : number;
//#endregion specId Prop


//#region destinationTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        destinationTypeId : number;
//#endregion destinationTypeId Prop


//#region fobTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        fobTypeId : number;
//#endregion fobTypeId Prop


//#region method Prop
        @maxLength({value:4000})
        method : string;
//#endregion method Prop


//#region detail Prop
        @maxLength({value:4000})
        detail : string;
//#endregion detail Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region line1 Prop
        @maxLength({value:4000})
        line1 : string;
//#endregion line1 Prop


//#region line2 Prop
        @maxLength({value:4000})
        line2 : string;
//#endregion line2 Prop


//#region line3 Prop
        @maxLength({value:4000})
        line3 : string;
//#endregion line3 Prop


//#region stateId Prop
        @prop()
        stateId : number;
//#endregion stateId Prop


//#region postalCode Prop
        @maxLength({value:20})
        postalCode : string;
//#endregion postalCode Prop


//#region city Prop
        @maxLength({value:4000})
        city : string;
//#endregion city Prop


//#region defaultReceiveUserId Prop
        @prop()
        defaultReceiveUserId : number;
//#endregion defaultReceiveUserId Prop


//#region defaultApproveUserId Prop
        @prop()
        defaultApproveUserId : number;
//#endregion defaultApproveUserId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


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