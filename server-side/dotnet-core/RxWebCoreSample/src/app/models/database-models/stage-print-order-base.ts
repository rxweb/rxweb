import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StagePrintOrderBase {

//#region fileName Prop
        @maxLength({value:32})
        fileName : string;
//#endregion fileName Prop


//#region fileDate Prop
        @prop()
        fileDate : Date;
//#endregion fileDate Prop


//#region lineNumber Prop
        @prop()
        lineNumber : number;
//#endregion lineNumber Prop


//#region program Prop
        @required()
        @maxLength({value:4})
        program : string;
//#endregion program Prop


//#region instanceRef Prop
        @required()
        @maxLength({value:4})
        instanceRef : string;
//#endregion instanceRef Prop


//#region printOrder Prop
        @required()
        @maxLength({value:5})
        printOrder : string;
//#endregion printOrder Prop


//#region purchaseOrder Prop
        @maxLength({value:5})
        purchaseOrder : string;
//#endregion purchaseOrder Prop


//#region issueDate Prop
        @maxLength({value:20})
        issueDate : string;
//#endregion issueDate Prop


//#region quantity Prop
        @maxLength({value:12})
        quantity : string;
//#endregion quantity Prop


//#region agency Prop
        @maxLength({value:12})
        agency : string;
//#endregion agency Prop


//#region vendorId Prop
        @required()
        @maxLength({value:10})
        vendorId : string;
//#endregion vendorId Prop


//#region vendorName Prop
        @maxLength({value:40})
        vendorName : string;
//#endregion vendorName Prop


//#region delivership Prop
        @maxLength({value:20})
        delivership : string;
//#endregion delivership Prop


//#region price Prop
        @maxLength({value:10})
        price : string;
//#endregion price Prop


//#region quality Prop
        @maxLength({value:10})
        quality : string;
//#endregion quality Prop


//#region jacket Prop
        @maxLength({value:10})
        jacket : string;
//#endregion jacket Prop


//#region foldins Prop
        @maxLength({value:10})
        foldins : string;
//#endregion foldins Prop


//#region pagesParts Prop
        @maxLength({value:10})
        pagesParts : string;
//#endregion pagesParts Prop


//#region printSides Prop
        @maxLength({value:10})
        printSides : string;
//#endregion printSides Prop


//#region trim Prop
        @maxLength({value:10})
        trim : string;
//#endregion trim Prop


//#region detached Prop
        @maxLength({value:10})
        detached : string;
//#endregion detached Prop


//#region composition Prop
        @maxLength({value:10})
        composition : string;
//#endregion composition Prop


//#region materialsQty1 Prop
        @maxLength({value:10})
        materialsQty1 : string;
//#endregion materialsQty1 Prop


//#region materials1 Prop
        @maxLength({value:10})
        materials1 : string;
//#endregion materials1 Prop


//#region materialsQty2 Prop
        @maxLength({value:10})
        materialsQty2 : string;
//#endregion materialsQty2 Prop


//#region materials2 Prop
        @maxLength({value:10})
        materials2 : string;
//#endregion materials2 Prop


//#region materialsQty3 Prop
        @maxLength({value:10})
        materialsQty3 : string;
//#endregion materialsQty3 Prop


//#region materials3 Prop
        @maxLength({value:10})
        materials3 : string;
//#endregion materials3 Prop


//#region materialsQty4 Prop
        @maxLength({value:10})
        materialsQty4 : string;
//#endregion materialsQty4 Prop


//#region materials4 Prop
        @maxLength({value:10})
        materials4 : string;
//#endregion materials4 Prop


//#region proofs1 Prop
        @maxLength({value:10})
        proofs1 : string;
//#endregion proofs1 Prop


//#region proofs2 Prop
        @maxLength({value:10})
        proofs2 : string;
//#endregion proofs2 Prop


//#region proofs3 Prop
        @maxLength({value:10})
        proofs3 : string;
//#endregion proofs3 Prop


//#region textWeight Prop
        @maxLength({value:10})
        textWeight : string;
//#endregion textWeight Prop


//#region textColor Prop
        @maxLength({value:10})
        textColor : string;
//#endregion textColor Prop


//#region textType Prop
        @maxLength({value:10})
        textType : string;
//#endregion textType Prop


//#region textSurface Prop
        @maxLength({value:10})
        textSurface : string;
//#endregion textSurface Prop


//#region specialText Prop
        @maxLength({value:10})
        specialText : string;
//#endregion specialText Prop


//#region textJcp Prop
        @maxLength({value:10})
        textJcp : string;
//#endregion textJcp Prop


//#region coverWeight Prop
        @maxLength({value:10})
        coverWeight : string;
//#endregion coverWeight Prop


//#region coverColor Prop
        @maxLength({value:10})
        coverColor : string;
//#endregion coverColor Prop


//#region coverType Prop
        @maxLength({value:10})
        coverType : string;
//#endregion coverType Prop


//#region coverSurface Prop
        @maxLength({value:10})
        coverSurface : string;
//#endregion coverSurface Prop


//#region specialCover Prop
        @maxLength({value:10})
        specialCover : string;
//#endregion specialCover Prop


//#region coverJcp Prop
        @maxLength({value:10})
        coverJcp : string;
//#endregion coverJcp Prop


//#region textInk Prop
        @maxLength({value:10})
        textInk : string;
//#endregion textInk Prop


//#region coverInk Prop
        @maxLength({value:10})
        coverInk : string;
//#endregion coverInk Prop


//#region bindery1 Prop
        @maxLength({value:10})
        bindery1 : string;
//#endregion bindery1 Prop


//#region subBindery1 Prop
        @maxLength({value:10})
        subBindery1 : string;
//#endregion subBindery1 Prop


//#region bindery2 Prop
        @maxLength({value:10})
        bindery2 : string;
//#endregion bindery2 Prop


//#region subBindery2 Prop
        @maxLength({value:10})
        subBindery2 : string;
//#endregion subBindery2 Prop


//#region drill Prop
        @maxLength({value:10})
        drill : string;
//#endregion drill Prop


//#region pad Prop
        @maxLength({value:10})
        pad : string;
//#endregion pad Prop


//#region paperband Prop
        @maxLength({value:10})
        paperband : string;
//#endregion paperband Prop


//#region shrinkWrap Prop
        @maxLength({value:10})
        shrinkWrap : string;
//#endregion shrinkWrap Prop


//#region deliverNbr Prop
        @maxLength({value:10})
        deliverNbr : string;
//#endregion deliverNbr Prop


//#region deliverorship Prop
        @maxLength({value:10})
        deliverorship : string;
//#endregion deliverorship Prop


//#region deliverZip Prop
        @maxLength({value:10})
        deliverZip : string;
//#endregion deliverZip Prop


//#region mail Prop
        @maxLength({value:10})
        mail : string;
//#endregion mail Prop


//#region invoicePrc Prop
        @maxLength({value:10})
        invoicePrc : string;
//#endregion invoicePrc Prop


//#region poId Prop
        @prop()
        poId : number;
//#endregion poId Prop


//#region auditDate Prop
        @prop()
        auditDate : Date;
//#endregion auditDate Prop


//#region recordType Prop
        @maxLength({value:5})
        recordType : string;
//#endregion recordType Prop

}