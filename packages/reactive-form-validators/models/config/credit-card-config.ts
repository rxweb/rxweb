import { CreditCardType } from "../../enums/credit-card-type";

export class CreditCardConfig{
    creditCardTypes: CreditCardType[];
    message?: string;
    conditionalExpression?: string | Function;
}
