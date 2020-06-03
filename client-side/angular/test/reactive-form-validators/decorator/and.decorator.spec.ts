import { ReactiveFormConfig, RxFormBuilder, prop, and } from '@rxweb/reactive-form-validators';

export class UserInfo {
  @prop()
	dob: string;

  @and({validation:{minDate:{fieldName:'dob',operator:">="},contains:{value:"/"}}})
	licenseDate: string;

}

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
            "and":"and condition failed."
        }
    });
    });

    describe('andDecorator', () => {

	
	  it('should not error in licenseDate property.',
        () => {
          let userInfo = new UserInfo();
          userInfo.dob = "09/02/2019";
        let formGroup = formBuilder.formGroup(userInfo);
        formGroup.controls.licenseDate.setValue("10/02/2019");
        expect(formGroup.controls.licenseDate.errors).toBeNull();
     });

	 it('should error in licenseDate property.',
        () => {
          let userInfo = new UserInfo();
          userInfo.dob = "09/02/2019";
        let formGroup = formBuilder.formGroup(userInfo);
        formGroup.controls.licenseDate.setValue("10-02-2019");
        expect(formGroup.controls.licenseDate.errors).toEqual({'and':{ message: 'and condition failed.', refValues: [ "10-02-2019" ] } });
     });


	//end
    });
  });
