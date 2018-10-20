/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PRIMARY_OUTLET, convertToParamMap } from './shared';
import { forEach, shallowEqual } from './utils/collection';
export function createEmptyUrlTree() {
    return new UrlTree(new UrlSegmentGroup([], {}), {}, null);
}
export function containsTree(container, containee, exact) {
    if (exact) {
        return equalQueryParams(container.queryParams, containee.queryParams) &&
            equalSegmentGroups(container.root, containee.root);
    }
    return containsQueryParams(container.queryParams, containee.queryParams) &&
        containsSegmentGroup(container.root, containee.root);
}
function equalQueryParams(container, containee) {
    // TODO: This does not handle array params correctly.
    return shallowEqual(container, containee);
}
function equalSegmentGroups(container, containee) {
    if (!equalPath(container.segments, containee.segments))
        return false;
    if (container.numberOfChildren !== containee.numberOfChildren)
        return false;
    for (var c in containee.children) {
        if (!container.children[c])
            return false;
        if (!equalSegmentGroups(container.children[c], containee.children[c]))
            return false;
    }
    return true;
}
function containsQueryParams(container, containee) {
    // TODO: This does not handle array params correctly.
    return Object.keys(containee).length <= Object.keys(container).length &&
        Object.keys(containee).every(function (key) { return containee[key] === container[key]; });
}
function containsSegmentGroup(container, containee) {
    return containsSegmentGroupHelper(container, containee, containee.segments);
}
function containsSegmentGroupHelper(container, containee, containeePaths) {
    if (container.segments.length > containeePaths.length) {
        var current = container.segments.slice(0, containeePaths.length);
        if (!equalPath(current, containeePaths))
            return false;
        if (containee.hasChildren())
            return false;
        return true;
    }
    else if (container.segments.length === containeePaths.length) {
        if (!equalPath(container.segments, containeePaths))
            return false;
        for (var c in containee.children) {
            if (!container.children[c])
                return false;
            if (!containsSegmentGroup(container.children[c], containee.children[c]))
                return false;
        }
        return true;
    }
    else {
        var current = containeePaths.slice(0, container.segments.length);
        var next = containeePaths.slice(container.segments.length);
        if (!equalPath(container.segments, current))
            return false;
        if (!container.children[PRIMARY_OUTLET])
            return false;
        return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next);
    }
}
/**
 * @description
 *
 * Represents the parsed URL.
 *
 * Since a router state is a tree, and the URL is nothing but a serialized state, the URL is a
 * serialized tree.
 * UrlTree is a data structure that provides a lot of affordances in dealing with URLs
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * @Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const tree: UrlTree =
 *       router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');
 *     const f = tree.fragment; // return 'fragment'
 *     const q = tree.queryParams; // returns {debug: 'true'}
 *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
 *     const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
 *     g.children[PRIMARY_OUTLET].segments; // returns 2 segments 'user' and 'victor'
 *     g.children['support'].segments; // return 1 segment 'help'
 *   }
 * }
 * ```
 *
 *
 */
var UrlTree = /** @class */ (function () {
    /** @internal */
    function UrlTree(
    /** The root segment group of the URL tree */
    root, 
    /** The query params of the URL */
    queryParams, 
    /** The fragment of the URL */
    fragment) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    Object.defineProperty(UrlTree.prototype, "queryParamMap", {
        get: function () {
            if (!this._queryParamMap) {
                this._queryParamMap = convertToParamMap(this.queryParams);
            }
            return this._queryParamMap;
        },
        enumerable: true,
        configurable: true
    });
    /** @docsNotRequired */
    UrlTree.prototype.toString = function () { return DEFAULT_SERIALIZER.serialize(this); };
    return UrlTree;
}());
export { UrlTree };
/**
 * @description
 *
 * Represents the parsed URL segment group.
 *
 * See `UrlTree` for more information.
 *
 *
 */
var UrlSegmentGroup = /** @class */ (function () {
    function UrlSegmentGroup(
    /** The URL segments of this group. See `UrlSegment` for more information */
    segments, 
    /** The list of children of this group */
    children) {
        var _this = this;
        this.segments = segments;
        this.children = children;
        /** The parent node in the url tree */
        this.parent = null;
        forEach(children, function (v, k) { return v.parent = _this; });
    }
    /** Whether the segment has child segments */
    UrlSegmentGroup.prototype.hasChildren = function () { return this.numberOfChildren > 0; };
    Object.defineProperty(UrlSegmentGroup.prototype, "numberOfChildren", {
        /** Number of child segments */
        get: function () { return Object.keys(this.children).length; },
        enumerable: true,
        configurable: true
    });
    /** @docsNotRequired */
    UrlSegmentGroup.prototype.toString = function () { return serializePaths(this); };
    return UrlSegmentGroup;
}());
export { UrlSegmentGroup };
/**
 * @description
 *
 * Represents a single URL segment.
 *
 * A UrlSegment is a part of a URL between the two slashes. It contains a path and the matrix
 * parameters associated with the segment.
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * @Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const tree: UrlTree = router.parseUrl('/team;id=33');
 *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
 *     const s: UrlSegment[] = g.segments;
 *     s[0].path; // returns 'team'
 *     s[0].parameters; // returns {id: 33}
 *   }
 * }
 * ```
 *
 *
 */
