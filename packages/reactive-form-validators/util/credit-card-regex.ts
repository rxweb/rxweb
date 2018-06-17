export class CreditCardRegex {

    Visa: RegExp = new RegExp('^(?:4[0-9]{12})(?:[0-9]{3})?$');

    AmericanExpress: RegExp = new RegExp('^(?:3[47][0-9]{13})$');

    Maestro: RegExp = new RegExp('^(?:(?:5[0678]\\d\\d|6304|6390|67\\d\\d)\\d{8,15})$');

    JCB: RegExp = new RegExp('^(?:(?:2131|1800|35\\d{3})\\d{11})$');

    Discover: RegExp = new RegExp('^(?:6(?:011|5[0-9]{2})(?:[0-9]{12}))$');

    DinersClub: RegExp = new RegExp('^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$');

    MasterCard: RegExp = new RegExp('^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$');
}
