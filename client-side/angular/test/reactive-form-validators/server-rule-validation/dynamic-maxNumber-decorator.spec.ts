import { prop, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';

export class SubjectDetails {

    @prop()
    subjectCode: string;

    @prop()
    obtainedMarks: number;

    @prop()
    passingMarks: number;

    @prop()
    practicalMarks: number;

}


    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "maxNumber": "Maximum number is not matched.",
                }
            });
        });

        describe('maxNumber dynamic validation', () => {

            let subjectDetails = new SubjectDetails();

            it('should not error in passingMarks adding dynamic maxNumber validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        passingMarks: {
                            maxNumber: { value: 50 }
                        }
                    };
                    let subjectDetailsFormGroup = <RxFormGroup>formBuilder.formGroup(subjectDetails, formBuilderConfiguration);
                    subjectDetailsFormGroup.controls.passingMarks.setValue(40);
                    expect(subjectDetailsFormGroup.controls.passingMarks.errors).toBeNull();
                });

            it('should error in passingMarks adding dynamic maxNumber validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        passingMarks: {
                            maxNumber: { value: 50 }
                        }
                    };
                    let subjectDetailsFormGroup = <RxFormGroup>formBuilder.formGroup(subjectDetails, formBuilderConfiguration);
                    subjectDetailsFormGroup.controls.passingMarks.setValue(75);
                    expect(subjectDetailsFormGroup.controls.passingMarks.errors).toEqual({ 'maxNumber': { message: 'Maximum number is not matched.', refValues: [75, 50] } });
                });

            it('should not error in obtainedMarks with conditional expression in dynamic maxNumber validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        subjectCode: {},
                        obtainedMarks: {
                            maxNumber: { value: 100, conditionalExpression: 'x => x.subjectCode == "8CS5A"', }
                        }
                    }
                    let subjectDetailsFormGroup = <RxFormGroup>formBuilder.formGroup(subjectDetails, formBuilderConfiguration);
                    subjectDetailsFormGroup.controls.subjectCode.setValue('8CS5A');
                    subjectDetailsFormGroup.controls.obtainedMarks.setValue(60);
                    expect(subjectDetailsFormGroup.controls.obtainedMarks.errors).toBeNull();
                });

            it('should not error in obtainedMarks with conditional expression in dynamic maxNumber validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        subjectCode: {},
                        obtainedMarks: {
                            maxNumber: { value: 100, conditionalExpression: 'x => x.subjectCode == "8CS5A"', }
                        }
                    }
                    let subjectDetailsFormGroup = <RxFormGroup>formBuilder.formGroup(subjectDetails, formBuilderConfiguration);
                    subjectDetailsFormGroup.controls.subjectCode.setValue('8CS1A');
                    subjectDetailsFormGroup.controls.obtainedMarks.setValue(110);
                    expect(subjectDetailsFormGroup.controls.obtainedMarks.errors).toBeNull();
                });

            it('should error in obtainedMarks with conditional expression in dynamic maxNumber validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        subjectCode: {},
                        obtainedMarks: {
                            maxNumber: { value: 100, conditionalExpression: 'x => x.subjectCode == "8CS5A"', }
                        }
                    }
                    let subjectDetailsFormGroup = <RxFormGroup>formBuilder.formGroup(subjectDetails, formBuilderConfiguration);
                    subjectDetailsFormGroup.controls.subjectCode.setValue('8CS5A');
                    subjectDetailsFormGroup.controls.obtainedMarks.setValue(110);
                    expect(subjectDetailsFormGroup.controls.obtainedMarks.errors).toEqual({ 'maxNumber': { message: 'Maximum number is not matched.', refValues: [110, 100] } });
                });

            it('should error in practicalMarks adding custom message in dynamic maxNumber validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        practicalMarks: {
                            maxNumber: { value: 70, message: '{{0}} exceeds the Maximum marks Limit', }
                        }
                    }
                    let subjectDetailsFormGroup = <RxFormGroup>formBuilder.formGroup(subjectDetails, formBuilderConfiguration);
                    subjectDetailsFormGroup.controls.practicalMarks.setValue(90);
                    expect(subjectDetailsFormGroup.controls.practicalMarks.errors).toEqual({ 'maxNumber': { message: '90 exceeds the Maximum marks Limit', refValues: [90,70] } });
                });
            //end
        });
    });
