import { prop, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';

export class NumberInfo {

    @prop()
    numberType: string;

    @prop()
    thirdNumber: string;

    @prop()
    firstNumber: string;

}

describe('Dynamic Validation decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "primeNumber": "Please enter a valid prime number",
            }
        });
    });
    describe('primeNumber dynamic validation', () => {

        let numberInfo = new NumberInfo();

        it('should not error in thirdNumber with conditional expression in dynamic primeNumber validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    numberType: {
                        primeNumber: true
                    },
                    thirdNumber: {
                        primeNumber: { conditionalExpression: 'x => x.numberType == "Prime"', }
                    }
                }
                let numberInfoFormGroup = <RxFormGroup>formBuilder.formGroup(numberInfo, formBuilderConfiguration);
                numberInfoFormGroup.controls.numberType.setValue('Prime');
                numberInfoFormGroup.controls.thirdNumber.setValue(11);
                expect(numberInfoFormGroup.controls.thirdNumber.errors).toBeNull();
            });

        it('should not error in thirdNumber with conditional expression in dynamic primeNumber validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    numberType: {
                        primeNumber: true
                    },
                    thirdNumber: {
                        primeNumber: { conditionalExpression: 'x => x.numberType == "Prime"', }
                    }
                }
                let numberInfoFormGroup = <RxFormGroup>formBuilder.formGroup(numberInfo, formBuilderConfiguration);
                numberInfoFormGroup.controls.numberType.setValue('Composite');
                numberInfoFormGroup.controls.thirdNumber.setValue(15);
                expect(numberInfoFormGroup.controls.thirdNumber.errors).toBeNull();
            });

        it('should error in thirdNumber with conditional expression in dynamic primeNumber validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    numberType: {
                        primeNumber: true
                    },
                    thirdNumber: {
                        primeNumber: { conditionalExpression: 'x => x.numberType == "Prime"', }
                    }
                }
                let numberInfoFormGroup = <RxFormGroup>formBuilder.formGroup(numberInfo, formBuilderConfiguration);
                numberInfoFormGroup.controls.numberType.setValue('Prime');
                numberInfoFormGroup.controls.thirdNumber.setValue(15);
                expect(numberInfoFormGroup.controls.thirdNumber.errors).toEqual({ 'primeNumber': { message: 'Please enter a valid prime number', refValues: [15] } });
            });

        it('should error in firstNumber adding custom message in dynamic primeNumber validation.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    firstNumber: {
                        primeNumber: { message: '{{0}} is not a prime number.', }
                    }
                }
                let numberInfoFormGroup = <RxFormGroup>formBuilder.formGroup(numberInfo, formBuilderConfiguration);
                numberInfoFormGroup.controls.firstNumber.setValue(20);
                expect(numberInfoFormGroup.controls.firstNumber.errors).toEqual({ 'primeNumber': { message: '20 is not a prime number.', refValues: [20] } });
            });
        //end
    });
});
