/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Parses string representation of a style and converts it into object literal.
 *
 * @param value string representation of style as used in the `style` attribute in HTML.
 *   Example: `color: red; height: auto`.
 * @returns an object literal. `{ color: 'red', height: 'auto'}`.
 */
export function parseStyle(value) {
    var styles = {};
    var i = 0;
    var parenDepth = 0;
    var quote = 0 /* QuoteNone */;
    var valueStart = 0;
    var propStart = 0;
    var currentProp = null;
    var valueHasQuotes = false;
    while (i < value.length) {
        var token = value.charCodeAt(i++);
        switch (token) {
            case 40 /* OpenParen */:
                parenDepth++;
                break;
            case 41 /* CloseParen */:
                parenDepth--;
                break;
            case 39 /* QuoteSingle */:
                // valueStart needs to be there since prop values don't
                // have quotes in CSS
                valueHasQuotes = valueHasQuotes || valueStart > 0;
                if (quote === 0 /* QuoteNone */) {
                    quote = 39 /* QuoteSingle */;
                }
                else if (quote === 39 /* QuoteSingle */ && value.charCodeAt(i - 1) !== 92 /* BackSlash */) {
                    quote = 0 /* QuoteNone */;
                }
                break;
            case 34 /* QuoteDouble */:
                // same logic as above
                valueHasQuotes = valueHasQuotes || valueStart > 0;
                if (quote === 0 /* QuoteNone */) {
                    quote = 34 /* QuoteDouble */;
                }
                else if (quote === 34 /* QuoteDouble */ && value.charCodeAt(i - 1) !== 92 /* BackSlash */) {
                    quote = 0 /* QuoteNone */;
                }
                break;
            case 58 /* Colon */:
                if (!currentProp && parenDepth === 0 && quote === 0 /* QuoteNone */) {
                    currentProp = hyphenate(value.substring(propStart, i - 1).trim());
                    valueStart = i;
                }
                break;
            case 59 /* Semicolon */:
                if (currentProp && valueStart > 0 && parenDepth === 0 && quote === 0 /* QuoteNone */) {
                    var styleVal = value.substring(valueStart, i - 1).trim();
                    styles[currentProp] = valueHasQuotes ? stripUnnecessaryQuotes(styleVal) : styleVal;
                    propStart = i;
                    valueStart = 0;
                    currentProp = null;
                    valueHasQuotes = false;
                }
                break;
        }
    }
    if (currentProp && valueStart) {
        var styleVal = value.substr(valueStart).trim();
        styles[currentProp] = valueHasQuotes ? stripUnnecessaryQuotes(styleVal) : styleVal;
    }
    return styles;
}
export function stripUnnecessaryQuotes(value) {
    var qS = value.charCodeAt(0);
    var qE = value.charCodeAt(value.length - 1);
    if (qS == qE && (qS == 39 /* QuoteSingle */ || qS == 34 /* QuoteDouble */)) {
        var tempValue = value.substring(1, value.length - 1);
        // special case to avoid using a multi-quoted string that was just chomped
        // (e.g. `font-family: "Verdana", "sans-serif"`)
        if (tempValue.indexOf('\'') == -1 && tempValue.indexOf('"') == -1) {
            value = tempValue;
        }
    }
    return value;
}
export function hyphenate(value) {
    return value.replace(/[a-z][A-Z]/g, function (v) {
        return v.charAt(0) + '-' + v.charAt(1);
    }).toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3ZpZXcvc3R5bGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFjSDs7Ozs7O0dBTUc7QUFDSCxNQUFNLHFCQUFxQixLQUFhO0lBQ3RDLElBQU0sTUFBTSxHQUF5QixFQUFFLENBQUM7SUFFeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLElBQUksS0FBSyxvQkFBdUIsQ0FBQztJQUNqQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksV0FBVyxHQUFnQixJQUFJLENBQUM7SUFDcEMsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDdkIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBUyxDQUFDO1FBQzVDLFFBQVEsS0FBSyxFQUFFO1lBQ2I7Z0JBQ0UsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtZQUNSO2dCQUNFLFVBQVUsRUFBRSxDQUFDO2dCQUNiLE1BQU07WUFDUjtnQkFDRSx1REFBdUQ7Z0JBQ3ZELHFCQUFxQjtnQkFDckIsY0FBYyxHQUFHLGNBQWMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEtBQUssc0JBQW1CLEVBQUU7b0JBQzVCLEtBQUssdUJBQW1CLENBQUM7aUJBQzFCO3FCQUFNLElBQUksS0FBSyx5QkFBcUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsdUJBQW1CLEVBQUU7b0JBQ25GLEtBQUssb0JBQWlCLENB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Q0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmNvbnN0IGVudW0gQ2hhciB7XG4gIE9wZW5QYXJlbiA9IDQwLFxuICBDbG9zZVBhcmVuID0gNDEsXG4gIENvbG9uID0gNTgsXG4gIFNlbWljb2xvbiA9IDU5LFxuICBCYWNrU2xhc2ggPSA5MixcbiAgUXVvdGVOb25lID0gMCwgIC8vIGluZGljYXRpbmcgd2UgYXJlIG5vdCBpbnNpZGUgYSBxdW90ZVxuICBRdW90ZURvdWJsZSA9IDM0LFxuICBRdW90ZVNpbmdsZSA9IDM5LFxufVxuXG5cbi8qKlxuICogUGFyc2VzIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHN0eWxlIGFuZCBjb252ZXJ0cyBpdCBpbnRvIG9iamVjdCBsaXRlcmFsLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2Ygc3R5bGUgYXMgdXNlZCBpbiB0aGUgYHN0eWxlYCBhdHRyaWJ1dGUgaW4gSFRNTC5cbiAqICAgRXhhbXBsZTogYGNvbG9yOiByZWQ7IGhlaWdodDogYXV0b2AuXG4gKiBAcmV0dXJucyBhbiBvYmplY3QgbGl0ZXJhbC4gYHsgY29sb3I6ICdyZWQnLCBoZWlnaHQ6ICdhdXRvJ31gLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdHlsZSh2YWx1ZTogc3RyaW5nKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBzdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgbGV0IGkgPSAwO1xuICBsZXQgcGFyZW5EZXB0aCA9IDA7XG4gIGxldCBxdW90ZTogQ2hhciA9IENoYXIuUXVvdGVOb25lO1xuICBsZXQgdmFsdWVTdGFydCA9IDA7XG4gIGxldCBwcm9wU3RhcnQgPSAwO1xuICBsZXQgY3VycmVudFByb3A6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgbGV0IHZhbHVlSGFzUXVvdGVzID0gZmFsc2U7XG4gIHdoaWxlIChpIDwgdmFsdWUubGVuZ3RoKSB7XG4gICAgY29uc3QgdG9rZW4gPSB2YWx1ZS5jaGFyQ29kZUF0KGkrKykgYXMgQ2hhcjtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIENoYXIuT3BlblBhcmVuOlxuICAgICAgICBwYXJlbkRlcHRoKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDaGFyLkNsb3NlUGFyZW46XG4gICAgICAgIHBhcmVuRGVwdGgtLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENoYXIuUXVvdGVTaW5nbGU6XG4gICAgICAgIC8vIHZhbHVlU3RhcnQgbmVlZHMgdG8gYmUgdGhlcmUgc2luY2UgcHJvcCB2YWx1ZXMgZG9uJ3RcbiAgICAgICAgLy8gaGF2ZSBxdW90ZXMgaW4gQ1NTXG4gICAgICAgIHZhbHVlSGFzUXVvdGVzID0gdmFsdWVIYXNRdW90ZXMgfHwgdmFsdWVTdGFydCA+IDA7XG4gICAgICAgIGlmIChxdW90ZSA9PT0gQ2hhci5RdW90ZU5vbmUpIHtcbiAgICAgICAgICBxdW90ZSA9IENoYXIuUXVvdGVTaW5nbGU7XG4gICAgICAgIH0gZWxzZSBpZiAocXVvdGUgPT09IENoYXIuUXVvdGVTaW5nbGUgJiYgdmFsdWUuY2hhckNvZGVBdChpIC0gMSkgIT09IENoYXIuQmFja1NsYXNoKSB7XG4gICAgICAgICAgcXVvdGUgPSBDaGFyLlF1b3RlTm9uZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2hhci5RdW90ZURvdWJsZTpcbiAgICAgICAgLy8gc2FtZSBsb2dpYyBhcyBhYm92ZVxuICAgICAgICB2YWx1ZUhhc1F1b3RlcyA9IHZhbHVlSGFzUXVvdGVzIHx8IHZhbHVlU3RhcnQgPiAwO1xuICAgICAgICBpZiAocXVvdGUgPT09IENoYXIuUXVvdGVOb25lKSB7XG4gICAgICAgICAgcXVvdGUgPSBDaGFyLlF1b3RlRG91YmxlO1xuICAgICAgICB9IGVsc2UgaWYgKHF1b3RlID09PSBDaGFyLlF1b3RlRG91YmxlICYmIHZhbHVlLmNoYXJDb2RlQXQoaSAtIDEpICE9PSBDaGFyLkJhY2tTbGFzaCkge1xuICAgICAgICAgIHF1b3RlID0gQ2hhci5RdW90ZU5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENoYXIuQ29sb246XG4gICAgICAgIGlmICghY3VycmVudFByb3AgJiYgcGFyZW5EZXB0aCA9PT0gMCAmJiBxdW90ZSA9PT0gQ2hhci5RdW90ZU5vbmUpIHtcbiAgICAgICAgICBjdXJyZW50UHJvcCA9IGh5cGhlbmF0ZSh2YWx1ZS5zdWJzdHJpbmcocHJvcFN0YXJ0LCBpIC0gMSkudHJpbSgpKTtcbiAgICAgICAgICB2YWx1ZVN0YXJ0ID0gaTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2hhci5TZW1pY29sb246XG4gICAgICAgIGlmIChjdXJyZW50UHJvcCAmJiB2YWx1ZVN0YXJ0ID4gMCAmJiBwYXJlbkRlcHRoID09PSAwICYmIHF1b3RlID09PSBDaGFyLlF1b3RlTm9uZSkge1xuICAgICAgICAgIGNvbnN0IHN0eWxlVmFsID0gdmFsdWUuc3Vic3RyaW5nKHZhbHVlU3RhcnQsIGkgLSAxKS50cmltKCk7XG4gICAgICAgICAgc3R5bGVzW2N1cnJlbnRQcm9wXSA9IHZhbHVlSGFzUXVvdGVzID8gc3RyaXBVbm5lY2Vzc2FyeVF1b3RlcyhzdHlsZVZhbCkgOiBzdHlsZVZhbDtcbiAgICAgICAgICBwcm9wU3RhcnQgPSBpO1xuICAgICAgICAgIHZhbHVlU3RhcnQgPSAwO1xuICAgICAgICAgIGN1cnJlbnRQcm9wID0gbnVsbDtcbiAgICAgICAgICB2YWx1ZUhhc1F1b3RlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjdXJyZW50UHJvcCAmJiB2YWx1ZVN0YXJ0KSB7XG4gICAgY29uc3Qgc3R5bGVWYWwgPSB2YWx1ZS5zdWJzdHIodmFsdWVTdGFydCkudHJpbSgpO1xuICAgIHN0eWxlc1tjdXJyZW50UHJvcF0gPSB2YWx1ZUhhc1F1b3RlcyA/IHN0cmlwVW5uZWNlc3NhcnlRdW90ZXMoc3R5bGVWYWwpIDogc3R5bGVWYWw7XG4gIH1cblxuICByZXR1cm4gc3R5bGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaXBVbm5lY2Vzc2FyeVF1b3Rlcyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgcVMgPSB2YWx1ZS5jaGFyQ29kZUF0KDApO1xuICBjb25zdCBxRSA9IHZhbHVlLmNoYXJDb2RlQXQodmFsdWUubGVuZ3RoIC0gMSk7XG4gIGlmIChxUyA9PSBxRSAmJiAocVMgPT0gQ2hhci5RdW90ZVNpbmdsZSB8fCBxUyA9PSBDaGFyLlF1b3RlRG91YmxlKSkge1xuICAgIGNvbnN0IHRlbXBWYWx1ZSA9IHZhbHVlLnN1YnN0cmluZygxLCB2YWx1ZS5sZW5ndGggLSAxKTtcbiAgICAvLyBzcGVjaWFsIGNhc2UgdG8gYXZvaWQgdXNpbmcgYSBtdWx0aS1xdW90ZWQgc3RyaW5nIHRoYXQgd2FzIGp1c3QgY2hvbXBlZFxuICAgIC8vIChlLmcuIGBmb250LWZhbWlseTogXCJWZXJkYW5hXCIsIFwic2Fucy1zZXJpZlwiYClcbiAgICBpZiAodGVtcFZhbHVlLmluZGV4T2YoJ1xcJycpID09IC0xICYmIHRlbXBWYWx1ZS5pbmRleE9mKCdcIicpID09IC0xKSB7XG4gICAgICB2YWx1ZSA9IHRlbXBWYWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHlwaGVuYXRlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW2Etel1bQS1aXS9nLCB2ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi5jaGFyQXQoMCkgKyAnLScgKyB2LmNoYXJBdCgxKTtcbiAgICAgICAgICAgICAgfSkudG9Mb3dlckNhc2UoKTtcbn1cbiJdfQ==