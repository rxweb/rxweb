export function labelChecker(nativeElement: any, options: {
    count: number,
    innerText: string,
    index: number,
    display: string
}) {
    let labelElements = nativeElement.getElementsByTagName("label");
    expect(labelElements.length).toEqual(options.count);
    expect(labelElements[options.index].innerText).toEqual(options.innerText);
    expect(labelElements[options.index].style.display).toEqual(options.display);
}

export function descriptionChecker(nativeElement: any, options: {
    count: number,
    textContent: string,
    index: number,
    display: string
}) {
    let smallElements = nativeElement.getElementsByTagName("small");
    expect(smallElements.length).toEqual(options.count);
    expect(smallElements[options.index].textContent).toEqual(options.textContent);
    expect(smallElements[options.index].style.display).toEqual(options.display);
}

export function readonlyChecker(nativeElement: any, options: {
    count: number,
    readonly: boolean,
    index: number
}) {
    let inputElements = nativeElement.getElementsByTagName("input");
    expect(inputElements.length).toEqual(options.count);
    expect(inputElements[options.index].readOnly).toEqual(options.readonly);
}

export function placeholderChecker(nativeElement: any, options: {
    count: number,
    placeholder: string,
    index: number
}) {
    let inputElements = nativeElement.getElementsByTagName("input");
    expect(inputElements.length).toEqual(options.count);
    expect(inputElements[options.index].placeholder).toEqual(options.placeholder);
}

export function hideChecker(nativeElement: any, options: {
    count: number,
    display?:string,
    index: number,
    tagName: string
}) {
    let elements = nativeElement.getElementsByTagName(options.tagName);
    expect(elements.length).toEqual(options.count);
    if(options.display !== undefined)
    expect(elements[options.index].style.display).toEqual(options.display);
}

export function selectChecker(nativeElement: any, options: {
    count: number,
    optionsCount:number,
    index: number,
    tagName: string
    selectValue?:any,
}) {
    let elements = nativeElement.getElementsByTagName(options.tagName);
    expect(elements.length).toEqual(options.count);
    expect(elements[options.index].options.length).toEqual(options.optionsCount+1);
    if (options.selectValue)
        expect(elements[options.index].value).toEqual(options.selectValue);
}