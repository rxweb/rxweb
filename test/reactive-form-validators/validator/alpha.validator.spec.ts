import { FormControl } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';



describe('Validator', () => {
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "alpha": "Only alphabets are allowed.",
            }
        });
    });

    describe('alphaValidator', () => {

        it('should not error on an empty string.',
            () => {
                expect(RxwebValidators.alpha()(new FormControl(''))).toBeNull();
            });

        it('should not error on null.',
            () => {
                expect(RxwebValidators.alpha()(new FormControl(null))).toBeNull();
            });

        it('should not error on undefined.',
            () => {
                expect(RxwebValidators.alpha()(new FormControl(undefined))).toBeNull();
            });
        //end
    });
});
