import {  creditcard, } from "@rxweb/reactive-form-validators"
export class User {

	@creditcard() 
	cardType: string;

	@creditcard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpressions:x => x.cardType == 'visa'  ,message:'Invalid Visa Credit Card Number.' }) 
	visaCard: string;

	@creditcard({creditCardTypes:[ CreditCardType.AmericanExpress ]  ,conditionalExpressions:x => x.cardType == 'AmericanExpress' }) 
	americanExpressCard: string;

	@creditcard({creditCardTypes:[ CreditCardType.maestroCard ]  ,conditionalExpressions:x => x.cardType == 'maestroCard' }) 
	maestroCard: string;

	@creditcard({creditCardTypes:[ CreditCardType.jcbCard ]  ,conditionalExpressions:x => x.cardType == 'jcbCard' }) 
	jcbCard: string;

	@creditcard({creditCardTypes:[ CreditCardType.discoverCard ]  ,conditionalExpressions:x => x.cardType == 'discoverCard' }) 
	discoverCard: string;

	@creditcard({creditCardTypes:[ CreditCardType.masterCard ]  ,conditionalExpressions:x => x.cardType == 'masterCard' }) 
	masterCard: string;

	@creditcard({creditCardTypes:[ CreditCardType.dinersClubCard ]  ,conditionalExpressions:x => x.cardType == 'dinersClubCard' }) 
	dinersClubCard: string;

}
