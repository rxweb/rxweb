import { creditCard, prop, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

    @prop()
    cardType: string;

    //If you want to apply conditional expression of type 'function'
    @creditCard({ fieldName: 'cardType', conditionalExpression: (x, y) => x.cardType == "Visa", message: 'Invalid Visa Credit Card Number.' })
    visaCard: string;

    //If you want to apply conditional expression of type 'string'
    @creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Visa"', message: 'Invalid Visa Credit Card Number.' })
    otherVisaCard: string;

    @creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "AmericanExpress"' })
    americanExpressCard: string;

    @creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Maestro"' })
    maestroCard: string;

    @creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "JCB"' })
    jcbCard: string;

    @creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Discover"' })
    discoverCard: string;

    @creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "MasterCard"' })
    masterCard: string;

    @creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "DinersClub"' })
    dinersClubCard: string;

}



describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "creditCard": "Invalid creditcard no.",
            }
        });
    });

    describe('creditCardDecorator', () => {
        it("Should error, creditCard decorator Conditional Expression with type 'function'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.visaCard.setValue('1214210');
                expect(formGroup.controls.visaCard.errors).toEqual({ 'creditCard': { message: 'Invalid Visa Credit Card Number.', refValues: ['1214210', 'Visa'] } });
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'function'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('AmericanExpress');
                formGroup.controls.visaCard.setValue('1214210');
                expect(formGroup.controls.visaCard.errors).toBeNull();
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'function'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.visaCard.setValue('4111111111111111');
                expect(formGroup.controls.visaCard.errors).toBeNull();
            });

        it("Should error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.otherVisaCard.setValue('1214210');
                expect(formGroup.controls.otherVisaCard.errors).toEqual({ 'creditCard': { message: 'Invalid Visa Credit Card Number.', refValues: ['1214210', 'Visa'] } });
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('AmericanExpress');
                formGroup.controls.otherVisaCard.setValue('1214210');
                expect(formGroup.controls.otherVisaCard.errors).toBeNull();
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.otherVisaCard.setValue('4111111111111111');
                expect(formGroup.controls.otherVisaCard.errors).toBeNull();
            });

        it("Should error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('AmericanExpress');
                formGroup.controls.americanExpressCard.setValue('1525454');
                expect(formGroup.controls.americanExpressCard.errors).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['1525454', 'AmericanExpress'] } });
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.americanExpressCard.setValue('1214210');
                expect(formGroup.controls.americanExpressCard.errors).toBeNull();
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('AmericanExpress');
                formGroup.controls.americanExpressCard.setValue('340000000000009');
                expect(formGroup.controls.americanExpressCard.errors).toBeNull();
            });

        it("Should error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Maestro');
                formGroup.controls.maestroCard.setValue('898989');
                expect(formGroup.controls.maestroCard.errors).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['898989', 'Maestro'] } });
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.maestroCard.setValue('898989');
                expect(formGroup.controls.maestroCard.errors).toBeNull();
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Maestro');
                formGroup.controls.maestroCard.setValue('6304268389753008');
                expect(formGroup.controls.maestroCard.errors).toBeNull();
            });

        it("Should error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('JCB');
                formGroup.controls.jcbCard.setValue('898989');
                expect(formGroup.controls.jcbCard.errors).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['898989', 'JCB'] } });
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.jcbCard.setValue('898989');
                expect(formGroup.controls.jcbCard.errors).toBeNull();
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('JCB');
                formGroup.controls.jcbCard.setValue('3543067991156263');
                expect(formGroup.controls.jcbCard.errors).toBeNull();
            });

        it("Should error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Discover');
                formGroup.controls.discoverCard.setValue('898989');
                expect(formGroup.controls.discoverCard.errors).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['898989', 'Discover'] } });
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.discoverCard.setValue('898989');
                expect(formGroup.controls.discoverCard.errors).toBeNull();
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Discover');
                formGroup.controls.discoverCard.setValue('6011628738420464');
                expect(formGroup.controls.discoverCard.errors).toBeNull();
            });


        it("Should error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('MasterCard');
                formGroup.controls.masterCard.setValue('898989');
                expect(formGroup.controls.masterCard.errors).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['898989', 'MasterCard'] } });
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.masterCard.setValue('898989');
                expect(formGroup.controls.masterCard.errors).toBeNull();
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('MasterCard');
                formGroup.controls.masterCard.setValue('5282657684495786');
                expect(formGroup.controls.masterCard.errors).toBeNull();
            });

        it("Should error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('DinersClub');
                formGroup.controls.dinersClubCard.setValue('898989');
                expect(formGroup.controls.dinersClubCard.errors).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['898989', 'DinersClub'] } });
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('Visa');
                formGroup.controls.dinersClubCard.setValue('898989');
                expect(formGroup.controls.dinersClubCard.errors).toBeNull();
            });

        it("Should not error, creditCard decorator Conditional Expression with type 'string'",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.cardType.setValue('DinersClub');
                formGroup.controls.dinersClubCard.setValue('30245484435123');
                expect(formGroup.controls.dinersClubCard.errors).toBeNull();
            });

    })
})
