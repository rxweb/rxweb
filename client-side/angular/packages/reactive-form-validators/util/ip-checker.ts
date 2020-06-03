import { RegexValidator } from "./regex-validator";
import { RegExRule } from "./regex-rules";
export function checkIpV4(value) {
  let isValid = RegexValidator.isValid(value, RegExRule.ipV4);
  if (isValid) {
    const splitDots = value.split('.');
    for (let ipNum of splitDots) {
      isValid = ipNum <= 255;
      if (!isValid)
        break;
    }
  }
  return isValid;
}


export function checkIpV6(value) {
  return RegexValidator.isValid(value, RegExRule.ipV6);
}
