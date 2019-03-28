import { maxNumber, prop ,ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';


export class SubjectDetails {

    @prop()
    subjectCode: string;

    //If you want to apply conditional expression of type 'function'
    @maxNumber({ value: 100, conditionalExpression: (x, y) => x.subjectCode == "8CS5A" })
    maximumMarks: number;

    //If you want to apply conditional expression of type 'string'
    @maxNumber({ value: 100, conditionalExpression: 'x => x.subjectCode == "8CS5A"' })
    obtainedMarks: number;

    @maxNumber({ value: 50 })
    passingMarks: number;

    @maxNumber({ value: 70, message: '{{0}} exceeds the Maximum marks Limit' })
    practicalMarks: number;

}

    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "maxNumber": "Maximum number is not matched.",
                }
            });
        });

        describe('maxNumberDecorator', () => {

            it("Should not error, maxNumber decorator  Conditional Expression with type 'function'",
                () => {
                    let subjectDetails = new SubjectDetails();
                    subjectDetails.subjectCode = '8CS5A';
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.maximumMarks.setValue(90);
                    expect(formGroup.controls.maximumMarks.errors).toBeNull();
                });

            it('maximumMarks value should be "90".',
                () => {
                    let subjectDetails = new SubjectDetails();
                    subjectDetails.maximumMarks = 90;
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    expect(formGroup.controls.maximumMarks.value).toEqual(90);
                });

            it("Should not error, maxNumber decorator  Conditional Expression with type 'function'",
                () => {
                    let subjectDetails = new SubjectDetails();
                    subjectDetails.subjectCode = '9CS5A';
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.maximumMarks.setValue(110);
                    expect(formGroup.controls.maximumMarks.errors).toBeNull();
                });

            it("Should error, maxNumber decorator Conditional Expression with type 'function'",
                () => {
                    let subjectDetails = new SubjectDetails();
                    subjectDetails.subjectCode = '8CS5A';
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.maximumMarks.setValue(110);
                    expect(formGroup.controls.maximumMarks.errors).toEqual({ 'maxNumber': { message: 'Maximum number is not matched.', refValues: [110, 100] } });
                });

            it("Should not error, maxNumber decorator  Conditional Expression with type 'string'",
                () => {
                    let subjectDetails = new SubjectDetails();
                    subjectDetails.subjectCode = '8CS5A';
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.obtainedMarks.setValue('8CS5A');
                    expect(formGroup.controls.obtainedMarks.errors).toBeNull();
                });

            it('obtainedMarks value should be "8CS5A".',
                () => {
                    let subjectDetails = new SubjectDetails();
                    subjectDetails.obtainedMarks = 90;
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    expect(formGroup.controls.obtainedMarks.value).toEqual(90);
                });

            it("Should not error, maxNumber decorator  Conditional Expression with type 'string'",
                () => {
                    let subjectDetails = new SubjectDetails();
                    subjectDetails.subjectCode = '9CS5A';
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.obtainedMarks.setValue(110);
                    expect(formGroup.controls.obtainedMarks.errors).toBeNull();
                });


            it("Should error, maxNumber decorator Conditional Expression with type 'string'",
                () => {
                    let subjectDetails = new SubjectDetails();
                    subjectDetails.subjectCode = '8CS5A';
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.obtainedMarks.setValue(110);
                    expect(formGroup.controls.obtainedMarks.errors).toEqual({ 'maxNumber': { message: 'Maximum number is not matched.', refValues: [110, 100] } });
                });

            it("Should not error, maxNumber decorator based on the predefined value",
                () => {
                    let subjectDetails = new SubjectDetails();
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.passingMarks.setValue(45);
                    expect(formGroup.controls.passingMarks.errors).toBeNull();
                });

            it("Should error, maxNumber decorator based on the predefined value",
                () => {
                    let subjectDetails = new SubjectDetails();
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.passingMarks.setValue(55);
                    expect(formGroup.controls.passingMarks.errors).toEqual({ 'maxNumber': { message: 'Maximum number is not matched.', refValues: [55, 50] } });
                });

            it("Should error, maxNumber decorator Shows custom message",
                () => {
                    let subjectDetails = new SubjectDetails();
                    let formGroup = formBuilder.formGroup(subjectDetails);
                    formGroup.controls.practicalMarks.setValue(100);
                    expect(formGroup.controls.practicalMarks.errors).toEqual({ 'maxNumber': { message: '100 exceeds the Maximum marks Limit', refValues: [100, 70] } });
                });


            //end
        });
    });
