import { minTime, prop ,ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';


export class User {

    @prop()
    userName: string;

    @minTime({ value: '10:35' })
    checkIn: string;

    //If you want to apply conditional expression of type 'function'
    @minTime({ value: '13:30', conditionalExpression: (x, y) => x.userName == "Bharat" })
    roomInTime: string;

    //If you want to apply conditional expression of type 'string'
    @minTime({ value: '13:30', conditionalExpression: 'x => x.userName == "Bharat"' })
    roomOutTime: string;

    @minTime({ value: '17:00', message: '{{0}} exceeds the Maximum Time Limit' })
    registrationMaxTime: string;

    @prop()
    enrollmentTime: string;

    @minTime({ fieldName: 'enrollmentTime' })
    lastRegistrationTime: string;

}

    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "minTime": "Minimum Time is not matched",
                }
            });
        });

        describe('minTimeDecorator', () => {

            it('should not error in checkIn property with null value.',
                () => {
                    let formGroup = formBuilder.formGroup(User);
                    expect(formGroup.controls.checkIn.errors).toBeNull();
                });

            it('should not error in checkIn property with undefined value.',
                () => {
                    let user = new User();
                    user.checkIn = undefined;
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.checkIn.errors).toBeNull();
                });

            it('should not error in checkIn property with "19:35" value.',
                () => {
                    let user = new User();
                    user.checkIn = '19:35';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.checkIn.errors).toBeNull();
                });

            it('should error in checkIn property with "8:40" value.',
                () => {
                    let user = new User();
                    user.checkIn = '8:40';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.checkIn.errors).toEqual({ 'minTime': { message: 'Minimum Time is not matched', refValues: ['8:40'] } });
                });

            it("Should not error, minTime decorator  Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.roomInTime.setValue('14:30');
                    expect(formGroup.controls.roomInTime.errors).toBeNull();
                });

            

            it("Should not error, minTime decorator  Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Mahesh';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.roomInTime.setValue('12:30');
                    expect(formGroup.controls.roomInTime.errors).toBeNull();
                });



            it("Should error, minTime decorator Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.roomInTime.setValue('12:30');
                    expect(formGroup.controls.roomInTime.errors).toEqual({ 'minTime': { message: 'Minimum Time is not matched', refValues: ['12:30'] } });
                });


            it("Should not error, minTime decorator  Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.roomOutTime.setValue('14:30');
                    expect(formGroup.controls.roomOutTime.errors).toBeNull();
                });

            

            it("Should not error, minTime decorator  Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Mahesh';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.roomOutTime.setValue('15:30');
                    expect(formGroup.controls.roomOutTime.errors).toBeNull();
                });

            it("Should error, minTime decorator Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.userName = 'Bharat';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.roomOutTime.setValue('12:30');
                    expect(formGroup.controls.roomOutTime.errors).toEqual({ 'minTime': { message: 'Minimum Time is not matched', refValues: ['12:30'] } });
                });

            it("Should error, minTime decorator Shows Custom Validation Message.",
                () => {
                    let user = new User();
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.registrationMaxTime.setValue('14:00');
                    expect(formGroup.controls.registrationMaxTime.errors).toEqual({ 'minTime': { message: '14:00 exceeds the Maximum Time Limit', refValues: ['14:00'] } });
                });

                it("Should not error, minTime decorator based on fieldName",
                () => {
                let user = new User();
                user.enrollmentTime = '10:35';
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.lastRegistrationTime.setValue('10:40');
                expect(formGroup.controls.lastRegistrationTime.errors).toBeNull();
             });

             
             it("Should error, minTime decorator based on fieldName",
             () => {
             let user = new User();
             user.enrollmentTime = '10:45';
             let formGroup = formBuilder.formGroup(user);
             formGroup.controls.lastRegistrationTime.setValue('10:40');
             expect(formGroup.controls.lastRegistrationTime.errors).toEqual({'minTime':{ message: 'Minimum Time is not matched', refValues: [ '10:40' ] } });
          });

            //end
        });
    });
