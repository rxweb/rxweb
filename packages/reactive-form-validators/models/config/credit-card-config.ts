import { CreditCardType } from "../../enums/credit-card-type";
import { BaseConfig } from './base-config'
export interface CreditCardConfig extends BaseConfig {
    creditCardTypes: CreditCardType[];
}
