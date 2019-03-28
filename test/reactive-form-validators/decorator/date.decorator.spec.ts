import { date, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

    @date()
    allocationDate: string;

}

    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "date": "enter correct date.",
                },
                "baseConfig": {
                    "dateFormat": "dmy",
                    "seperator": "/"
                }
            });
        });

        describe('dateDecorator', () => {

            it('should not error in allocationDate property with null value.',
                () => {
                    let formGroup = formBuilder.formGroup(User);
                    expect(formGroup.controls.allocationDate.errors).toBeNull();
                });

            it('should not error in allocationDate property with undefined value.',
                () => {
                    let user = new User();
                    user.allocationDate = undefined;
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.allocationDate.errors).toBeNull();
                });

            it('should not error in allocationDate property with "28/07/2018" value.',
                () => {
                    let user = new User();
                    user.allocationDate = '28/07/2018';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.allocationDate.errors).toBeNull();
                });

            it('should error in allocationDate property with "2018/07/31" value.',
                () => {
                    let user = new User();
                    user.allocationDate = '2018/07/31';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.allocationDate.errors).toEqual({ 'date': { message: 'enter correct date.', refValues: ['2018/07/31'] } });
                });

            

            //end
        });
    });
