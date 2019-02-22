
import {  RxFormBuilder, toDouble, prop } from '../../../packages/reactive-form-validators';



export class Product {

    @prop()
    @toDouble()
    amount: number;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('toDoubleDecorator', () => {


            it('should pass.',
                () => {
                    let product = new Product();
                    product.amount = 15;
                    let formGroup = formBuilder.formGroup(product);
                    expect(formGroup.controls.amount.value).toEqual(15.0);
                });


            it('should pass with negative value.',
                () => {
                    let product = new Product();
                    product.amount = -1.5;
                    let formGroup = formBuilder.formGroup(product);
                    expect(formGroup.controls.amount.value).toEqual(-1.5);
                });

                it('should pass with dot.',
                () => {
                    let product = new Product();
                    product.amount = 1.;
                    let formGroup = formBuilder.formGroup(product);
                    expect(formGroup.controls.amount.value).toEqual(1.0);
                });

                
                it('should pass with only decimal value.',
                () => {
                    let product = new Product();
                    product.amount = .8;
                    let formGroup = formBuilder.formGroup(product);
                    expect(formGroup.controls.amount.value).toEqual(0.8);
                });

            it('should pass with setValue method.',
                () => {
                    let formGroup = formBuilder.formGroup(Product);
                    formGroup.controls.amount.setValue(2);
                    expect(formGroup.controls.amount.value).toEqual(2.0);
                });

            //end
        });
    });
})();
