import { ReactiveFormConfig, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';


describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "alpha": "Only alphabets are allowed.",
                "dateFormat": "mdy"
            }
        });
    });

    describe('reactive-form-config', () => {
        it("should show global validation message when the input is invalid",
            () => {
                let formGroup = formBuilder.group(
                    {
                        'location': ['', RxwebValidators.alpha()]
                    }
                );
                formGroup.controls.location.setValue('@Victoria-123');
                expect(formGroup.controls.location.errors).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['@Victoria-123'] } });
            });
    })

});
