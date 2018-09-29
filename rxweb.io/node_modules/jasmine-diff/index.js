var diff = require('diff')

/**
 * Return type of given value.
 *
 * @param {*} val Value to identify
 * @return {string}
 */
function getType (val) {
  if (val === null) {
    return 'null'
  } else if (val === void 0) {
    return 'undefined'
  }
  return Object.prototype.toString.call(val)
    .replace(/^\[.+\s(.+?)]$/, '$1')
    .toLowerCase()
}

/**
 * Value wrapper to contain state.
 *
 * @param {*} val Value to wrap
 * @param {Value|null} parent Parent value
 * @param {object} [opts] Options
 * @param {string|number} [opts.key] Key/index if value is contained in an object/array
 * @param {number} [opts.length] Length if value is an object/array
 * @return {Value}
 */
function Value (val, parent, opts) {
  var obj = Object.create(Value.prototype)
  opts = opts || {}
  obj.value = val
  obj.parent = parent
  obj.type = getType(val)
  obj.key = opts.key
  obj.length = opts.length !== undefined ? opts.length : (val && val.length)
  return obj
}

/**
 * Traverse a value with a visitor object.
 *
 * @param {*} value Value to traverse
 * @param {Visitor} visitor Visitor instance
 */
function traverse (value, v) {
  var state = {}
  var visitor = v.visitor
  var seen = []

  /**
   * Recursively walk the value, dispatching visitor methods as values are encountered.
   *
   * @param {*} val Value
   * @param {Value|null} parent Parent value
   * @param {object} [opts] Additional options
   */
  function traverseValue (val, parent, opts) {
    var wrapper = Value(val, parent, opts)
    var enterFn = wrapper.type + 'Enter'
    var exitFn = wrapper.type + 'Exit'
    var keys

    if (wrapper.type === 'object' || wrapper.type === 'array') {
      if (seen.indexOf(wrapper.value) >= 0) {
        wrapper.isCircularRef = true
      }
      seen.push(wrapper.value)
    }

    if (wrapper.type === 'object') {
      keys = Object.keys(wrapper.value).sort()
      wrapper.length = keys.length
    }

    if (visitor[enterFn]) {
      visitor[enterFn](wrapper, state)
    } else if (visitor.otherEnter) {
      visitor.otherEnter(wrapper, state)
    }

    switch (wrapper.type) {
      case 'array':
        if (!wrapper.isCircularRef) {
          wrapper.value.forEach(function (child, i) {
            traverseValue(child, wrapper, { key: i })
          })
        }
        break

      case 'object':
        if (!wrapper.isCircularRef) {
          keys.forEach(function (key) {
            traverseValue(wrapper.value[key], wrapper, { key: key })
          })
        }
        break

      default:
        /* do nothing */
        break
    }

    if (visitor[exitFn]) {
      visitor[exitFn](wrapper, state)
    }

    if (wrapper.type === 'object' || wrapper.type === 'array') {
      seen.pop()
    }
  }

  if (v.pre) { v.pre.call(null, state) }
  traverseValue(value, null, null)
  if (v.post) { v.post.call(null, state) }
}

/**
 * Repeat a string n number of times (n=0 results in an empty string).
 *
 * @param {number} n Times to repeat
 * @param {string} str String to repeat
 * @return {string}
 */
function repeat (n, str) {
  var result = ''
  while (n > 0) {
    result += str
    n -= 1
  }
  return result
}

/**
 * Visitor factory for pretty printing a JavaScript value.
 *
 * @param {function} pp Fallback pretty printer
 * @param {number} spaces Number of spaces for indentation
 * @return {object} Visitor instance
 */
function prettyPrintVisitor (pp, spaces) {
  var visitor = {}
  visitor.pre = function (state) {
    state.result = ''
    state.depth = 0
  }
  visitor.visitor = {
    arrayEnter: function (val, state) {
      if (val.key !== undefined) {
        state.result += repeat(state.depth * spaces, ' ')
        if (val.parent.type === 'object') {
          state.result += "'" + val.key + "': "
        }
      }
      if (val.isCircularRef) {
        state.result += '[Circular]\n'
        return
      } else if (val.length === 0) {
        state.result += '[]\n'
        return
      }
      state.result += '[\n'
      state.depth += 1
    },
    arrayExit: function (val, state) {
      if (val.length === 0 || val.isCircularRef) { return }
      state.depth -= 1
      state.result += repeat(state.depth * spaces, ' ') + ']\n'
    },
    objectEnter: function (val, state) {
      if (val.key !== undefined) {
        state.result += repeat(state.depth * spaces, ' ')
        if (val.parent.type === 'object') {
          state.result += "'" + val.key + "': "
        }
      }
      if (val.isCircularRef) {
        state.result += '[Circular]\n'
        return
      } else if (val.length === 0) {
        state.result += '{}\n'
        return
      }
      state.result += '{\n'
      state.depth += 1
    },
    objectExit: function (val, state) {
      if (val.length === 0 || val.isCircularRef) { return }
      state.depth -= 1
      state.result += repeat(state.depth * spaces, ' ') + '}\n'
    },
    stringEnter: function (val, state) {
      if (val.parent === null) {
        state.result += pp(val.value).slice(1, -1)
        return
      }
      state.result += repeat(state.depth * spaces, ' ')
      if (val.parent.type === 'object') {
        state.result += "'" + val.key + "': "
      }
      state.result += pp(val.value) + '\n'
    },
    otherEnter: function (val, state) {
      state.result += repeat(state.depth * spaces, ' ')
      if (val.key !== undefined && val.parent.type === 'object') {
        state.result += "'" + val.key + "': "
      }
      state.result += pp(val.value) + '\n'
    }
  }
  visitor.post = function (state) {
    visitor.result = state.result.trim()
  }
  return visitor
}

