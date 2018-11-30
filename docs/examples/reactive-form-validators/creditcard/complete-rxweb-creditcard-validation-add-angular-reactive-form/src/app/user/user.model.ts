import {  creditCard, prop , CreditCardType } from "@rxweb/reactive-form-validators"
export class User {

	@prop()
	cardType: string;

	@creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpressions:x => x.cardType == "visa"  ,message:'Invalid Visa Credit Card Number.' }) 
	visaCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.AmericanExpress ]  ,conditionalExpressions:x => x.cardType == "AmericanExpress"  }) 
	americanExpressCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.maestroCard ]  ,conditionalExpressions:x => x.cardType == "maestroCard" }) 
	maestroCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.jcbCard ]  ,conditionalExpressions:x => x.cardType == "jcbCard" }) 
	jcbCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.discoverCard ]  ,conditionalExpressions:x => x.cardType == "discoverCard" }) 
	discoverCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.masterCard ]  ,conditionalExpressions:x => x.cardType == "masterCard" }) 
	masterCard: string;

	@creditCard({creditCardTypes:[ CreditCardType.dinersClubCard ]  ,conditionalExpressions:x => x.cardType == "dinersClubCard" }) 
	dinersClubCard: string;

}
