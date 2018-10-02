import {  creditCard,prop, CreditCardType,} from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	cardType: string;
	@creditCard({creditCardTypes:[ CreditCardType.DinersClub ]  ,conditionalExpressions:x => x.cardType == "dinersClubCard" }) 
	dinersClubCard: string;
}