/**
 * Stringifier factory.
 *
 * @param {function} pp Fallback pretty printer
 * @param {number} spaces Number of spaces for indentation
 * @return {function}
 */
function createStringifier (pp, spaces) {
  return function stringify (value) {
    var visitor = prettyPrintVisitor(pp, spaces)
    traverse(value, visitor)
    return visitor.result
  }
}

/**
 * Return whether value should be diffed.
 *
 * @param {*} val Value to test
 * @return {boolean}
 */
function isDiffable (val) {
  switch (getType(val)) {
    case 'array':
    case 'object':
      return true

    case 'string':
      return val.length >= 40 || (val.trim().match(/\n/g) || []).length >= 1

    default:
      return false
  }
}

/**
 * Left-pad utility.
 *
 * @param {string} str String to pad
 * @param {number} width Total desired width of string
 * @return {string}
 */
function lpad (str, width) {
  while (String(str).length < width) {
    str = ' ' + str
  }
  return str
}

/**
 * Compose (B combinator).
 */
function B (f, g) {
  return function (x) {
    return f(g(x))
  }
}

/**
 * Create a colorize function.
 *
 * @param {number} code ANSI color code
 * @return {function}
 */
function color (code) {
  /**
   * Wrap string with ANSI sequence for given color code.
   *
   * @param {string} str String to wrap
   * @return {string}
   */
  return function (str) {
    return '\x1B[' + code + 'm' + str + '\x1B[0m'
  }
}

var red = color(31)
var green = color(32)
var redBg = B(color(41), color(37))
var greenBg = B(color(42), color(30))

/**
 * Identity function.
 *
 * @param {*}
 * @return {*}
 */
function identity (x) {
  return x
}

/**
 * Return unified diff of actual vs expected.
 *
 * @param {*} actual Actual value
 * @param {*} expected Expected value
 * @param {function} formatAdd Addition formatter
 * @param {function} formatRem Removal formatter
 * @return {string}
 */
function unifiedDiff (actual, expected, formatAdd, formatRem) {
  return [
    formatAdd('+ expected'),
    formatRem('- actual'),
    ''
  ]
  .concat(
    diff.createPatch('string', actual, expected)
      .split('\n')
      .slice(4)
      .filter(function (line) {
        return line[0] === '+' || line[0] === '-'
      })
      .map(function (line) {
        return line[0] === '+' ? formatAdd(line) : formatRem(line)
      })
  )
  .join('\n')
}

/**
 * Run a transformation function over the lines within a string and return the
 * result.
 *
 * @param {function} formatter Formatter function
 * @param {string} str String to format
 * @return {string}
 */
function formatLinesWith (formatter, str) {
  return str
    .split('\n')
    .map(function (line) {
      return line.length ? formatter(line) : ''
    })
    .join('\n')
}

/**
 * Return inline diff of actual vs expected.
 *
 * @param {*} actual Actual value
 * @param {*} expected Expected value
 * @param {function} formatAdd Addition formatter
 * @param {function} formatRem Removal formatter
 * @return {string}
 */
function inlineDiff (actual, expected, formatAdd, formatRem) {
  var result = diff.diffWordsWithSpace(actual, expected)
    .map(function (line, idx) {
      return line.added ? formatLinesWith(formatAdd, line.value)
        : line.removed ? formatLinesWith(formatRem, line.value)
        : line.value
    })
    .join('')

  var lines = result.split('\n')
  if (lines.length > 4) {
    result = lines
      .map(function (line, idx) {
        return lpad(idx + 1, String(lines.length).length) + ' | ' + line
      })
      .join('\n')
  }

  return formatRem('actual') + ' ' + formatAdd('expected') + '\n\n' + result
}

/**
 * Jasmine Diff Matchers
 *
 * Main export. Returns jasmine matchers for overriding default functionality
 * to include additional error diffs where it makes sense.
 *
 * @param {object} j$ Jasmine instance
 * @return {object}
 */
module.exports = function jasmineDiffMatchers (j$, options) {
  if (!(j$ && j$.matchers && j$.addMatchers && j$.matchers.toEqual)) {
    throw new Error('Jasmine Diff Matchers must be initialized with Jasmine v2 instance')
  }

  var opts = {
    colors: options && options.colors === true,
    inline: options && options.inline === true,
    spaces: 2
  }
  var annotateAdd = opts.colors ? (opts.inline ? greenBg : green) : identity
  var annotateRemove = opts.colors ? (opts.inline ? redBg : red) : identity
  var errorDiff = opts.inline ? inlineDiff : unifiedDiff
  var stringify = createStringifier(j$.pp, opts.spaces)

  function defaultMessage (actual, expected, comparison) {
    return 'Expected ' + j$.pp(actual) + ' ' + comparison + ' ' + j$.pp(expected) + '.'
  }

  function createMatcher (origFn, desc) {
    return function (util, customEqualityTesters) {
      return {
        compare: function (actual, expected) {
          var result = origFn(util, customEqualityTesters).compare(actual, expected)

          if (result.pass || !(isDiffable(actual) && isDiffable(expected))) {
            return result
          }

          result.message = (result.message || defaultMessage(actual, expected, desc)) +
            '\n\n' + errorDiff(stringify(actual), stringify(expected), annotateAdd, annotateRemove) + '\n'

          return result
        }
      }
    }
  }

  return {
    toBe: createMatcher(j$.matchers.toBe, 'to be'),
    toEqual: createMatcher(j$.matchers.toEqual, 'to equal')
  }
}
