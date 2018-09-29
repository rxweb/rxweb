/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵparseCookieValue as parseCookieValue } from '@angular/common';
import { ɵglobal as global } from '@angular/core';
import { setRootDomAdapter } from '../dom/dom_adapter';
import { GenericBrowserDomAdapter } from './generic_browser_adapter';
/** @type {?} */
const _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex',
};
/** @type {?} */
const DOM_KEY_LOCATION_NUMPAD = 3;
/** @type {?} */
const _keyMap = {
    // The following values are here for cross-browser compatibility and to match the W3C standard
    // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS'
};
/** @type {?} */
const _chromeNumKeyPadMap = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9',
    'J': '*',
    'K': '+',
    'M': '-',
    'N': '.',
    'O': '/',
    '\x60': '0',
    '\x90': 'NumLock'
};
/** @type {?} */
let nodeContains;
if (global['Node']) {
    nodeContains = global['Node'].prototype.contains || function (node) {
        return !!(this.compareDocumentPosition(node) & 16);
    };
}
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
export class BrowserDomAdapter extends GenericBrowserDomAdapter {
    /**
     * @param {?} templateHtml
     * @return {?}
     */
    parse(templateHtml) { throw new Error('parse not implemented'); }
    /**
     * @return {?}
     */
    static makeCurrent() { setRootDomAdapter(new BrowserDomAdapter()); }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    hasProperty(element, name) { return name in element; }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setProperty(el, name, value) { (/** @type {?} */ (el))[name] = value; }
    /**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */
    getProperty(el, name) { return (/** @type {?} */ (el))[name]; }
    /**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */
    invoke(el, methodName, args) { (/** @type {?} */ (el))[methodName](...args); }
    /**
     * @param {?} error
     * @return {?}
     */
    logError(error) {
        if (window.console) {
            if (console.error) {
                console.error(error);
            }
            else {
                console.log(error);
            }
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    log(error) {
        if (window.console) {
            window.console.log && window.console.log(error);
        }
    }
    /**
     * @param {?} error
     * @return {?}
     */
    logGroup(error) {
        if (window.console) {
            window.console.group && window.console.group(error);
        }
    }
    /**
     * @return {?}
     */
    logGroupEnd() {
        if (window.console) {
            window.console.groupEnd && window.console.groupEnd();
        }
    }
    /**
     * @return {?}
     */
    get attrToPropMap() { return _attrToPropMap; }
    /**
     * @param {?} nodeA
     * @param {?} nodeB
     * @return {?}
     */
    contains(nodeA, nodeB) { return nodeContains.call(nodeA, nodeB); }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelector(el, selector) { return el.querySelector(selector); }
    /**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */
    querySelectorAll(el, selector) { return el.querySelectorAll(selector); }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    on(el, evt, listener) { el.addEventListener(evt, listener, false); }
    /**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */
    onAndCancel(el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return () => { el.removeEventListener(evt, listener, false); };
    }
    /**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */
    dispatchEvent(el, evt) { el.dispatchEvent(evt); }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createMouseEvent(eventType) {
        /** @type {?} */
        const evt = this.getDefaultDocument().createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    /**
     * @param {?} eventType
     * @return {?}
     */
    createEvent(eventType) {
        /** @type {?} */
        const evt = this.getDefaultDocument().createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    preventDefault(evt) {
        evt.preventDefault();
        evt.returnValue = false;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    isPrevented(evt) {
        return evt.defaultPrevented || evt.returnValue != null && !evt.returnValue;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getInnerHTML(el) { return el.innerHTML; }
    /**
     * @param {?} el
     * @return {?}
     */
    getTemplateContent(el) {
        return 'content' in el && this.isTemplateElement(el) ? (/** @type {?} */ (el)).content : null;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    getOuterHTML(el) { return el.outerHTML; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeName(node) { return node.nodeName; }
    /**
     * @param {?} node
     * @return {?}
     */
    nodeValue(node) { return node.nodeValue; }
    /**
     * @param {?} node
     * @return {?}
     */
    type(node) { return node.type; }
    /**
     * @param {?} node
     * @return {?}
     */
    content(node) {
        if (this.hasProperty(node, 'content')) {
            return (/** @type {?} */ (node)).content;
        }
        else {
            return node;
        }
    }
    /**
     * @param {?} el
     * @return {?}
     */
    firstChild(el) { return el.firstChild; }
    /**
     * @param {?} el
     * @return {?}
     */
    nextSibling(el) { return el.nextSibling; }
    /**
     * @param {?} el
     * @return {?}
     */
    parentElement(el) { return el.parentNode; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodes(el) { return el.childNodes; }
    /**
     * @param {?} el
     * @return {?}
     */
    childNodesAsList(el) {
        /** @type {?} */
        const childNodes = el.childNodes;
        /** @type {?} */
        const res = new Array(childNodes.length);
        for (let i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    clearNodes(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    appendChild(el, node) { el.appendChild(node); }
    /**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */
    removeChild(el, node) { el.removeChild(node); }
    /**
     * @param {?} el
     * @param {?} newChild
     * @param {?} oldChild
     * @return {?}
     */
    replaceChild(el, newChild, oldChild) { el.replaceChild(newChild, oldChild); }
    /**
     * @param {?} node
     * @return {?}
     */
    remove(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    insertBefore(parent, ref, node) { parent.insertBefore(node, ref); }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */
    insertAllBefore(parent, ref, nodes) {
        nodes.forEach((n) => parent.insertBefore(n, ref));
    }
    /**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */
    insertAfter(parent, ref, node) { parent.insertBefore(node, ref.nextSibling); }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setInnerHTML(el, value) { el.innerHTML = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getText(el) { return el.textContent; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setText(el, value) { el.textContent = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getValue(el) { return el.value; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setValue(el, value) { el.value = value; }
    /**
     * @param {?} el
     * @return {?}
     */
    getChecked(el) { return el.checked; }
    /**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */
    setChecked(el, value) { el.checked = value; }
    /**
     * @param {?} text
     * @return {?}
     */
    createComment(text) { return this.getDefaultDocument().createComment(text); }
    /**
     * @param {?} html
     * @return {?}
     */
    createTemplate(html) {
        /** @type {?} */
        const t = this.getDefaultDocument().createElement('template');
        t.innerHTML = html;
        return t;
    }
    /**
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElement(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
    }
    /**
     * @param {?} ns
     * @param {?} tagName
     * @param {?=} doc
     * @return {?}
     */
    createElementNS(ns, tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElementNS(ns, tagName);
    }
    /**
     * @param {?} text
     * @param {?=} doc
     * @return {?}
     */
    createTextNode(text, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createTextNode(text);
    }
    /**
     * @param {?} attrName
     * @param {?} attrValue
     * @param {?=} doc
     * @return {?}
     */
    createScriptTag(attrName, attrValue, doc) {
        doc = doc || this.getDefaultDocument();
        /** @type {?} */
        const el = /** @type {?} */ (doc.createElement('SCRIPT'));
        el.setAttribute(attrName, attrValue);
        return el;
    }
    /**
     * @param {?} css
     * @param {?=} doc
     * @return {?}
     */
    createStyleElement(css, doc) {
        doc = doc || this.getDefaultDocument();
        /** @type {?} */
        const style = /** @type {?} */ (doc.createElement('style'));
        this.appendChild(style, this.createTextNode(css, doc));
        return style;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    createShadowRoot(el) { return (/** @type {?} */ (el)).createShadowRoot(); }
    /**
     * @param {?} el
     * @return {?}
     */
    getShadowRoot(el) { return (/** @type {?} */ (el)).shadowRoot; }
    /**
     * @param {?} el
     * @return {?}
     */
    getHost(el) { return (/** @type {?} */ (el)).host; }
    /**
     * @param {?} node
     * @return {?}
     */
    clone(node) { return node.cloneNode(true); }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByClassName(element, name) {
        return element.getElementsByClassName(name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getElementsByTagName(element, name) {
        return element.getElementsByTagName(name);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    classList(element) { return Array.prototype.slice.call(element.classList, 0); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    addClass(element, className) { element.classList.add(className); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    removeClass(element, className) { element.classList.remove(className); }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    hasClass(element, className) {
        return element.classList.contains(className);
    }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    setStyle(element, styleName, styleValue) {
        element.style[styleName] = styleValue;
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */
    removeStyle(element, stylename) {
        // IE requires '' instead of null
        // see https://github.com/angular/angular/issues/7916
        element.style[stylename] = '';
    }
    /**
     * @param {?} element
     * @param {?} stylename
     * @return {?}
     */
    getStyle(element, stylename) { return element.style[stylename]; }
    /**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */
    hasStyle(element, styleName, styleValue) {
        /** @type {?} */
        const value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    tagName(element) { return element.tagName; }
    /**
     * @param {?} element
     * @return {?}
     */
    attributeMap(element) {
        /** @type {?} */
        const res = new Map();
        /** @type {?} */
        const elAttrs = element.attributes;
        for (let i = 0; i < elAttrs.length; i++) {
            /** @type {?} */
            const attrib = elAttrs.item(i);
            res.set(attrib.name, attrib.value);
        }
        return res;
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    hasAttribute(element, attribute) {
        return element.hasAttribute(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */
    hasAttributeNS(element, ns, attribute) {
        return element.hasAttributeNS(ns, attribute);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    getAttribute(element, attribute) {
        return element.getAttribute(attribute);
    }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    getAttributeNS(element, ns, name) {
        return element.getAttributeNS(ns, name);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttribute(element, name, value) { element.setAttribute(name, value); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setAttributeNS(element, ns, name, value) {
        element.setAttributeNS(ns, name, value);
    }
    /**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */
    removeAttribute(element, attribute) { element.removeAttribute(attribute); }
    /**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */
    removeAttributeNS(element, ns, name) {
        element.removeAttributeNS(ns, name);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    templateAwareRoot(el) { return this.isTemplateElement(el) ? this.content(el) : el; }
    /**
     * @return {?}
     */
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    /**
     * @return {?}
     */
    getDefaultDocument() { return document; }
    /**
     * @param {?} el
     * @return {?}
     */
    getBoundingClientRect(el) {
        try {
            return el.getBoundingClientRect();
        }
        catch (e) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTitle(doc) { return doc.title; }
    /**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */
    setTitle(doc, newTitle) { doc.title = newTitle || ''; }
    /**
     * @param {?} n
     * @param {?} selector
     * @return {?}
     */
    elementMatches(n, selector) {
        if (this.isElementNode(n)) {
            return n.matches && n.matches(selector) ||
                n.msMatchesSelector && n.msMatchesSelector(selector) ||
                n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
        }
        return false;
    }
    /**
     * @param {?} el
     * @return {?}
     */
    isTemplateElement(el) {
        return this.isElementNode(el) && el.nodeName === 'TEMPLATE';
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isTextNode(node) { return node.nodeType === Node.TEXT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isCommentNode(node) { return node.nodeType === Node.COMMENT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    isElementNode(node) { return node.nodeType === Node.ELEMENT_NODE; }
    /**
     * @param {?} node
     * @return {?}
     */
    hasShadowRoot(node) {
        return node.shadowRoot != null && node instanceof HTMLElement;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isShadowRoot(node) { return node instanceof DocumentFragment; }
    /**
     * @param {?} node
     * @return {?}
     */
    importIntoDoc(node) { return document.importNode(this.templateAwareRoot(node), true); }
    /**
     * @param {?} node
     * @return {?}
     */
    adoptNode(node) { return document.adoptNode(node); }
    /**
     * @param {?} el
     * @return {?}
     */
    getHref(el) { return /** @type {?} */ ((el.getAttribute('href'))); }
    /**
     * @param {?} event
     * @return {?}
     */
    getEventKey(event) {
        /** @type {?} */
        let key = event.key;
        if (key == null) {
            key = event.keyIdentifier;
            // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
            // Safari cf
            // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
            if (key == null) {
                return 'Unidentified';
            }
            if (key.startsWith('U+')) {
                key = String.fromCharCode(parseInt(key.substring(2), 16));
                if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                    // There is a bug in Chrome for numeric keypad keys:
                    // https://code.google.com/p/chromium/issues/detail?id=155654
                    // 1, 2, 3 ... are reported as A, B, C ...
                    key = (/** @type {?} */ (_chromeNumKeyPadMap))[key];
                }
            }
        }
        return _keyMap[key] || key;
    }
    /**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */
    getGlobalEventTarget(doc, target) {
        if (target === 'window') {
            return window;
        }
        if (target === 'document') {
            return doc;
        }
        if (target === 'body') {
            return doc.body;
        }
        return null;
    }
    /**
     * @return {?}
     */
    getHistory() { return window.history; }
    /**
     * @return {?}
     */
    getLocation() { return window.location; }
    /**
     * @param {?} doc
     * @return {?}
     */
    getBaseHref(doc) {
        /** @type {?} */
        const href = getBaseElementHref();
        return href == null ? null : relativePath(href);
    }
    /**
     * @return {?}
     */
    resetBaseElement() { baseElement = null; }
    /**
     * @return {?}
     */
    getUserAgent() { return window.navigator.userAgent; }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setData(element, name, value) {
        this.setAttribute(element, 'data-' + name, value);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */
    getData(element, name) {
        return this.getAttribute(element, 'data-' + name);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getComputedStyle(element) { return getComputedStyle(element); }
    /**
     * @return {?}
     */
    supportsWebAnimation() {
        return typeof (/** @type {?} */ (Element)).prototype['animate'] === 'function';
    }
    /**
     * @return {?}
     */
    performanceNow() {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        return window.performance && window.performance.now ? window.performance.now() :
            new Date().getTime();
    }
    /**
     * @return {?}
     */
    supportsCookies() { return true; }
    /**
     * @param {?} name
     * @return {?}
     */
    getCookie(name) { return parseCookieValue(document.cookie, name); }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setCookie(name, value) {
        // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
        // not clear other cookies.
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    }
}
/** @type {?} */
let baseElement = null;
/**
 * @return {?}
 */
function getBaseElementHref() {
    if (!baseElement) {
        baseElement = /** @type {?} */ ((document.querySelector('base')));
        if (!baseElement) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
/** @type {?} */
let urlParsingNode;
/**
 * @param {?} url
 * @return {?}
 */
function relativePath(url) {
    if (!urlParsingNode) {
        urlParsingNode = document.createElement('a');
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFbkUsTUFBTSxjQUFjLEdBQUc7SUFDckIsT0FBTyxFQUFFLFdBQVc7SUFDcEIsV0FBVyxFQUFFLFdBQVc7SUFDeEIsVUFBVSxFQUFFLFVBQVU7SUFDdEIsVUFBVSxFQUFFLFVBQVU7Q0FDdkIsQ0FBQzs7QUFFRixNQUFNLHVCQUF1QixHQUFHLENBQUMsQ0FBQzs7QUFHbEMsTUFBTSxPQUFPLEdBQTBCOzs7SUFHckMsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLEtBQUs7SUFDWCxNQUFNLEVBQUUsUUFBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLFdBQVc7SUFDbkIsT0FBTyxFQUFFLFlBQVk7SUFDckIsSUFBSSxFQUFFLFNBQVM7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixNQUFNLEVBQUUsYUFBYTtJQUNyQixRQUFRLEVBQUUsWUFBWTtJQUN0QixLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7O0FBS0YsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixHQUFHLEVBQUUsR0FBRztJQUNSLEdBQUcsRUFBRSxHQUFHO0lB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S0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO0NBQ3BGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge8m1cGFyc2VDb29raWVWYWx1ZSBhcyBwYXJzZUNvb2tpZVZhbHVlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHvJtWdsb2JhbCBhcyBnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge3NldFJvb3REb21BZGFwdGVyfSBmcm9tICcuLi9kb20vZG9tX2FkYXB0ZXInO1xuXG5pbXBvcnQge0dlbmVyaWNCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9nZW5lcmljX2Jyb3dzZXJfYWRhcHRlcic7XG5cbmNvbnN0IF9hdHRyVG9Qcm9wTWFwID0ge1xuICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgJ2lubmVySHRtbCc6ICdpbm5lckhUTUwnLFxuICAncmVhZG9ubHknOiAncmVhZE9ubHknLFxuICAndGFiaW5kZXgnOiAndGFiSW5kZXgnLFxufTtcblxuY29uc3QgRE9NX0tFWV9MT0NBVElPTl9OVU1QQUQgPSAzO1xuXG4vLyBNYXAgdG8gY29udmVydCBzb21lIGtleSBvciBrZXlJZGVudGlmaWVyIHZhbHVlcyB0byB3aGF0IHdpbGwgYmUgcmV0dXJuZWQgYnkgZ2V0RXZlbnRLZXlcbmNvbnN0IF9rZXlNYXA6IHtbazogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgLy8gVGhlIGZvbGxvd2luZyB2YWx1ZXMgYXJlIGhlcmUgZm9yIGNyb3NzLWJyb3dzZXIgY29tcGF0aWJpbGl0eSBhbmQgdG8gbWF0Y2ggdGhlIFczQyBzdGFuZGFyZFxuICAvLyBjZiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMta2V5L1xuICAnXFxiJzogJ0JhY2tzcGFjZScsXG4gICdcXHQnOiAnVGFiJyxcbiAgJ1xceDdGJzogJ0RlbGV0ZScsXG4gICdcXHgxQic6ICdFc2NhcGUnLFxuICAnRGVsJzogJ0RlbGV0ZScsXG4gICdFc2MnOiAnRXNjYXBlJyxcbiAgJ0xlZnQnOiAnQXJyb3dMZWZ0JyxcbiAgJ1JpZ2h0JzogJ0Fycm93UmlnaHQnLFxuICAnVXAnOiAnQXJyb3dVcCcsXG4gICdEb3duJzogJ0Fycm93RG93bicsXG4gICdNZW51JzogJ0NvbnRleHRNZW51JyxcbiAgJ1Njcm9sbCc6ICdTY3JvbGxMb2NrJyxcbiAgJ1dpbic6ICdPUydcbn07XG5cbi8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbi8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xNTU2NTRcbi8vIDEsIDIsIDMgLi4uIGFyZSByZXBvcnRlZCBhcyBBLCBCLCBDIC4uLlxuY29uc3QgX2Nocm9tZU51bUtleVBhZE1hcCA9IHtcbiAgJ0EnOiAnMScsXG4gICdCJzogJzInLFxuICAnQyc6ICczJyxcbiAgJ0QnOiAnNCcsXG4gICdFJzogJzUnLFxuICAnRic6ICc2JyxcbiAgJ0cnOiAnNycsXG4gICdIJzogJzgnLFxuICAnSSc6ICc5JyxcbiAgJ0onOiAnKicsXG4gICdLJzogJysnLFxuICAnTSc6ICctJyxcbiAgJ04nOiAnLicsXG4gICdPJzogJy8nLFxuICAnXFx4NjAnOiAnMCcsXG4gICdcXHg5MCc6ICdOdW1Mb2NrJ1xufTtcblxubGV0IG5vZGVDb250YWluczogKGE6IGFueSwgYjogYW55KSA9PiBib29sZWFuO1xuXG5pZiAoZ2xvYmFsWydOb2RlJ10pIHtcbiAgbm9kZUNvbnRhaW5zID0gZ2xvYmFsWydOb2RlJ10ucHJvdG90eXBlLmNvbnRhaW5zIHx8IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gISEodGhpcy5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihub2RlKSAmIDE2KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIGBEb21BZGFwdGVyYCBwb3dlcmVkIGJ5IGZ1bGwgYnJvd3NlciBET00gQVBJcy5cbiAqXG4gKiBAc2VjdXJpdHkgVHJlYWQgY2FyZWZ1bGx5ISBJbnRlcmFjdGluZyB3aXRoIHRoZSBET00gZGlyZWN0bHkgaXMgZGFuZ2Vyb3VzIGFuZFxuICogY2FuIGludHJvZHVjZSBYU1Mgcmlza3MuXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOnJlcXVpcmVQYXJhbWV0ZXJUeXBlIG5vLWNvbnNvbGUgKi9cbmV4cG9ydCBjbGFzcyBCcm93c2VyRG9tQWRhcHRlciBleHRlbmRzIEdlbmVyaWNCcm93c2VyRG9tQWRhcHRlciB7XG4gIHBhcnNlKHRlbXBsYXRlSHRtbDogc3RyaW5nKSB7IHRocm93IG5ldyBFcnJvcigncGFyc2Ugbm90IGltcGxlbWVudGVkJyk7IH1cbiAgc3RhdGljIG1ha2VDdXJyZW50KCkgeyBzZXRSb290RG9tQWRhcHRlcihuZXcgQnJvd3NlckRvbUFkYXB0ZXIoKSk7IH1cbiAgaGFzUHJvcGVydHkoZWxlbWVudDogTm9kZSwgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBuYW1lIGluIGVsZW1lbnQ7IH1cbiAgc2V0UHJvcGVydHkoZWw6IE5vZGUsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkgeyAoPGFueT5lbClbbmFtZV0gPSB2YWx1ZTsgfVxuICBnZXRQcm9wZXJ0eShlbDogTm9kZSwgbmFtZTogc3RyaW5nKTogYW55IHsgcmV0dXJuICg8YW55PmVsKVtuYW1lXTsgfVxuICBpbnZva2UoZWw6IE5vZGUsIG1ldGhvZE5hbWU6IHN0cmluZywgYXJnczogYW55W10pOiBhbnkgeyAoPGFueT5lbClbbWV0aG9kTmFtZV0oLi4uYXJncyk7IH1cblxuICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgdGhpcyBpbnRvIGEgc2VwYXJhdGUgZW52aXJvbm1lbnQgY2xhc3Mgb25jZSB3ZSBoYXZlIGl0XG4gIGxvZ0Vycm9yKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbnNvbGUpIHtcbiAgICAgIGlmIChjb25zb2xlLmVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxvZyhlcnJvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5sb2cgJiYgd2luZG93LmNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBsb2dHcm91cChlcnJvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cCAmJiB3aW5kb3cuY29uc29sZS5ncm91cChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbG9nR3JvdXBFbmQoKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cEVuZCAmJiB3aW5kb3cuY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhdHRyVG9Qcm9wTWFwKCk6IGFueSB7IHJldHVybiBfYXR0clRvUHJvcE1hcDsgfVxuXG4gIGNvbnRhaW5zKG5vZGVBOiBhbnksIG5vZGVCOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIG5vZGVDb250YWlucy5jYWxsKG5vZGVBLCBub2RlQik7IH1cbiAgcXVlcnlTZWxlY3RvcihlbDogRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IGFueSB7IHJldHVybiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTsgfVxuICBxdWVyeVNlbGVjdG9yQWxsKGVsOiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnlbXSB7IHJldHVybiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTsgfVxuICBvbihlbDogTm9kZSwgZXZ0OiBhbnksIGxpc3RlbmVyOiBhbnkpIHsgZWwuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyLCBmYWxzZSk7IH1cbiAgb25BbmRDYW5jZWwoZWw6IE5vZGUsIGV2dDogYW55LCBsaXN0ZW5lcjogYW55KTogRnVuY3Rpb24ge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgIC8vIE5lZWRlZCB0byBmb2xsb3cgRGFydCdzIHN1YnNjcmlwdGlvbiBzZW1hbnRpYywgdW50aWwgZml4IG9mXG4gICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXJ0L2lzc3Vlcy9kZXRhaWw/aWQ9MTc0MDZcbiAgICByZXR1cm4gKCkgPT4geyBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgbGlzdGVuZXIsIGZhbHNlKTsgfTtcbiAgfVxuICBkaXNwYXRjaEV2ZW50KGVsOiBOb2RlLCBldnQ6IGFueSkgeyBlbC5kaXNwYXRjaEV2ZW50KGV2dCk7IH1cbiAgY3JlYXRlTW91c2VFdmVudChldmVudFR5cGU6IHN0cmluZyk6IE1vdXNlRXZlbnQge1xuICAgIGNvbnN0IGV2dDogTW91c2VFdmVudCA9IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuICBjcmVhdGVFdmVudChldmVudFR5cGU6IGFueSk6IEV2ZW50IHtcbiAgICBjb25zdCBldnQ6IEV2ZW50ID0gdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKS5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxuICBwcmV2ZW50RGVmYXVsdChldnQ6IEV2ZW50KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIH1cbiAgaXNQcmV2ZW50ZWQoZXZ0OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBldnQuZGVmYXVsdFByZXZlbnRlZCB8fCBldnQucmV0dXJuVmFsdWUgIT0gbnVsbCAmJiAhZXZ0LnJldHVyblZhbHVlO1xuICB9XG4gIGdldElubmVySFRNTChlbDogSFRNTEVsZW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gZWwuaW5uZXJIVE1MOyB9XG4gIGdldFRlbXBsYXRlQ29udGVudChlbDogTm9kZSk6IE5vZGV8bnVsbCB7XG4gICAgcmV0dXJuICdjb250ZW50JyBpbiBlbCAmJiB0aGlzLmlzVGVtcGxhdGVFbGVtZW50KGVsKSA/ICg8YW55PmVsKS5jb250ZW50IDogbnVsbDtcbiAgfVxuICBnZXRPdXRlckhUTUwoZWw6IEhUTUxFbGVtZW50KTogc3RyaW5nIHsgcmV0dXJuIGVsLm91dGVySFRNTDsgfVxuICBub2RlTmFtZShub2RlOiBOb2RlKTogc3RyaW5nIHsgcmV0dXJuIG5vZGUubm9kZU5hbWU7IH1cbiAgbm9kZVZhbHVlKG5vZGU6IE5vZGUpOiBzdHJpbmd8bnVsbCB7IHJldHVybiBub2RlLm5vZGVWYWx1ZTsgfVxuICB0eXBlKG5vZGU6IEhUTUxJbnB1dEVsZW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gbm9kZS50eXBlOyB9XG4gIGNvbnRlbnQobm9kZTogTm9kZSk6IE5vZGUge1xuICAgIGlmICh0aGlzLmhhc1Byb3BlcnR5KG5vZGUsICdjb250ZW50JykpIHtcbiAgICAgIHJldHVybiAoPGFueT5ub2RlKS5jb250ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cbiAgZmlyc3RDaGlsZChlbDogTm9kZSk6IE5vZGV8bnVsbCB7IHJldHVybiBlbC5maXJzdENoaWxkOyB9XG4gIG5leHRTaWJsaW5nKGVsOiBOb2RlKTogTm9kZXxudWxsIHsgcmV0dXJuIGVsLm5leHRTaWJsaW5nOyB9XG4gIHBhcmVudEVsZW1lbnQoZWw6IE5vZGUpOiBOb2RlfG51bGwgeyByZXR1cm4gZWwucGFyZW50Tm9kZTsgfVxuICBjaGlsZE5vZGVzKGVsOiBhbnkpOiBOb2RlW10geyByZXR1cm4gZWwuY2hpbGROb2RlczsgfVxuICBjaGlsZE5vZGVzQXNMaXN0KGVsOiBOb2RlKTogYW55W10ge1xuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBlbC5jaGlsZE5vZGVzO1xuICAgIGNvbnN0IHJlcyA9IG5ldyBBcnJheShjaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXNbaV0gPSBjaGlsZE5vZGVzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGNsZWFyTm9kZXMoZWw6IE5vZGUpIHtcbiAgICB3aGlsZSAoZWwuZmlyc3RDaGlsZCkge1xuICAgICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG4gIGFwcGVuZENoaWxkKGVsOiBOb2RlLCBub2RlOiBOb2RlKSB7IGVsLmFwcGVuZENoaWxkKG5vZGUpOyB9XG4gIHJlbW92ZUNoaWxkKGVsOiBOb2RlLCBub2RlOiBOb2RlKSB7IGVsLnJlbW92ZUNoaWxkKG5vZGUpOyB9XG4gIHJlcGxhY2VDaGlsZChlbDogTm9kZSwgbmV3Q2hpbGQ6IE5vZGUsIG9sZENoaWxkOiBOb2RlKSB7IGVsLnJlcGxhY2VDaGlsZChuZXdDaGlsZCwgb2xkQ2hpbGQpOyB9XG4gIHJlbW92ZShub2RlOiBOb2RlKTogTm9kZSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBpbnNlcnRCZWZvcmUocGFyZW50OiBOb2RlLCByZWY6IE5vZGUsIG5vZGU6IE5vZGUpIHsgcGFyZW50Lmluc2VydEJlZm9yZShub2RlLCByZWYpOyB9XG4gIGluc2VydEFsbEJlZm9yZShwYXJlbnQ6IE5vZGUsIHJlZjogTm9kZSwgbm9kZXM6IE5vZGVbXSkge1xuICAgIG5vZGVzLmZvckVhY2goKG46IGFueSkgPT4gcGFyZW50Lmluc2VydEJlZm9yZShuLCByZWYpKTtcbiAgfVxuICBpbnNlcnRBZnRlcihwYXJlbnQ6IE5vZGUsIHJlZjogTm9kZSwgbm9kZTogYW55KSB7IHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgcmVmLm5leHRTaWJsaW5nKTsgfVxuICBzZXRJbm5lckhUTUwoZWw6IEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHsgZWwuaW5uZXJIVE1MID0gdmFsdWU7IH1cbiAgZ2V0VGV4dChlbDogTm9kZSk6IHN0cmluZ3xudWxsIHsgcmV0dXJuIGVsLnRleHRDb250ZW50OyB9XG4gIHNldFRleHQoZWw6IE5vZGUsIHZhbHVlOiBzdHJpbmcpIHsgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTsgfVxuICBnZXRWYWx1ZShlbDogYW55KTogc3RyaW5nIHsgcmV0dXJuIGVsLnZhbHVlOyB9XG4gIHNldFZhbHVlKGVsOiBhbnksIHZhbHVlOiBzdHJpbmcpIHsgZWwudmFsdWUgPSB2YWx1ZTsgfVxuICBnZXRDaGVja2VkKGVsOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIGVsLmNoZWNrZWQ7IH1cbiAgc2V0Q2hlY2tlZChlbDogYW55LCB2YWx1ZTogYm9vbGVhbikgeyBlbC5jaGVja2VkID0gdmFsdWU7IH1cbiAgY3JlYXRlQ29tbWVudCh0ZXh0OiBzdHJpbmcpOiBDb21tZW50IHsgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlQ29tbWVudCh0ZXh0KTsgfVxuICBjcmVhdGVUZW1wbGF0ZShodG1sOiBhbnkpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3QgdCA9IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICB0LmlubmVySFRNTCA9IGh0bWw7XG4gICAgcmV0dXJuIHQ7XG4gIH1cbiAgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogSFRNTEVsZW1lbnQge1xuICAgIGRvYyA9IGRvYyB8fCB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpO1xuICAgIHJldHVybiBkb2MuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgfVxuICBjcmVhdGVFbGVtZW50TlMobnM6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nLCBkb2M/OiBEb2N1bWVudCk6IEVsZW1lbnQge1xuICAgIGRvYyA9IGRvYyB8fCB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpO1xuICAgIHJldHVybiBkb2MuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWdOYW1lKTtcbiAgfVxuICBjcmVhdGVUZXh0Tm9kZSh0ZXh0OiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogVGV4dCB7XG4gICAgZG9jID0gZG9jIHx8IHRoaXMuZ2V0RGVmYXVsdERvY3VtZW50KCk7XG4gICAgcmV0dXJuIGRvYy5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgfVxuICBjcmVhdGVTY3JpcHRUYWcoYXR0ck5hbWU6IHN0cmluZywgYXR0clZhbHVlOiBzdHJpbmcsIGRvYz86IERvY3VtZW50KTogSFRNTFNjcmlwdEVsZW1lbnQge1xuICAgIGRvYyA9IGRvYyB8fCB0aGlzLmdldERlZmF1bHREb2N1bWVudCgpO1xuICAgIGNvbnN0IGVsID0gPEhUTUxTY3JpcHRFbGVtZW50PmRvYy5jcmVhdGVFbGVtZW50KCdTQ1JJUFQnKTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG4gIGNyZWF0ZVN0eWxlRWxlbWVudChjc3M6IHN0cmluZywgZG9jPzogRG9jdW1lbnQpOiBIVE1MU3R5bGVFbGVtZW50IHtcbiAgICBkb2MgPSBkb2MgfHwgdGhpcy5nZXREZWZhdWx0RG9jdW1lbnQoKTtcbiAgICBjb25zdCBzdHlsZSA9IDxIVE1MU3R5bGVFbGVtZW50PmRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQoc3R5bGUsIHRoaXMuY3JlYXRlVGV4dE5vZGUoY3NzLCBkb2MpKTtcbiAgICByZXR1cm4gc3R5bGU7XG4gIH1cbiAgY3JlYXRlU2hhZG93Um9vdChlbDogSFRNTEVsZW1lbnQpOiBEb2N1bWVudEZyYWdtZW50IHsgcmV0dXJuICg8YW55PmVsKS5jcmVhdGVTaGFkb3dSb290KCk7IH1cbiAgZ2V0U2hhZG93Um9vdChlbDogSFRNTEVsZW1lbnQpOiBEb2N1bWVudEZyYWdtZW50IHsgcmV0dXJuICg8YW55PmVsKS5zaGFkb3dSb290OyB9XG4gIGdldEhvc3QoZWw6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQgeyByZXR1cm4gKDxhbnk+ZWwpLmhvc3Q7IH1cbiAgY2xvbmUobm9kZTogTm9kZSk6IE5vZGUgeyByZXR1cm4gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7IH1cbiAgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShlbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xuICAgIHJldHVybiBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZSk7XG4gIH1cbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoZWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShuYW1lKTtcbiAgfVxuICBjbGFzc0xpc3QoZWxlbWVudDogYW55KTogYW55W10geyByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxlbWVudC5jbGFzc0xpc3QsIDApOyB9XG4gIGFkZENsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpIHsgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH1cbiAgcmVtb3ZlQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZykgeyBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTsgfVxuICBoYXNDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH1cbiAgc2V0U3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdID0gc3R5bGVWYWx1ZTtcbiAgfVxuICByZW1vdmVTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlbmFtZTogc3RyaW5nKSB7XG4gICAgLy8gSUUgcmVxdWlyZXMgJycgaW5zdGVhZCBvZiBudWxsXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzc5MTZcbiAgICBlbGVtZW50LnN0eWxlW3N0eWxlbmFtZV0gPSAnJztcbiAgfVxuICBnZXRTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlbmFtZTogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIGVsZW1lbnQuc3R5bGVbc3R5bGVuYW1lXTsgfVxuICBoYXNTdHlsZShlbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlPzogc3RyaW5nfG51bGwpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lKSB8fCAnJztcbiAgICByZXR1cm4gc3R5bGVWYWx1ZSA/IHZhbHVlID09IHN0eWxlVmFsdWUgOiB2YWx1ZS5sZW5ndGggPiAwO1xuICB9XG4gIHRhZ05hbWUoZWxlbWVudDogYW55KTogc3RyaW5nIHsgcmV0dXJuIGVsZW1lbnQudGFnTmFtZTsgfVxuICBhdHRyaWJ1dGVNYXAoZWxlbWVudDogYW55KTogTWFwPHN0cmluZywgc3RyaW5nPiB7XG4gICAgY29uc3QgcmVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICBjb25zdCBlbEF0dHJzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxBdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYXR0cmliID0gZWxBdHRycy5pdGVtKGkpO1xuICAgICAgcmVzLnNldChhdHRyaWIubmFtZSwgYXR0cmliLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBoYXNBdHRyaWJ1dGUoZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBoYXNBdHRyaWJ1dGVOUyhlbGVtZW50OiBFbGVtZW50LCBuczogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlbGVtZW50Lmhhc0F0dHJpYnV0ZU5TKG5zLCBhdHRyaWJ1dGUpO1xuICB9XG4gIGdldEF0dHJpYnV0ZShlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxuICBnZXRBdHRyaWJ1dGVOUyhlbGVtZW50OiBFbGVtZW50LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZU5TKG5zLCBuYW1lKTtcbiAgfVxuICBzZXRBdHRyaWJ1dGUoZWxlbWVudDogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7IGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTsgfVxuICBzZXRBdHRyaWJ1dGVOUyhlbGVtZW50OiBFbGVtZW50LCBuczogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZU5TKG5zLCBuYW1lLCB2YWx1ZSk7XG4gIH1cbiAgcmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZTogc3RyaW5nKSB7IGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7IH1cbiAgcmVtb3ZlQXR0cmlidXRlTlMoZWxlbWVudDogRWxlbWVudCwgbnM6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGVOUyhucywgbmFtZSk7XG4gIH1cbiAgdGVtcGxhdGVBd2FyZVJvb3QoZWw6IE5vZGUpOiBhbnkgeyByZXR1cm4gdGhpcy5pc1RlbXBsYXRlRWxlbWVudChlbCkgPyB0aGlzLmNvbnRlbnQoZWwpIDogZWw7IH1cbiAgY3JlYXRlSHRtbERvY3VtZW50KCk6IEhUTUxEb2N1bWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnZmFrZVRpdGxlJyk7XG4gIH1cbiAgZ2V0RGVmYXVsdERvY3VtZW50KCk6IERvY3VtZW50IHsgcmV0dXJuIGRvY3VtZW50OyB9XG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbDogRWxlbWVudCk6IGFueSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4ge3RvcDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwLCByaWdodDogMCwgd2lkdGg6IDAsIGhlaWdodDogMH07XG4gICAgfVxuICB9XG4gIGdldFRpdGxlKGRvYzogRG9jdW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gZG9jLnRpdGxlOyB9XG4gIHNldFRpdGxlKGRvYzogRG9jdW1lbnQsIG5ld1RpdGxlOiBzdHJpbmcpIHsgZG9jLnRpdGxlID0gbmV3VGl0bGUgfHwgJyc7IH1cbiAgZWxlbWVudE1hdGNoZXMobjogYW55LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaXNFbGVtZW50Tm9kZShuKSkge1xuICAgICAgcmV0dXJuIG4ubWF0Y2hlcyAmJiBuLm1hdGNoZXMoc2VsZWN0b3IpIHx8XG4gICAgICAgICAgbi5tc01hdGNoZXNTZWxlY3RvciAmJiBuLm1zTWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKSB8fFxuICAgICAgICAgIG4ud2Via2l0TWF0Y2hlc1NlbGVjdG9yICYmIG4ud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaXNUZW1wbGF0ZUVsZW1lbnQoZWw6IE5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0VsZW1lbnROb2RlKGVsKSAmJiBlbC5ub2RlTmFtZSA9PT0gJ1RFTVBMQVRFJztcbiAgfVxuICBpc1RleHROb2RlKG5vZGU6IE5vZGUpOiBib29sZWFuIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFOyB9XG4gIGlzQ29tbWVudE5vZGUobm9kZTogTm9kZSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREU7IH1cbiAgaXNFbGVtZW50Tm9kZShub2RlOiBOb2RlKTogYm9vbGVhbiB7IHJldHVybiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERTsgfVxuICBoYXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlLnNoYWRvd1Jvb3QgIT0gbnVsbCAmJiBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG4gIH1cbiAgaXNTaGFkb3dSb290KG5vZGU6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQ7IH1cbiAgaW1wb3J0SW50b0RvYyhub2RlOiBOb2RlKTogYW55IHsgcmV0dXJuIGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZUF3YXJlUm9vdChub2RlKSwgdHJ1ZSk7IH1cbiAgYWRvcHROb2RlKG5vZGU6IE5vZGUpOiBhbnkgeyByZXR1cm4gZG9jdW1lbnQuYWRvcHROb2RlKG5vZGUpOyB9XG4gIGdldEhyZWYoZWw6IEVsZW1lbnQpOiBzdHJpbmcgeyByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdocmVmJykgITsgfVxuXG4gIGdldEV2ZW50S2V5KGV2ZW50OiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBrZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBrZXkgPSBldmVudC5rZXlJZGVudGlmaWVyO1xuICAgICAgLy8ga2V5SWRlbnRpZmllciBpcyBkZWZpbmVkIGluIHRoZSBvbGQgZHJhZnQgb2YgRE9NIExldmVsIDMgRXZlbnRzIGltcGxlbWVudGVkIGJ5IENocm9tZSBhbmRcbiAgICAgIC8vIFNhZmFyaSBjZlxuICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAwNy9XRC1ET00tTGV2ZWwtMy1FdmVudHMtMjAwNzEyMjEvZXZlbnRzLmh0bWwjRXZlbnRzLUtleWJvYXJkRXZlbnRzLUludGVyZmFjZXNcbiAgICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ1VuaWRlbnRpZmllZCc7XG4gICAgICB9XG4gICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ1UrJykpIHtcbiAgICAgICAga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChrZXkuc3Vic3RyaW5nKDIpLCAxNikpO1xuICAgICAgICBpZiAoZXZlbnQubG9jYXRpb24gPT09IERPTV9LRVlfTE9DQVRJT05fTlVNUEFEICYmIF9jaHJvbWVOdW1LZXlQYWRNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIC8vIFRoZXJlIGlzIGEgYnVnIGluIENocm9tZSBmb3IgbnVtZXJpYyBrZXlwYWQga2V5czpcbiAgICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTU1NjU0XG4gICAgICAgICAgLy8gMSwgMiwgMyAuLi4gYXJlIHJlcG9ydGVkIGFzIEEsIEIsIEMgLi4uXG4gICAgICAgICAga2V5ID0gKF9jaHJvbWVOdW1LZXlQYWRNYXAgYXMgYW55KVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9rZXlNYXBba2V5XSB8fCBrZXk7XG4gIH1cbiAgZ2V0R2xvYmFsRXZlbnRUYXJnZXQoZG9jOiBEb2N1bWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFdmVudFRhcmdldHxudWxsIHtcbiAgICBpZiAodGFyZ2V0ID09PSAnd2luZG93Jykge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2RvY3VtZW50Jykge1xuICAgICAgcmV0dXJuIGRvYztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XG4gICAgICByZXR1cm4gZG9jLmJvZHk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGdldEhpc3RvcnkoKTogSGlzdG9yeSB7IHJldHVybiB3aW5kb3cuaGlzdG9yeTsgfVxuICBnZXRMb2NhdGlvbigpOiBMb2NhdGlvbiB7IHJldHVybiB3aW5kb3cubG9jYXRpb247IH1cbiAgZ2V0QmFzZUhyZWYoZG9jOiBEb2N1bWVudCk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCBocmVmID0gZ2V0QmFzZUVsZW1lbnRIcmVmKCk7XG4gICAgcmV0dXJuIGhyZWYgPT0gbnVsbCA/IG51bGwgOiByZWxhdGl2ZVBhdGgoaHJlZik7XG4gIH1cbiAgcmVzZXRCYXNlRWxlbWVudCgpOiB2b2lkIHsgYmFzZUVsZW1lbnQgPSBudWxsOyB9XG4gIGdldFVzZXJBZ2VudCgpOiBzdHJpbmcgeyByZXR1cm4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7IH1cbiAgc2V0RGF0YShlbGVtZW50OiBFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS0nICsgbmFtZSwgdmFsdWUpO1xuICB9XG4gIGdldERhdGEoZWxlbWVudDogRWxlbWVudCwgbmFtZTogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShlbGVtZW50LCAnZGF0YS0nICsgbmFtZSk7XG4gIH1cbiAgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50OiBhbnkpOiBhbnkgeyByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTsgfVxuICAvLyBUT0RPKHRib3NjaCk6IG1vdmUgdGhpcyBpbnRvIGEgc2VwYXJhdGUgZW52aXJvbm1lbnQgY2xhc3Mgb25jZSB3ZSBoYXZlIGl0XG4gIHN1cHBvcnRzV2ViQW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YoPGFueT5FbGVtZW50KS5wcm90b3R5cGVbJ2FuaW1hdGUnXSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuICBwZXJmb3JtYW5jZU5vdygpOiBudW1iZXIge1xuICAgIC8vIHBlcmZvcm1hbmNlLm5vdygpIGlzIG5vdCBhdmFpbGFibGUgaW4gYWxsIGJyb3dzZXJzLCBzZWVcbiAgICAvLyBodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1wZXJmb3JtYW5jZS5ub3dcbiAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG5cbiAgc3VwcG9ydHNDb29raWVzKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGdldENvb2tpZShuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7IHJldHVybiBwYXJzZUNvb2tpZVZhbHVlKGRvY3VtZW50LmNvb2tpZSwgbmFtZSk7IH1cblxuICBzZXRDb29raWUobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gZG9jdW1lbnQuY29va2llIGlzIG1hZ2ljYWwsIGFzc2lnbmluZyBpbnRvIGl0IGFzc2lnbnMvb3ZlcnJpZGVzIG9uZSBjb29raWUgdmFsdWUsIGJ1dCBkb2VzXG4gICAgLy8gbm90IGNsZWFyIG90aGVyIGNvb2tpZXMuXG4gICAgZG9jdW1lbnQuY29va2llID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgfVxufVxuXG5sZXQgYmFzZUVsZW1lbnQ6IEhUTUxFbGVtZW50fG51bGwgPSBudWxsO1xuZnVuY3Rpb24gZ2V0QmFzZUVsZW1lbnRIcmVmKCk6IHN0cmluZ3xudWxsIHtcbiAgaWYgKCFiYXNlRWxlbWVudCkge1xuICAgIGJhc2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmFzZScpICE7XG4gICAgaWYgKCFiYXNlRWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIHJldHVybiBiYXNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbn1cblxuLy8gYmFzZWQgb24gdXJsVXRpbHMuanMgaW4gQW5ndWxhckpTIDFcbmxldCB1cmxQYXJzaW5nTm9kZTogYW55O1xuZnVuY3Rpb24gcmVsYXRpdmVQYXRoKHVybDogYW55KTogc3RyaW5nIHtcbiAgaWYgKCF1cmxQYXJzaW5nTm9kZSkge1xuICAgIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB9XG4gIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XG4gIHJldHVybiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lO1xufVxuIl19