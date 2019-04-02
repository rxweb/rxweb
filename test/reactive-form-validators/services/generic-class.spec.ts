import { FormArray } from "@angular/forms"
import { RxFormControl, required, propArray, RxFormBuilder} from '@rxweb/reactive-form-validators';


export class SaleOrderLineItem {
    @required() unitPrice: number;
}

export class PurchaseOrderLineItem {
    @required() unitCost: number;
}

export abstract class Order<T>  {
    @required() name: string;
    @propArray() lineItems: T[];
}


export class PurchaseOrder extends Order<PurchaseOrderLineItem> {

}

export class SaleOrder extends Order<SaleOrderLineItem> {

}



describe('generic class', () => {
    let formbuilder = new RxFormBuilder();

    it('should pass, "PurchaseOrderLineItem" class property of "unitCost" should be defined', () => {
        let purchase = new PurchaseOrder();
        purchase.lineItems = new Array<PurchaseOrderLineItem>();
        purchase.lineItems.push(new PurchaseOrderLineItem());
        let purchaseFormGroup = formbuilder.formGroup(purchase);
        let lineItemFormArray = <FormArray>purchaseFormGroup.controls.lineItems;
        let lineItemFormGroup = lineItemFormArray.controls[0];
        expect(lineItemFormGroup.controls.unitCost instanceof RxFormControl).toBe(true);
    })

    it('should pass, "SaleOrderLineItem" class property of "unitPrice" should be defined', () => {
        let saleOrder = new SaleOrder();
        saleOrder.lineItems = new Array<SaleOrderLineItem>();
        saleOrder.lineItems.push(new SaleOrderLineItem());
        let saleOrderFormGroup = formbuilder.formGroup(saleOrder);
        let lineItemFormArray = <FormArray>saleOrderFormGroup.controls.lineItems;
        let lineItemFormGroup = lineItemFormArray.controls[0];
        expect(lineItemFormGroup.controls.unitPrice instanceof RxFormControl).toBe(true);
    })

    it('should pass, On plain json object "SaleOrderLineItem" class property of "unitPrice" should be defined', () => {
        let jsonObject = {
            name: 'Samsung',
            lineItems: [{ unitPrice: 900 }]
        };
        let saleOrderFormGroup = formbuilder.formGroup<SaleOrder>(SaleOrder, jsonObject, {
            genericEntities: { 'lineItems': SaleOrderLineItem }
        })
        let lineItemFormArray = <FormArray>saleOrderFormGroup.controls.lineItems;
        let lineItemFormGroup = lineItemFormArray.controls[0];
        expect(lineItemFormGroup.controls.unitPrice instanceof RxFormControl).toBe(true);
    })



    
})
