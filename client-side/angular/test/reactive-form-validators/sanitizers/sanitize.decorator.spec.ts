
import {  RxFormBuilder,RxFormGroup, sanitize, prop } from '@rxweb/reactive-form-validators';



export class User {
    @sanitize({ custom: x => x == '1K' ? 1000 : x})
    @prop()
    amount: string;
}



(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('sanitizeDecorator', () => {


            it('should pass.',
                () => {
                    let user = new User();
                    user.amount = "1K";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.amount).toEqual(1000);
                });


            it('should pass and value is same as provided.',
                () => {
                    let user = new User();
                    user.amount = "2K";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.amount).toEqual("2K");
                });
            //end
        });
    });
})();
