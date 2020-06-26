import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DemoVendorBase {

//#region vendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorId : number;
//#endregion vendorId Prop


//#region bidderId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidderId : number;
//#endregion bidderId Prop


//#region productionUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        productionUserId : number;
//#endregion productionUserId Prop


//#region accountUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        accountUserId : number;
//#endregion accountUserId Prop


//#region biddingSeed Prop
        @prop()
        biddingSeed : number;
//#endregion biddingSeed Prop

}