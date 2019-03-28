import { primeNumber, prop,ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';


export class NumberInfo {

	@prop()
	numberType: string;

	//If you want to apply conditional expression of type 'function'
	@primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime"  }) 
	secondNumber: number;

	//If you want to apply conditional expression of type 'string'
	@primeNumber({conditionalExpression:'x => x.numberType =="Prime"' }) 
	thirdNumber: number;

	@primeNumber({message:'{{0}} is not a prime number' }) 
	firstNumber: number;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "primeNumber": "Please enter a valid prime number",
        }
      });
    });

    describe('primeNumberDecorator', () => {

	
    it("Should not error, primeNumber decorator  Conditional Expression with type 'function'",
        () => {
		let numberInfo = new NumberInfo();
		numberInfo.numberType = 'Prime';
        let formGroup = formBuilder.formGroup(numberInfo);
        formGroup.controls.secondNumber.setValue(17);
        expect(formGroup.controls.secondNumber.errors).toBeNull();
     });

    it('secondNumber value should be "17".',
        () => {
        let numberInfo = new NumberInfo();
        numberInfo.secondNumber = 17;
        let formGroup = formBuilder.formGroup(numberInfo);
        expect(formGroup.controls.secondNumber.value).toEqual(17);
     });
    it("Should not error, primeNumber decorator  Conditional Expression with type 'function'",
        () => {
		let numberInfo = new NumberInfo();
		numberInfo.numberType = 'Composite';
        let formGroup = formBuilder.formGroup(numberInfo);
        formGroup.controls.secondNumber.setValue(15);
        expect(formGroup.controls.secondNumber.errors).toBeNull();
     });



    it("Should error, primeNumber decorator Conditional Expression with type 'function'",
        () => {
		let numberInfo = new NumberInfo();
		numberInfo.numberType = 'Prime';
        let formGroup = formBuilder.formGroup(numberInfo);
        formGroup.controls.secondNumber.setValue(12);
        expect(formGroup.controls.secondNumber.errors).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 12 ] } });
     });


    it("Should not error, primeNumber decorator  Conditional Expression with type 'string'",
        () => {
		let numberInfo = new NumberInfo();
		numberInfo.numberType = 'Prime';
        let formGroup = formBuilder.formGroup(numberInfo);
        formGroup.controls.thirdNumber.setValue(17);
        expect(formGroup.controls.thirdNumber.errors).toBeNull();
     });

    it('thirdNumber value should be "17".',
        () => {
        let numberInfo = new NumberInfo();
        numberInfo.thirdNumber = 17;
        let formGroup = formBuilder.formGroup(numberInfo);
        expect(formGroup.controls.thirdNumber.value).toEqual(17);
     });
    it("Should not error, primeNumber decorator  Conditional Expression with type 'string'",
        () => {
		let numberInfo = new NumberInfo();
		numberInfo.numberType = 'Composite';
        let formGroup = formBuilder.formGroup(numberInfo);
        formGroup.controls.thirdNumber.setValue(15);
        expect(formGroup.controls.thirdNumber.errors).toBeNull();
     });



    it("Should error, primeNumber decorator Conditional Expression with type 'string'",
        () => {
		let numberInfo = new NumberInfo();
		numberInfo.numberType = 'Prime';
        let formGroup = formBuilder.formGroup(numberInfo);
        formGroup.controls.thirdNumber.setValue(12);
        expect(formGroup.controls.thirdNumber.errors).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 12 ] } });
     });



	 it("Should error, primeNumber decorator Shows custom message.",
        () => {
		let numberInfo = new NumberInfo();
        let formGroup = formBuilder.formGroup(numberInfo);
		formGroup.controls.firstNumber.setValue(20);
        expect(formGroup.controls.firstNumber.errors).toEqual({'primeNumber':{ message: '20 is not a prime number', refValues: [ 20 ] } });
     });



	//end
    });
  });
