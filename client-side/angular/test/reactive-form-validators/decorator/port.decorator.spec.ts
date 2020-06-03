import { port, prop,ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

	@prop()
	browser: string;

	//If you want to apply conditional expression of type 'function'
	@port({conditionalExpression:(x,y) => x.browser == "Chrome"  }) 
	entertainmentWebsitePort: number;

	//If you want to apply conditional expression of type 'string'
	@port({conditionalExpression:'x => x.browser =="Chrome"' }) 
	shoppingWebsitePort: number;

	@port({message:'{{0}} is not a proper port number' }) 
	educationalWebsitePort: number;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "port": "Please enter a valid port number",
        }
      });
    });

    describe('portDecorator', () => {

	
    it("Should not error, port decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.browser = 'Chrome';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.entertainmentWebsitePort.setValue(8080);
        expect(formGroup.controls.entertainmentWebsitePort.errors).toBeNull();
     });

    it('entertainmentWebsitePort value should be "8080".',
        () => {
        let user = new User();
        user.entertainmentWebsitePort = 8080;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.entertainmentWebsitePort.value).toEqual(8080);
     });
    it("Should not error, port decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.browser = 'Firefox';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.entertainmentWebsitePort.setValue(80808);
        expect(formGroup.controls.entertainmentWebsitePort.errors).toBeNull();
     });



    it("Should error, port decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.browser = 'Chrome';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.entertainmentWebsitePort.setValue(90009);
        expect(formGroup.controls.entertainmentWebsitePort.errors).toEqual({'port':{ message: 'Please enter a valid port number', refValues: [ 90009 ] } });
     });


    it("Should not error, port decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.browser = 'Chrome';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.shoppingWebsitePort.setValue(4200);
        expect(formGroup.controls.shoppingWebsitePort.errors).toBeNull();
     });

    it('shoppingWebsitePort value should be "4200".',
        () => {
        let user = new User();
        user.shoppingWebsitePort = 4200;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.shoppingWebsitePort.value).toEqual(4200);
     });
    it("Should not error, port decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.browser = 'Firefox';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.shoppingWebsitePort.setValue(98754);
        expect(formGroup.controls.shoppingWebsitePort.errors).toBeNull();
     });



    it("Should error, port decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.browser = 'Chrome';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.shoppingWebsitePort.setValue(88795);
        expect(formGroup.controls.shoppingWebsitePort.errors).toEqual({'port':{ message: 'Please enter a valid port number', refValues: [ 88795 ] } });
     });



	 it("Should error, port decorator Shows custom message.",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.educationalWebsitePort.setValue(88000);
        expect(formGroup.controls.educationalWebsitePort.errors).toEqual({'port':{ message: '88000 is not a proper port number', refValues: [ 88000 ] } });
     });



	//end
    });
  });
