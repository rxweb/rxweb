import {  creditCard,prop, CreditCardType,} from "@rxweb/reactive-form-validators"

export class User {

	@creditCard({creditCardTypes:[ CreditCardType.DinersClub ]  ,conditionalExpressions:x => x.cardType == "dinersClubCard" }) 
	dinersClubCard: string;
}
