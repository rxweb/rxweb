import {FormGroup, FormArray} from '@angular/forms';

import { RxFormBuilder, FormBuilderConfiguration, RxFormGroup,prop, propObject, propArray } from '@rxweb/reactive-form-validators';

export class Item {

    @prop()
    id: number;

    @prop()
    name: string;
}

export class Invoice {
    @prop()
    id: number;

    @prop()
    name: string;
}

export class Order {
    @prop()
    productId: number;

    @prop()
    userId: number;

    @prop()
    orderId: number;

    @propObject(Invoice)
    invoice: Invoice;

    @propArray(Item)
    items:Item[]
}




 describe('ignore-undefined-props',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, should not be available productId FormControl',()=>{
          let order = new Order();
          order.orderId = 1;
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.ignoreUndefinedProps = ["productId"];
          let orderFormGroup = <RxFormGroup>formBuilder.formGroup(order, formBuilderConfiguration);
          expect(orderFormGroup.controls.productId).toBe(undefined);
          expect(orderFormGroup.controls.orderId != undefined).toBe(true);
     })

      it('should pass, should not be available productId and userId FormControl', () => {
          let order = new Order();
          order.orderId = 1;
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.ignoreUndefinedProps = [":self:"];
          let orderFormGroup = <RxFormGroup>formBuilder.formGroup(order, formBuilderConfiguration);
          expect(orderFormGroup.controls.productId).toBe(undefined);
          expect(orderFormGroup.controls.userId).toBe(undefined);
          expect(orderFormGroup.controls.orderId != undefined).toBe(true);
      })

      it('should pass, Ignore nested FormGroup properties', () => {
          let order = new Order();
          order.orderId = 1;
          order.invoice = new Invoice();
          order.invoice.id = 1;
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.ignoreUndefinedProps = ["invoice"];
          let orderFormGroup = <RxFormGroup>formBuilder.formGroup(order, formBuilderConfiguration);

          expect(orderFormGroup.controls.productId != undefined).toBe(true);
          expect(orderFormGroup.controls.userId != undefined).toBe(true);
          expect(orderFormGroup.controls.orderId != undefined).toBe(true);

          let invoiceFormGroup = orderFormGroup.controls.invoice as FormGroup;
          expect(invoiceFormGroup.controls.id != undefined).toBe(true);
          expect(invoiceFormGroup.controls.name).toBe(undefined);

      })

      it('should pass, Ignore nested FormArray properties', () => {
          let order = new Order();
          order.orderId = 1;
          order.invoice = new Invoice();
          order.invoice.id = 1;
          order.items = new Array<Item>();
          var item = new Item();
          item.id = 1;
          order.items.push(item);
          order.items.push(item);
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.ignoreUndefinedProps = ["items"];
          let orderFormGroup = <RxFormGroup>formBuilder.formGroup(order, formBuilderConfiguration);

          expect(orderFormGroup.controls.productId != undefined).toBe(true);
          expect(orderFormGroup.controls.userId != undefined).toBe(true);
          expect(orderFormGroup.controls.orderId != undefined).toBe(true);

          let invoiceFormGroup = orderFormGroup.controls.invoice as FormGroup;
          expect(invoiceFormGroup.controls.id != undefined).toBe(true);
          expect(invoiceFormGroup.controls.name != undefined).toBe(true);

          let itemsFormArray = orderFormGroup.controls.items as FormArray;
          let zeroIndexFormGroup = itemsFormArray.controls[0] as FormGroup;
          let oneIndexFormGroup = itemsFormArray.controls[1] as FormGroup;
          expect(zeroIndexFormGroup.controls.name).toBe(undefined);
          expect(oneIndexFormGroup.controls.name).toBe(undefined);
          expect(zeroIndexFormGroup.controls.id != undefined).toBe(true);
          expect(oneIndexFormGroup.controls.id != undefined).toBe(true);
      })

      

})
