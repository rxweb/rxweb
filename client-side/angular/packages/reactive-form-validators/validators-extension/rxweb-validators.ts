import {
    alphaValidatorExtension, allOfValidatorExtension, alphaNumericValidatorExtension, choiceValidatorExtension, compareValidatorExtension,
    containsValidatorExtension, creditCardValidatorExtension, differentValidatorExtension, digitValidatorExtension, emailValidatorExtension, evenValidatorExtension, factorValidatorExtension,
    greaterThanEqualToValidatorExtension, greaterThanValidatorExtension, hexColorValidatorExtension, jsonValidatorExtension, leapYearValidatorExtension, lessThanEqualToValidatorExtension,
    lessThanValidatorExtension, lowerCaseValidatorExtension, macValidatorExtension, maxDateValidatorExtension, maxLengthValidatorExtension, maxNumberValidatorExtension, minDateValidatorExtension,
    minLengthValidatorExtension, minNumberValidatorExtension, noneOfValidatorExtension, numericValidatorExtension, oddValidatorExtension, oneOfValidatorExtension, passwordcValidatorExtension,
    patternValidatorExtension, rangeValidatorExtension, requiredValidatorExtension, timeValidatorExtension, upperCaseValidatorExtension, urlValidatorExtension,
    asciiValidatorExtension,
    dataUriValidatorExtension,
    portValidatorExtension,
    latLongValidatorExtension,
    extensionValidatorExtension,
    fileSizeValidatorExtension,
    endsWithValidatorExtension,
    startsWithValidatorExtension,
    primeNumberValidatorExtension,
    latitudeValidatorExtension,
    longitudeValidatorExtension,
    composeValidatorExtension,
    fileValidatorExtension,
    customValidatorExtension,
    uniqueValidatorExtension,
    imageValidatorExtension,
    notEmptyValidatorExtension,
    ipValidatorExtension,
    cusipValidatorExtension,
    gridValidatorExtension,
    dateValidatorExtension,
    andValidatorExtension,
    orValidatorExtension,
    notValidatorExtension,
    maxTimeValidatorExtension,
    minTimeValidatorExtension,
    requiredTrueValidatorExtension,
    maskValidatorExtension, alphaAsyncValidatorExtension,
    allOfAsyncValidatorExtension, alphaNumericAsyncValidatorExtension, choiceAsyncValidatorExtension, containsAsyncValidatorExtension,
    creditCardAsyncValidatorExtension, customAsyncValidatorExtension, dateAsyncValidatorExtension, endsWithAsyncValidatorExtension,
    extensionAsyncValidatorExtension, factorAsyncValidatorExtension, fileAsyncValidatorExtension, fileSizeAsyncValidatorExtension,
    greaterThanEqualToAsyncValidatorExtension, imageAsyncValidatorExtension, ipAsyncValidatorExtension, lessThanAsyncValidatorExtension,
    lessThanEqualToAsyncValidatorExtension, maxDateAsyncValidatorExtension, maxLengthAsyncValidatorExtension, maxNumberAsyncValidatorExtension,
    maxTimeAsyncValidatorExtension, minDateAsyncValidatorExtension, minLengthAsyncValidatorExtension, minNumberAsyncValidatorExtension,
    minTimeAsyncValidatorExtension, noneOfAsyncValidatorExtension, numericAsyncValidatorExtension, oneOfAsyncValidatorExtension,
    passwordAsyncValidatorExtension, patternAsyncValidatorExtension, rangeAsyncValidatorExtension, startsWithAsyncValidatorExtension, urlAsyncValidatorExtension,
    greaterThanAsyncValidatorExtension,
    timeAsyncValidatorExtension

} from './index'

export class RxwebValidators {

