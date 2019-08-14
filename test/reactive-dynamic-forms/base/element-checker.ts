export function notFoundElementByTagName(parentElement, tagName) {
    return parentElement.querySelector(tagName) == undefined;
}


export function getElement(parentElement,tagName) {
    return parentElement.querySelector(tagName)
}

export function elementAttributeCheck(element, keyName:string,value:any) {
    return element[keyName] == value;
}