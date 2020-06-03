import { FormArray,FormGroup } from "@angular/forms"
import { RxFormControl, required, propArray,propObject,model, RxFormBuilder} from '@rxweb/reactive-form-validators';


export class SaleOrderLineItem {
    @required() unitPrice: number;
}

export class PurchaseOrderLineItem {
    @required() unitCost: number;
}

export abstract class Order<T>  {
    @required() name: string;
    @propArray() lineItems: T[];
    @propObject() lineItem: T;

    form: FormGroup;
    formBuilder: RxFormBuilder = new RxFormBuilder();
}


export class PurchaseOrder extends Order<PurchaseOrderLineItem> {

}

export class SaleOrder extends Order<SaleOrderLineItem> {

}

@model()
export class ClientOrder extends Order<SaleOrderLineItem> {
    constructor() {
        super();
        this.lineItem = new SaleOrderLineItem();
        this.lineItems = new Array<SaleOrderLineItem>()
        this.lineItems.push(new SaleOrderLineItem());
        this.form = this.formBuilder.formGroup(this);
    }
}



describe('generic class', () => {
    let formbuilder = new RxFormBuilder();

    it('should pass, "PurchaseOrderLineItem" class property of "unitCost" should be defined', () => {
        let purchase = new PurchaseOrder();
        purchase.lineItems = new Array<PurchaseOrderLineItem>();
        purchase.lineItems.push(new PurchaseOrderLineItem());
        let purchaseFormGroup = formbuilder.formGroup(purchase);
        let lineItemFormArray = <FormArray>purchaseFormGroup.controls.lineItems;
        let lineItemFormGroup = <FormGroup>lineItemFormArray.controls[0];
        expect(lineItemFormGroup.controls.unitCost instanceof RxFormControl).toBe(true);
    })

    it('should pass, "SaleOrderLineItem" class property of "unitPrice" should be defined', () => {
        let saleOrder = new SaleOrder();
        saleOrder.lineItems = new Array<SaleOrderLineItem>();
        saleOrder.lineItems.push(new SaleOrderLineItem());
        let saleOrderFormGroup = formbuilder.formGroup(saleOrder);
        let lineItemFormArray = <FormArray>saleOrderFormGroup.controls.lineItems;
        let lineItemFormGroup = <FormGroup>lineItemFormArray.controls[0];
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
        let lineItemFormGroup = <FormGroup>lineItemFormArray.controls[0];
        expect(lineItemFormGroup.controls.unitPrice instanceof RxFormControl).toBe(true);
    })

    it('should pass, lineItems property should be undefined', () => {
        let jsonObject = {
            name: 'Samsung',
        };
        let saleOrderFormGroup = formbuilder.formGroup<SaleOrder>(SaleOrder, jsonObject)
        expect(saleOrderFormGroup.controls.lineItems).toBe(undefined);
    })

    it('should pass, name formcontrol should be defined', () => {
        let clientOrder = new ClientOrder();
        expect(clientOrder.form.controls.name instanceof RxFormControl).toBe(true);
    })

    it('should pass, unitprice should be defined. ', () => {
        let clientOrder = new ClientOrder();
        let lineItemFormArray = <FormArray>clientOrder.form.controls.lineItems;
        let lineItemFormGroup = <FormGroup>lineItemFormArray.controls[0];
        expect(lineItemFormGroup.controls.unitPrice instanceof RxFormControl).toBe(true);
    })

    it('should pass, initialize the nested formgroup', () => {
        let clientOrder = new ClientOrder();
        let lineItemFormGroup = <FormGroup>clientOrder.form.controls.lineItem;
        expect(lineItemFormGroup.controls.unitPrice instanceof RxFormControl).toBe(true);
    })
})
