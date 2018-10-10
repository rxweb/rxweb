"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverse = traverse;
exports.traverseWithHooks = traverseWithHooks;

var debug = require("debug")("ast:traverse");

function removeNodeInBody(node, fromNode) {
  switch (fromNode.type) {
    case "ModuleMetadata":
      fromNode.sections = fromNode.sections.filter(function (n) {
        return n !== node;
      });
      break;

    case "Module":
      fromNode.fields = fromNode.fields.filter(function (n) {
        return n !== node;
      });
      break;

    case "Program":
    case "Func":
      // $FlowIgnore it says References?
      fromNode.body = fromNode.body.filter(function (n) {
        return n !== node;
      });
      break;

    default:
      throw new Error("Unsupported operation: removing node of type: " + String(fromNode.type));
  }
}

function createPath(node, parentPath) {
  function remove() {
    if (parentPath == null) {
      throw new Error("Can not remove root node");
    }

    var parentNode = parentPath.node;
    removeNodeInBody(node, parentNode);
    node._deleted = true;
    debug("delete path %s", node.type);
  } // TODO(sven): do it the good way, changing the node from the parent


  function replaceWith(newNode) {
    // Remove all the keys first
    // $FlowIgnore
    Object.keys(node).forEach(function (k) {
      return delete node[k];
    }); // $FlowIgnore

    Object.assign(node, newNode);
  }

  return {
    node: node,
    parentPath: parentPath,
    replaceWith: replaceWith,
    remove: remove
  };
} // recursively walks the AST starting at the given node. The callback is invoked for
// and object that has a 'type' property.


function walk(node, callback, parentPath) {
  if (node._deleted === true) {
    return;
  }

  var path = createPath(node, parentPath); // $FlowIgnore

  callback(node.type, path);
  Object.keys(node).forEach(function (prop) {
    var value = node[prop];

    if (value === null || value === undefined) {
      return;
    }

    var valueAsArray = Array.isArray(value) ? value : [value];
    valueAsArray.forEach(function (v) {
      if (typeof v.type === "string") {
        walk(v, callback, path);
      }
    });
  });
}

function traverse(n, visitors) {
  var parentPath = null;
  walk(n, function (type, path) {
    if (typeof visitors["Node"] === "function") {
      visitors["Node"](path);
    }

    if (typeof visitors[type] === "function") {
      visitors[type](path);
    }
  }, parentPath);
}

function traverseWithHooks(n, visitors, before, after) {
  var parentPath = null;
  walk(n, function (type, path) {
    if (typeof visitors[type] === "function") {
      before(type, path);
      visitors[type](path);
      after(type, path);
    }
  }, parentPath);
}