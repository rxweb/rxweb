import { compose,  RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AbstractControl } from '@angular/forms';

function uniqueCountryName() {
    return (control: AbstractControl) => {
        if (control.value != "India")
            return null;
        else
            return {
                'uniqueCountry': { message: "Country Name Should be Unique" }
            };
    }
}

function uniqueCountryCode() {
    return (control: AbstractControl) => {
        if (control.value != "IND")
            return null;
        else
            return {
                uniqueCountryCode: {message:"Country Code Should be Unique"}
            }
    }
}
export class AddressInfo {

	@compose({validators:[uniqueCountryName()]}) 
	countryName: string;

    @compose({ conditionalExpression: (x, y) => x.countryName == "India", validators: [uniqueCountryCode()] }) 
	countryCode: string;
}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    

    describe('composeDecorator', () => {

	
	  it('should not error in countryName property with null value.',
        () => {
        let formGroup = formBuilder.formGroup(AddressInfo);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

	 it('should not error in countryName property with undefined value.',
        () => {
		let addressInfo = new AddressInfo();
        addressInfo.countryName = undefined;
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.errors).toBeNull();
            });

        it('should error if the countryName value is "India".',
            () => {
                let addressInfo = new AddressInfo();
                addressInfo.countryName = "India";
                let formGroup = formBuilder.formGroup(addressInfo);
                expect(formGroup.controls.countryName.errors).toEqual({
                    'uniqueCountry': { message: "Country Name Should be Unique" }
                });
            });

        it('should error if the countryName value is other than "India".',
            () => {
                let addressInfo = new AddressInfo();
                addressInfo.countryName = "Australia";
                let formGroup = formBuilder.formGroup(addressInfo);
                expect(formGroup.controls.countryName.errors).toBeNull();
            });

        it('should not error if the countryName value is other than "IND" and the countryName is "India".',
            () => {
                let addressInfo = new AddressInfo();
                addressInfo.countryName = "India";
                addressInfo.countryCode = "AU"
                let formGroup = formBuilder.formGroup(addressInfo);
                expect(formGroup.controls.countryCode.errors).toBeNull();
            });

        it('should error if the countryName value is "IND" and the countryName is "India".',
            () => {
                let addressInfo = new AddressInfo();
                addressInfo.countryName = "India";
                addressInfo.countryCode = "IND"
                let formGroup = formBuilder.formGroup(addressInfo);
                expect(formGroup.controls.countryCode.errors).toBeNull();
            });

         


	//end
    });
  });