    static readonly alpha = alphaValidatorExtension;
    static readonly allOf = allOfValidatorExtension;
    static readonly alphaNumeric = alphaNumericValidatorExtension;
    static readonly choice = choiceValidatorExtension;
    static readonly compare = compareValidatorExtension;
    static readonly contains = containsValidatorExtension;
    static readonly creditCard = creditCardValidatorExtension;
    static readonly different = differentValidatorExtension;
    static readonly digit = digitValidatorExtension
    static readonly email = emailValidatorExtension;
    static readonly even = evenValidatorExtension;
    static readonly factor = factorValidatorExtension;
    static readonly greaterThanEqualTo = greaterThanEqualToValidatorExtension;
    static readonly greaterThan = greaterThanValidatorExtension;
    static readonly hexColor = hexColorValidatorExtension;
    static readonly json = jsonValidatorExtension;
    static readonly leapYear = leapYearValidatorExtension;
    static readonly lessThanEqualTo = lessThanEqualToValidatorExtension;
    static readonly lessThan = lessThanValidatorExtension;
    static readonly lowerCase = lowerCaseValidatorExtension;
    static readonly mac = macValidatorExtension;
    static readonly maxDate = maxDateValidatorExtension;
    static readonly maxLength = maxLengthValidatorExtension;
    static readonly maxNumber = maxNumberValidatorExtension;
    static readonly minDate = minDateValidatorExtension;
    static readonly minLength = minLengthValidatorExtension;
    static readonly minNumber = minNumberValidatorExtension;
    static readonly noneOf = noneOfValidatorExtension;
    static readonly numeric = numericValidatorExtension;
    static readonly odd = oddValidatorExtension;
    static readonly oneOf = oneOfValidatorExtension;
    static readonly password = passwordcValidatorExtension;
    static readonly pattern = patternValidatorExtension;
    static readonly range = rangeValidatorExtension;
    static readonly required = requiredValidatorExtension;
    static readonly time = timeValidatorExtension;
    static readonly upperCase = upperCaseValidatorExtension;
    static readonly url = urlValidatorExtension;
    static readonly ascii = asciiValidatorExtension;
    static readonly dataUri = dataUriValidatorExtension;
    static readonly port = portValidatorExtension;
    static readonly latLong = latLongValidatorExtension;
    static readonly extension = extensionValidatorExtension;
    static readonly fileSize = fileSizeValidatorExtension;
    static readonly endsWith = endsWithValidatorExtension;
    static readonly startsWith = startsWithValidatorExtension;
    static readonly primeNumber = primeNumberValidatorExtension;
    static readonly latitude = latitudeValidatorExtension;
    static readonly longitude = longitudeValidatorExtension;
    static readonly compose = composeValidatorExtension;
    static readonly file = fileValidatorExtension;
    static readonly custom = customValidatorExtension;
    static readonly unique = uniqueValidatorExtension;
    static readonly image = imageValidatorExtension;
    static readonly notEmpty = notEmptyValidatorExtension;
    static readonly ip = ipValidatorExtension;
    static readonly cusip = cusipValidatorExtension;
    static readonly grid = gridValidatorExtension;
    static readonly date = dateValidatorExtension;
    static readonly and = andValidatorExtension;
    static readonly or = orValidatorExtension;
    static readonly not = notValidatorExtension;
    static readonly minTime = minTimeValidatorExtension;
    static readonly maxTime = maxTimeValidatorExtension;
    static readonly requiredTrue = requiredTrueValidatorExtension;
    static readonly mask = maskValidatorExtension;
    static readonly alphaAsync = alphaAsyncValidatorExtension;
    static readonly alphaNumericAsync = alphaNumericAsyncValidatorExtension;
    static readonly allOfAsync = allOfAsyncValidatorExtension;
    static readonly choiceAsync = choiceAsyncValidatorExtension;
    static readonly containsAsync = containsAsyncValidatorExtension;
    static readonly creditCardAsync = creditCardAsyncValidatorExtension;
    static readonly customAsync = customAsyncValidatorExtension;
    static readonly dateAsync = dateAsyncValidatorExtension;
    static readonly endsWithAsync = endsWithAsyncValidatorExtension;
    static readonly extensionAsync = extensionAsyncValidatorExtension;
    static readonly factorAsync = factorAsyncValidatorExtension;
    static readonly fileSizeAsync = fileSizeAsyncValidatorExtension;
    static readonly fileAsync = fileAsyncValidatorExtension;
    static readonly greaterThanEqualToAsync = greaterThanEqualToAsyncValidatorExtension;
    static readonly greaterThanAsync = greaterThanAsyncValidatorExtension;
    static readonly imageAsync = imageAsyncValidatorExtension;
    static readonly ipAsync = ipAsyncValidatorExtension;
    static readonly lessThanEqualToAsync = lessThanEqualToAsyncValidatorExtension;
    static readonly lessThanAsync = lessThanAsyncValidatorExtension;
    static readonly maxDateAsync = maxDateAsyncValidatorExtension;
    static readonly maxLengthAsync = maxLengthAsyncValidatorExtension;
    static readonly maxNumberAsync = maxNumberAsyncValidatorExtension;
    static readonly maxTimeAsync = maxTimeAsyncValidatorExtension;
    static readonly minDateAsync = minDateAsyncValidatorExtension;
    static readonly minLengthAsync = minLengthAsyncValidatorExtension;
    static readonly minNumberAsync = minNumberAsyncValidatorExtension;
    static readonly minTimeAsync = minTimeAsyncValidatorExtension;
    static readonly noneOfAsync = noneOfAsyncValidatorExtension;
    static readonly numericAsync = numericAsyncValidatorExtension;
    static readonly oneOfAsync = oneOfAsyncValidatorExtension;
    static readonly passwordAsync = passwordAsyncValidatorExtension;
    static readonly patternAsync = patternAsyncValidatorExtension;
    static readonly rangeAsync = rangeAsyncValidatorExtension;
    static readonly startsWithAsync = startsWithAsyncValidatorExtension;
    static readonly timeAsync = timeAsyncValidatorExtension;
    static readonly urlAsync = urlAsyncValidatorExtension;
}
