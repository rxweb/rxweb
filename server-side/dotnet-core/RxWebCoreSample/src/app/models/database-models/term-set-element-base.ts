import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TermSetElementBase {

//#region termSetElementId Prop
        @prop()
        termSetElementId : number;
//#endregion termSetElementId Prop


//#region termSetId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        termSetId : number;
//#endregion termSetId Prop


//#region title Prop
        @maxLength({value:200})
        title : string;
//#endregion title Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop


//#region logicalFileId Prop
        @prop()
        logicalFileId : number;
//#endregion logicalFileId Prop


//#region elementText Prop
        @prop()
        elementText : string;
//#endregion elementText Prop



}