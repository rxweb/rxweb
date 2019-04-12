import {FormGroup, FormArray} from '@angular/forms';

import { RxFormBuilder, RxFormGroup, prop, propObject, propArray, required } from '@rxweb/reactive-form-validators';

export class Address {
    @prop()
    areaName: string;
}
export class Hobby {
    @prop()
    name: string;
}

export class User {
    @prop()
    firstName: string;

    @propObject(Address)
    address: Address;

    @propArray(Hobby)
    hobbies: Hobby[];
}

// issue #160

export class SaleType {

    @required()
    id: number;

    private _name;

    @prop()
    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    constructor(id = null, name = null) {
        this.id = id;
        this.name = name;
    }

}

export class Sale {

    @propObject(SaleType)
    saleType: SaleType;

}




 describe('patch-model-value',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, with model property',()=>{
          let user = new User();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          expect(userFormGroup.controls.firstName.value).toBe(null);
          userFormGroup.patchModelValue({firstName:'Ajay'});
          expect(userFormGroup.controls.firstName.value).toEqual('Ajay');
         })

        it('should pass, with model nested object property',()=>{
          let user = new User();
          user.address = new Address();
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
          let nestedFormGroup:FormGroup = <FormGroup>userFormGroup.controls.address;
          expect(nestedFormGroup.controls.areaName.value).toBe(null);
          userFormGroup.patchModelValue({address:{areaName:"Ahmedabad"}});
          expect(nestedFormGroup.controls.areaName.value).toEqual('Ahmedabad');
     })

     it('should pass, with model nested array object property', () => {
         let user = new User();
         user.address = new Address();
         let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
         let nestedFormGroup: FormGroup = <FormGroup>userFormGroup.controls.address;
         expect(nestedFormGroup.controls.areaName.value).toBe(null);
         userFormGroup.patchModelValue({ address: { areaName: "Ahmedabad" } });
         expect(nestedFormGroup.controls.areaName.value).toEqual('Ahmedabad');
     })

     it('should pass, with model nested array object property', () => {
         let user = new User();
         user.hobbies = new Array<Hobby>();
         let hobby = new Hobby();
         user.hobbies.push(hobby);
         let userFormGroup = <RxFormGroup>formBuilder.formGroup(user);
         let nestedFormArray: FormArray = <FormArray>userFormGroup.controls.hobbies;
         let formGroup = <FormGroup>nestedFormArray.controls[0];
         expect(formGroup.controls.name.value).toBe(null);
         userFormGroup.patchModelValue({ hobbies: [{ name: "Chess" }] });
         expect(formGroup.controls.name.value).toEqual('Chess');
     })

     //issue #160 spec.
     it('should pass, update the value of nested object of `saleType`', () => {
         let sale = new Sale();
         sale.saleType = new SaleType(45678, 'Retail');
         let formGroup = formBuilder.formGroup(sale) as RxFormGroup;
         let saleTypeFormGroup = formGroup.controls.saleType as RxFormGroup;
         expect(saleTypeFormGroup.controls.name.value).toBe("Retail");
         let saleType = new SaleType(12456, 'Wholesale');
         formGroup.patchModelValue({ saleType: saleType });
         expect(saleTypeFormGroup.controls.name.value).toBe("Wholesale");
     })

     

})
