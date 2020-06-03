export function isFormData(formValue:any) {
    return typeof FormData !== 'undefined' && formValue instanceof FormData;
}

export function isBlob(formValue: any) {
    return typeof Blob !== 'undefined' && formValue instanceof Blob;
}

export function isArrayBuffer(formValue: any) {
    return typeof ArrayBuffer !== 'undefined' && formValue instanceof ArrayBuffer;
}

//copied from : https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
export function extractHeaders(headers:any) {

    var arr = headers.trim().split(/[\r\n]+/);
    var headerMap = {};

    arr.forEach(function (line) {
        var parts = line.split(': ');
        var header = parts.shift();
        var value = parts.join(': ');
        headerMap[header] = value;
    });
    return headerMap;
}

