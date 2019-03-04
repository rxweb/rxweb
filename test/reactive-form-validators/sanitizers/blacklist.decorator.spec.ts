
import {  RxFormBuilder, blacklist, prop } from '../../../packages/reactive-form-validators';



export class User {

    @prop()
    @blacklist("abc")
    userName: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('blacklistDecorator', () => {


            it('should pass.',
                () => {
                    let user = new User();
                    user.userName = "aaaaaaaabbbbbbbbbbbb";
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.userName.value).toEqual("");
                });


            it('should pass and value is "aaaaaaaaabbbbbbbbbbbbcccccccccccssssssssssxxxxxxxxxxx".',
                () => {
                    let user = new User();
                    user.userName = "aaaaaaaaabbbbbbbbbbbbcccccccccccssssssssssxxxxxxxxxxx";
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.userName.value).toEqual("ssssssssssxxxxxxxxxxx");
                });

            it('should pass with setValue method.',
                () => {
                    let formGroup = formBuilder.formGroup(User);
                    formGroup.controls.userName.setValue("Zullu");
                    expect(formGroup.controls.userName.value).toEqual("Zullu");
                });

            //end
        });
    });
})();
