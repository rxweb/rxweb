
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder,prop,or } from '../../../packages/reactive-form-validators';



export class UserInfo {
  @prop()
	dob: string;

  @or({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"-"}}})
	licenseDate: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "baseConfig":{
          "dateFormat": "mdy",
           "seperator": "/"
        },
        "internationalization": {
            "dateFormat": "mdy",
            "seperator": "/"
        },
        "validationMessage": {
            "contains": "you should contains.",
            "minDate":"minimum date.",
            "or":"or condition failed."
        }
    });
    });

    describe('orDecorator', () => {

	
	  it('should not error in licenseDate property.',
        () => {
          let userInfo = new UserInfo();
          userInfo.dob = "09/02/2019";
        let formGroup = formBuilder.formGroup(userInfo);
        formGroup.controls.licenseDate.setValue("10/02/2019");
        expect(formGroup.controls.licenseDate.errors).toBeNull();
     });

     
	  it('should not error in licenseDate property, contains validation fails.',
    () => {
      let userInfo = new UserInfo();
      userInfo.dob = "09/02/2019";
    let formGroup = formBuilder.formGroup(userInfo);
    formGroup.controls.licenseDate.setValue("10-02-2019");
    expect(formGroup.controls.licenseDate.errors).toBeNull();
 });

	 it('should error in licenseDate property.',
        () => {
          let userInfo = new UserInfo();
          userInfo.dob = "09/02/2019";
        let formGroup = formBuilder.formGroup(userInfo);
        formGroup.controls.licenseDate.setValue("08/02/2019");
        expect(formGroup.controls.licenseDate.errors).toEqual({'or':{ message: 'or condition failed.', refValues: [ "08/02/2019" ] } });
     });


	//end
    });
  });
})();
