const EQUAL_TO = '=';
const DOUBLE_ZERO = '00';
export function encoder(value, isEncode: boolean) {
    if (value)
        return isEncode ? btoa(value).replace(EQUAL_TO, DOUBLE_ZERO).replace(EQUAL_TO, DOUBLE_ZERO) : atob(value.replace(DOUBLE_ZERO, EQUAL_TO).replace(DOUBLE_ZERO, EQUAL_TO));
    return '';
}