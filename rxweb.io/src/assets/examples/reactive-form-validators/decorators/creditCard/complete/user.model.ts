import {  creditCard,prop, CreditCardType, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	cardType: string;

	//If you want to apply conditional expression of type 'function'
	@creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:(x,y) =>{ return  x.cardType == "visa" }  ,message:'Invalid Visa Credit Card Number.' }) 
	visaCard: string;

	//If you want to apply conditional expression of type 'string'
	@creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:x => x.cardType == "visa"  ,message:'Invalid Visa Credit Card Number.' }) 
	otherVisaCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.AmericanExpress ]  ,conditionalExpression:x => x.cardType == "AmericanExpress"  }) 
	americanExpressCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.Maestro ]  ,conditionalExpression:x => x.cardType == "maestroCard" }) 
	maestroCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.JCB ]  ,conditionalExpression:x => x.cardType == "jcbCard" }) 
	jcbCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.Discover ]  ,conditionalExpression:x => x.cardType == "discoverCard" }) 
	discoverCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.MasterCard ]  ,conditionalExpression:x => x.cardType == "masterCard" }) 
	masterCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.DinersClub ]  ,conditionalExpression:x => x.cardType == "dinersClubCard" }) 
	dinersClubCard: string;

}
