
import {  RxFormBuilder, stripLow, prop } from '../../../packages/reactive-form-validators';



export class User {

    @prop()
    @stripLow()
    userName: string;

    @prop()
    @stripLow(true)
    fullName: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('stripLowDecorator', () => {


            it('should pass.',
                () => {
                    let user = new User();
                    user.userName = "monkey\x00";
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.userName.value).toEqual("monkey");
                });


            

            it('should pass with setValue method.',
                () => {
                    let formGroup = formBuilder.formGroup(User);
                    formGroup.controls.userName.setValue("monkey\x00");
                    expect(formGroup.controls.userName.value).toEqual("monkey");
                });

            //end
        });
    });
})();
