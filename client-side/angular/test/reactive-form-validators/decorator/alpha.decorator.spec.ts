import { alpha, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class AddressInfo {

	@alpha() 
	countryName: string;

	//If you want to apply conditional expression of type 'function'
	@alpha({conditionalExpression:(x,y) => x.countryName == "India" }) 
	countryCode: string;

	//If you want to apply conditional expression of type 'string'
	@alpha({conditionalExpression:'x => x.countryName =="India"' }) 
	cityName: string;

	@alpha({allowWhiteSpace:true }) 
	stateName: string;

	@alpha({message:'You can enter only alphabets.' }) 
	stateCode: string;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "alpha": "Only alphabets are allowed.",
        }
      });
    });

    describe('alphaDecorator', () => {

	
	  it('should not error in countryName property with null value.',
        () => {
        let formGroup = formBuilder.formGroup(AddressInfo);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

	 it('should not error in countryName property with null value.',
        () => {
		let addressInfo = new AddressInfo();
        addressInfo.countryName = undefined;
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.errors).toEqual({"stateCode": {"alpha": {"message": "You can enter only alphabets.", "refValues": ["123"]}}});
     });
	//end
    });
  });
