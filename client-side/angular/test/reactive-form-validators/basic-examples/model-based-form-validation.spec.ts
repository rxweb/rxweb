import { alpha , ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class Country {
  @alpha()
  countryName: string;
}

  describe('model-form-based-validation', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "alpha": "Only alphabets are allowed.",
        }
      });
    });

    it('should not error in countryName property with null value.',
      () => {
        let formGroup = formBuilder.formGroup(Country);
        expect(formGroup.controls.countryName.errors).toBeNull();
      });

    it('should not error in countryName property with undefined value.',
      () => {
        let country = new Country();
        country.countryName = undefined;
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.countryName.errors).toBeNull();
      });

    it('should not error in countryName property with alphabet value.',
      () => {
        let country = new Country();
        country.countryName = 'India';
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.countryName.errors).toBeNull();
      });

    it('should error in countryName property with non alphabet value.',
      () => {
        let country = new Country();
        country.countryName = 'United-States-of-America';
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.countryName.errors).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['United-States-of-America'] } });
      });
  })
