import { latLong, prop,ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class Country {

	@prop()
	continent: string;

	//If you want to apply conditional expression of type 'function'
	@latLong({conditionalExpression:(x,y) => x.continent == "Asia"  }) 
	secondCountry: string;

	//If you want to apply conditional expression of type 'string'
	@latLong({conditionalExpression:'x => x.continent =="Asia"' }) 
	thirdCountry: string;

	@latLong({message:'{{0}} is not a proper proper Latitude or Longitude' }) 
	firstCountry: string;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "latLong": "Please enter a valid latLong",
        }
      });
    });

    describe('latLongDecorator', () => {

	
    it("Should not error, latLong decorator  Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountry.setValue('20.5937, 78.9629');
        expect(formGroup.controls.secondCountry.errors).toBeNull();
     });

    it('secondCountry value should be "20.5937, 78.9629".',
        () => {
        let country = new Country();
        country.secondCountry = '20.5937, 78.9629';
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.secondCountry.value).toEqual('20.5937, 78.9629');
     });
    it("Should not error, latLong decorator  Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Africa';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountry.setValue('222, 520');
        expect(formGroup.controls.secondCountry.errors).toBeNull();
     });



    it("Should error, latLong decorator Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountry.setValue('220, 520');
        expect(formGroup.controls.secondCountry.errors).toEqual({'latLong':{ message: 'Please enter a valid latLong', refValues: [ '220, 520' ] } });
     });


    it("Should not error, latLong decorator  Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountry.setValue('78.9629, 20.5937');
        expect(formGroup.controls.thirdCountry.errors).toBeNull();
     });

    it('thirdCountry value should be "78.9629, 20.5937".',
        () => {
        let country = new Country();
        country.thirdCountry = '78.9629, 20.5937';
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.thirdCountry.value).toEqual('78.9629, 20.5937');
     });
    it("Should not error, latLong decorator  Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Africa';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountry.setValue('222, 5820');
        expect(formGroup.controls.thirdCountry.errors).toBeNull();
     });



    it("Should error, latLong decorator Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountry.setValue('220, 6854');
        expect(formGroup.controls.thirdCountry.errors).toEqual({'latLong':{ message: 'Please enter a valid latLong', refValues: [ '220, 6854' ] } });
     });



	 it("Should error, latLong decorator Shows custom message.",
        () => {
		let country = new Country();
        let formGroup = formBuilder.formGroup(country);
		formGroup.controls.firstCountry.setValue('230, 845');
        expect(formGroup.controls.firstCountry.errors).toEqual({'latLong':{ message: '230, 845 is not a proper proper Latitude or Longitude', refValues: [ '230, 845' ] } });
     });



	//end
    });
  });
