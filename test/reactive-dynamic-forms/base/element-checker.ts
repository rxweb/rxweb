export function notFoundElementByTagName(parentElement, tagName) {
    return parentElement.querySelector(tagName) == undefined;
}


export function getElement(parentElement,tagName) {
    return parentElement.querySelector(tagName)
}

export function getElements(parentElement, tagName) {
    return parentElement.querySelectorAll(tagName)
}

export function elementAttributeCheck(element, keyName:string,value:any) {
    return element[keyName] == value;
}

export function getElementValue(parentElement, tagName) {
    return parentElement.querySelector(tagName).value;
}

export function getElementsByClassName(parentElement, className) {
    return parentElement.getElementsByClassName(className);
}