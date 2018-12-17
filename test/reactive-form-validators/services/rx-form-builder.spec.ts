
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder,FormBuilderConfiguration,RxFormGroup} from '../../../packages/reactive-form-validators';


import {  prop,propObject,required,propArray } from    '../../../packages/reactive-form-validators';  

export class Skill{
  @prop()
  name:string;
}
export class Address {

    @prop()
    city:string;

    address:string;
}
export class Person {

  @propObject(Address)
  address:Address;

  @propArray(Skill)
  skills:Skill[];

  @required()
  name:string;
}




(function() {
  describe('rx-form-builder', () => {
    let formBuilder = new RxFormBuilder();

    describe('rx-form-builder-function-spec', () => {

	
	  it('should not error, create FormGroup object based on model',
        () => {
        var formBuilderConfig = new FormBuilderConfiguration();
          formBuilderConfig.autoInstanceConfig = {
            objectPropInstanceConfig:[{
              propertyName:'address'
            }],
            arrayPropInstanceConfig:[{
              propertyName:'skills',
              rowItems:10
            }]
        }
        let formGroup = <RxFormGroup>formBuilder.formGroup(Person,formBuilderConfig);
        expect(formGroup.modelInstance.constructor).toEqual(Person);
        expect(formGroup.modelInstance.address.constructor).toEqual(Address);
        expect(formGroup.modelInstance.skills[0].constructor).toEqual(Skill);
        expect(formGroup.modelInstance.skills.length).toEqual(10);
        expect(formGroup.controls.address.constructor).toEqual(RxFormGroup);

     });

	 

	//end
    });
  });
})();
