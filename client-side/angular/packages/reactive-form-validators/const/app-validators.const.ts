import {
  alphaNumericValidator, alphaValidator, compareValidator, emailValidator, hexColorValidator, lowercaseValidator,
  maxDateValidator, maxNumberValidator, minDateValidator, minNumberValidator, containsValidator, uppercaseValidator,
  rangeValidator, patternValidator, requiredValidator, creditCardValidator, digitValidator,
  maxLengthValidator, minLengthValidator, passwordValidator, timeValidator, urlValidator, jsonValidator,
  greaterThanEqualToValidator, greaterThanValidator, lessThanEqualToValidator, lessThanValidator,
  choiceValidator, differentValidator, numericValidator, evenValidator, oddValidator, factorValidator, leapYearValidator, allOfValidator, oneOfValidator, noneOfValidator, macValidator,
  asciiValidator,
  dataUriValidator,
  portValidator,
  latLongValidator,
  extensionValidator,
  fileSizeValidator,
  endsWithValidator,
  startsWithValidator,
  primeNumberValidator,
  latitudeValidator,
  longitudeValidator, composeValidator, ruleValidator, fileValidator, uniqueValidator, imageValidator, notEmptyValidator, ipValidator, cusipValidator
  , gridValidator,
  dateValidator,
  minTimeValidator,
    maxTimeValidator,
    requiredTrueValidator, maskValidator,
    ibanValidator
} from '../reactive-form-validators/index';

export const APP_VALIDATORS: { [key: string]: Function } = {
  "alphaNumeric": alphaNumericValidator,
  "alpha": alphaValidator,
  "compare": compareValidator,
  "email": emailValidator,
  "hexColor": hexColorValidator,
  "lowerCase": lowercaseValidator,
  "maxDate": maxDateValidator,
  "maxNumber": maxNumberValidator,
  "minDate": minDateValidator,
  "minNumber": minNumberValidator,
  "contains": containsValidator,
  "upperCase": uppercaseValidator,
  "maxLength": maxLengthValidator,
  "minLength": minLengthValidator,
  "password": passwordValidator,
  "range": rangeValidator,
  "required": requiredValidator,
  "creditCard": creditCardValidator,
  "digit": digitValidator,
  "pattern": patternValidator,
  "time": timeValidator,
  "url": urlValidator,
  "json": jsonValidator,
  "greaterThan": greaterThanValidator,
  "greaterThanEqualTo": greaterThanEqualToValidator,
  "lessThan": lessThanValidator,
  "lessThanEqualTo": lessThanEqualToValidator,
  "choice": choiceValidator,
  "different": differentValidator,
  "numeric": numericValidator,
  "even": evenValidator,
  "odd": oddValidator,
  "factor": factorValidator,
  "leapYear": leapYearValidator,
  "allOf": allOfValidator,
  "oneOf": oneOfValidator,
  "noneOf": noneOfValidator,
  "mac": macValidator,
  "ascii": asciiValidator,
  "dataUri": dataUriValidator,
  "port": portValidator,
  "latLong": latLongValidator,
  "extension": extensionValidator,
  "fileSize": fileSizeValidator,
  "endsWith": endsWithValidator,
  "startsWith": startsWithValidator,
  "primeNumber": primeNumberValidator,
  "latitude": latitudeValidator,
  "longitude": longitudeValidator,
  "compose": composeValidator,
  "rule": ruleValidator,
  "file": fileValidator,
  "unique": uniqueValidator,
  "image": imageValidator,
  "notEmpty": notEmptyValidator,
  "ip": ipValidator,
  "cusip": cusipValidator,
    "grid":gridValidator,
    "date": dateValidator,
    "minTime": minTimeValidator,
    "maxTime": maxTimeValidator,
    "requiredTrue": requiredTrueValidator,
    "mask": maskValidator,
    "iban": ibanValidator
}
