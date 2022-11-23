import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ShippingFileAttachmentBase {

//#region shippingFileId Prop
        @prop()
        shippingFileId : number;
//#endregion shippingFileId Prop


//#region jobFileId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobFileId : number;
//#endregion jobFileId Prop


//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop

}