var UrlSegment = /** @class */ (function () {
    function UrlSegment(
    /** The path part of a URL segment */
    path, 
    /** The matrix parameters associated with a segment */
    parameters) {
        this.path = path;
        this.parameters = parameters;
    }
    Object.defineProperty(UrlSegment.prototype, "parameterMap", {
        get: function () {
            if (!this._parameterMap) {
                this._parameterMap = convertToParamMap(this.parameters);
            }
            return this._parameterMap;
        },
        enumerable: true,
        configurable: true
    });
    /** @docsNotRequired */
    UrlSegment.prototype.toString = function () { return serializePath(this); };
    return UrlSegment;
}());
export { UrlSegment };
export function equalSegments(as, bs) {
    return equalPath(as, bs) && as.every(function (a, i) { return shallowEqual(a.parameters, bs[i].parameters); });
}
export function equalPath(as, bs) {
    if (as.length !== bs.length)
        return false;
    return as.every(function (a, i) { return a.path === bs[i].path; });
}
export function mapChildrenIntoArray(segment, fn) {
    var res = [];
    forEach(segment.children, function (child, childOutlet) {
        if (childOutlet === PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    forEach(segment.children, function (child, childOutlet) {
        if (childOutlet !== PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    return res;
}
/**
 * @description
 *
 * Serializes and deserializes a URL string into a URL tree.
 *
 * The url serialization strategy is customizable. You can
 * make all URLs case insensitive by providing a custom UrlSerializer.
 *
 * See `DefaultUrlSerializer` for an example of a URL serializer.
 *
 *
 */
var UrlSerializer = /** @class */ (function () {
    function UrlSerializer() {
    }
    return UrlSerializer;
}());
export { UrlSerializer };
/**
 * @description
 *
 * A default implementation of the `UrlSerializer`.
 *
 * Example URLs:
 *
 * ```
 * /inbox/33(popup:compose)
 * /inbox/33;open=true/messages/44
 * ```
 *
 * DefaultUrlSerializer uses parentheses to serialize secondary segments (e.g., popup:compose), the
 * colon syntax to specify the outlet, and the ';parameter=value' syntax (e.g., open=true) to
 * specify route specific parameters.
 *
 *
 */
var DefaultUrlSerializer = /** @class */ (function () {
    function DefaultUrlSerializer() {
    }
    /** Parses a url into a `UrlTree` */
    DefaultUrlSerializer.prototype.parse = function (url) {
        var p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
    };
    /** Converts a `UrlTree` into a url */
    DefaultUrlSerializer.prototype.serialize = function (tree) {
        var segment = "/" + serializeSegment(tree.root, true);
        var query = serializeQueryParams(tree.queryParams);
        var fragment = typeof tree.fragment === "string" ? "#" + encodeUriFragment(tree.fragment) : '';
        return "" + segment + query + fragment;
    };
    return DefaultUrlSerializer;
}());
export { DefaultUrlSerializer };
var DEFAULT_SERIALIZER = new DefaultUrlSerializer();
export function serializePaths(segment) {
    return segment.segments.map(function (p) { return serializePath(p); }).join('/');
}
function serializeSegment(segment, root) {
    if (!segment.hasChildren()) {
        return serializePaths(segment);
    }
    if (root) {
        var primary = segment.children[PRIMARY_OUTLET] ?
            serializeSegment(segment.children[PRIMARY_OUTLET], false) :
            '';
        var children_1 = [];
        forEach(segment.children, function (v, k) {
            if (k !== PRIMARY_OUTLET) {
                children_1.push(k + ":" + serializeSegment(v, false));
            }
        });
        return children_1.length > 0 ? primary + "(" + children_1.join('//') + ")" : primary;
    }
    else {
        var children = mapChildrenIntoArray(segment, function (v, k) {
            if (k === PRIMARY_OUTLET) {
                return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
            }
            return [k + ":" + serializeSegment(v, false)];
        });
        return serializePaths(segment) + "/(" + children.join('//') + ")";
    }
}
/**
 * Encodes a URI string with the default encoding. This function will only ever be called from
 * `encodeUriQuery` or `encodeUriSegment` as it's the base set of encodings to be used. We need
 * a custom encoding because encodeURIComponent is too aggressive and encodes stuff that doesn't
 * have to be encoded per https://url.spec.whatwg.org.
 */
function encodeUriString(s) {
    return encodeURIComponent(s)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',');
}
/**
 * This function should be used to encode both keys and values in a query string key/value. In
 * the following URL, you need to call encodeUriQuery on "k" and "v":
 *
 * http://www.site.org/html;mk=mv?k=v#f
 */
export function encodeUriQuery(s) {
    return encodeUriString(s).replace(/%3B/gi, ';');
}
/**
 * This function should be used to encode a URL fragment. In the following URL, you need to call
 * encodeUriFragment on "f":
 *
 * http://www.site.org/html;mk=mv?k=v#f
 */
export function encodeUriFragment(s) {
    return encodeURI(s);
}
/**
 * This function should be run on any URI segment as well as the key and value in a key/value
 * pair for matrix params. In the following URL, you need to call encodeUriSegment on "html",
 * "mk", and "mv":
 *
 * http://www.site.org/html;mk=mv?k=v#f
 */
export function encodeUriSegment(s) {
    return encodeUriString(s).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
export function decode(s) {
    return decodeURIComponent(s);
}
// Query keys/values should have the "+" replaced first, as "+" in a query string is " ".
// decodeURIComponent function will not decode "+" as a space.
export function decodeQuery(s) {
    return decode(s.replace(/\+/g, '%20'));
}
export function serializePath(path) {
    return "" + encodeUriSegment(path.path) + serializeMatrixParams(path.parameters);
}
function serializeMatrixParams(params) {
    return Object.keys(params)
        .map(function (key) { return ";" + encodeUriSegment(key) + "=" + encodeUriSegment(params[key]); })
        .join('');
}
function serializeQueryParams(params) {
    var strParams = Object.keys(params).map(function (name) {
        var value = params[name];
        return Array.isArray(value) ?
            value.map(function (v) { return encodeUriQuery(name) + "=" + encodeUriQuery(v); }).join('&') :
            encodeUriQuery(name) + "=" + encodeUriQuery(value);
    });
    return strParams.length ? "?" + strParams.join("&") : '';
}
var SEGMENT_RE = /^[^\/()?;=#]+/;
function matchSegments(str) {
    var match = str.match(SEGMENT_RE);
    return match ? match[0] : '';
}
var QUERY_PARAM_RE = /^[^=?&#]+/;
// Return the name of the query param at the start of the string or an empty string
function matchQueryParams(str) {
    var match = str.match(QUERY_PARAM_RE);
    return match ? match[0] : '';
}
var QUERY_PARAM_VALUE_RE = /^[^?&#]+/;
// Return the value of the query param at the start of the string or an empty string
function matchUrlQueryParamValue(str) {
    var match = str.match(QUERY_PARAM_VALUE_RE);
    return match ? match[0] : '';
}
var UrlParser = /** @class */ (function () {
    function UrlParser(url) {
        this.url = url;
        this.remaining = url;
    }
    UrlParser.prototype.parseRootSegment = function () {
        this.consumeOptional('/');
        if (this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')) {
            return new UrlSegmentGroup([], {});
        }
        // The root segment group never has segments
        return new UrlSegmentGroup([], this.parseChildren());
    };
    UrlParser.prototype.parseQueryParams = function () {
        var params = {};
        if (this.consumeOptional('?')) {
            do {
                this.parseQueryParam(params);
            } while (this.consumeOptional('&'));
        }
        return params;
    };
    UrlParser.prototype.parseFragment = function () {
        return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
    };
    UrlParser.prototype.parseChildren = function () {
        if (this.remaining === '') {
            return {};
        }
        this.consumeOptional('/');
        var segments = [];
        if (!this.peekStartsWith('(')) {
            segments.push(this.parseSegment());
        }
        while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
            this.capture('/');
            segments.push(this.parseSegment());
        }
        var children = {};
        if (this.peekStartsWith('/(')) {
            this.capture('/');
            children = this.parseParens(true);
        }
        var res = {};
        if (this.peekStartsWith('(')) {
            res = this.parseParens(false);
        }
        if (segments.length > 0 || Object.keys(children).length > 0) {
            res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
        }
        return res;
    };
    // parse a segment with its matrix parameters
    // ie `name;k1=v1;k2`
    UrlParser.prototype.parseSegment = function () {
        var path = matchSegments(this.remaining);
        if (path === '' && this.peekStartsWith(';')) {
            throw new Error("Empty path url segment cannot have parameters: '" + this.remaining + "'.");
        }
        this.capture(path);
        return new UrlSegment(decode(path), this.parseMatrixParams());
    };
    UrlParser.prototype.parseMatrixParams = function () {
        var params = {};
        while (this.consumeOptional(';')) {
            this.parseParam(params);
        }
        return params;
    };
    UrlParser.prototype.parseParam = function (params) {
        var key = matchSegments(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var value = '';
        if (this.consumeOptional('=')) {
            var valueMatch = matchSegments(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[decode(key)] = decode(value);
    };
    // Parse a single query parameter `name[=value]`
    UrlParser.prototype.parseQueryParam = function (params) {
        var key = matchQueryParams(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var value = '';
        if (this.consumeOptional('=')) {
            var valueMatch = matchUrlQueryParamValue(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        var decodedKey = decodeQuery(key);
        var decodedVal = decodeQuery(value);
        if (params.hasOwnProperty(decodedKey)) {
            // Append to existing values
            var currentVal = params[decodedKey];
            if (!Array.isArray(currentVal)) {
                currentVal = [currentVal];
                params[decodedKey] = currentVal;
            }
            currentVal.push(decodedVal);
        }
        else {
            // Create a new value
            params[decodedKey] = decodedVal;
        }
    };
    // parse `(a/b//outlet_name:c/d)`
    UrlParser.prototype.parseParens = function (allowPrimary) {
        var segments = {};
        this.capture('(');
        while (!this.consumeOptional(')') && this.remaining.length > 0) {
            var path = matchSegments(this.remaining);
            var next = this.remaining[path.length];
            // if is is not one of these characters, then the segment was unescaped
            // or the group was not closed
            if (next !== '/' && next !== ')' && next !== ';') {
                throw new Error("Cannot parse url '" + this.url + "'");
            }
            var outletName = undefined;
            if (path.indexOf(':') > -1) {
                outletName = path.substr(0, path.indexOf(':'));
                this.capture(outletName);
                this.capture(':');
            }
            else if (allowPrimary) {
                outletName = PRIMARY_OUTLET;
            }
            var children = this.parseChildren();
            segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] :
                new UrlSegmentGroup([], children);
            this.consumeOptional('//');
        }
        return segments;
    };
    UrlParser.prototype.peekStartsWith = function (str) { return this.remaining.startsWith(str); };
    // Consumes the prefix when it is present and returns whether it has been consumed
    UrlParser.prototype.consumeOptional = function (str) {
        if (this.peekStartsWith(str)) {
            this.remaining = this.remaining.substring(str.length);
            return true;
        }
        return false;
    };
    UrlParser.prototype.capture = function (str) {
        if (!this.consumeOptional(str)) {
            throw new Error("Expected \"" + str + "\".");
        }
    };
    return UrlParser;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3RyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvc3JjL3VybF90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQW9CLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFekQsTUFBTTtJQUNKLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxlQUFlLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQsTUFBTSx1QkFBdUIsU0FBa0IsRUFBRSxTQUFrQixFQUFFLEtBQWM7SUFDakYsSUFBSSxLQUFLLEVBQUU7UUFDVCxPQUFPLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUNqRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4RDtJQUVELE9BQU8sbUJBQW1CLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ3BFLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCwwQkFBMEIsU0FBaUIsRUFBRSxTQUFpQjtJQUM1RCxxREFBcUQ7SUFDckQsT0FBTyxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCw0QkFBNEIsU0FBMEIsRUFBRSxTQUEwQjtJQUNoRixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3JFLElBQUksU0FBUyxDQUFDLGdCQUFnQixLQUFLLFNBQVMsQ0FBQyxnQkFBZ0I7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1RSxLQUFLLElBQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQ3JGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsNkJBQTZCLFNBQWlCLEVBQUUsU0FBaUI7SUFDL0QscURBQXFEO0lBQ3JELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNO1FBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO0FBQzdFLENBQUM7QUFFRCw4QkFBOEIsU0FBMEIsRUFBRSxTQUEwQjtJQUNsRixPQUFPLDBCQUEwQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFFRCxvQ0FDSSxTQUEwQixFQUFFLFNBQTBCLEVBQUUsY0FBNEI7SUFDdEYsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFO1FBQ3JELElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdEQsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUM7S0FFYjtTQUFNLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssY0FBYyxDQUFDLE1BQU0sRUFBRTtRQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDakUsS0FBSyxJQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUN6QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1NBQ3ZGO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FFYjtTQUFNO1FBQ0wsSUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRSxJQUFNLElBQUksR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RELE9BQU8sMEJBQTBCLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDeEY7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0g7SUFLRSxnQkFBZ0I7SUFDaEI7SUFDSSw2Q0FBNkM7SUFDdEMsSUFBcUI7SUFDNUIsa0NBQWtDO0lBQzNCLFdBQW1CO0lBQzFCLDhCQUE4QjtJQUN2QixRQUFxQjtRQUpyQixTQUFJLEdBQUosSUFBSSxDQUFpQjtRQUVyQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUVuQixhQUFRLEdBQVIsUUFBUSxDQUFhO0lBQUcsQ0FBQztJQUVwQyxzQkFBSSxrQ0FBYTthQUFqQjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMzRDtZQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHVCQUF1QjtJQUN2QiwwQkFBUSxHQUFSLGNBQXFCLE9BQU8sa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxjQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQzs7QUFFRDs7Ozs7Ozs7R0FRRztBQUNIO0lBVUU7SUFDSSw0RUFBNEU7SUFDckUsUUFBc0I7SUFDN0IseUNBQXlDO0lBQ2xDLFFBQTBDO1FBSnJELGlCQU1DO1FBSlUsYUFBUSxHQUFSLFFBQVEsQ0FBYztRQUV0QixhQUFRLEdBQVIsUUFBUSxDQUFrQztRQVByRCxzQ0FBc0M7UUFDdEMsV0FBTSxHQUF5QixJQUFJLENBQUM7UUFPbEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQU0sRUFBRSxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUksRUFBZixDQUFlLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLHFDQUFXLEdBQVgsY0FBeUIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUc1RCxzQkFBSSw2Q0FBZ0I7UUFEcEIsK0JBQStCO2FBQy9CLGNBQWlDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFNUUsdUJBQXVCO0lBQ3ZCLGtDQUFRLEdBQVIsY0FBcUIsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELHNCQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQzs7QUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNIO0lBS0U7SUFDSSxxQ0FBcUM7SUFDOUIsSUFBWTtJQUVuQixzREFBc0Q7SUFDL0MsVUFBb0M7UUFIcEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUdaLGVBQVUsR0FBVixVQUFVLENBQTBCO0lBQUcsQ0FBQztJQUVuRCxzQkFBSSxvQ0FBWTthQUFoQjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6RDtZQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHVCQUF1QjtJQUN2Qiw2QkFBUSxHQUFSLGNBQXFCLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxpQkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7O0FBRUQsTUFBTSx3QkFBd0IsRUFBZ0IsRUFBRSxFQUFnQjtJQUM5RCxPQUFPLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQztBQUMvRixDQUFDO0FBRUQsTUFBTSxvQkFBb0IsRUFBZ0IsRUFBRSxFQUFnQjtJQUMxRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLE1BQU07UUFBRSxPQUFPLEtBQUssQ0FBQztJQUMxQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFyQixDQUFxQixDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVELE1BQU0sK0JBQ0YsT0FBd0IsRUFBRSxFQUEwQztJQUN0RSxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7SUFDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFzQixFQUFFLFdBQW1CO1FBQ3BFLElBQUksV0FBVyxLQUFLLGNBQWMsRUFBRTtZQUNsQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBc0IsRUFBRSxXQUFtQjtRQUNwRSxJQUFJLFdBQVcsS0FBSyxjQUFjLEVBQUU7WUFDbEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFHRDs7Ozs7Ozs7Ozs7R0FXRztBQUNIO0lBQUE7SUFNQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSDtJQUFBO0lBZ0JBLENBQUM7SUFmQyxvQ0FBb0M7SUFDcEMsb0NBQUssR0FBTCxVQUFNLEdBQVc7UUFDZixJQUFNLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxzQ0FBc0M7SUFDdEMsd0NBQVMsR0FBVCxVQUFVLElBQWE7UUFDckIsSUFBTSxPQUFPLEdBQUcsTUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBRyxDQUFDO1FBQ3hELElBQU0sS0FBSyxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxJQUFNLFFBQVEsR0FDVixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFVLENBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRXRGLE9BQU8sS0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLFFBQVUsQ0FBQztJQUN6QyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDOztBQUVELElBQU0sa0JBQWtCLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0FBRXRELE1BQU0seUJBQXlCLE9BQXdCO0lBQ3JELE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELDBCQUEwQixPQUF3QixFQUFFLElBQWE7SUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUMxQixPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNoQztJQUVELElBQUksSUFBSSxFQUFFO1FBQ1IsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzlDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRCxFQUFFLENBQUM7UUFDUCxJQUFNLFVBQVEsR0FBYSxFQUFFLENBQUM7UUFFOUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFrQixFQUFFLENBQVM7WUFDdEQsSUFBSSxDQUFDLEtBQUssY0FBYyxFQUFFO2dCQUN4QixVQUFRLENBQUMsSUFBSSxDQUFJLENBQUMsU0FBSSxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFHLENBQUMsQ0FBQzthQUNyRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxVQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUksT0FBTyxTQUFJLFVBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0tBRTdFO1NBQU07UUFDTCxJQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFrQixFQUFFLENBQVM7WUFDM0UsSUFBSSxDQUFDLEtBQUssY0FBYyxFQUFFO2dCQUN4QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO1lBRUQsT0FBTyxDQUFJLENBQUMsU0FBSSxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFHLENBQUMsQ0FBQztRQUVoRCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQVUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQztLQUM5RDtBQUNILENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILHlCQUF5QixDQUFTO0lBQ2hDLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSx5QkFBeUIsQ0FBUztJQUN0QyxPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sNEJBQTRCLENBQVM7SUFDekMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sMkJBQTJCLENBQVM7SUFDeEMsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDOUYsQ0FBQztBQUVELE1BQU0saUJBQWlCLENBQVM7SUFDOUIsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRUQseUZBQXlGO0FBQ3pGLDhEQUE4RDtBQUM5RCxNQUFNLHNCQUFzQixDQUFTO0lBQ25DLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELE1BQU0sd0JBQXdCLElBQWdCO0lBQzVDLE9BQU8sS0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBRyxDQUFDO0FBQ25GLENBQUM7QUFFRCwrQkFBK0IsTUFBK0I7SUFDNUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNyQixHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFJLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxTQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBRyxFQUE1RCxDQUE0RCxDQUFDO1NBQ3hFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQixDQUFDO0FBRUQsOEJBQThCLE1BQTRCO0lBQ3hELElBQU0sU0FBUyxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSTtRQUN2RCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBSSxjQUFjLENBQUMsQ0FBQyxDQUFHLEVBQTlDLENBQThDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2RSxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQUksY0FBYyxDQUFDLEtBQUssQ0FBRyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMzRCxDQUFDO0FBRUQsSUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDO0FBQ25DLHVCQUF1QixHQUFXO0lBQ2hDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQy9CLENBQUM7QUFFRCxJQUFNLGNBQWMsR0FBRyxXQUFXLENBQUM7QUFDbkMsbUZBQW1GO0FBQ25GLDBCQUEwQixHQUFXO0lBQ25DLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQy9CLENBQUM7QUFFRCxJQUFNLG9CQUFvQixHQUFHLFVBQVUsQ0FBQztBQUN4QyxvRkFBb0Y7QUFDcEYsaUNBQWlDLEdBQVc7SUFDMUMsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMvQixDQUFDO0FBRUQ7SUFHRSxtQkFBb0IsR0FBVztRQUFYLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUFDLENBQUM7SUFFMUQsb0NBQWdCLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqRixPQUFPLElBQUksZUFBZSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNwQztRQUVELDRDQUE0QztRQUM1QyxPQUFPLElBQUksZUFBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsb0NBQWdCLEdBQWhCO1FBQ0UsSUFBTSxNQUFNLEdBQVcsRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QixHQUFHO2dCQUNELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUIsUUFBUSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1NBQ3JDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9FLENBQUM7SUFFTyxpQ0FBYSxHQUFyQjtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxFQUFFLEVBQUU7WUFDekIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUIsSUFBTSxRQUFRLEdBQWlCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxRQUFRLEdBQXdDLEVBQUUsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUVELElBQUksR0FBRyxHQUF3QyxFQUFFLENBQUM7UUFDbEQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0QsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMvRDtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELDZDQUE2QztJQUM3QyxxQkFBcUI7SUFDYixnQ0FBWSxHQUFwQjtRQUNFLElBQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBbUQsSUFBSSxDQUFDLFNBQVMsT0FBSSxDQUFDLENBQUM7U0FDeEY7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVPLHFDQUFpQixHQUF6QjtRQUNFLElBQU0sTUFBTSxHQUF5QixFQUFFLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU8sOEJBQVUsR0FBbEIsVUFBbUIsTUFBNEI7UUFDN0MsSUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLEtBQUssR0FBUSxFQUFFLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLElBQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDakQsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsS0FBSyxHQUFHLFVBQVUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQjtTQUNGO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsZ0RBQWdEO0lBQ3hDLG1DQUFlLEdBQXZCLFVBQXdCLE1BQWM7UUFDcEMsSUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0IsSUFBTSxVQUFVLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNELElBQUksVUFBVSxFQUFFO2dCQUNkLEtBQUssR0FBRyxVQUFVLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckI7U0FDRjtRQUVELElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEMsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3JDLDRCQUE0QjtZQUM1QixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzlCLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO2FBQ2pDO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0wscUJBQXFCO1lBQ3JCLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQsaUNBQWlDO0lBQ3pCLCtCQUFXLEdBQW5CLFVBQW9CLFlBQXFCO1FBQ3ZDLElBQU0sUUFBUSxHQUFxQyxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsQixPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUQsSUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV6Qyx1RUFBdUU7WUFDdkUsOEJBQThCO1lBQzlCLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXFCLElBQUksQ0FBQyxHQUFHLE1BQUcsQ0FBQyxDQUFDO2FBQ25EO1lBRUQsSUFBSSxVQUFVLEdBQVcsU0FBVyxDQUFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDMUIsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQjtpQkFBTSxJQUFJLFlBQVksRUFBRTtnQkFDdkIsVUFBVSxHQUFHLGNBQWMsQ0FBQzthQUM3QjtZQUVELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN0QyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sa0NBQWMsR0FBdEIsVUFBdUIsR0FBVyxJQUFhLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZGLGtGQUFrRjtJQUMxRSxtQ0FBZSxHQUF2QixVQUF3QixHQUFXO1FBQ2pDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sMkJBQU8sR0FBZixVQUFnQixHQUFXO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWEsR0FBRyxRQUFJLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUExTEQsSUEwTEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UFJJTUFSWV9PVVRMRVQsIFBhcmFtTWFwLCBQYXJhbXMsIGNvbnZlcnRUb1BhcmFtTWFwfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge2ZvckVhY2gsIHNoYWxsb3dFcXVhbH0gZnJvbSAnLi91dGlscy9jb2xsZWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVtcHR5VXJsVHJlZSgpIHtcbiAgcmV0dXJuIG5ldyBVcmxUcmVlKG5ldyBVcmxTZWdtZW50R3JvdXAoW10sIHt9KSwge30sIG51bGwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnNUcmVlKGNvbnRhaW5lcjogVXJsVHJlZSwgY29udGFpbmVlOiBVcmxUcmVlLCBleGFjdDogYm9vbGVhbik6IGJvb2xlYW4ge1xuICBpZiAoZXhhY3QpIHtcbiAgICByZXR1cm4gZXF1YWxRdWVyeVBhcmFtcyhjb250YWluZXIucXVlcnlQYXJhbXMsIGNvbnRhaW5lZS5xdWVyeVBhcmFtcykgJiZcbiAgICAgICAgZXF1YWxTZWdtZW50R3JvdXBzKGNvbnRhaW5lci5yb290LCBjb250YWluZWUucm9vdCk7XG4gIH1cblxuICByZXR1cm4gY29udGFpbnNRdWVyeVBhcmFtcyhjb250YWluZXIucXVlcnlQYXJhbXMsIGNvbnRhaW5lZS5xdWVyeVBhcmFtcykgJiZcbiAgICAgIGNvbnRhaW5zU2VnbWVudEdyb3VwKGNvbnRhaW5lci5yb290LCBjb250YWluZWUucm9vdCk7XG59XG5cbmZ1bmN0aW9uIGVxdWFsUXVlcnlQYXJhbXMoY29udGFpbmVyOiBQYXJhbXMsIGNvbnRhaW5lZTogUGFyYW1zKTogYm9vbGVhbiB7XG4gIC8vIFRPRE86IFRoaXMgZG9lcyBub3QgaGFuZGxlIGFycmF5IHBhcmFtcyBjb3JyZWN0bHkuXG4gIHJldHVybiBzaGFsbG93RXF1YWwoY29udGFpbmVyLCBjb250YWluZWUpO1xufVxuXG5mdW5jdGlvbiBlcXVhbFNlZ21lbnRHcm91cHMoY29udGFpbmVyOiBVcmxTZWdtZW50R3JvdXAsIGNvbnRhaW5lZTogVXJsU2VnbWVudEdyb3VwKTogYm9vbGVhbiB7XG4gIGlmICghZXF1YWxQYXRoKGNvbnRhaW5lci5zZWdtZW50cywgY29udGFpbmVlLnNlZ21lbnRzKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoY29udGFpbmVyLm51bWJlck9mQ2hpbGRyZW4gIT09IGNvbnRhaW5lZS5udW1iZXJPZkNoaWxkcmVuKSByZXR1cm4gZmFsc2U7XG4gIGZvciAoY29uc3QgYyBpbiBjb250YWluZWUuY2hpbGRyZW4pIHtcbiAgICBpZiAoIWNvbnRhaW5lci5jaGlsZHJlbltjXSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghZXF1YWxTZWdtZW50R3JvdXBzKGNvbnRhaW5lci5jaGlsZHJlbltjXSwgY29udGFpbmVlLmNoaWxkcmVuW2NdKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb250YWluc1F1ZXJ5UGFyYW1zKGNvbnRhaW5lcjogUGFyYW1zLCBjb250YWluZWU6IFBhcmFtcyk6IGJvb2xlYW4ge1xuICAvLyBUT0RPOiBUaGlzIGRvZXMgbm90IGhhbmRsZSBhcnJheSBwYXJhbXMgY29ycmVjdGx5LlxuICByZXR1cm4gT2JqZWN0LmtleXMoY29udGFpbmVlKS5sZW5ndGggPD0gT2JqZWN0LmtleXMoY29udGFpbmVyKS5sZW5ndGggJiZcbiAgICAgIE9iamVjdC5rZXlzKGNvbnRhaW5lZSkuZXZlcnkoa2V5ID0+IGNvbnRhaW5lZVtrZXldID09PSBjb250YWluZXJba2V5XSk7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zU2VnbWVudEdyb3VwKGNvbnRhaW5lcjogVXJsU2VnbWVudEdyb3VwLCBjb250YWluZWU6IFVybFNlZ21lbnRHcm91cCk6IGJvb2xlYW4ge1xuICByZXR1cm4gY29udGFpbnNTZWdtZW50R3JvdXBIZWxwZXIoY29udGFpbmVyLCBjb250YWluZWUsIGNvbnRhaW5lZS5zZWdtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zU2VnbWVudEdyb3VwSGVscGVyKFxuICAgIGNvbnRhaW5lcjogVXJsU2VnbWVudEdyb3VwLCBjb250YWluZWU6IFVybFNlZ21lbnRHcm91cCwgY29udGFpbmVlUGF0aHM6IFVybFNlZ21lbnRbXSk6IGJvb2xlYW4ge1xuICBpZiAoY29udGFpbmVyLnNlZ21lbnRzLmxlbmd0aCA+IGNvbnRhaW5lZVBhdGhzLmxlbmd0aCkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBjb250YWluZXIuc2VnbWVudHMuc2xpY2UoMCwgY29udGFpbmVlUGF0aHMubGVuZ3RoKTtcbiAgICBpZiAoIWVxdWFsUGF0aChjdXJyZW50LCBjb250YWluZWVQYXRocykpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoY29udGFpbmVlLmhhc0NoaWxkcmVuKCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGNvbnRhaW5lci5zZWdtZW50cy5sZW5ndGggPT09IGNvbnRhaW5lZVBhdGhzLmxlbmd0aCkge1xuICAgIGlmICghZXF1YWxQYXRoKGNvbnRhaW5lci5zZWdtZW50cywgY29udGFpbmVlUGF0aHMpKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChjb25zdCBjIGluIGNvbnRhaW5lZS5jaGlsZHJlbikge1xuICAgICAgaWYgKCFjb250YWluZXIuY2hpbGRyZW5bY10pIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghY29udGFpbnNTZWdtZW50R3JvdXAoY29udGFpbmVyLmNoaWxkcmVuW2NdLCBjb250YWluZWUuY2hpbGRyZW5bY10pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY3VycmVudCA9IGNvbnRhaW5lZVBhdGhzLnNsaWNlKDAsIGNvbnRhaW5lci5zZWdtZW50cy5sZW5ndGgpO1xuICAgIGNvbnN0IG5leHQgPSBjb250YWluZWVQYXRocy5zbGljZShjb250YWluZXIuc2VnbWVudHMubGVuZ3RoKTtcbiAgICBpZiAoIWVxdWFsUGF0aChjb250YWluZXIuc2VnbWVudHMsIGN1cnJlbnQpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjb250YWluZXIuY2hpbGRyZW5bUFJJTUFSWV9PVVRMRVRdKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGNvbnRhaW5zU2VnbWVudEdyb3VwSGVscGVyKGNvbnRhaW5lci5jaGlsZHJlbltQUklNQVJZX09VVExFVF0sIGNvbnRhaW5lZSwgbmV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBSZXByZXNlbnRzIHRoZSBwYXJzZWQgVVJMLlxuICpcbiAqIFNpbmNlIGEgcm91dGVyIHN0YXRlIGlzIGEgdHJlZSwgYW5kIHRoZSBVUkwgaXMgbm90aGluZyBidXQgYSBzZXJpYWxpemVkIHN0YXRlLCB0aGUgVVJMIGlzIGFcbiAqIHNlcmlhbGl6ZWQgdHJlZS5cbiAqIFVybFRyZWUgaXMgYSBkYXRhIHN0cnVjdHVyZSB0aGF0IHByb3ZpZGVzIGEgbG90IG9mIGFmZm9yZGFuY2VzIGluIGRlYWxpbmcgd2l0aCBVUkxzXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBAQ29tcG9uZW50KHt0ZW1wbGF0ZVVybDondGVtcGxhdGUuaHRtbCd9KVxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlcikge1xuICogICAgIGNvbnN0IHRyZWU6IFVybFRyZWUgPVxuICogICAgICAgcm91dGVyLnBhcnNlVXJsKCcvdGVhbS8zMy8odXNlci92aWN0b3IvL3N1cHBvcnQ6aGVscCk/ZGVidWc9dHJ1ZSNmcmFnbWVudCcpO1xuICogICAgIGNvbnN0IGYgPSB0cmVlLmZyYWdtZW50OyAvLyByZXR1cm4gJ2ZyYWdtZW50J1xuICogICAgIGNvbnN0IHEgPSB0cmVlLnF1ZXJ5UGFyYW1zOyAvLyByZXR1cm5zIHtkZWJ1ZzogJ3RydWUnfVxuICogICAgIGNvbnN0IGc6IFVybFNlZ21lbnRHcm91cCA9IHRyZWUucm9vdC5jaGlsZHJlbltQUklNQVJZX09VVExFVF07XG4gKiAgICAgY29uc3QgczogVXJsU2VnbWVudFtdID0gZy5zZWdtZW50czsgLy8gcmV0dXJucyAyIHNlZ21lbnRzICd0ZWFtJyBhbmQgJzMzJ1xuICogICAgIGcuY2hpbGRyZW5bUFJJTUFSWV9PVVRMRVRdLnNlZ21lbnRzOyAvLyByZXR1cm5zIDIgc2VnbWVudHMgJ3VzZXInIGFuZCAndmljdG9yJ1xuICogICAgIGcuY2hpbGRyZW5bJ3N1cHBvcnQnXS5zZWdtZW50czsgLy8gcmV0dXJuIDEgc2VnbWVudCAnaGVscCdcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFVybFRyZWUge1xuICAvKiogQGludGVybmFsICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBfcXVlcnlQYXJhbU1hcCAhOiBQYXJhbU1hcDtcblxuICAvKiogQGludGVybmFsICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLyoqIFRoZSByb290IHNlZ21lbnQgZ3JvdXAgb2YgdGhlIFVSTCB0cmVlICovXG4gICAgICBwdWJsaWMgcm9vdDogVXJsU2VnbWVudEdyb3VwLFxuICAgICAgLyoqIFRoZSBxdWVyeSBwYXJhbXMgb2YgdGhlIFVSTCAqL1xuICAgICAgcHVibGljIHF1ZXJ5UGFyYW1zOiBQYXJhbXMsXG4gICAgICAvKiogVGhlIGZyYWdtZW50IG9mIHRoZSBVUkwgKi9cbiAgICAgIHB1YmxpYyBmcmFnbWVudDogc3RyaW5nfG51bGwpIHt9XG5cbiAgZ2V0IHF1ZXJ5UGFyYW1NYXAoKTogUGFyYW1NYXAge1xuICAgIGlmICghdGhpcy5fcXVlcnlQYXJhbU1hcCkge1xuICAgICAgdGhpcy5fcXVlcnlQYXJhbU1hcCA9IGNvbnZlcnRUb1BhcmFtTWFwKHRoaXMucXVlcnlQYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcXVlcnlQYXJhbU1hcDtcbiAgfVxuXG4gIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBERUZBVUxUX1NFUklBTElaRVIuc2VyaWFsaXplKHRoaXMpOyB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyB0aGUgcGFyc2VkIFVSTCBzZWdtZW50IGdyb3VwLlxuICpcbiAqIFNlZSBgVXJsVHJlZWAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFVybFNlZ21lbnRHcm91cCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIF9zb3VyY2VTZWdtZW50ICE6IFVybFNlZ21lbnRHcm91cDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgX3NlZ21lbnRJbmRleFNoaWZ0ICE6IG51bWJlcjtcbiAgLyoqIFRoZSBwYXJlbnQgbm9kZSBpbiB0aGUgdXJsIHRyZWUgKi9cbiAgcGFyZW50OiBVcmxTZWdtZW50R3JvdXB8bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogVGhlIFVSTCBzZWdtZW50cyBvZiB0aGlzIGdyb3VwLiBTZWUgYFVybFNlZ21lbnRgIGZvciBtb3JlIGluZm9ybWF0aW9uICovXG4gICAgICBwdWJsaWMgc2VnbWVudHM6IFVybFNlZ21lbnRbXSxcbiAgICAgIC8qKiBUaGUgbGlzdCBvZiBjaGlsZHJlbiBvZiB0aGlzIGdyb3VwICovXG4gICAgICBwdWJsaWMgY2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50R3JvdXB9KSB7XG4gICAgZm9yRWFjaChjaGlsZHJlbiwgKHY6IGFueSwgazogYW55KSA9PiB2LnBhcmVudCA9IHRoaXMpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNlZ21lbnQgaGFzIGNoaWxkIHNlZ21lbnRzICovXG4gIGhhc0NoaWxkcmVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5udW1iZXJPZkNoaWxkcmVuID4gMDsgfVxuXG4gIC8qKiBOdW1iZXIgb2YgY2hpbGQgc2VnbWVudHMgKi9cbiAgZ2V0IG51bWJlck9mQ2hpbGRyZW4oKTogbnVtYmVyIHsgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pLmxlbmd0aDsgfVxuXG4gIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBzZXJpYWxpemVQYXRocyh0aGlzKTsgfVxufVxuXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyBhIHNpbmdsZSBVUkwgc2VnbWVudC5cbiAqXG4gKiBBIFVybFNlZ21lbnQgaXMgYSBwYXJ0IG9mIGEgVVJMIGJldHdlZW4gdGhlIHR3byBzbGFzaGVzLiBJdCBjb250YWlucyBhIHBhdGggYW5kIHRoZSBtYXRyaXhcbiAqIHBhcmFtZXRlcnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBzZWdtZW50LlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKsKgIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIEBDb21wb25lbnQoe3RlbXBsYXRlVXJsOid0ZW1wbGF0ZS5odG1sJ30pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKSB7XG4gKiAgICAgY29uc3QgdHJlZTogVXJsVHJlZSA9IHJvdXRlci5wYXJzZVVybCgnL3RlYW07aWQ9MzMnKTtcbiAqICAgICBjb25zdCBnOiBVcmxTZWdtZW50R3JvdXAgPSB0cmVlLnJvb3QuY2hpbGRyZW5bUFJJTUFSWV9PVVRMRVRdO1xuICogICAgIGNvbnN0IHM6IFVybFNlZ21lbnRbXSA9IGcuc2VnbWVudHM7XG4gKiAgICAgc1swXS5wYXRoOyAvLyByZXR1cm5zICd0ZWFtJ1xuICogICAgIHNbMF0ucGFyYW1ldGVyczsgLy8gcmV0dXJucyB7aWQ6IDMzfVxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgVXJsU2VnbWVudCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIF9wYXJhbWV0ZXJNYXAgITogUGFyYW1NYXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICAvKiogVGhlIHBhdGggcGFydCBvZiBhIFVSTCBzZWdtZW50ICovXG4gICAgICBwdWJsaWMgcGF0aDogc3RyaW5nLFxuXG4gICAgICAvKiogVGhlIG1hdHJpeCBwYXJhbWV0ZXJzIGFzc29jaWF0ZWQgd2l0aCBhIHNlZ21lbnQgKi9cbiAgICAgIHB1YmxpYyBwYXJhbWV0ZXJzOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pIHt9XG5cbiAgZ2V0IHBhcmFtZXRlck1hcCgpIHtcbiAgICBpZiAoIXRoaXMuX3BhcmFtZXRlck1hcCkge1xuICAgICAgdGhpcy5fcGFyYW1ldGVyTWFwID0gY29udmVydFRvUGFyYW1NYXAodGhpcy5wYXJhbWV0ZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BhcmFtZXRlck1hcDtcbiAgfVxuXG4gIC8qKiBAZG9jc05vdFJlcXVpcmVkICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBzZXJpYWxpemVQYXRoKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFNlZ21lbnRzKGFzOiBVcmxTZWdtZW50W10sIGJzOiBVcmxTZWdtZW50W10pOiBib29sZWFuIHtcbiAgcmV0dXJuIGVxdWFsUGF0aChhcywgYnMpICYmIGFzLmV2ZXJ5KChhLCBpKSA9PiBzaGFsbG93RXF1YWwoYS5wYXJhbWV0ZXJzLCBic1tpXS5wYXJhbWV0ZXJzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFBhdGgoYXM6IFVybFNlZ21lbnRbXSwgYnM6IFVybFNlZ21lbnRbXSk6IGJvb2xlYW4ge1xuICBpZiAoYXMubGVuZ3RoICE9PSBicy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGFzLmV2ZXJ5KChhLCBpKSA9PiBhLnBhdGggPT09IGJzW2ldLnBhdGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwQ2hpbGRyZW5JbnRvQXJyYXk8VD4oXG4gICAgc2VnbWVudDogVXJsU2VnbWVudEdyb3VwLCBmbjogKHY6IFVybFNlZ21lbnRHcm91cCwgazogc3RyaW5nKSA9PiBUW10pOiBUW10ge1xuICBsZXQgcmVzOiBUW10gPSBbXTtcbiAgZm9yRWFjaChzZWdtZW50LmNoaWxkcmVuLCAoY2hpbGQ6IFVybFNlZ21lbnRHcm91cCwgY2hpbGRPdXRsZXQ6IHN0cmluZykgPT4ge1xuICAgIGlmIChjaGlsZE91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgIHJlcyA9IHJlcy5jb25jYXQoZm4oY2hpbGQsIGNoaWxkT3V0bGV0KSk7XG4gICAgfVxuICB9KTtcbiAgZm9yRWFjaChzZWdtZW50LmNoaWxkcmVuLCAoY2hpbGQ6IFVybFNlZ21lbnRHcm91cCwgY2hpbGRPdXRsZXQ6IHN0cmluZykgPT4ge1xuICAgIGlmIChjaGlsZE91dGxldCAhPT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgIHJlcyA9IHJlcy5jb25jYXQoZm4oY2hpbGQsIGNoaWxkT3V0bGV0KSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlcztcbn1cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFNlcmlhbGl6ZXMgYW5kIGRlc2VyaWFsaXplcyBhIFVSTCBzdHJpbmcgaW50byBhIFVSTCB0cmVlLlxuICpcbiAqIFRoZSB1cmwgc2VyaWFsaXphdGlvbiBzdHJhdGVneSBpcyBjdXN0b21pemFibGUuIFlvdSBjYW5cbiAqIG1ha2UgYWxsIFVSTHMgY2FzZSBpbnNlbnNpdGl2ZSBieSBwcm92aWRpbmcgYSBjdXN0b20gVXJsU2VyaWFsaXplci5cbiAqXG4gKiBTZWUgYERlZmF1bHRVcmxTZXJpYWxpemVyYCBmb3IgYW4gZXhhbXBsZSBvZiBhIFVSTCBzZXJpYWxpemVyLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVcmxTZXJpYWxpemVyIHtcbiAgLyoqIFBhcnNlIGEgdXJsIGludG8gYSBgVXJsVHJlZWAgKi9cbiAgYWJzdHJhY3QgcGFyc2UodXJsOiBzdHJpbmcpOiBVcmxUcmVlO1xuXG4gIC8qKiBDb252ZXJ0cyBhIGBVcmxUcmVlYCBpbnRvIGEgdXJsICovXG4gIGFic3RyYWN0IHNlcmlhbGl6ZSh0cmVlOiBVcmxUcmVlKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgYFVybFNlcmlhbGl6ZXJgLlxuICpcbiAqIEV4YW1wbGUgVVJMczpcbiAqXG4gKiBgYGBcbiAqIC9pbmJveC8zMyhwb3B1cDpjb21wb3NlKVxuICogL2luYm94LzMzO29wZW49dHJ1ZS9tZXNzYWdlcy80NFxuICogYGBgXG4gKlxuICogRGVmYXVsdFVybFNlcmlhbGl6ZXIgdXNlcyBwYXJlbnRoZXNlcyB0byBzZXJpYWxpemUgc2Vjb25kYXJ5IHNlZ21lbnRzIChlLmcuLCBwb3B1cDpjb21wb3NlKSwgdGhlXG4gKiBjb2xvbiBzeW50YXggdG8gc3BlY2lmeSB0aGUgb3V0bGV0LCBhbmQgdGhlICc7cGFyYW1ldGVyPXZhbHVlJyBzeW50YXggKGUuZy4sIG9wZW49dHJ1ZSkgdG9cbiAqIHNwZWNpZnkgcm91dGUgc3BlY2lmaWMgcGFyYW1ldGVycy5cbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdFVybFNlcmlhbGl6ZXIgaW1wbGVtZW50cyBVcmxTZXJpYWxpemVyIHtcbiAgLyoqIFBhcnNlcyBhIHVybCBpbnRvIGEgYFVybFRyZWVgICovXG4gIHBhcnNlKHVybDogc3RyaW5nKTogVXJsVHJlZSB7XG4gICAgY29uc3QgcCA9IG5ldyBVcmxQYXJzZXIodXJsKTtcbiAgICByZXR1cm4gbmV3IFVybFRyZWUocC5wYXJzZVJvb3RTZWdtZW50KCksIHAucGFyc2VRdWVyeVBhcmFtcygpLCBwLnBhcnNlRnJhZ21lbnQoKSk7XG4gIH1cblxuICAvKiogQ29udmVydHMgYSBgVXJsVHJlZWAgaW50byBhIHVybCAqL1xuICBzZXJpYWxpemUodHJlZTogVXJsVHJlZSk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IGAvJHtzZXJpYWxpemVTZWdtZW50KHRyZWUucm9vdCwgdHJ1ZSl9YDtcbiAgICBjb25zdCBxdWVyeSA9IHNlcmlhbGl6ZVF1ZXJ5UGFyYW1zKHRyZWUucXVlcnlQYXJhbXMpO1xuICAgIGNvbnN0IGZyYWdtZW50ID1cbiAgICAgICAgdHlwZW9mIHRyZWUuZnJhZ21lbnQgPT09IGBzdHJpbmdgID8gYCMke2VuY29kZVVyaUZyYWdtZW50KHRyZWUuZnJhZ21lbnQgISl9YCA6ICcnO1xuXG4gICAgcmV0dXJuIGAke3NlZ21lbnR9JHtxdWVyeX0ke2ZyYWdtZW50fWA7XG4gIH1cbn1cblxuY29uc3QgREVGQVVMVF9TRVJJQUxJWkVSID0gbmV3IERlZmF1bHRVcmxTZXJpYWxpemVyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemVQYXRocyhzZWdtZW50OiBVcmxTZWdtZW50R3JvdXApOiBzdHJpbmcge1xuICByZXR1cm4gc2VnbWVudC5zZWdtZW50cy5tYXAocCA9PiBzZXJpYWxpemVQYXRoKHApKS5qb2luKCcvJyk7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZVNlZ21lbnQoc2VnbWVudDogVXJsU2VnbWVudEdyb3VwLCByb290OiBib29sZWFuKTogc3RyaW5nIHtcbiAgaWYgKCFzZWdtZW50Lmhhc0NoaWxkcmVuKCkpIHtcbiAgICByZXR1cm4gc2VyaWFsaXplUGF0aHMoc2VnbWVudCk7XG4gIH1cblxuICBpZiAocm9vdCkge1xuICAgIGNvbnN0IHByaW1hcnkgPSBzZWdtZW50LmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSA/XG4gICAgICAgIHNlcmlhbGl6ZVNlZ21lbnQoc2VnbWVudC5jaGlsZHJlbltQUklNQVJZX09VVExFVF0sIGZhbHNlKSA6XG4gICAgICAgICcnO1xuICAgIGNvbnN0IGNoaWxkcmVuOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgZm9yRWFjaChzZWdtZW50LmNoaWxkcmVuLCAodjogVXJsU2VnbWVudEdyb3VwLCBrOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChrICE9PSBQUklNQVJZX09VVExFVCkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGAke2t9OiR7c2VyaWFsaXplU2VnbWVudCh2LCBmYWxzZSl9YCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGAke3ByaW1hcnl9KCR7Y2hpbGRyZW4uam9pbignLy8nKX0pYCA6IHByaW1hcnk7XG5cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IG1hcENoaWxkcmVuSW50b0FycmF5KHNlZ21lbnQsICh2OiBVcmxTZWdtZW50R3JvdXAsIGs6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGsgPT09IFBSSU1BUllfT1VUTEVUKSB7XG4gICAgICAgIHJldHVybiBbc2VyaWFsaXplU2VnbWVudChzZWdtZW50LmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSwgZmFsc2UpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtgJHtrfToke3NlcmlhbGl6ZVNlZ21lbnQodiwgZmFsc2UpfWBdO1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gYCR7c2VyaWFsaXplUGF0aHMoc2VnbWVudCl9Lygke2NoaWxkcmVuLmpvaW4oJy8vJyl9KWA7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmNvZGVzIGEgVVJJIHN0cmluZyB3aXRoIHRoZSBkZWZhdWx0IGVuY29kaW5nLiBUaGlzIGZ1bmN0aW9uIHdpbGwgb25seSBldmVyIGJlIGNhbGxlZCBmcm9tXG4gKiBgZW5jb2RlVXJpUXVlcnlgIG9yIGBlbmNvZGVVcmlTZWdtZW50YCBhcyBpdCdzIHRoZSBiYXNlIHNldCBvZiBlbmNvZGluZ3MgdG8gYmUgdXNlZC4gV2UgbmVlZFxuICogYSBjdXN0b20gZW5jb2RpbmcgYmVjYXVzZSBlbmNvZGVVUklDb21wb25lbnQgaXMgdG9vIGFnZ3Jlc3NpdmUgYW5kIGVuY29kZXMgc3R1ZmYgdGhhdCBkb2Vzbid0XG4gKiBoYXZlIHRvIGJlIGVuY29kZWQgcGVyIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlVXJpU3RyaW5nKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQocylcbiAgICAgIC5yZXBsYWNlKC8lNDAvZywgJ0AnKVxuICAgICAgLnJlcGxhY2UoLyUzQS9naSwgJzonKVxuICAgICAgLnJlcGxhY2UoLyUyNC9nLCAnJCcpXG4gICAgICAucmVwbGFjZSgvJTJDL2dpLCAnLCcpO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIHVzZWQgdG8gZW5jb2RlIGJvdGgga2V5cyBhbmQgdmFsdWVzIGluIGEgcXVlcnkgc3RyaW5nIGtleS92YWx1ZS4gSW5cbiAqIHRoZSBmb2xsb3dpbmcgVVJMLCB5b3UgbmVlZCB0byBjYWxsIGVuY29kZVVyaVF1ZXJ5IG9uIFwia1wiIGFuZCBcInZcIjpcbiAqXG4gKiBodHRwOi8vd3d3LnNpdGUub3JnL2h0bWw7bWs9bXY/az12I2ZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZVVyaVF1ZXJ5KHM6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBlbmNvZGVVcmlTdHJpbmcocykucmVwbGFjZSgvJTNCL2dpLCAnOycpO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIHVzZWQgdG8gZW5jb2RlIGEgVVJMIGZyYWdtZW50LiBJbiB0aGUgZm9sbG93aW5nIFVSTCwgeW91IG5lZWQgdG8gY2FsbFxuICogZW5jb2RlVXJpRnJhZ21lbnQgb24gXCJmXCI6XG4gKlxuICogaHR0cDovL3d3dy5zaXRlLm9yZy9odG1sO21rPW12P2s9diNmXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVVcmlGcmFnbWVudChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZW5jb2RlVVJJKHMpO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIHJ1biBvbiBhbnkgVVJJIHNlZ21lbnQgYXMgd2VsbCBhcyB0aGUga2V5IGFuZCB2YWx1ZSBpbiBhIGtleS92YWx1ZVxuICogcGFpciBmb3IgbWF0cml4IHBhcmFtcy4gSW4gdGhlIGZvbGxvd2luZyBVUkwsIHlvdSBuZWVkIHRvIGNhbGwgZW5jb2RlVXJpU2VnbWVudCBvbiBcImh0bWxcIixcbiAqIFwibWtcIiwgYW5kIFwibXZcIjpcbiAqXG4gKiBodHRwOi8vd3d3LnNpdGUub3JnL2h0bWw7bWs9bXY/az12I2ZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZVVyaVNlZ21lbnQoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGVuY29kZVVyaVN0cmluZyhzKS5yZXBsYWNlKC9cXCgvZywgJyUyOCcpLnJlcGxhY2UoL1xcKS9nLCAnJTI5JykucmVwbGFjZSgvJTI2L2dpLCAnJicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocyk7XG59XG5cbi8vIFF1ZXJ5IGtleXMvdmFsdWVzIHNob3VsZCBoYXZlIHRoZSBcIitcIiByZXBsYWNlZCBmaXJzdCwgYXMgXCIrXCIgaW4gYSBxdWVyeSBzdHJpbmcgaXMgXCIgXCIuXG4vLyBkZWNvZGVVUklDb21wb25lbnQgZnVuY3Rpb24gd2lsbCBub3QgZGVjb2RlIFwiK1wiIGFzIGEgc3BhY2UuXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlUXVlcnkoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGRlY29kZShzLnJlcGxhY2UoL1xcKy9nLCAnJTIwJykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplUGF0aChwYXRoOiBVcmxTZWdtZW50KTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke2VuY29kZVVyaVNlZ21lbnQocGF0aC5wYXRoKX0ke3NlcmlhbGl6ZU1hdHJpeFBhcmFtcyhwYXRoLnBhcmFtZXRlcnMpfWA7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZU1hdHJpeFBhcmFtcyhwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KTogc3RyaW5nIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHBhcmFtcylcbiAgICAgIC5tYXAoa2V5ID0+IGA7JHtlbmNvZGVVcmlTZWdtZW50KGtleSl9PSR7ZW5jb2RlVXJpU2VnbWVudChwYXJhbXNba2V5XSl9YClcbiAgICAgIC5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplUXVlcnlQYXJhbXMocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHN0cmluZyB7XG4gIGNvbnN0IHN0clBhcmFtczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhwYXJhbXMpLm1hcCgobmFtZSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gcGFyYW1zW25hbWVdO1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/XG4gICAgICAgIHZhbHVlLm1hcCh2ID0+IGAke2VuY29kZVVyaVF1ZXJ5KG5hbWUpfT0ke2VuY29kZVVyaVF1ZXJ5KHYpfWApLmpvaW4oJyYnKSA6XG4gICAgICAgIGAke2VuY29kZVVyaVF1ZXJ5KG5hbWUpfT0ke2VuY29kZVVyaVF1ZXJ5KHZhbHVlKX1gO1xuICB9KTtcblxuICByZXR1cm4gc3RyUGFyYW1zLmxlbmd0aCA/IGA/JHtzdHJQYXJhbXMuam9pbihcIiZcIil9YCA6ICcnO1xufVxuXG5jb25zdCBTRUdNRU5UX1JFID0gL15bXlxcLygpPzs9I10rLztcbmZ1bmN0aW9uIG1hdGNoU2VnbWVudHMoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaChTRUdNRU5UX1JFKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMF0gOiAnJztcbn1cblxuY29uc3QgUVVFUllfUEFSQU1fUkUgPSAvXltePT8mI10rLztcbi8vIFJldHVybiB0aGUgbmFtZSBvZiB0aGUgcXVlcnkgcGFyYW0gYXQgdGhlIHN0YXJ0IG9mIHRoZSBzdHJpbmcgb3IgYW4gZW1wdHkgc3RyaW5nXG5mdW5jdGlvbiBtYXRjaFF1ZXJ5UGFyYW1zKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goUVVFUllfUEFSQU1fUkUpO1xuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6ICcnO1xufVxuXG5jb25zdCBRVUVSWV9QQVJBTV9WQUxVRV9SRSA9IC9eW14/JiNdKy87XG4vLyBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBxdWVyeSBwYXJhbSBhdCB0aGUgc3RhcnQgb2YgdGhlIHN0cmluZyBvciBhbiBlbXB0eSBzdHJpbmdcbmZ1bmN0aW9uIG1hdGNoVXJsUXVlcnlQYXJhbVZhbHVlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbWF0Y2ggPSBzdHIubWF0Y2goUVVFUllfUEFSQU1fVkFMVUVfUkUpO1xuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6ICcnO1xufVxuXG5jbGFzcyBVcmxQYXJzZXIge1xuICBwcml2YXRlIHJlbWFpbmluZzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXJsOiBzdHJpbmcpIHsgdGhpcy5yZW1haW5pbmcgPSB1cmw7IH1cblxuICBwYXJzZVJvb3RTZWdtZW50KCk6IFVybFNlZ21lbnRHcm91cCB7XG4gICAgdGhpcy5jb25zdW1lT3B0aW9uYWwoJy8nKTtcblxuICAgIGlmICh0aGlzLnJlbWFpbmluZyA9PT0gJycgfHwgdGhpcy5wZWVrU3RhcnRzV2l0aCgnPycpIHx8IHRoaXMucGVla1N0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgcmV0dXJuIG5ldyBVcmxTZWdtZW50R3JvdXAoW10sIHt9KTtcbiAgICB9XG5cbiAgICAvLyBUaGUgcm9vdCBzZWdtZW50IGdyb3VwIG5ldmVyIGhhcyBzZWdtZW50c1xuICAgIHJldHVybiBuZXcgVXJsU2VnbWVudEdyb3VwKFtdLCB0aGlzLnBhcnNlQ2hpbGRyZW4oKSk7XG4gIH1cblxuICBwYXJzZVF1ZXJ5UGFyYW1zKCk6IFBhcmFtcyB7XG4gICAgY29uc3QgcGFyYW1zOiBQYXJhbXMgPSB7fTtcbiAgICBpZiAodGhpcy5jb25zdW1lT3B0aW9uYWwoJz8nKSkge1xuICAgICAgZG8ge1xuICAgICAgICB0aGlzLnBhcnNlUXVlcnlQYXJhbShwYXJhbXMpO1xuICAgICAgfSB3aGlsZSAodGhpcy5jb25zdW1lT3B0aW9uYWwoJyYnKSk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBwYXJzZUZyYWdtZW50KCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdW1lT3B0aW9uYWwoJyMnKSA/IGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLnJlbWFpbmluZykgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNoaWxkcmVuKCk6IHtbb3V0bGV0OiBzdHJpbmddOiBVcmxTZWdtZW50R3JvdXB9IHtcbiAgICBpZiAodGhpcy5yZW1haW5pbmcgPT09ICcnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgdGhpcy5jb25zdW1lT3B0aW9uYWwoJy8nKTtcblxuICAgIGNvbnN0IHNlZ21lbnRzOiBVcmxTZWdtZW50W10gPSBbXTtcbiAgICBpZiAoIXRoaXMucGVla1N0YXJ0c1dpdGgoJygnKSkge1xuICAgICAgc2VnbWVudHMucHVzaCh0aGlzLnBhcnNlU2VnbWVudCgpKTtcbiAgICB9XG5cbiAgICB3aGlsZSAodGhpcy5wZWVrU3RhcnRzV2l0aCgnLycpICYmICF0aGlzLnBlZWtTdGFydHNXaXRoKCcvLycpICYmICF0aGlzLnBlZWtTdGFydHNXaXRoKCcvKCcpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJy8nKTtcbiAgICAgIHNlZ21lbnRzLnB1c2godGhpcy5wYXJzZVNlZ21lbnQoKSk7XG4gICAgfVxuXG4gICAgbGV0IGNoaWxkcmVuOiB7W291dGxldDogc3RyaW5nXTogVXJsU2VnbWVudEdyb3VwfSA9IHt9O1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcvKCcpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJy8nKTtcbiAgICAgIGNoaWxkcmVuID0gdGhpcy5wYXJzZVBhcmVucyh0cnVlKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzOiB7W291dGxldDogc3RyaW5nXTogVXJsU2VnbWVudEdyb3VwfSA9IHt9O1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcoJykpIHtcbiAgICAgIHJlcyA9IHRoaXMucGFyc2VQYXJlbnMoZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChzZWdtZW50cy5sZW5ndGggPiAwIHx8IE9iamVjdC5rZXlzKGNoaWxkcmVuKS5sZW5ndGggPiAwKSB7XG4gICAgICByZXNbUFJJTUFSWV9PVVRMRVRdID0gbmV3IFVybFNlZ21lbnRHcm91cChzZWdtZW50cywgY2hpbGRyZW4pO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvLyBwYXJzZSBhIHNlZ21lbnQgd2l0aCBpdHMgbWF0cml4IHBhcmFtZXRlcnNcbiAgLy8gaWUgYG5hbWU7azE9djE7azJgXG4gIHByaXZhdGUgcGFyc2VTZWdtZW50KCk6IFVybFNlZ21lbnQge1xuICAgIGNvbnN0IHBhdGggPSBtYXRjaFNlZ21lbnRzKHRoaXMucmVtYWluaW5nKTtcbiAgICBpZiAocGF0aCA9PT0gJycgJiYgdGhpcy5wZWVrU3RhcnRzV2l0aCgnOycpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVtcHR5IHBhdGggdXJsIHNlZ21lbnQgY2Fubm90IGhhdmUgcGFyYW1ldGVyczogJyR7dGhpcy5yZW1haW5pbmd9Jy5gKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhcHR1cmUocGF0aCk7XG4gICAgcmV0dXJuIG5ldyBVcmxTZWdtZW50KGRlY29kZShwYXRoKSwgdGhpcy5wYXJzZU1hdHJpeFBhcmFtcygpKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNYXRyaXhQYXJhbXMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGNvbnN0IHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICB3aGlsZSAodGhpcy5jb25zdW1lT3B0aW9uYWwoJzsnKSkge1xuICAgICAgdGhpcy5wYXJzZVBhcmFtKHBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlUGFyYW0ocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IG1hdGNoU2VnbWVudHModGhpcy5yZW1haW5pbmcpO1xuICAgIGlmICgha2V5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FwdHVyZShrZXkpO1xuICAgIGxldCB2YWx1ZTogYW55ID0gJyc7XG4gICAgaWYgKHRoaXMuY29uc3VtZU9wdGlvbmFsKCc9JykpIHtcbiAgICAgIGNvbnN0IHZhbHVlTWF0Y2ggPSBtYXRjaFNlZ21lbnRzKHRoaXMucmVtYWluaW5nKTtcbiAgICAgIGlmICh2YWx1ZU1hdGNoKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVNYXRjaDtcbiAgICAgICAgdGhpcy5jYXB0dXJlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJhbXNbZGVjb2RlKGtleSldID0gZGVjb2RlKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFBhcnNlIGEgc2luZ2xlIHF1ZXJ5IHBhcmFtZXRlciBgbmFtZVs9dmFsdWVdYFxuICBwcml2YXRlIHBhcnNlUXVlcnlQYXJhbShwYXJhbXM6IFBhcmFtcyk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IG1hdGNoUXVlcnlQYXJhbXModGhpcy5yZW1haW5pbmcpO1xuICAgIGlmICgha2V5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY2FwdHVyZShrZXkpO1xuICAgIGxldCB2YWx1ZTogYW55ID0gJyc7XG4gICAgaWYgKHRoaXMuY29uc3VtZU9wdGlvbmFsKCc9JykpIHtcbiAgICAgIGNvbnN0IHZhbHVlTWF0Y2ggPSBtYXRjaFVybFF1ZXJ5UGFyYW1WYWx1ZSh0aGlzLnJlbWFpbmluZyk7XG4gICAgICBpZiAodmFsdWVNYXRjaCkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlTWF0Y2g7XG4gICAgICAgIHRoaXMuY2FwdHVyZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVjb2RlZEtleSA9IGRlY29kZVF1ZXJ5KGtleSk7XG4gICAgY29uc3QgZGVjb2RlZFZhbCA9IGRlY29kZVF1ZXJ5KHZhbHVlKTtcblxuICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoZGVjb2RlZEtleSkpIHtcbiAgICAgIC8vIEFwcGVuZCB0byBleGlzdGluZyB2YWx1ZXNcbiAgICAgIGxldCBjdXJyZW50VmFsID0gcGFyYW1zW2RlY29kZWRLZXldO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGN1cnJlbnRWYWwpKSB7XG4gICAgICAgIGN1cnJlbnRWYWwgPSBbY3VycmVudFZhbF07XG4gICAgICAgIHBhcmFtc1tkZWNvZGVkS2V5XSA9IGN1cnJlbnRWYWw7XG4gICAgICB9XG4gICAgICBjdXJyZW50VmFsLnB1c2goZGVjb2RlZFZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENyZWF0ZSBhIG5ldyB2YWx1ZVxuICAgICAgcGFyYW1zW2RlY29kZWRLZXldID0gZGVjb2RlZFZhbDtcbiAgICB9XG4gIH1cblxuICAvLyBwYXJzZSBgKGEvYi8vb3V0bGV0X25hbWU6Yy9kKWBcbiAgcHJpdmF0ZSBwYXJzZVBhcmVucyhhbGxvd1ByaW1hcnk6IGJvb2xlYW4pOiB7W291dGxldDogc3RyaW5nXTogVXJsU2VnbWVudEdyb3VwfSB7XG4gICAgY29uc3Qgc2VnbWVudHM6IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50R3JvdXB9ID0ge307XG4gICAgdGhpcy5jYXB0dXJlKCcoJyk7XG5cbiAgICB3aGlsZSAoIXRoaXMuY29uc3VtZU9wdGlvbmFsKCcpJykgJiYgdGhpcy5yZW1haW5pbmcubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcGF0aCA9IG1hdGNoU2VnbWVudHModGhpcy5yZW1haW5pbmcpO1xuXG4gICAgICBjb25zdCBuZXh0ID0gdGhpcy5yZW1haW5pbmdbcGF0aC5sZW5ndGhdO1xuXG4gICAgICAvLyBpZiBpcyBpcyBub3Qgb25lIG9mIHRoZXNlIGNoYXJhY3RlcnMsIHRoZW4gdGhlIHNlZ21lbnQgd2FzIHVuZXNjYXBlZFxuICAgICAgLy8gb3IgdGhlIGdyb3VwIHdhcyBub3QgY2xvc2VkXG4gICAgICBpZiAobmV4dCAhPT0gJy8nICYmIG5leHQgIT09ICcpJyAmJiBuZXh0ICE9PSAnOycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcGFyc2UgdXJsICcke3RoaXMudXJsfSdgKTtcbiAgICAgIH1cblxuICAgICAgbGV0IG91dGxldE5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZCAhO1xuICAgICAgaWYgKHBhdGguaW5kZXhPZignOicpID4gLTEpIHtcbiAgICAgICAgb3V0bGV0TmFtZSA9IHBhdGguc3Vic3RyKDAsIHBhdGguaW5kZXhPZignOicpKTtcbiAgICAgICAgdGhpcy5jYXB0dXJlKG91dGxldE5hbWUpO1xuICAgICAgICB0aGlzLmNhcHR1cmUoJzonKTtcbiAgICAgIH0gZWxzZSBpZiAoYWxsb3dQcmltYXJ5KSB7XG4gICAgICAgIG91dGxldE5hbWUgPSBQUklNQVJZX09VVExFVDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnBhcnNlQ2hpbGRyZW4oKTtcbiAgICAgIHNlZ21lbnRzW291dGxldE5hbWVdID0gT2JqZWN0LmtleXMoY2hpbGRyZW4pLmxlbmd0aCA9PT0gMSA/IGNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVXJsU2VnbWVudEdyb3VwKFtdLCBjaGlsZHJlbik7XG4gICAgICB0aGlzLmNvbnN1bWVPcHRpb25hbCgnLy8nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG4gIH1cblxuICBwcml2YXRlIHBlZWtTdGFydHNXaXRoKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnJlbWFpbmluZy5zdGFydHNXaXRoKHN0cik7IH1cblxuICAvLyBDb25zdW1lcyB0aGUgcHJlZml4IHdoZW4gaXQgaXMgcHJlc2VudCBhbmQgcmV0dXJucyB3aGV0aGVyIGl0IGhhcyBiZWVuIGNvbnN1bWVkXG4gIHByaXZhdGUgY29uc3VtZU9wdGlvbmFsKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoc3RyKSkge1xuICAgICAgdGhpcy5yZW1haW5pbmcgPSB0aGlzLnJlbWFpbmluZy5zdWJzdHJpbmcoc3RyLmxlbmd0aCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjYXB0dXJlKHN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnN1bWVPcHRpb25hbChzdHIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIFwiJHtzdHJ9XCIuYCk7XG4gICAgfVxuICB9XG59XG4iXX0=