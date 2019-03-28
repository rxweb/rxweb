import { minNumber, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';


export class ResultInfo {

	@minNumber({value:35 }) 
	maths: number;

	@minNumber({value:35  ,message:'Number should not be less than 35' }) 
	science: number;

	//If you want to apply conditional expression of type 'function'
	@minNumber({value:35  ,conditionalExpression:(x,y) => x.maths == 50  }) 
	english: number;

	@minNumber({value:35  ,conditionalExpression:'x => x.maths == 50' }) 
	statstics: number;

}


    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "minNumber": "Number should less than equal to minimum number.",
                }
            });
        });

        describe('minNumberDecorator', () => {
                
            it("Should not error in maths property with undefined value.",
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.maths = undefined;
                let formGroup = formBuilder.formGroup(resultInfo);
                expect(formGroup.controls.maths.errors).toBeNull();
            });

            it("Should not error, minNumber decorator If the input is greater than or equal to 35",
            () => {
                let resultInfo = new ResultInfo();
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.maths.setValue('60');
                expect(formGroup.controls.maths.errors).toBeNull();
            });

        it("Should error, minNumber decorator If the input length is less than 10",
            () => {
                let resultInfo = new ResultInfo();
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.maths.setValue(30);
                expect(formGroup.controls.maths.errors).toEqual({ 'minNumber': { message: 'Number should less than equal to minimum number.', refValues: [30, 35] } });
            });

            it("Should error, minNumber decorator Shows custom message",
            () => {
                let resultInfo = new ResultInfo();
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.science.setValue(32);
                expect(formGroup.controls.science.errors).toEqual({ 'minNumber': { message: 'Number should not be less than 35', refValues: [32, 35] } });
            });

            it("Should not error, minNumber decorator  Conditional Expression with type 'function'",
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.maths  = 50;
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.english.setValue(90);
                expect(formGroup.controls.english.errors).toBeNull();
            });

        it('english value should be "90".',
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.english = 90;
                let formGroup = formBuilder.formGroup(resultInfo);
                expect(formGroup.controls.english.value).toEqual(90);
            });

        it("Should not error, minNumber decorator  Conditional Expression with type 'function'",
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.maths  = 40;
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.english.setValue(30);
                expect(formGroup.controls.english.errors).toBeNull();
            });

        it("Should error, minNumber decorator Conditional Expression with type 'function'",
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.maths  = 50;
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.english.setValue(30);
                expect(formGroup.controls.english.errors).toEqual({ 'minNumber': { message: 'Number should less than equal to minimum number.', refValues: [30, 35] } });
            });

        it("Should not error, minNumber decorator  Conditional Expression with type 'string'",
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.maths  = 50;
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.statstics.setValue(90);
                expect(formGroup.controls.statstics.errors).toBeNull();
            });

        it('statstics value should be 90.',
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.statstics = 90;
                let formGroup = formBuilder.formGroup(resultInfo);
                expect(formGroup.controls.statstics.value).toEqual(90);
            });

        it("Should not error, minNumber decorator  Conditional Expression with type 'string'",
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.maths  = 40;
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.statstics.setValue(30);
                expect(formGroup.controls.statstics.errors).toBeNull();
            });


        it("Should error, minNumber decorator Conditional Expression with type 'string'",
            () => {
                let resultInfo = new ResultInfo();
                resultInfo.maths  = 50;
                let formGroup = formBuilder.formGroup(resultInfo);
                formGroup.controls.statstics.setValue(30);
                expect(formGroup.controls.statstics.errors).toEqual({ 'minNumber': { message: 'Number should less than equal to minimum number.', refValues: [30, 35] } });
            });
            
            //end
        });
    });
