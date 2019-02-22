
import {  RxFormBuilder, toString, prop } from '../../../packages/reactive-form-validators';



export class Product {

    @prop()
    @toString()
    amount: any;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('toStringDecorator', () => {


            it('should pass.',
                () => {
                    let product = new Product();
                    product.amount = 15;
                    let formGroup = formBuilder.formGroup(product);
                    expect(formGroup.controls.amount.value).toEqual("15");
                });


            it('should pass with float value.',
                () => {
                    let product = new Product();
                    product.amount = 1.5;
                    let formGroup = formBuilder.formGroup(product);
                    expect(formGroup.controls.amount.value).toEqual("1.5");
                });

               
            it('should pass with setValue method.',
                () => {
                    let formGroup = formBuilder.formGroup(Product);
                    formGroup.controls.amount.setValue(2);
                    expect(formGroup.controls.amount.value).toEqual("2");
                });

            //end
        });
    });
})();
