export function isObject(value:string) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
