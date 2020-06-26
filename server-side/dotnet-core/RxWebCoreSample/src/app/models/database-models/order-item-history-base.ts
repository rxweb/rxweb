import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class OrderItemHistoryBase {

//#region orderItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        orderItemId : number;
//#endregion orderItemId Prop


//#region quantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        quantity : number;
//#endregion quantity Prop


//#region dueDate Prop
        @prop()
        dueDate : Date;
//#endregion dueDate Prop


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