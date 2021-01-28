const EQUAL_TO = '=';
const UNDERSCORE = "_";
export function encoder(value, isEncode: boolean) {
    if (value)
        return isEncode ? btoa(value).replace(EQUAL_TO, UNDERSCORE).replace(EQUAL_TO, UNDERSCORE) : atob(value.replace(UNDERSCORE, EQUAL_TO).replace(UNDERSCORE, EQUAL_TO));
    return '';
}