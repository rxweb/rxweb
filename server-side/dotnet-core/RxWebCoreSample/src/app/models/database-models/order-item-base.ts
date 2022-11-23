import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class OrderItemBase {

//#region orderItemId Prop
        @prop()
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





}