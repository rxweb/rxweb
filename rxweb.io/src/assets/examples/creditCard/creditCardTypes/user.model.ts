import {  creditCard,prop, CreditCardType,} from "@rxweb/reactive-form-validators"

export class User {

	@creditCard({creditCardTypes:[ CreditCardType.DinersClub ]  ,conditionalExpression:x => x.cardType == "dinersClubCard" }) 
	dinersClubCard: string;
}
