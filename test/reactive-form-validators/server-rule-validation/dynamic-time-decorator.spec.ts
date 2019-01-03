import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

import { time, prop, } from '../../../packages/reactive-form-validators';

export class AttandanceDetail {

    @prop()
    entryPlace: string;

    @prop()
    entryTime: string;

    @prop()
    totalOutTime: string;

    @prop()
    exitTime: string;

}


(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "time": "Please enter proper time format",
                }
            });
        });

        describe('time dynamic validation', () => {

            let attandanceDetail = new AttandanceDetail();

            it('should not error in totalOutTime adding dynamic time validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        totalOutTime: {
                            time: {
                                allowSeconds: true
                            }
                        }
                    };
                    let attandanceDetailFormGroup = <RxFormGroup>formBuilder.formGroup(attandanceDetail, formBuilderConfiguration);
                    attandanceDetailFormGroup.controls.totalOutTime.setValue('10:28:30');
                    expect(attandanceDetailFormGroup.controls.totalOutTime.errors).toBeNull();
                });

            it('should error in totalOutTime adding dynamic time validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        totalOutTime: {
                            time: {
                                allowSeconds: true
                            }
                        }
                    };
                    let attandanceDetailFormGroup = <RxFormGroup>formBuilder.formGroup(attandanceDetail, formBuilderConfiguration);
                    attandanceDetailFormGroup.controls.totalOutTime.setValue('10:28');
                    expect(attandanceDetailFormGroup.controls.totalOutTime.errors).toEqual({ 'time': { message: 'Please enter proper time format', refValues: ['10:28'] } });
                });

            it('should not error in entryTime with conditional expression in dynamic time validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        entryPlace: {},
                        entryTime: {
                            time: { conditionalExpression: 'x => x.entryPlace == "Lunch Room"', }
                        }
                    }
                    let attandanceDetailFormGroup = <RxFormGroup>formBuilder.formGroup(attandanceDetail, formBuilderConfiguration);
                    attandanceDetailFormGroup.controls.entryPlace.setValue('Lunch Room');
                    attandanceDetailFormGroup.controls.entryTime.setValue('12:21');
                    expect(attandanceDetailFormGroup.controls.entryTime.errors).toBeNull();
                });

            it('should not error in entryTime with conditional expression in dynamic time validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        entryPlace: {},
                        entryTime: {
                            time: { conditionalExpression: 'x => x.entryPlace == "Lunch Room"' }
                        }
                    }
                    let attandanceDetailFormGroup = <RxFormGroup>formBuilder.formGroup(attandanceDetail, formBuilderConfiguration);
                    attandanceDetailFormGroup.controls.entryPlace.setValue('Conference Room');
                    attandanceDetailFormGroup.controls.entryTime.setValue('12:98');
                    expect(attandanceDetailFormGroup.controls.entryTime.errors).toBeNull();
                });

            it('should error in entryTime with conditional expression in dynamic time validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        entryPlace: {},
                        entryTime: {
                            time: { conditionalExpression: 'x => x.entryPlace == "Lunch Room"', }
                        }
                    }
                    let attandanceDetailFormGroup = <RxFormGroup>formBuilder.formGroup(attandanceDetail, formBuilderConfiguration);
                    attandanceDetailFormGroup.controls.entryPlace.setValue('Lunch Room');
                    attandanceDetailFormGroup.controls.entryTime.setValue('15:87');
                    expect(attandanceDetailFormGroup.controls.entryTime.errors).toEqual({ 'time': { message: 'Please enter proper time format', refValues: ['15:87'] } });
                });

            it('should error in exitTime adding custom message in dynamic time validation.',
            () =>{
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    exitTime : {
                        time :  {message:'You can enter only time format data',} 
                    }
                }
                let attandanceDetailFormGroup = <RxFormGroup>formBuilder.formGroup(attandanceDetail,formBuilderConfiguration);
                attandanceDetailFormGroup.controls.exitTime.setValue('25');
                expect(attandanceDetailFormGroup.controls.exitTime.errors).toEqual({'time':{ message: 'You can enter only time format data', refValues: [ '25' ] } });
            });
            //end
        });
    });
})();
