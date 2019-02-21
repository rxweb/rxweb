
import {  RxFormBuilder, trim, prop } from '../../../packages/reactive-form-validators';



export class User {

    @prop()
    @trim()
    userName: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('trimDecorator', () => {


            it('should pass.',
                () => {
                    let user = new User();
                    user.userName = "                ";
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.userName.value).toEqual("");
                });


            it('should pass and value is "ajay".',
                () => {
                    let user = new User();
                    user.userName = "      ajay          ";
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.userName.value).toEqual("ajay");
                });

            it('should pass with setValue method.',
                () => {
                    let formGroup = formBuilder.formGroup(User);
                    formGroup.controls.userName.setValue("       ajay             ");
                    expect(formGroup.controls.userName.value).toEqual("ajay");
                });

            //end
        });
    });
})();
