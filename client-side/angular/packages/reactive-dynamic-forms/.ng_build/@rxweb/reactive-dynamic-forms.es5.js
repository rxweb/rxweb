var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Directive, ElementRef, Inject, Injectable, Input, LOCALE_ID, NgModule, Renderer, Renderer2, TemplateRef, ViewContainerRef, forwardRef } from '@angular/core';
import { CommonModule, DecimalPipe, NumberSymbol, getLocaleNumberSymbol } from '@angular/common';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a;
var CONTROLS_ERROR = "controlsError";
var VALUE_CHANGED_SYNC = "valueChangedSync";
var FUNCTION_STRING = "function";
var OBJECT_STRING = "object";
var RX_WEB_VALIDATOR = "rxwebValidator";
var NUMBER = "number";
var BOOLEAN = "boolean";
var TEMPLATE_VALIDATION_CONFIG = "template-validation-config";
var CONDITIONAL_VALIDATOR = "conditionalValidator";
var VALIDATOR_CONFIG = "validatorConfig";
var THIS = "this";
var RXCODE = "-rxw-";
var MODEL = "model";
var MODEL_INSTANCE = "modelInstance";
var PATCH = "patch";
var Linq = /** @class */ (function () {
    function Linq() {
    }
    /**
     * @param {?} expression
     * @return {?}
     */
    Linq.functionCreator = function (expression) {
        var /** @type {?} */ functionSetter = [];
        var /** @type {?} */ match = expression.match(/^\s*\(?\s*([^)]*)\s*\)?\s*=>(.*)/);
        var /** @type {?} */ splitSelect = match[2].split(",");
        for (var /** @type {?} */ i = 0; i < splitSelect.length; i++) {
            var /** @type {?} */ equalToOperator = splitSelect[i].match(/^\s*\(?\s*([^)]*)\s*\)?\s*|===|!==|==|!=|>=|>|<=|<|(.*)/);
            if (equalToOperator !== null) {
                functionSetter = new Function(match[1], "return " + equalToOperator.input);
            }
            else {
                equalToOperator = splitSelect[i].match(/^\s*\(?\s*([^)]*)\s*\)?\s*=(.*)/);
                if (equalToOperator === null) {
                    functionSetter = new Function(match[1], "return " + splitSelect.input);
                }
                else {
                    functionSetter = new Function(match[1], "return " + equalToOperator.input);
                }
            }
        }
        if (splitSelect.length == 0)
            functionSetter = { accessFunction: new Function(match[1], "return " + match[2]) };
        return functionSetter;
    };
    /**
     * @param {?} jObject
     * @param {?} config
     * @param {?} parentObject
     * @param {?} modelInstance
     * @param {?} isDynamicConfig
     * @return {?}
     */
    Linq.execute = function (jObject, config, parentObject, modelInstance, isDynamicConfig) {
        var /** @type {?} */ expressionFunction = isDynamicConfig ? config.dynamicConfig : config.conditionalExpression;
        var /** @type {?} */ lastParam = isDynamicConfig ? config : modelInstance;
        if (parentObject && typeof expressionFunction == "string")
            expressionFunction = Linq.functionCreator(expressionFunction);
        if (parentObject && expressionFunction)
            return modelInstance && modelInstance.constructor !== Object ? ( /** @type {?} */(expressionFunction)).call(modelInstance, parentObject, jObject, lastParam) : ( /** @type {?} */(expressionFunction))(parentObject, jObject, lastParam);
        return true;
    };
    /**
     * @param {?} texts
     * @return {?}
     */
    Linq.getConditionPath = function (texts) {
        var /** @type {?} */ path = "";
        for (var /** @type {?} */ i = 1; i < texts.length; i++)
            path += (texts.length - 1) == i ? texts[i].trim() : texts[i].trim() + ".";
        return path;
    };
    /**
     * @param {?} expression
     * @param {?} isNonValidationExpression
     * @return {?}
     */
    Linq.expressionParser = function (expression, isNonValidationExpression) {
        var _this = this;
        var /** @type {?} */ columns = [];
        var /** @type {?} */ expressionString = expression.toString();
        var /** @type {?} */ expressionArguments = Linq.extractArguments(expressionString.match(/\(([^)]+)\)/g));
        if (expressionArguments.length > 0) {
            var /** @type {?} */ splitTexts_1 = [];
            expressionString.replace(/\s/g, '').replace(new RegExp(/{|}/, "g"), "").split(new RegExp(/return|===|!==|==|!=|>=|>|<=|<|&&/)).forEach(function (t) {
                var /** @type {?} */ texts = t.replace(/\(|\)/g, "").split("||");
                for (var _i = 0, texts_1 = texts; _i < texts_1.length; _i++) {
                    var text = texts_1[_i];
                    splitTexts_1.push(text);
                }
            });
            splitTexts_1.forEach(function (t) {
                expressionArguments.forEach(function (x, i) {
                    t = t.trim();
                    if (t.startsWith(x + '.')) {
                        var /** @type {?} */ splitText = t.split('.');
                        if (splitText.length == 2 || (splitText.length >= 2 && isNonValidationExpression))
                            if (!isNonValidationExpression)
                                columns.push({ propName: splitText[1].trim(), argumentIndex: i == 3 ? 0 : i == 2 ? 1 : i == 1 ? -1 : i });
                            else
                                columns.push({ propName: _this.getConditionPath(splitText), argumentIndex: i == 3 ? 0 : i == 2 ? 1 : i == 1 ? -1 : i });
                        else {
                            var /** @type {?} */ arrayProp = splitText[1].split('[');
                            var /** @type {?} */ jObject = {
                                propName: splitText[splitText.length - 1].trim(),
                                objectPropName: arrayProp[0],
                                arrayIndex: arrayProp.length > 1 ? arrayProp[1].replace("]", "") : undefined,
                                argumentIndex: i === 3 ? 0 : i === 2 ? 1 : i
                            };
                            columns.push(jObject);
                        }
                    }
                });
            });
        }
        return columns;
    };
    /**
     * @param {?} splitTexts
     * @return {?}
     */
    Linq.extractArguments = function (splitTexts) {
        var /** @type {?} */ expressionArguments = [THIS];
        if (splitTexts && splitTexts[0])
            splitTexts[0].split(",").forEach(function (t) { return expressionArguments.push(t.trim().replace("(", "").replace(")", "")); });
        return expressionArguments;
    };
    /**
     * @param {?} expression
     * @param {?=} isNonValidationExpression
     * @return {?}
     */
    Linq.expressionColumns = function (expression, isNonValidationExpression) {
        if (isNonValidationExpression === void 0) {
            isNonValidationExpression = false;
        }
        var /** @type {?} */ columns = [];
        var /** @type {?} */ splitExpressions = [];
        if (typeof expression == "string") {
            expression.split("=>")[1].split(" && ").forEach(function (t) {
                t.split(" || ").forEach(function (x) {
                    splitExpressions.push(x.trim().split(' ')[0]);
                });
            });
            splitExpressions.forEach(function (t) {
                var /** @type {?} */ splitText = t.split('.');
                if (splitText.length == 2)
                    columns.push({ propName: splitText[1].trim() });
                else {
                    var /** @type {?} */ arrayProp = splitText[1].split('[');
                    var /** @type {?} */ jObject = {
                        propName: splitText[splitText.length - 1].trim(),
                        objectPropName: arrayProp[0],
                        arrayIndex: arrayProp.length > 1 ? arrayProp[1].replace("]", "") : undefined
                    };
                    columns.push(jObject);
                }
            });
        }
        else {
            columns = Linq.expressionParser(expression, isNonValidationExpression);
        }
        return columns;
    };
    /**
     * @param {?} expression
     * @param {?} propName
     * @return {?}
     */
    Linq.dynamicConfigParser = function (expression, propName) {
        var /** @type {?} */ controlNames = [];
        var /** @type {?} */ expressionString = expression.toString();
        var /** @type {?} */ expressionArguments = Linq.extractArguments(expressionString.match(/\(([^)]+)\)/g));
        var /** @type {?} */ splitString = expressionString.replace(new RegExp(/\r?\n|\r|;/g), ' ').replace(/["%()\{}=\\?�`'#<>|,;:+-]+/g, " ").split(/ /g);
        if (expressionArguments.length > 3)
            expressionArguments.splice(expressionArguments.length - 1, 1);
        expressionArguments.forEach(function (t) {
            splitString.filter(function (x) { return x != t + "." + propName && x.startsWith(t + "."); }).forEach(function (x) {
                var /** @type {?} */ split = x.split('.');
                if (split.length == 2)
                    controlNames.push({ propName: x.replace(t + ".", '') });
                else {
                    var /** @type {?} */ arrayProp = split[1].split('[');
                    var /** @type {?} */ jObject = {
                        propName: split[split.length - 1].trim(),
                        objectPropName: arrayProp[0],
                        arrayIndex: arrayProp.length > 1 ? arrayProp[1].replace("]", "") : undefined,
                    };
                    controlNames.push(jObject);
                }
            });
        });
        return controlNames;
    };
    return Linq;
}());
var AnnotationTypes = {
    numeric: 'numeric',
    required: 'required',
    minLength: 'minLength',
    maxLength: 'maxLength',
    minNumber: 'minNumber',
    maxNumber: 'maxNumber',
    pattern: 'pattern',
    password: 'password',
    compare: 'compare',
    minDate: 'minDate',
    maxDate: 'maxDate',
    alpha: 'alpha',
    alphaNumeric: 'alphaNumeric',
    email: 'email',
    hexColor: 'hexColor',
    lowerCase: 'lowerCase',
    url: 'url',
    upperCase: 'upperCase',
    nested: 'nested',
    propArray: 'propArray',
    propObject: 'propObject',
    contains: 'contains',
    range: 'range',
    custom: 'custom',
    digit: "digit",
    creditCard: "creditCard",
    time: "time",
    json: "json",
    greaterThan: "greaterThan",
    greaterThanEqualTo: "greaterThanEqualTo",
    lessThan: "lessThan",
    lessThanEqualTo: "lessThanEqualTo",
    choice: "choice",
    different: "different",
    even: "even",
    odd: "odd",
    factor: "factor",
    leapYear: "leapYear",
    allOf: "allOf",
    oneOf: "oneOf",
    noneOf: "noneOf",
    mac: "mac",
    ascii: "ascii",
    dataUri: "dataUri",
    port: "port",
    latLong: "latLong",
    extension: "extension",
    fileSize: "fileSize",
    endsWith: "endsWith",
    startsWith: "startsWith",
    primeNumber: "primeNumber",
    latitude: "latitude",
    longitude: "longitude",
    compose: "compose",
    rule: "rule",
    file: "file",
    image: "image",
    unique: "unique",
    notEmpty: "notEmpty",
    ip: "ip",
    cusip: "cusip",
    grid: "grid",
    date: 'date',
    and: 'and',
    or: 'or',
    not: 'not',
    minTime: 'minTime',
    maxTime: 'maxTime'
};
var PROPERTY = "property";
var OBJECT_PROPERTY = "objectProperty";
var ARRAY_PROPERTY = "arrayProperty";
var STRING = "string";
var MESSAGE = "message";
var BLANK = "";
var ELEMENT_VALUE = "value";
var BLUR = "blur";
var FOCUS = "focus";
var CHANGE = "change";
var INPUT = "INPUT";
var SELECT = "SELECT";
var CHECKBOX = "checkbox";
var RADIO = "radio";
var FILE = "file";
var TEXTAREA = "textarea";
var DECORATORS = {
    disabled: 'disabled',
    error: 'error',
    trim: 'trim',
    ltrim: 'ltrim',
    rtrim: 'rtrim',
    blacklist: 'blacklist',
    stripLow: 'stripLow',
    toBoolean: 'toBoolean',
    toDate: 'toDate',
    toDouble: 'toDouble',
    toFloat: 'toFloat',
    toInt: 'toInt',
    string: 'toString',
    whitelist: 'whitelist',
    escape: 'escape',
    prefix: 'prefix',
    suffix: 'suffix',
    sanitize: 'sanitize',
    elementClass: 'elementClass'
};
var defaultContainer = new ( /** @class */(function () {
    function class_1() {
        this.instances = [];
        this.modelIncrementCount = 0;
    }
    /**
     * @template T
     * @param {?} instanceFunc
     * @return {?}
     */
    class_1.prototype.get = function (instanceFunc) {
        var /** @type {?} */ instance = this.instances.filter(function (instance) { return instance.instance === instanceFunc; })[0];
        return instance;
    };
    /**
     * @param {?} target
     * @param {?} parameterIndex
     * @param {?} propertyKey
     * @param {?} decoratorType
     * @return {?}
     */
    class_1.prototype.getInstance = function (target, parameterIndex, propertyKey, decoratorType) {
        var /** @type {?} */ isPropertyKey = (propertyKey != undefined);
        var /** @type {?} */ instanceFunc = !isPropertyKey ? target : target.constructor;
        var /** @type {?} */ instance = this.instances.filter(function (instance) { return instance.instance === instanceFunc; })[0];
        if (!instance)
            instance = this.addInstanceContainer(instanceFunc);
        return instance;
    };
    /**
     * @param {?} target
     * @param {?} configs
     * @return {?}
     */
    class_1.prototype.addPropsConfig = function (target, configs) {
        var /** @type {?} */ instanceContainer = this.instances.filter(function (instance) { return instance.instance == target; })[0];
        if (instanceContainer) {
            for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
                var config = configs_1[_i];
                var _loop_1 = function (prop_1) {
                    var /** @type {?} */ propertyInfo = instanceContainer.properties.filter(function (t) { return t.name == prop_1 && (t.propertyType !== OBJECT_PROPERTY && t.propertyType !== ARRAY_PROPERTY); })[0];
                    if (propertyInfo) {
                        this_1.addPropConfig(target, [propertyInfo], config);
                    }
                    else if (prop_1 === ":all:")
                        this_1.addPropConfig(target, instanceContainer.properties.filter(function (t) { return t.propertyType !== OBJECT_PROPERTY && t.propertyType !== ARRAY_PROPERTY; }), config);
                };
                var this_1 = this;
                for (var _a = 0, _b = config.propNames; _a < _b.length; _a++) {
                    var prop_1 = _b[_a];
                    _loop_1(/** @type {?} */ prop_1);
                }
            }
        }
        else if (configs === undefined)
            this.addInstanceContainer(target);
    };
    /**
     * @param {?} target
     * @param {?} properties
     * @param {?} config
     * @return {?}
     */
    class_1.prototype.addPropConfig = function (target, properties, config) {
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var propertyInfo = properties_1[_i];
            var /** @type {?} */ excludeProp = false;
            if (config.excludePropNames)
                excludeProp = config.excludePropNames.filter(function (t) { return t == propertyInfo.name; })[0] !== undefined;
            if (!excludeProp) {
                if (config.validationConfig)
                    for (var /** @type {?} */ typeName in config.validationConfig) {
                        this.init({ constructor: target }, 0, propertyInfo.name, typeName, config.validationConfig[typeName] === true ? undefined : config.validationConfig[typeName], false);
                    }
                if (config.error)
                    this.addDecoratorConfig({ constructor: target }, 0, propertyInfo.name, config.error, DECORATORS.error);
                if (config.disable)
                    this.addDecoratorConfig({ constructor: target }, 0, propertyInfo.name, config.disable, DECORATORS.disable);
                if (config.elementClass)
                    this.addDecoratorConfig({ constructor: target }, 0, propertyInfo.name, config.elementClass, DECORATORS.elementClass);
                if (config.ignore)
                    propertyInfo.ignore = config.ignore;
            }
        }
    };
    /**
     * @param {?} target
     * @param {?} parameterIndex
     * @param {?} propertyKey
     * @param {?} decoratorType
     * @param {?=} value
     * @return {?}
     */
    class_1.prototype.addSanitizer = function (target, parameterIndex, propertyKey, decoratorType, value) {
        var /** @type {?} */ instance = this.getInstance(target, parameterIndex, propertyKey, decoratorType);
        if (instance) {
            if (!instance.sanitizers[propertyKey])
                instance.sanitizers[propertyKey] = [];
            instance.sanitizers[propertyKey].push({ name: decoratorType, config: value });
        }
    };
    /**
     * @param {?} target
     * @param {?} parameterIndex
     * @param {?} propertyKey
     * @param {?} config
     * @param {?} decoratorType
     * @return {?}
     */
    class_1.prototype.addDecoratorConfig = function (target, parameterIndex, propertyKey, config, decoratorType) {
        var /** @type {?} */ isPropertyKey = (propertyKey != undefined);
        var /** @type {?} */ instanceFunc = !isPropertyKey ? target : target.constructor;
        var /** @type {?} */ instance = this.instances.filter(function (instance) { return instance.instance === instanceFunc; })[0];
        if (!instance)
            instance = this.addInstanceContainer(instanceFunc);
        instance.nonValidationDecorators[decoratorType].conditionalExpressions[propertyKey] = config.conditionalExpression;
        var /** @type {?} */ columns = Linq.expressionColumns(config.conditionalExpression, true);
        columns.forEach(function (column) {
            if (column.argumentIndex !== -1) {
                var /** @type {?} */ columnName = (!column.objectPropName) ? "" + column.propName + RXCODE + column.argumentIndex : column.objectPropName + "." + column.propName + RXCODE + column.argumentIndex;
                if (!instance.nonValidationDecorators[decoratorType].changeDetection[columnName])
                    instance.nonValidationDecorators[decoratorType].changeDetection[columnName] = [];
                var /** @type {?} */ disabledColumns = instance.nonValidationDecorators[decoratorType].changeDetection[columnName];
                if (disabledColumns.indexOf(columnName) === -1)
                    disabledColumns.push(propertyKey);
            }
            else {
                if (!instance.nonValidationDecorators[decoratorType].controlProp[propertyKey])
                    instance.nonValidationDecorators[decoratorType].controlProp[propertyKey] = {};
                instance.nonValidationDecorators[decoratorType].controlProp[propertyKey][column.propName.replace(";", "")] = true;
            }
        });
    };
    /**
     * @param {?} target
     * @param {?} parameterIndex
     * @param {?} propertyKey
     * @param {?} annotationType
     * @param {?} config
     * @param {?} isAsync
     * @return {?}
     */
    class_1.prototype.init = function (target, parameterIndex, propertyKey, annotationType, config, isAsync) {
        var /** @type {?} */ decoratorConfiguration = {
            propertyIndex: parameterIndex,
            propertyName: propertyKey,
            annotationType: annotationType,
            config: config,
            isAsync: isAsync
        };
        var /** @type {?} */ isPropertyKey = (propertyKey != undefined);
        this.addAnnotation(!isPropertyKey ? target : target.constructor, decoratorConfiguration);
    };
    /**
     * @param {?} name
     * @param {?} propertyType
     * @param {?} entity
     * @param {?} target
     * @param {?=} config
     * @return {?}
     */
    class_1.prototype.initPropertyObject = function (name, propertyType, entity, target, config) {
        var /** @type {?} */ propertyInfo = {
            name: name,
            propertyType: propertyType,
            entity: entity,
            dataPropertyName: config ? config.name : undefined,
            entityProvider: config ? config.entityProvider : undefined
        };
        defaultContainer.addProperty(target.constructor, propertyInfo);
    };
    /**
     * @param {?} instanceFunc
     * @return {?}
     */
    class_1.prototype.addInstanceContainer = function (instanceFunc) {
        var /** @type {?} */ instanceContainer = {
            instance: instanceFunc,
            propertyAnnotations: [],
            properties: [],
            nonValidationDecorators: {
                disabled: {
                    conditionalExpressions: {},
                    changeDetection: {},
                    controlProp: {}
                }, error: {
                    conditionalExpressions: {},
                    changeDetection: {},
                    controlProp: {}
                }, elementClass: {
                    conditionalExpressions: {},
                    changeDetection: {},
                    controlProp: {}
                }
            },
            sanitizers: {}
        };
        this.instances.push(instanceContainer);
        return instanceContainer;
    };
    /**
     * @param {?} instanceFunc
     * @param {?} propertyInfo
     * @param {?=} isFromAnnotation
     * @return {?}
     */
    class_1.prototype.addProperty = function (instanceFunc, propertyInfo, isFromAnnotation) {
        if (isFromAnnotation === void 0) {
            isFromAnnotation = false;
        }
        var /** @type {?} */ instance = this.instances.filter(function (instance) { return instance.instance === instanceFunc; })[0];
        if (instance) {
            this.addPropertyInfo(instance, propertyInfo, !isFromAnnotation);
        }
        else {
            instance = this.addInstanceContainer(instanceFunc);
            this.addPropertyInfo(instance, propertyInfo);
        }
    };
    /**
     * @param {?} instance
     * @param {?} propertyInfo
     * @param {?=} isAddProperty
     * @return {?}
     */
    class_1.prototype.addPropertyInfo = function (instance, propertyInfo, isAddProperty) {
        if (isAddProperty === void 0) {
            isAddProperty = false;
        }
        var /** @type {?} */ property = this.getProperty(instance, propertyInfo);
        if (!property)
            instance.properties.push(propertyInfo);
        else if (isAddProperty)
            this.updateProperty(property, propertyInfo);
    };
    /**
     * @param {?} instanceFunc
     * @param {?} decoratorConfiguration
     * @return {?}
     */
    class_1.prototype.addAnnotation = function (instanceFunc, decoratorConfiguration) {
        this.addProperty(instanceFunc, { propertyType: PROPERTY, name: decoratorConfiguration.propertyName }, true);
        var /** @type {?} */ instance = this.instances.filter(function (instance) { return instance.instance === instanceFunc; })[0];
        if (instance)
            instance.propertyAnnotations.push(decoratorConfiguration);
        else {
            instance = this.addInstanceContainer(instanceFunc);
            instance.propertyAnnotations.push(decoratorConfiguration);
        }
        if (decoratorConfiguration.config && decoratorConfiguration.config.conditionalExpression) {
            var /** @type {?} */ columns = Linq.expressionColumns(decoratorConfiguration.config.conditionalExpression);
            this.addChangeValidation(instance, decoratorConfiguration.propertyName, columns);
        }
        if (decoratorConfiguration.config && decoratorConfiguration.config.dynamicConfig) {
            var /** @type {?} */ columns = Linq.dynamicConfigParser(decoratorConfiguration.config.dynamicConfig, decoratorConfiguration.propertyName);
            this.addChangeValidation(instance, decoratorConfiguration.propertyName, columns);
        }
        this.setConditionalColumns(instance, decoratorConfiguration);
    };
    /**
     * @param {?} instance
     * @param {?} decoratorConfiguration
     * @return {?}
     */
    class_1.prototype.setConditionalColumns = function (instance, decoratorConfiguration) {
        var _this = this;
        if (instance && decoratorConfiguration.config) {
            if (decoratorConfiguration.annotationType == AnnotationTypes.and || decoratorConfiguration.annotationType == AnnotationTypes.or || decoratorConfiguration.annotationType == AnnotationTypes.not) {
                Object.keys(decoratorConfiguration.config.validation).forEach(function (t) {
                    if (typeof decoratorConfiguration.config.validation[t] !== "boolean")
                        _this.setLogicalConditional(instance, t, decoratorConfiguration.config.validation[t].fieldName, decoratorConfiguration.propertyName);
                });
            }
            else
                this.setLogicalConditional(instance, decoratorConfiguration.annotationType, decoratorConfiguration.config.fieldName, decoratorConfiguration.propertyName);
        }
    };
    /**
     * @param {?} instance
     * @param {?} annotationType
     * @param {?} fieldName
     * @param {?} propertyName
     * @return {?}
     */
    class_1.prototype.setLogicalConditional = function (instance, annotationType, fieldName, propertyName) {
        if (instance && ((annotationType == AnnotationTypes.compare || annotationType == AnnotationTypes.greaterThan || annotationType == AnnotationTypes.greaterThanEqualTo || annotationType == AnnotationTypes.lessThan || annotationType == AnnotationTypes.lessThanEqualTo || annotationType == AnnotationTypes.different || annotationType == AnnotationTypes.factor || annotationType == AnnotationTypes.minTime || annotationType == AnnotationTypes.maxTime) || (annotationType == AnnotationTypes.creditCard && fieldName) || ((annotationType == AnnotationTypes.minDate || annotationType == AnnotationTypes.maxDate) && fieldName))) {
            this.setConditionalValueProp(instance, fieldName, propertyName);
        }
    };
    /**
     * @param {?} instance
     * @param {?} propName
     * @param {?} refPropName
     * @return {?}
     */
    class_1.prototype.setConditionalValueProp = function (instance, propName, refPropName) {
        if (propName) {
            var /** @type {?} */ splitProps = propName.split ? propName.split('.') : '';
            if (splitProps.length < 2) {
                if (!instance.conditionalValidationProps)
                    instance.conditionalValidationProps = {};
                if (!instance.conditionalValidationProps[propName])
                    instance.conditionalValidationProps[propName] = [];
                if (instance.conditionalValidationProps[propName].indexOf(refPropName) == -1)
                    instance.conditionalValidationProps[propName].push(refPropName);
            }
            else
                this.addChangeValidation(instance, refPropName, [{ argumentIndex: 1, objectPropName: splitProps[0], propName: splitProps[1], referencePropName: refPropName }]);
        }
    };
    /**
     * @param {?} instance
     * @param {?} propertyName
     * @param {?} columns
     * @return {?}
     */
    class_1.prototype.addChangeValidation = function (instance, propertyName, columns) {
        if (instance) {
            if (!instance.conditionalValidationProps)
                instance.conditionalValidationProps = {};
            columns.forEach(function (t) {
                if (t.propName && !t.objectPropName) {
                    if (!instance.conditionalValidationProps[t.propName])
                        instance.conditionalValidationProps[t.propName] = [];
                    if (instance.conditionalValidationProps[t.propName].indexOf(propertyName) == -1)
                        instance.conditionalValidationProps[t.propName].push(propertyName);
                }
                else {
                    if (t.propName && t.objectPropName) {
                        if (!instance.conditionalObjectProps)
                            instance.conditionalObjectProps = [];
                        t.referencePropName = propertyName;
                        instance.conditionalObjectProps.push(t);
                    }
                }
            });
        }
    };
    /**
     * @param {?} instanceFunc
     * @return {?}
     */
    class_1.prototype.clearInstance = function (instanceFunc) {
        var /** @type {?} */ instance = this.instances.filter(function (instance) { return instance.instance === instanceFunc; })[0];
        if (instance) {
            var /** @type {?} */ indexOf = this.instances.indexOf(instance);
            this.instances.splice(indexOf, 1);
        }
    };
    /**
     * @param {?} instance
     * @param {?} propertyInfo
     * @return {?}
     */
    class_1.prototype.getProperty = function (instance, propertyInfo) {
        return instance.properties.filter(function (t) { return t.name == propertyInfo.name; })[0];
    };
    /**
     * @param {?} property
     * @param {?} currentProperty
     * @return {?}
     */
    class_1.prototype.updateProperty = function (property, currentProperty) {
        property.dataPropertyName = currentProperty.dataPropertyName;
        property.defaultValue = currentProperty.defaultValue;
    };
    return class_1;
}()))();
var RegExRule = {
    alpha: /^[a-zA-Z]+$/,
    alphaExits: /[a-zA-Z]/,
    alphaWithSpace: /^[a-zA-Z\s]+$/,
    macId: /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/,
    onlyDigit: /^[0-9]+$/,
    isDigitExits: /[0-9]/,
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
    specialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
    advancedEmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    basicEmail: /^(([^<>()\[\]\\.,,:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    alphaNumeric: /^[0-9a-zA-Z]+$/,
    alphaNumericWithSpace: /^[0-9a-zA-Z\s]+$/,
    hexColor: /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,
    strictHexColor: /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,
    float: /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,
    decimal: /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,
    hexaDecimal: /^[0-9A-F]+$/i,
    date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    timeWithSeconds: /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
    url: /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$/,
    ascii: /^[\x00-\x7F]+$/,
    dataUri: /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)$/i,
    lat: /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/,
    long: /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/,
    ipV4: /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/,
    ipV6: /^((?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(:[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(:[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(:[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(:[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(:[a-fA-F\d]{1,4}){1,6}|:)|(?::((?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(%[0-9a-zA-Z]{1,})?$/,
    cidrV4: /^(3[0-2]|[12]?[0-9])$/,
    cidrV6: /^(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    cusip: /^[0-9A-Z]{9}$/,
    grid: /^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g
};
var ALPHABET = "alphabet";
var DIGIT = "digit";
var CONTAINS = "contains";
var LOWERCASE = "lowerCase";
var UPPERCASE = "upperCase";
var SPECIAL_CHARACTER = "specialCharacter";
var MIN_LENGTH = "minLength";
var MAX_LENGTH = "maxLength";
var RegexValidator = /** @class */ (function () {
    function RegexValidator() {
    }
    /**
     * @param {?} value
     * @param {?} regex
     * @return {?}
     */
    RegexValidator.isExits = function (value, regex) {
        return value.match(regex) != null;
    };
    /**
     * @param {?} value
     * @param {?} regex
     * @return {?}
     */
    RegexValidator.isValid = function (value, regex) {
        return regex.test(value);
    };
    /**
     * @param {?} value
     * @param {?=} isRemoveSpace
     * @return {?}
     */
    RegexValidator.isNotBlank = function (value, isRemoveSpace) {
        if (isRemoveSpace === void 0) {
            isRemoveSpace = false;
        }
        return !isRemoveSpace ?
            (value === 0) || (value !== undefined && value !== null && value !== "") :
            (value === 0) || (value !== undefined && value !== null && String(value).trim() !== "");
    };
    /**
     * @param {?} passwordValidation
     * @param {?} value
     * @return {?}
     */
    RegexValidator.isValidPassword = function (passwordValidation, value) {
        var /** @type {?} */ isValid = false;
        var /** @type {?} */ keyName = "status";
        var /** @type {?} */ objectProperties = Object.getOwnPropertyNames(passwordValidation);
        for (var _i = 0, objectProperties_1 = objectProperties; _i < objectProperties_1.length; _i++) {
            var propertyName = objectProperties_1[_i];
            switch (propertyName) {
                case ALPHABET:
                    isValid = RegexValidator.isExits(value, RegExRule.alphaExits);
                    keyName = ALPHABET;
                    break;
                case DIGIT:
                    isValid = RegexValidator.isValid(value, RegExRule.isDigitExits);
                    keyName = DIGIT;
                    break;
                case CONTAINS:
                    isValid = value.indexOf(passwordValidation[CONTAINS]) != -1;
                    keyName = CONTAINS;
                    break;
                case LOWERCASE:
                    isValid = RegexValidator.isValid(value, RegExRule.lowerCase);
                    keyName = LOWERCASE;
                    break;
                case UPPERCASE:
                    isValid = RegexValidator.isValid(value, RegExRule.upperCase);
                    keyName = UPPERCASE;
                    break;
                case SPECIAL_CHARACTER:
                    isValid = RegexValidator.isExits(value, RegExRule.specialCharacter);
                    keyName = SPECIAL_CHARACTER;
                    break;
                case MIN_LENGTH:
                    isValid = value.length >= passwordValidation[propertyName];
                    keyName = MIN_LENGTH;
                    break;
                case MAX_LENGTH:
                    isValid = value.length <= passwordValidation[propertyName];
                    keyName = MAX_LENGTH;
                    break;
            }
            if (!isValid)
                break;
        }
        return { isValid: isValid, keyName: keyName };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RegexValidator.isZero = function (value) {
        return value == 0;
    };
    /**
     * @return {?}
     */
    RegexValidator.commaRegex = function () {
        return new RegExp(",", "g");
    };
    return RegexValidator;
}());
var ReactiveFormConfig = /** @class */ (function () {
    function ReactiveFormConfig() {
    }
    /**
     * @param {?} jObject
     * @return {?}
     */
    ReactiveFormConfig.set = function (jObject) {
        if (jObject)
            ReactiveFormConfig.json = jObject;
    };
    /**
     * @param {?} path
     * @return {?}
     */
    ReactiveFormConfig.get = function (path) {
        var /** @type {?} */ jObject;
        if (ReactiveFormConfig.json) {
            var /** @type {?} */ splitPath = path.split('.');
            for (var _i = 0, splitPath_1 = splitPath; _i < splitPath_1.length; _i++) {
                var columnName = splitPath_1[_i];
                jObject = (!jObject) ? ReactiveFormConfig.json[columnName] : jObject[columnName];
                if (!jObject)
                    break;
            }
        }
        return jObject;
    };
    return ReactiveFormConfig;
}());
ReactiveFormConfig.number = {};
ReactiveFormConfig.json = {};
/**
 * @param {?} value
 * @return {?}
 */
function isObjectType(value) {
    return !(typeof value == "string" || typeof value === "number" || typeof value === "boolean" || value instanceof Date);
}
/**
 * @param {?} jsonObject
 * @return {?}
 */
function clone(jsonObject) {
    var /** @type {?} */ jObject = {};
    if (isObjectType(jsonObject)) {
        for (var /** @type {?} */ columnName in jsonObject) {
            if (Array.isArray(jsonObject[columnName])) {
                jObject[columnName] = [];
                for (var _i = 0, _a = jsonObject[columnName]; _i < _a.length; _i++) {
                    var row = _a[_i];
                    jObject[columnName].push(clone(row));
                }
            }
            else if (typeof jsonObject[columnName] == "object")
                jObject[columnName] = clone(jsonObject[columnName]);
            else
                jObject[columnName] = jsonObject[columnName];
        }
        return jObject;
    }
    else
        return jsonObject;
}
/**
 * @param {?} firstObject
 * @param {?} secondObject
 * @return {?}
 */
function merge(firstObject, secondObject) {
    for (var /** @type {?} */ columnName in secondObject) {
        if (Array.isArray(secondObject[columnName])) {
            if (!firstObject[columnName])
                firstObject[columnName] = [];
            for (var _i = 0, _a = secondObject[columnName]; _i < _a.length; _i++) {
                var row = _a[_i];
                firstObject[columnName].push(clone(row));
            }
        }
        else if (typeof firstObject[columnName] == "object")
            firstObject[columnName] = merge(firstObject[columnName], secondObject[columnName]);
        else
            firstObject[columnName] = secondObject[columnName];
    }
    return firstObject;
}
/**
 * @param {?} jsonObject
 * @param {?} compareObject
 * @return {?}
 */
function isMatched(jsonObject, compareObject) {
    var /** @type {?} */ isModified = false;
    for (var /** @type {?} */ columnName in compareObject) {
        if (Array.isArray(jsonObject[columnName])) {
            for (var /** @type {?} */ i = 0; i < jsonObject[columnName].length; i++) {
                isModified = isMatched(jsonObject[columnName][i], compareObject[columnName][i]);
            }
        }
        else if (typeof jsonObject[columnName] == "object")
            isModified = isMatched(jsonObject[columnName], compareObject[columnName]);
        else
            isModified = !(jsonObject[columnName] == compareObject[columnName]);
        if (isModified)
            break;
    }
    return isModified;
}
var RxFormArray = /** @class */ (function (_super) {
    __extends(RxFormArray, _super);
    /**
     * @param {?} arrayObject
     * @param {?} controls
     * @param {?=} validatorOrOpts
     * @param {?=} asyncValidator
     */
    function RxFormArray(arrayObject, controls, validatorOrOpts, asyncValidator) {
        var _this = _super.call(this, controls, validatorOrOpts, asyncValidator) || this;
        _this.arrayObject = arrayObject;
        _this._isModified = false;
        _this._modified = [];
        _this.cloneObject(arrayObject);
        return _this;
    }
    Object.defineProperty(RxFormArray.prototype, "isModified", {
        /**
         * @return {?}
         */
        get: function () {
            return this._isModified;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} control
     * @return {?}
     */
    RxFormArray.prototype.push = function (control) {
        var /** @type {?} */ formGroup = this.root;
        if (this.arrayObject)
            if (control.modelInstance)
                this.arrayObject.push(control.modelInstance);
        _super.prototype.push.call(this, control);
        if (formGroup[VALUE_CHANGED_SYNC])
            formGroup.valueChangedSync();
        this.patch();
    };
    /**
     * @return {?}
     */
    RxFormArray.prototype.patch = function () {
        this.checkModification();
        if (this.parent)
            this.parent[PATCH]();
    };
    /**
     * @param {?=} options
     * @return {?}
     */
    RxFormArray.prototype.resetForm = function (options) {
        if (options && options.index >= 0 && options.groupOption) {
            ( /** @type {?} */(this.controls[options.index])).resetForm(options.groupOption);
        }
        else {
            for (var /** @type {?} */ i = 0; i < this._baseValue.length; i++) {
                if (this.controls[i] !== undefined)
                    ( /** @type {?} */(this.controls[i])).resetForm({ value: this._baseValue[i] });
                else if (options && options.pushFunction) {
                    var /** @type {?} */ formGroup = options.pushFunction(this._baseValue[i]);
                    this.push(formGroup);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    RxFormArray.prototype.commit = function () {
        this._baseValue = [];
        for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
            var formGroup = _a[_i];
            ( /** @type {?} */(formGroup)).commit();
            this._baseValue.push(clone(formGroup.value));
        }
        this.patch();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RxFormArray.prototype.removeAt = function (index) {
        var /** @type {?} */ formGroup = this.root;
        this.arrayObject.splice(index, 1);
        _super.prototype.removeAt.call(this, index);
        if (formGroup[VALUE_CHANGED_SYNC])
            formGroup.valueChangedSync();
        this.patch();
    };
    /**
     * @return {?}
     */
    RxFormArray.prototype.checkModification = function () {
        this._isModified = !(this._baseValue.length == this.controls.length);
        if (!this._isModified)
            for (var /** @type {?} */ i = 0; i < this.controls.length; i++) {
                this._isModified = isMatched(this._baseValue[i], this.controls[i].value);
                if (this._isModified)
                    break;
            }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RxFormArray.prototype.cloneObject = function (value) {
        this._baseValue = [];
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var row = value_1[_i];
            this._baseValue.push(clone(row));
        }
    };
    return RxFormArray;
}(FormArray));
var NumericValueType = {};
NumericValueType.PositiveNumber = 1;
NumericValueType.NegativeNumber = 2;
NumericValueType.Both = 3;
NumericValueType[NumericValueType.PositiveNumber] = "PositiveNumber";
NumericValueType[NumericValueType.NegativeNumber] = "NegativeNumber";
NumericValueType[NumericValueType.Both] = "Both";
var IpVersion = {};
IpVersion.V4 = 1;
IpVersion.V6 = 2;
IpVersion.AnyOne = 3;
IpVersion[IpVersion.V4] = "V4";
IpVersion[IpVersion.V6] = "V6";
IpVersion[IpVersion.AnyOne] = "AnyOne";
var ErrorMessageBindingStrategy = {};
ErrorMessageBindingStrategy.None = 0;
ErrorMessageBindingStrategy.OnSubmit = 1;
ErrorMessageBindingStrategy.OnDirty = 2;
ErrorMessageBindingStrategy.OnTouched = 3;
ErrorMessageBindingStrategy.OnDirtyOrTouched = 4;
ErrorMessageBindingStrategy.OnDirtyOrSubmit = 5;
ErrorMessageBindingStrategy.OnTouchedOrSubmit = 6;
ErrorMessageBindingStrategy[ErrorMessageBindingStrategy.None] = "None";
ErrorMessageBindingStrategy[ErrorMessageBindingStrategy.OnSubmit] = "OnSubmit";
ErrorMessageBindingStrategy[ErrorMessageBindingStrategy.OnDirty] = "OnDirty";
ErrorMessageBindingStrategy[ErrorMessageBindingStrategy.OnTouched] = "OnTouched";
ErrorMessageBindingStrategy[ErrorMessageBindingStrategy.OnDirtyOrTouched] = "OnDirtyOrTouched";
ErrorMessageBindingStrategy[ErrorMessageBindingStrategy.OnDirtyOrSubmit] = "OnDirtyOrSubmit";
ErrorMessageBindingStrategy[ErrorMessageBindingStrategy.OnTouchedOrSubmit] = "OnTouchedOrSubmit";
var ResetFormType = {};
ResetFormType.ControlsOnly = 1;
ResetFormType.FormGroupsOnly = 2;
ResetFormType.FormArraysOnly = 3;
ResetFormType.ControlsAndFormGroupsOnly = 4;
ResetFormType.DefinedPropsOnly = 5;
ResetFormType.All = 6;
ResetFormType[ResetFormType.ControlsOnly] = "ControlsOnly";
ResetFormType[ResetFormType.FormGroupsOnly] = "FormGroupsOnly";
ResetFormType[ResetFormType.FormArraysOnly] = "FormArraysOnly";
ResetFormType[ResetFormType.ControlsAndFormGroupsOnly] = "ControlsAndFormGroupsOnly";
ResetFormType[ResetFormType.DefinedPropsOnly] = "DefinedPropsOnly";
ResetFormType[ResetFormType.All] = "All";
var MODEL_INSTANCE_VALUE = "modelInstanceValue";
var ApplicationUtil = /** @class */ (function () {
    function ApplicationUtil() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil.getParentObjectValue = function (control) {
        if (control.parent) {
            var /** @type {?} */ parent = this.parentObjectValue(control.parent);
            return parent.value;
        }
        return {};
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil.getParentModelInstanceValue = function (control) {
        if (control.parent) {
            var /** @type {?} */ parent = this.parentObjectValue(control.parent);
            return parent[MODEL_INSTANCE_VALUE];
        }
        return {};
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil.getRootFormGroup = function (control) {
        if (control.parent) {
            return this.getRootFormGroup(control.parent);
        }
        return /** @type {?} */ (control);
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil.getParentControl = function (control) {
        if (control.parent) {
            var /** @type {?} */ parent = this.parentObjectValue(control.parent);
            return parent;
        }
        return control;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil.getFormControlName = function (control) {
        var /** @type {?} */ controlName = '';
        if (control.parent) {
            for (var /** @type {?} */ formControlName in control.parent.controls) {
                if (control.parent.controls[formControlName] == control) {
                    controlName = formControlName;
                    break;
                }
            }
        }
        return controlName;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil.getParentFormArray = function (control) {
        if (control.parent && !(control.parent instanceof FormArray || control.parent instanceof RxFormArray)) {
            var /** @type {?} */ parent = this.getParentFormArray(control.parent);
            return parent;
        }
        return control.parent;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApplicationUtil.toLower = function (value) {
        if (value)
            return String(value).toLowerCase();
        return value;
    };
    /**
     * @param {?} fieldName
     * @param {?} formGroup
     * @return {?}
     */
    ApplicationUtil.getControl = function (fieldName, formGroup) {
        var /** @type {?} */ splitText = fieldName.split('.');
        if (splitText.length > 1) {
            var /** @type {?} */ formControl = formGroup;
            splitText.forEach(function (name, index) { formControl = formControl.controls[name]; });
            return formControl;
        }
        else
            return formGroup.controls[fieldName];
    };
    /**
     * @param {?} fieldName
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil.getFormControl = function (fieldName, control) {
        var /** @type {?} */ splitText = fieldName.split('.');
        if (splitText.length > 1 && control.parent) {
            var /** @type {?} */ formControl = this.getParentControl(control);
            splitText.forEach(function (name, index) { formControl = formControl.controls[name]; });
            return formControl;
        }
        return (control.parent) ? control.parent.get([fieldName]) : undefined;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil.parentObjectValue = function (control) {
        if (!control.parent)
            return control;
        else
            control = this.parentObjectValue(control.parent);
        return control;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApplicationUtil.isNumeric = function (value) {
        return (value - parseFloat(value) + 1) >= 0;
    };
    /**
     * @param {?} primaryValue
     * @param {?} secondaryValue
     * @return {?}
     */
    ApplicationUtil.notEqualTo = function (primaryValue, secondaryValue) {
        var /** @type {?} */ firstValue = (primaryValue === undefined || primaryValue === null) ? "" : primaryValue;
        var /** @type {?} */ secondValue = (secondaryValue === undefined || secondaryValue === null) ? "" : secondaryValue;
        if (firstValue instanceof Date && secondValue instanceof Date)
            return +firstValue != +secondValue;
        return (firstValue != secondValue);
    };
    /**
     * @param {?} allowDecimal
     * @param {?} acceptValue
     * @return {?}
     */
    ApplicationUtil.numericValidation = function (allowDecimal, acceptValue) {
        var /** @type {?} */ decimalSymbol;
        if (ReactiveFormConfig && ReactiveFormConfig.number) {
            decimalSymbol = (ReactiveFormConfig.json && ReactiveFormConfig.json.allowDecimalSymbol) ? ReactiveFormConfig.json.allowDecimalSymbol : ReactiveFormConfig.number.decimalSymbol;
        }
        else {
            decimalSymbol = ".";
        }
        acceptValue = (acceptValue == undefined) ? NumericValueType.PositiveNumber : acceptValue;
        var /** @type {?} */ regex = /^[0-9]+$/;
        switch (acceptValue) {
            case NumericValueType.PositiveNumber:
                regex = (!allowDecimal) ? /^[0-9]+$/ : decimalSymbol == "." ? /^[0-9\.]+$/ : /^[0-9\,]+$/;
                break;
            case NumericValueType.NegativeNumber:
                regex = (!allowDecimal) ? /^[-][0-9]+$/ : decimalSymbol == "." ? /^[-][0-9\.]+$/ : /^[-][0-9\,]+$/;
                break;
            case NumericValueType.Both:
                regex = (!allowDecimal) ? /^[-|+]?[0-9]+$/ : decimalSymbol == "." ? /^[-|+]?[0-9\.]+$/ : /^[-|+]?[0-9\,]+$/;
                break;
        }
        return regex;
    };
    /**
     * @param {?} control
     * @param {?} config
     * @param {?} type
     * @return {?}
     */
    ApplicationUtil.configureControl = function (control, config, type) {
        if (!control.validatorConfig) {
            var /** @type {?} */ jObject = {};
            jObject[type] = config;
            Object.assign(control, { validatorConfig: jObject });
        }
        else
            control.validatorConfig[type] = config;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApplicationUtil.lowerCaseWithTrim = function (value) {
        return typeof value === "string" ? value.toLowerCase().trim() : String(value).toLowerCase().trim();
    };
    /**
     * Check if a value is an object
     * @param {?} value
     * @return {?}
     */
    ApplicationUtil.isObject = function (value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    };
    /**
     * Check if a value is an object
     * @param {?} value
     * @return {?}
     */
    ApplicationUtil.isArray = function (value) {
        return Array.isArray(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApplicationUtil.cloneValue = function (value) {
        return ApplicationUtil.isObject(value) ? ApplicationUtil.isArray(value) ? value.slice() : Object.assign({}, value) : value;
    };
    return ApplicationUtil;
}());
var ISO_DATE_REGEX = /^(\d{4}-\d{1,2}-\d{1,2})$/;
var DateProvider = /** @class */ (function () {
    function DateProvider() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DateProvider.prototype.isDate = function (value) {
        return value instanceof Date && !isNaN(value.valueOf());
    };
    /**
     * @param {?} dateFormat
     * @return {?}
     */
    DateProvider.prototype.getRegex = function (dateFormat) {
        var /** @type {?} */ regExp;
        switch (dateFormat) {
            case 'ymd':
                regExp = "^(?:[0-9]{4})-(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])$";
                break;
            case 'dmy':
                regExp = "^(3[01]|[12][0-9]|0?[1-9])-(1[0-2]|0?[1-9])-(?:[0-9]{2})?[0-9]{2}$";
                break;
            case 'mdy':
                regExp = "^(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])-(?:[0-9]{2})?[0-9]{2}$";
                break;
        }
        return new RegExp(regExp);
    };
    /**
     * @return {?}
     */
    DateProvider.prototype.regex = function () {
        var /** @type {?} */ regExp;
        if (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.dateFormat && ReactiveFormConfig.json.internationalization.seperator)
            regExp = this.getRegex(ReactiveFormConfig.json.internationalization.dateFormat);
        else
            regExp = (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.baseConfig && ReactiveFormConfig.json.baseConfig.dateFormat) ? this.getRegex(ReactiveFormConfig.json.baseConfig.dateFormat) : this.getRegex("mdy");
        return regExp;
    };
    /**
     * @param {?} value
     * @param {?=} isBaseFormat
     * @return {?}
     */
    DateProvider.prototype.getDate = function (value, isBaseFormat) {
        if (isBaseFormat === void 0) {
            isBaseFormat = false;
        }
        var _a, _b, _c;
        var /** @type {?} */ year, /** @type {?} */ month, /** @type {?} */ day;
        if (!this.isDate(value)) {
            var /** @type {?} */ seperator = void 0;
            var /** @type {?} */ dateFormat = void 0;
            if (ISO_DATE_REGEX.test(/** @type {?} */ (value))) {
                seperator = "-";
                dateFormat = "ymd";
            }
            else {
                seperator = ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.baseConfig && ReactiveFormConfig.json.baseConfig.seperator ? ReactiveFormConfig.json.baseConfig.seperator : "/";
                dateFormat = ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.baseConfig && ReactiveFormConfig.json.baseConfig.dateFormat ? ReactiveFormConfig.json.baseConfig.dateFormat : "mdy";
            }
            if (!isBaseFormat && ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.dateFormat && ReactiveFormConfig.json.internationalization.seperator) {
                seperator = ReactiveFormConfig.json.internationalization.seperator;
                dateFormat = ReactiveFormConfig.json.internationalization.dateFormat;
            }
            switch (dateFormat) {
                case 'ymd':
                    _a = ( /** @type {?} */(value)).split(seperator).map(function (val) { return +val; }), year = _a[0], month = _a[1], day = _a[2];
                    break;
                case 'dmy':
                    _b = ( /** @type {?} */(value)).split(seperator).map(function (val) { return +val; }), day = _b[0], month = _b[1], year = _b[2];
                    break;
                case 'mdy':
                    _c = ( /** @type {?} */(value)).split(seperator).map(function (val) { return +val; }), month = _c[0], day = _c[1], year = _c[2];
                    break;
            }
            return new Date(year, month - 1, day);
        }
        else
            return /** @type {?} */ (value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateProvider.prototype.isValid = function (value) {
        if (typeof value == "string") {
            if (ISO_DATE_REGEX.test(/** @type {?} */ (value)))
                return true;
            var /** @type {?} */ seperator = '/';
            if (ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.seperator)
                seperator = ReactiveFormConfig.json.internationalization.seperator;
            value = value.replace(seperator, '-').replace(seperator, '-');
            return this.regex().test(value);
        }
        else
            return this.isDate(value);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DateProvider.prototype.getConfigDateValue = function (config) {
        var /** @type {?} */ date = config.value;
        if (config.value && typeof config.value == "string") {
            date = this.getDate(config.value, true);
        }
        return date;
    };
    /**
     * @param {?} config
     * @param {?} control
     * @return {?}
     */
    DateProvider.prototype.getCompareDate = function (config, control) {
        var /** @type {?} */ date = this.getConfigDateValue(config);
        if (config.fieldName) {
            var /** @type {?} */ checkControl = ApplicationUtil.getFormControl(config.fieldName, control);
            if (checkControl && checkControl.value) {
                date = this.getDate(checkControl.value);
            }
        }
        return date;
    };
    return DateProvider;
}());
/**
 * @param {?} value
 * @return {?}
 */
function isNotBlank(value) {
    return (value !== undefined && value !== null && value !== "");
}
/**
 * @param {?} value
 * @return {?}
 */
function trim(value) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.trim();
    return value;
}
/**
 * @param {?} value
 * @return {?}
 */
function ltrim(value) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(/^\s+/g, '');
    return value;
}
/**
 * @param {?} value
 * @return {?}
 */
function rtrim(value) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(/\s+$/g, '');
    return value;
}
/**
 * @param {?} value
 * @param {?} chars
 * @return {?}
 */
function blacklist(value, chars) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(new RegExp('[$' + chars + ']+', 'g'), '');
    return value;
}
/**
 * @param {?} value
 * @param {?} keepNewLines
 * @return {?}
 */
function stripLow(value, keepNewLines) {
    var /** @type {?} */ chars = keepNewLines === true ? '\x00-\x09\x0B\x0C\x0E-\x1F\x7F' : '\x00-\x1F\x7F';
    return blacklist(value, chars);
}
/**
 * @param {?} value
 * @param {?} strict
 * @return {?}
 */
function toBoolean(value, strict) {
    if (isNotBlank(value)) {
        if (strict) {
            return value === '1' || value === 'true';
        }
        return value !== '0' && value !== 'false' && value !== '';
    }
    return value;
}
/**
 * @param {?} value
 * @return {?}
 */
function toFloat(value) {
    if (isNotBlank(value))
        if (ApplicationUtil.isNumeric(value))
            return parseFloat(value);
    return null;
}
/**
 * @param {?} value
 * @return {?}
 */
function toDouble(value) {
    return toFloat(value);
}
/**
 * @param {?} value
 * @param {?} radix
 * @return {?}
 */
function toInt(value, radix) {
    if (isNotBlank(value))
        if (ApplicationUtil.isNumeric(value))
            return parseInt(value, radix || 10);
    return null;
}
/**
 * @param {?} value
 * @param {?} radix
 * @return {?}
 */
function toString(value, radix) {
    if (isNotBlank(value))
        return String(value);
    return value;
}
/**
 * @param {?} value
 * @param {?} chars
 * @return {?}
 */
function whitelist(value, chars) {
    if (isNotBlank(value))
        if (typeof value === "string")
            return value.replace(new RegExp("[^" + chars + "]+", 'g'), '');
    return value;
}
/**
 * @param {?} value
 * @return {?}
 */
function toDate(value) {
    var /** @type {?} */ dateProvider = new DateProvider();
    if (isNotBlank(value))
        if (typeof value === "string" && dateProvider.isValid(value)) {
            value = dateProvider.getDate(value);
            return value;
        }
    return null;
}
/**
 * @param {?} value
 * @return {?}
 */
function escape(value) {
    if (isNotBlank(value))
        return (value.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\//g, '&#x2F;')
            .replace(/\\/g, '&#x5C;')
            .replace(/`/g, '&#96;'));
    return value;
}
/**
 * @param {?} value
 * @param {?} text
 * @return {?}
 */
function prefix(value, text) {
    if (isNotBlank(value))
        return "" + text + value;
    return value;
}
/**
 * @param {?} value
 * @param {?} text
 * @return {?}
 */
function suffix(value, text) {
    if (isNotBlank(value))
        return "" + value + text;
    return value;
}
/**
 * @param {?} value
 * @param {?} config
 * @return {?}
 */
function sanitize(value, config) {
    return config.custom(value);
}
var SANITIZERS = {
    trim: trim,
    ltrim: ltrim,
    rtrim: rtrim,
    blacklist: blacklist,
    stripLow: stripLow,
    toBoolean: toBoolean,
    toDouble: toDouble,
    toFloat: toFloat,
    toInt: toInt,
    'toString': toString,
    whitelist: whitelist,
    toDate: toDate,
    escape: escape,
    prefix: prefix,
    suffix: suffix,
    sanitize: sanitize
};
/**
 * @param {?} instanceFunc
 * @param {?=} entityObject
 * @return {?}
 */
function instanceProvider(instanceFunc, entityObject) {
    var /** @type {?} */ instance = defaultContainer.get(instanceFunc);
    var /** @type {?} */ prototype = entityObject ? entityObject.__proto__ : getInstance(instanceFunc, []).__proto__;
    if (prototype.__proto__) {
        var /** @type {?} */ isLoop = false;
        do {
            isLoop = prototype.__proto__.constructor != Object;
            if (isLoop) {
                var /** @type {?} */ extendClassInstance = defaultContainer.get(prototype.__proto__.constructor);
                instance = merge(clone(instance), clone(extendClassInstance));
                prototype = prototype.__proto__;
            }
        } while (isLoop);
    }
    return instance;
}
/**
 * @param {?} model
 * @param {?} objectArguments
 * @return {?}
 */
function getInstance(model, objectArguments) {
    var /** @type {?} */ classInstance = Object.create(model.prototype);
    try {
        model.apply(classInstance, objectArguments);
    }
    catch ( /** @type {?} */ex) {
        ///resolution of issue https://github.com/rxweb/rxweb/issues/188
        classInstance = Reflect.construct(model, objectArguments);
    }
    return classInstance;
}
var BaseFormBuilder = /** @class */ (function () {
    function BaseFormBuilder() {
    }
    /**
     * @return {?}
     */
    BaseFormBuilder.prototype.createInstance = function () {
        var /** @type {?} */ instance = {};
        defaultContainer.modelIncrementCount = defaultContainer.modelIncrementCount + 1;
        var /** @type {?} */ modelName = "RxWebModel" + defaultContainer.modelIncrementCount;
        instance.constructor = Function("\"use strict\";return(function " + modelName + "(){ })")();
        return instance;
    };
    /**
     * @param {?} model
     * @param {?} formBuilderConfiguration
     * @param {?=} classInstance
     * @return {?}
     */
    BaseFormBuilder.prototype.createClassObject = function (model, formBuilderConfiguration, classInstance) {
        var _this = this;
        var /** @type {?} */ instanceContainer = defaultContainer.get(model);
        var /** @type {?} */ autoInstanceConfig = formBuilderConfiguration ? formBuilderConfiguration.autoInstanceConfig : undefined;
        if (!autoInstanceConfig) {
            return classInstance && typeof classInstance != "function" ? classInstance : getInstance(model, []);
        }
        else {
            classInstance = classInstance && typeof classInstance != "function" ? classInstance : getInstance(model, autoInstanceConfig.arguments || []);
            if (autoInstanceConfig.objectPropInstanceConfig && autoInstanceConfig.objectPropInstanceConfig.length > 0) {
                autoInstanceConfig.objectPropInstanceConfig.forEach(function (t) {
                    var /** @type {?} */ objectProperty = instanceContainer.properties.filter(function (property) { return property.name == t.propertyName && property.propertyType == OBJECT_PROPERTY; })[0];
                    if (objectProperty) {
                        var /** @type {?} */ data = classInstance[t.propertyName];
                        classInstance[t.propertyName] = getInstance(objectProperty.entity, t.arguments || []);
                        if (data)
                            _this.setObjectValue(data, classInstance[t.propertyName]);
                    }
                });
            }
            if (autoInstanceConfig.arrayPropInstanceConfig && autoInstanceConfig.arrayPropInstanceConfig.length > 0) {
                autoInstanceConfig.arrayPropInstanceConfig.forEach(function (t) {
                    var /** @type {?} */ property = instanceContainer.properties.filter(function (property) { return property.name == t.propertyName && property.propertyType == ARRAY_PROPERTY; })[0];
                    if (property) {
                        var /** @type {?} */ data = classInstance[t.propertyName];
                        classInstance[t.propertyName] = [];
                        for (var /** @type {?} */ i = 0; i < t.rowItems; i++) {
                            var /** @type {?} */ instance = getInstance(property.entity, t.arguments || []);
                            if (data && data[i])
                                _this.setObjectValue(data[i], instance);
                            classInstance[t.propertyName].push(instance);
                        }
                    }
                });
            }
            return classInstance;
        }
    };
    /**
     * @param {?} model
     * @param {?} entityObject
     * @param {?} formBuilderConfiguration
     * @return {?}
     */
    BaseFormBuilder.prototype.updateObject = function (model, entityObject, formBuilderConfiguration) {
        var _this = this;
        var /** @type {?} */ instanceContainer = instanceProvider(model);
        var /** @type {?} */ classInstance = getInstance(model, []);
        if (instanceContainer) {
            instanceContainer.properties.forEach(function (t) {
                var /** @type {?} */ entity = ((t.propertyType == OBJECT_PROPERTY || t.propertyType == ARRAY_PROPERTY) && t.entity) ? t.entity : (formBuilderConfiguration && formBuilderConfiguration.genericEntities) ? formBuilderConfiguration.genericEntities[t.name] : undefined;
                if (!entity && t.entityProvider)
                    entity = t.entityProvider.call(entityObject);
                switch (t.propertyType) {
                    case PROPERTY:
                        classInstance[t.name] = _this.getValue(entityObject, t, formBuilderConfiguration);
                        break;
                    case OBJECT_PROPERTY:
                        var /** @type {?} */ objectValue = _this.getValue(entityObject, t, formBuilderConfiguration);
                        if (objectValue)
                            classInstance[t.name] = _this.updateObject(entity, objectValue, formBuilderConfiguration);
                        break;
                    case ARRAY_PROPERTY:
                        var /** @type {?} */ arrayObjectValue = _this.getValue(entityObject, t, formBuilderConfiguration);
                        if (arrayObjectValue && Array.isArray(arrayObjectValue)) {
                            classInstance[t.name] = [];
                            for (var _i = 0, arrayObjectValue_1 = arrayObjectValue; _i < arrayObjectValue_1.length; _i++) {
                                var row = arrayObjectValue_1[_i];
                                var /** @type {?} */ instanceObject = _this.updateObject(entity, row, formBuilderConfiguration);
                                classInstance[t.name].push(instanceObject);
                            }
                        }
                        break;
                }
            });
        }
        return classInstance;
    };
    /**
     * @param {?} instanceFunc
     * @param {?} entityObject
     * @return {?}
     */
    BaseFormBuilder.prototype.instaceProvider = function (instanceFunc, entityObject) {
        return instanceProvider(instanceFunc, entityObject);
    };
    /**
     * @param {?} propertyInfo
     * @param {?} value
     * @param {?} formBuilderConfiguration
     * @return {?}
     */
    BaseFormBuilder.prototype.getDefaultValue = function (propertyInfo, value, formBuilderConfiguration) {
        var /** @type {?} */ defaultValue = (formBuilderConfiguration && formBuilderConfiguration.propsConfig && formBuilderConfiguration.propsConfig[propertyInfo.name] && formBuilderConfiguration.propsConfig[propertyInfo.name].defaultValue && !RegexValidator.isNotBlank(value)) ? formBuilderConfiguration.propsConfig[propertyInfo.name].defaultValue : (propertyInfo.defaultValue != undefined && !RegexValidator.isNotBlank(value)) ?
            propertyInfo.defaultValue :
            value;
        return defaultValue;
    };
    /**
     * @param {?} instanceContainer
     * @param {?} propertyName
     * @param {?} value
     * @param {?} entityObject
     * @param {?} baseObject
     * @return {?}
     */
    BaseFormBuilder.prototype.sanitizeValue = function (instanceContainer, propertyName, value, entityObject, baseObject) {
        if (instanceContainer.sanitizers && instanceContainer.sanitizers[propertyName]) {
            for (var _i = 0, _a = instanceContainer.sanitizers[propertyName]; _i < _a.length; _i++) {
                var sanitizer = _a[_i];
                value = SANITIZERS[sanitizer.name](value, sanitizer.config);
            }
        }
        if (entityObject[propertyName] !== undefined && entityObject[propertyName] !== value)
            entityObject[propertyName] = value;
        if (baseObject[propertyName] !== undefined && baseObject[propertyName] !== value)
            baseObject[propertyName] = value;
        return value;
    };
    /**
     * @param {?} entityObject
     * @param {?} propertyInfo
     * @param {?} formBuilderConfiguration
     * @return {?}
     */
    BaseFormBuilder.prototype.getValue = function (entityObject, propertyInfo, formBuilderConfiguration) {
        var /** @type {?} */ propValue = (propertyInfo.dataPropertyName) ? entityObject[propertyInfo.dataPropertyName] : entityObject[propertyInfo.name];
        return this.getDefaultValue(propertyInfo, propValue, formBuilderConfiguration);
    };
    /**
     * @param {?} entityObject
     * @param {?} classInstance
     * @return {?}
     */
    BaseFormBuilder.prototype.setObjectValue = function (entityObject, classInstance) {
        for (var /** @type {?} */ column in entityObject) {
            classInstance[column] = entityObject[column];
        }
    };
    return BaseFormBuilder;
}());
var FormBuilderConfiguration = /** @class */ (function () {
    /**
     * @param {?=} formBuilderConfiguration
     */
    function FormBuilderConfiguration(formBuilderConfiguration) {
        if (formBuilderConfiguration)
            for (var column in formBuilderConfiguration)
                this[column] = formBuilderConfiguration[column];
    }
    return FormBuilderConfiguration;
}());
var ObjectMaker = /** @class */ (function () {
    function ObjectMaker() {
    }
    /**
     * @param {?} key
     * @param {?} config
     * @param {?} values
     * @return {?}
     */
    ObjectMaker.toJson = function (key, config, values) {
        var /** @type {?} */ message = config ? config.message : null;
        var /** @type {?} */ messageKey = undefined;
        if (!message && config && config.messageKey)
            messageKey = config.messageKey;
        var /** @type {?} */ messageText = (message) ? message : (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.validationMessage && ReactiveFormConfig.json.validationMessage[messageKey || key]) ? ReactiveFormConfig.json.validationMessage[messageKey || key] : '';
        values.forEach(function (t, index) {
            messageText = messageText.replace("{{" + index + "}}", t);
        });
        var /** @type {?} */ jObject = {};
        jObject[key] = {
            message: messageText, refValues: values
        };
        return jObject;
    };
    /**
     * @return {?}
     */
    ObjectMaker.null = function () {
        return null;
    };
    return ObjectMaker;
}());
/**
 * @param {?} conditionalValidationProps
 * @return {?}
 */
function conditionalChangeValidator(conditionalValidationProps) {
    var /** @type {?} */ oldValue = undefined;
    var /** @type {?} */ setTimeOut = function (control) {
        var /** @type {?} */ timeOut = setTimeout(function (t) {
            clearTimeout(timeOut);
            control.updateValueAndValidity();
        }, 100);
    };
    return function (control) {
        var /** @type {?} */ value = control.value;
        if (control.parent && oldValue != value) {
            var /** @type {?} */ rootFormGroup_1 = ApplicationUtil.getRootFormGroup(control);
            var /** @type {?} */ parentFormGroup_1 = control.parent;
            oldValue = value;
            conditionalValidationProps.forEach(function (t) {
                if (t.indexOf("[]") != -1) {
                    var /** @type {?} */ splitText = t.split("[]");
                    var /** @type {?} */ formArray = /** @type {?} */ (rootFormGroup_1.get([splitText[0]]));
                    if (formArray)
                        formArray.controls.forEach(function (formGroup) {
                            var /** @type {?} */ abstractControl = formGroup.get(splitText[1]);
                            if (abstractControl) {
                                setTimeOut(abstractControl);
                            }
                        });
                }
                else {
                    var /** @type {?} */ splitText_1 = t.split('.');
                    if (splitText_1.length > 1) {
                        var /** @type {?} */ control = null;
                        t.split('.').forEach(function (name, index) { control = (index == 0) ? rootFormGroup_1.controls[name] : control.controls[name]; });
                    }
                    else {
                        control = parentFormGroup_1.controls[t];
                    }
                    if (control) {
                        setTimeOut(control);
                    }
                }
            });
        }
        return ObjectMaker.null();
    };
}
var DisableProvider = /** @class */ (function () {
    /**
     * @param {?} decoratorType
     * @param {?} entityObject
     */
    function DisableProvider(decoratorType, entityObject) {
        this.decoratorType = decoratorType;
        this.entityObject = entityObject;
    }
    /**
     * @param {?} currentFormGroup
     * @return {?}
     */
    DisableProvider.prototype.getFormGroupName = function (currentFormGroup) {
        var /** @type {?} */ keyName = '';
        if (currentFormGroup.parent)
            for (var _i = 0, _a = Object.keys(currentFormGroup.parent.controls); _i < _a.length; _i++) {
                var controlName = _a[_i];
                if (currentFormGroup.parent.controls[controlName] == currentFormGroup) {
                    keyName = controlName;
                    break;
                }
            }
        return keyName;
    };
    /**
     * @param {?} control
     * @param {?} columnName
     * @return {?}
     */
    DisableProvider.prototype.zeroArgumentProcess = function (control, columnName) {
        var /** @type {?} */ disabledColumns = [];
        this.getDisabledColumns(/** @type {?} */ (control.parent), "" + columnName + RXCODE + "0", false).forEach(function (t) { return disabledColumns.push(t); });
        var /** @type {?} */ path = this.topControlPath(control, columnName);
        var /** @type {?} */ splitPath = path.split(".");
        if (splitPath.length > 1) {
            var /** @type {?} */ rootFormGroup = ApplicationUtil.getRootFormGroup(control);
            this.getDisabledColumns(rootFormGroup, "" + path + RXCODE + "0", true).forEach(function (t) { return disabledColumns.push(t); });
            var /** @type {?} */ controlPath = '';
            for (var /** @type {?} */ i = 0; i < splitPath.length - 2; i++) {
                var /** @type {?} */ controlName = splitPath[i];
                controlPath = "" + path.replace(controlName + ".", '') + RXCODE + "-0";
                if (rootFormGroup.controls[controlName]) {
                    this.getDisabledColumns(/** @type {?} */ (rootFormGroup.controls[controlName]), controlPath, true, controlName).forEach(function (t) { return disabledColumns.push(t); });
                    rootFormGroup = /** @type {?} */ (rootFormGroup.controls[controlName]);
                }
            }
        }
        return disabledColumns;
    };
    /**
     * @param {?} formGroup
     * @param {?} columnName
     * @param {?} isRoot
     * @param {?=} pathName
     * @return {?}
     */
    DisableProvider.prototype.getDisabledColumns = function (formGroup, columnName, isRoot, pathName) {
        if (pathName === void 0) {
            pathName = "";
        }
        if (formGroup[MODEL_INSTANCE]) {
            var /** @type {?} */ instanceContainer = instanceProvider(formGroup[MODEL_INSTANCE].constructor, this.entityObject);
            return this.getChangeDetectionColumns(instanceContainer, columnName, isRoot, pathName);
        }
        return [];
    };
    /**
     * @param {?} instanceContainer
     * @param {?} columnName
     * @param {?} isRoot
     * @param {?=} pathName
     * @return {?}
     */
    DisableProvider.prototype.getChangeDetectionColumns = function (instanceContainer, columnName, isRoot, pathName) {
        var _this = this;
        if (pathName === void 0) {
            pathName = "";
        }
        var /** @type {?} */ conditionalDisableControls = [];
        var /** @type {?} */ columns = instanceContainer.nonValidationDecorators[this.decoratorType].changeDetection[columnName];
        if (columns) {
            columns.forEach(function (t) {
                conditionalDisableControls.push({ controlPath: pathName ? pathName + "." + t : t, conditionalExpression: instanceContainer.nonValidationDecorators[_this.decoratorType].conditionalExpressions[t], isRoot: isRoot });
            });
        }
        return conditionalDisableControls;
    };
    /**
     * @param {?} control
     * @param {?} columnName
     * @return {?}
     */
    DisableProvider.prototype.topControlPath = function (control, columnName) {
        if (control.parent) {
            var /** @type {?} */ name = this.getFormGroupName(( /** @type {?} */(control.parent)));
            if (name) {
                columnName = name + "." + columnName;
                return this.topControlPath(control.parent, columnName);
            }
        }
        return columnName;
    };
    /**
     * @param {?} formGroup
     * @param {?} columnName
     * @param {?=} path
     * @return {?}
     */
    DisableProvider.prototype.childControlDisabledExpression = function (formGroup, columnName, path) {
        var _this = this;
        if (path === void 0) {
            path = "";
        }
        var /** @type {?} */ disabledColumns = [];
        if (formGroup[MODEL_INSTANCE]) {
            var /** @type {?} */ instanceContainer = defaultContainer.get(formGroup[MODEL_INSTANCE].constructor);
            if (instanceContainer) {
                this.getChangeDetectionColumns(instanceContainer, columnName, true, path).forEach(function (t) { return disabledColumns.push(t); });
                var /** @type {?} */ props = instanceContainer.properties.filter(function (t) { return t.propertyType == OBJECT_PROPERTY; });
                props.forEach(function (t) {
                    if (formGroup.controls[t.name]) {
                        var /** @type {?} */ columns = _this.getDisabledColumns(/** @type {?} */ (formGroup.controls[t.name]), columnName, true, path ? path + "." + t.name : "" + t.name);
                        columns.forEach(function (x) { return disabledColumns.push(x); });
                        _this.childControlDisabledExpression(( /** @type {?} */(formGroup.controls[t.name])), columnName, path ? path + "." + t.name : "" + t.name).forEach(function (y) { return disabledColumns.push(y); });
                    }
                });
            }
        }
        return disabledColumns;
    };
    /**
     * @param {?} control
     * @param {?} columnName
     * @return {?}
     */
    DisableProvider.prototype.oneArgumentProcess = function (control, columnName) {
        var /** @type {?} */ path = this.topControlPath(control, columnName);
        var /** @type {?} */ rootFormGroup = ApplicationUtil.getRootFormGroup(control);
        var /** @type {?} */ childColumns = this.childControlDisabledExpression(rootFormGroup, path);
        return childColumns;
    };
    return DisableProvider;
}());
var DIRTY = "dirty";
var TOUCHED = "touched";
var UNTOUCHED = "untouched";
var PRISTINE = "pristine";
var PENDING = "pending";
var RxFormControl = /** @class */ (function (_super) {
    __extends(RxFormControl, _super);
    /**
     * @param {?} formState
     * @param {?} validator
     * @param {?} asyncValidator
     * @param {?} entityObject
     * @param {?} baseObject
     * @param {?} controlName
     * @param {?} _sanitizers
     */
    function RxFormControl(formState, validator, asyncValidator, entityObject, baseObject, controlName, _sanitizers) {
        var _this = _super.call(this, formState, validator, asyncValidator) || this;
        _this.entityObject = entityObject;
        _this.baseObject = baseObject;
        _this._sanitizers = _sanitizers;
        _this._errorMessages = [];
        _this._childColumns = [];
        _this._refDisableControls = [];
        _this._refMessageControls = [];
        _this._refClassNameControls = [];
        _this._isPassedExpression = false;
        _this._baseValue = formState === undefined ? null : _this.getFormState(formState);
        _this._isModified = false;
        _this.keyName = controlName;
        _this._errorMessageBindingStrategy = ReactiveFormConfig.get("reactiveForm.errorMessageBindingStrategy");
        return _this;
    }
    Object.defineProperty(RxFormControl.prototype, "errorMessages", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._messageExpression) {
                if (this._errorMessages.length == 0 && this.errors)
                    this.setControlErrorMessages();
            }
            else if (this._messageExpression && !this._isPassedExpression)
                return [];
            if (!this.errors && this._errorMessages.length > 0)
                this.setControlErrorMessages();
            return this._errorMessages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxFormControl.prototype, "errorMessage", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._messageExpression) {
                if (this._errorMessage == undefined && this.errors)
                    this.setControlErrorMessages();
            }
            else if (this._messageExpression && !this._isPassedExpression)
                return undefined;
            if (!this.errors && this._errorMessage)
                this.setControlErrorMessages();
            return this._errorMessage;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    RxFormControl.prototype.getFormState = function (value) {
        var /** @type {?} */ baseValue = value;
        if (Array.isArray(value)) {
            baseValue = [];
            value.forEach(function (t) { return baseValue.push(t); });
        }
        return baseValue;
    };
    Object.defineProperty(RxFormControl.prototype, "isModified", {
        /**
         * @return {?}
         */
        get: function () {
            return this._isModified;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    RxFormControl.prototype.setValue = function (value, options) {
        var /** @type {?} */ parsedValue = this.getSanitizedValue(value);
        if (options && options.dirty)
            this.baseObject[this.keyName] = value;
        this.entityObject[this.keyName] = parsedValue;
        _super.prototype.setValue.call(this, value, options);
        this.bindError();
        this.bindClassName();
        this.executeExpressions();
        this.callPatch();
        if (options && !options.updateChanged && this.root[VALUE_CHANGED_SYNC]) {
            this.root[VALUE_CHANGED_SYNC]();
        }
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.getControlValue = function () {
        return this.getSanitizedValue(this.value);
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.bindError = function () {
        if (this._messageExpression)
            this._isPassedExpression = this.executeExpression(this._messageExpression, this);
        this.setControlErrorMessages();
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.bindClassName = function () {
        if (this.updateOnElementClass && typeof this.updateOnElementClass === "function") {
            var /** @type {?} */ className = this.executeExpression(this._classNameExpression, this);
            var /** @type {?} */ updateElement = /** @type {?} */ (this.updateOnElementClass);
            updateElement(className);
        }
    };
    /**
     * @param {?=} opts
     * @return {?}
     */
    RxFormControl.prototype.markAsTouched = function (opts) {
        var /** @type {?} */ currentState = this.touched;
        _super.prototype.markAsTouched.call(this, opts);
        if (currentState != this.touched)
            this.runControlPropChangeExpression([TOUCHED, UNTOUCHED]);
    };
    /**
     * @param {?=} opts
     * @return {?}
     */
    RxFormControl.prototype.markAsUntouched = function (opts) {
        var /** @type {?} */ currentState = this.untouched;
        _super.prototype.markAsUntouched.call(this, opts);
        if (currentState != this.untouched)
            this.runControlPropChangeExpression([UNTOUCHED, TOUCHED]);
    };
    /**
     * @param {?=} opts
     * @return {?}
     */
    RxFormControl.prototype.markAsDirty = function (opts) {
        var /** @type {?} */ currentState = this.dirty;
        _super.prototype.markAsDirty.call(this, opts);
        if (currentState != this.dirty)
            this.runControlPropChangeExpression([DIRTY]);
    };
    /**
     * @param {?=} opts
     * @return {?}
     */
    RxFormControl.prototype.markAsPristine = function (opts) {
        var /** @type {?} */ currentState = this.pristine;
        _super.prototype.markAsDirty.call(this, opts);
        if (currentState != this.pristine)
            this.runControlPropChangeExpression([PRISTINE]);
    };
    /**
     * @param {?=} opts
     * @return {?}
     */
    RxFormControl.prototype.markAsPending = function (opts) {
        var /** @type {?} */ currentState = this.pending;
        _super.prototype.markAsDirty.call(this, opts);
        if (currentState != this.pending)
            this.runControlPropChangeExpression([PENDING]);
    };
    /**
     * @param {?} propNames
     * @return {?}
     */
    RxFormControl.prototype.runControlPropChangeExpression = function (propNames) {
        var _this = this;
        propNames.forEach(function (name) {
            if ((_this._controlProp && _this._messageExpression && _this._controlProp[name]) || (!_this._messageExpression && _this.checkErrorMessageStrategy()))
                _this.bindError();
            if (_this._classNameControlProp && _this._classNameControlProp[name])
                _this.bindClassName();
        });
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.refresh = function () {
        this.getMessageExpression(/** @type {?} */ (this.parent), this.keyName);
        this.bindConditionalControls(DECORATORS.disabled, "_refDisableControls");
        this.bindConditionalControls(DECORATORS.error, "_refMessageControls");
        this.bindConditionalControls(DECORATORS.elementClass, "_refClassNameControls");
        this.executeExpressions();
        this.bindError();
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    RxFormControl.prototype.reset = function (value) {
        if (value !== undefined)
            this.setValue(value);
        else
            this.setValue(this.getFormState(this._baseValue));
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.commit = function () {
        this._baseValue = this.value;
        this.callPatch();
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.callPatch = function () {
        this._isModified = this.getValue(this._baseValue) != this.getValue(this.value);
        if (this.parent && this.parent[PATCH])
            this.parent[PATCH](this.keyName);
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.checkErrorMessageStrategy = function () {
        var /** @type {?} */ isBind = true;
        switch (this._errorMessageBindingStrategy) {
            case ErrorMessageBindingStrategy.OnSubmit:
                isBind = ( /** @type {?} */(this.parent)).submitted;
                break;
            case ErrorMessageBindingStrategy.OnDirty:
                isBind = this.dirty;
                break;
            case ErrorMessageBindingStrategy.OnTouched:
                isBind = this.touched;
                break;
            case ErrorMessageBindingStrategy.OnDirtyOrTouched:
                isBind = this.dirty || this.touched;
                break;
            case ErrorMessageBindingStrategy.OnDirtyOrSubmit:
                isBind = this.dirty || ( /** @type {?} */(this.parent)).submitted;
                break;
            case ErrorMessageBindingStrategy.OnTouchedOrSubmit:
                isBind = this.touched || ( /** @type {?} */(this.parent)).submitted;
                break;
            default:
                isBind = true;
        }
        return isBind;
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.executeExpressions = function () {
        this.processExpression("_refDisableControls", "disabled");
        this.processExpression("_refMessageControls", "bindError");
        this.processExpression("_refClassNameControls", "bindClassName");
    };
    /**
     * @param {?} formGroup
     * @param {?} keyName
     * @return {?}
     */
    RxFormControl.prototype.getMessageExpression = function (formGroup, keyName) {
        if (formGroup[MODEL_INSTANCE]) {
            var /** @type {?} */ instanceContainer = defaultContainer.get(formGroup[MODEL_INSTANCE].constructor);
            if (instanceContainer) {
                this._messageExpression = instanceContainer.nonValidationDecorators.error.conditionalExpressions[keyName];
                this._controlProp = instanceContainer.nonValidationDecorators.error.controlProp[this.keyName];
                this._classNameExpression = instanceContainer.nonValidationDecorators.elementClass.conditionalExpressions[keyName];
                this._classNameControlProp = instanceContainer.nonValidationDecorators.elementClass.controlProp[keyName];
                if (this._classNameExpression)
                    this.updateOnElementClass = true;
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RxFormControl.prototype.getSanitizedValue = function (value) {
        if (this._sanitizers) {
            for (var _i = 0, _a = this._sanitizers; _i < _a.length; _i++) {
                var sanitizer = _a[_i];
                value = SANITIZERS[sanitizer.name](value, sanitizer.config);
            }
        }
        return value;
    };
    /**
     * @param {?} decoratorType
     * @param {?} refName
     * @return {?}
     */
    RxFormControl.prototype.bindConditionalControls = function (decoratorType, refName) {
        var _this = this;
        this._disableProvider = new DisableProvider(decoratorType, this.entityObject);
        this[refName] = this._disableProvider.zeroArgumentProcess(this, this.keyName);
        this._disableProvider.oneArgumentProcess(this, "" + this.keyName + RXCODE + "1").forEach(function (t) { return _this[refName].push(t); });
    };
    /**
     * @return {?}
     */
    RxFormControl.prototype.setControlErrorMessages = function () {
        var _this = this;
        if ((!this._messageExpression && this.checkErrorMessageStrategy()) || this._isPassedExpression) {
            this._errorMessages = [];
            if (this.errors) {
                Object.keys(this.errors).forEach(function (t) {
                    _this.parent[CONTROLS_ERROR][_this.keyName] = _this._errorMessage = _this.getErrorMessage(_this.errors, t);
                    if (!_this._errorMessage) {
                        var /** @type {?} */ errorObject = ObjectMaker.toJson(t, undefined, [_this.errors[t][t]]);
                        _this.parent[CONTROLS_ERROR][_this.keyName] = _this._errorMessage = _this.getErrorMessage(errorObject, t);
                    }
                    _this._errorMessages.push(_this._errorMessage);
                });
            }
            else {
                this._errorMessage = undefined;
                this.parent[CONTROLS_ERROR][this.keyName] = undefined;
                delete this.parent[CONTROLS_ERROR][this.keyName];
            }
        }
        else {
            this._errorMessages = [];
            this._errorMessage = undefined;
        }
    };
    /**
     * @param {?} errorObject
     * @param {?} keyName
     * @return {?}
     */
    RxFormControl.prototype.getErrorMessage = function (errorObject, keyName) {
        if (errorObject[keyName][MESSAGE])
            return errorObject[keyName][MESSAGE];
        return;
    };
    /**
     * @param {?} propName
     * @param {?} operationType
     * @return {?}
     */
    RxFormControl.prototype.processExpression = function (propName, operationType) {
        if (this[propName])
            for (var _i = 0, _a = this[propName]; _i < _a.length; _i++) {
                var controlInfo = _a[_i];
                var /** @type {?} */ control = controlInfo.isRoot ? ApplicationUtil.getControl(controlInfo.controlPath, ApplicationUtil.getRootFormGroup(this)) : ApplicationUtil.getFormControl(controlInfo.controlPath, this);
                if (control) {
                    if (operationType == "disabled") {
                        var /** @type {?} */ result = this.executeExpression(controlInfo.conditionalExpression, control);
                        if (result)
                            control.disable();
                        else
                            control.enable();
                    }
                    else if (operationType == "bindError")
                        control.bindError();
                    else if (operationType == "bindClassName")
                        control.bindClassName();
                }
            }
    };
    /**
     * @param {?} expression
     * @param {?} control
     * @return {?}
     */
    RxFormControl.prototype.executeExpression = function (expression, control) {
        return expression.call(control.parent[MODEL_INSTANCE], control, ApplicationUtil.getParentModelInstanceValue(this), control.parent[MODEL_INSTANCE]);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RxFormControl.prototype.getValue = function (value) {
        return value !== undefined && value !== null && value !== "" ? value : "";
    };
    return RxFormControl;
}(FormControl));
var OBJECT = "object";
var BOOLEAN$1 = "boolean";
var FormDataProvider = /** @class */ (function () {
    function FormDataProvider() {
    }
    /**
     * @param {?} jObject
     * @return {?}
     */
    FormDataProvider.prototype.convertToFormData = function (jObject) {
        return this.convertFormData(jObject);
    };
    /**
     * @param {?} jObject
     * @param {?=} currentFormData
     * @param {?=} parentKey
     * @return {?}
     */
    FormDataProvider.prototype.convertFormData = function (jObject, currentFormData, parentKey) {
        var _this = this;
        var /** @type {?} */ formData = currentFormData || new FormData();
        var /** @type {?} */ propName = '';
        for (var /** @type {?} */ columnName in jObject) {
            propName = !parentKey ? columnName : parentKey + "[" + columnName + "]";
            if (Array.isArray(jObject[columnName])) {
                jObject[columnName].forEach(function (row, index) {
                    propName = columnName + "[" + index + "]";
                    if (typeof row === OBJECT)
                        _this.convertFormData(row, formData, propName);
                    else
                        _this.nonObjectValueBind(row, formData, propName);
                });
            }
            else if (jObject[columnName] !== null && typeof jObject[columnName] === OBJECT && !(jObject[columnName] instanceof File || jObject[columnName] instanceof FileList)) {
                this.convertFormData(jObject[columnName], formData, propName);
            }
            else {
                this.nonObjectValueBind(jObject[columnName], formData, propName);
            }
        }
        return formData;
    };
    /**
     * @param {?} value
     * @param {?} formData
     * @param {?} propName
     * @return {?}
     */
    FormDataProvider.prototype.nonObjectValueBind = function (value, formData, propName) {
        if (typeof value === BOOLEAN$1) {
            formData.append(propName, +value ? '1' : '0');
        }
        else if (value instanceof FileList) {
            for (var /** @type {?} */ i = 0; i < value.length; i++) {
                formData.append(propName + "[" + i + "]", value.item(i));
            }
        }
        else {
            if (RegexValidator.isNotBlank(value))
                formData.append(propName, value);
        }
    };
    return FormDataProvider;
}());
/**
 * @param {?} controlName
 * @param {?} control
 * @param {?=} options
 * @return {?}
 */
function isResetControl(controlName, control, options) {
    var /** @type {?} */ isReset = true;
    if (options) {
        isReset = false;
        if (options.resetType)
            switch (options.resetType) {
                case ResetFormType.ControlsOnly:
                    isReset = control instanceof FormControl;
                    break;
                case ResetFormType.ControlsAndFormGroupsOnly:
                    isReset = control instanceof FormControl || control instanceof FormGroup;
                    break;
                case ResetFormType.FormGroupsOnly:
                    isReset = control instanceof FormGroup;
                    break;
                case ResetFormType.FormArraysOnly:
                    isReset = control instanceof FormArray;
                    break;
                case ResetFormType.DefinedPropsOnly:
                    isReset = options.value ? Object.keys(options.value).indexOf(controlName) != -1 : false;
                    break;
                default:
                    isReset = true;
                    break;
            }
        if (!isReset && options.with)
            isReset = options.with.filter(function (x) { return x.split('.')[0] == controlName.split('.')[0]; })[0] !== undefined;
        if (!isReset && options.value && (options.resetType === undefined || options.resetType !== ResetFormType.DefinedPropsOnly))
            isReset = true;
    }
    return isReset;
}
/**
 * @param {?} controlName
 * @param {?=} options
 * @return {?}
 */
function getNestedOptions(controlName, options) {
    if (options) {
        var /** @type {?} */ jObjectOptions = {};
        if (options.resetType)
            jObjectOptions.resetType = (options.resetType == ResetFormType.FormGroupsOnly || options.resetType == ResetFormType.FormArraysOnly) ? ResetFormType.ControlsOnly : options.resetType;
        if (options.with) {
            var /** @type {?} */ nestedControls = options.with.filter(function (t) { return t.split('.')[0] == controlName; });
            var /** @type {?} */ controlNames = nestedControls.map(function (x) {
                var /** @type {?} */ splitControls = x.split('.');
                splitControls.splice(0, 1);
                return splitControls.join('.');
            });
            jObjectOptions.with = controlNames;
        }
        if (options.value && options.value[controlName])
            jObjectOptions.value = options.value[controlName];
        jObjectOptions = Object.keys(jObjectOptions).length > 0 ? jObjectOptions : undefined;
        return jObjectOptions;
    }
    return undefined;
}
var RxFormGroup = /** @class */ (function (_super) {
    __extends(RxFormGroup, _super);
    /**
     * @param {?} model
     * @param {?} entityObject
     * @param {?} controls
     * @param {?=} validatorOrOpts
     * @param {?=} asyncValidator
     */
    function RxFormGroup(model, entityObject, controls, validatorOrOpts, asyncValidator) {
        var _this = _super.call(this, controls, validatorOrOpts, asyncValidator) || this;
        _this.model = model;
        _this.entityObject = entityObject;
        _this._modified = {};
        _this._isModified = false;
        _this.baseObject = {};
        for (var column in _this.entityObject)
            _this.baseObject[column] = _this.entityObject[column];
        _this.formDataProvider = new FormDataProvider();
        return _this;
    }
    /**
     * @param {?} modelInstance
     * @param {?} jObject
     * @return {?}
     */
    RxFormGroup.prototype.bindPrimaryKey = function (modelInstance, jObject) {
        var /** @type {?} */ instanceContainer = defaultContainer.get(modelInstance.constructor);
        if (instanceContainer) {
            var /** @type {?} */ primaryKeyProp = instanceContainer.properties.filter(function (x) { return x.isPrimaryKey; })[0];
            if (primaryKeyProp && this.modelInstance[primaryKeyProp.name])
                jObject[primaryKeyProp.name] = this.modelInstance[primaryKeyProp.name];
        }
    };
    Object.defineProperty(RxFormGroup.prototype, "modifiedValue", {
        /**
         * @return {?}
         */
        get: function () {
            var /** @type {?} */ jObject = {};
            if (Object.keys(this._modified).length > 0) {
                this.bindPrimaryKey(this.modelInstance, jObject);
                for (var /** @type {?} */ columnName in this._modified) {
                    if (this.controls[columnName] instanceof RxFormGroup)
                        jObject[columnName] = ( /** @type {?} */(this.controls[columnName])).modifiedValue;
                    else if (this.controls[columnName] instanceof FormArray) {
                        var /** @type {?} */ formArray = /** @type {?} */ (this.controls[columnName]);
                        jObject[columnName] = [];
                        for (var /** @type {?} */ i = 0; i < this._modified[columnName].length; i++) {
                            var /** @type {?} */ modifiedValue = ( /** @type {?} */(formArray.controls[i])).modifiedValue;
                            if (Object.keys(modifiedValue).length > 0)
                                jObject[columnName].push(modifiedValue);
                        }
                        if (jObject[columnName].length == 0)
                            delete jObject[columnName];
                    }
                    else
                        jObject[columnName] = this._modified[columnName];
                }
                return jObject;
            }
            return this._modified;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxFormGroup.prototype, "isModified", {
        /**
         * @return {?}
         */
        get: function () {
            return this._isModified;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?=} controlName
     * @return {?}
     */
    RxFormGroup.prototype.patch = function (controlName) {
        if (controlName) {
            var /** @type {?} */ control = /** @type {?} */ (this.controls[controlName]);
            this.processModified(controlName, control);
        }
        else {
            this.nestedFormsModification();
        }
        this._isModified = Object.keys(this._modified).length > 0;
        if (!this._isModified)
            this.nestedArrayIsModified();
        if (this.parent)
            ( /** @type {?} */(this.parent)).patch();
    };
    /**
     * @return {?}
     */
    RxFormGroup.prototype.isDirty = function () {
        var /** @type {?} */ isDirty = false;
        for (var /** @type {?} */ name in this.value) {
            var /** @type {?} */ currentValue = this.modelInstance[name];
            if (!(this.controls[name] instanceof FormGroup || this.controls[name] instanceof FormArray)) {
                isDirty = ApplicationUtil.notEqualTo(this.baseObject[name], currentValue);
            }
            else if (this.controls[name] instanceof RxFormGroup)
                isDirty = ( /** @type {?} */(this.controls[name])).isDirty();
            else if (this.controls[name] instanceof FormArray) {
                for (var _i = 0, _a = ( /** @type {?} */(this.controls[name])).controls; _i < _a.length; _i++) {
                    var formGroup = _a[_i];
                    isDirty = ( /** @type {?} */(formGroup)).isDirty();
                }
            }
            if (isDirty)
                break;
        }
        return isDirty;
    };
    /**
     * @param {?=} options
     * @return {?}
     */
    RxFormGroup.prototype.resetForm = function (options) {
        for (var /** @type {?} */ name in this.controls) {
            if (isResetControl(name, this.controls[name], options)) {
                if (this.controls[name] instanceof FormGroup)
                    ( /** @type {?} */(this.controls[name])).resetForm(getNestedOptions(name, options));
                else if (this.controls[name] instanceof FormArray) {
                    ( /** @type {?} */(this.controls[name])).resetForm(options && options.value ? options.value[name] : undefined);
                }
                else {
                    if (options && options.value && RegexValidator.isNotBlank(options.value[name]))
                        this.controls[name].reset(options.value[name]);
                    else
                        this.controls[name].reset();
                }
            }
        }
    };
    /**
     * @return {?}
     */
    RxFormGroup.prototype.commit = function () {
        for (var /** @type {?} */ name in this.controls) {
            if (this.controls[name] instanceof FormGroup)
                ( /** @type {?} */(this.controls[name])).commit();
            else if (this.controls[name] instanceof FormArray) {
                ( /** @type {?} */(this.controls[name])).commit();
            }
            else {
                ( /** @type {?} */(this.controls[name])).commit();
            }
        }
    };
    /**
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    RxFormGroup.prototype.patchModelValue = function (value, options) {
        if (value) {
            for (var /** @type {?} */ name in this.controls) {
                if (this.controls[name] instanceof RxFormGroup && value[name])
                    ( /** @type {?} */(this.controls[name])).patchModelValue(value[name], options);
                else if (this.controls[name] instanceof FormArray && Array.isArray(value[name])) {
                    var /** @type {?} */ index = 0;
                    for (var _i = 0, _a = ( /** @type {?} */(this.controls[name])).controls; _i < _a.length; _i++) {
                        var formGroup = _a[_i];
                        if (value[name][index])
                            ( /** @type {?} */(formGroup)).patchModelValue(value[name][index], options);
                        index = index + 1;
                    }
                }
                else if (value[name] !== undefined)
                    this.controls[name].patchValue(value[name], options);
            }
        }
    };
    /**
     * @param {?} onlyMessage
     * @return {?}
     */
    RxFormGroup.prototype.getErrorSummary = function (onlyMessage) {
        var _this = this;
        var /** @type {?} */ jObject = {};
        Object.keys(this.controls).forEach(function (columnName) {
            if (_this.controls[columnName] instanceof FormGroup) {
                var /** @type {?} */ error_1 = ( /** @type {?} */(_this.controls[columnName])).getErrorSummary(false);
                if (Object.keys(error_1).length > 0)
                    jObject[columnName] = error_1;
            }
            else if (_this.controls[columnName] instanceof FormArray) {
                var /** @type {?} */ index = 0;
                for (var _i = 0, _a = ( /** @type {?} */(_this.controls[columnName])).controls; _i < _a.length; _i++) {
                    var formGroup = _a[_i];
                    var /** @type {?} */ error_2 = ( /** @type {?} */(formGroup)).getErrorSummary(false);
                    if (Object.keys(error_2).length > 0) {
                        error_2.index = index;
                        if (!jObject[columnName])
                            jObject[columnName] = [];
                        jObject[columnName].push(error_2);
                    }
                    index++;
                }
            }
            else {
                if (_this.controls[columnName].errors) {
                    var /** @type {?} */ error_3 = _this.controls[columnName].errors;
                    if (onlyMessage)
                        for (var /** @type {?} */ validationName in error_3)
                            jObject[columnName] = error_3[validationName].message;
                    else
                        jObject[columnName] = error_3;
                }
            }
        });
        return jObject;
    };
    /**
     * @return {?}
     */
    RxFormGroup.prototype.valueChangedSync = function () {
        var _this = this;
        Object.keys(this.controls).forEach(function (columnName) {
            if (!(_this.controls[columnName] instanceof FormArray || _this.controls[columnName] instanceof RxFormArray) && !(_this.controls[columnName] instanceof FormGroup || _this.controls[columnName] instanceof RxFormGroup) && !(_this.entityObject[columnName] instanceof FormControl || _this.entityObject[columnName] instanceof RxFormControl) && ApplicationUtil.notEqualTo(( /** @type {?} */(_this.controls[columnName])).getControlValue(), _this.entityObject[columnName])) {
                _this.controls[columnName].setValue(_this.entityObject[columnName], { updateChanged: true });
            }
            else if ((_this.controls[columnName] instanceof FormArray || _this.controls[columnName] instanceof RxFormArray)) {
                for (var _i = 0, _a = ( /** @type {?} */(_this.controls[columnName])).controls; _i < _a.length; _i++) {
                    var formGroup = _a[_i];
                    ( /** @type {?} */(formGroup)).valueChangedSync();
                }
            }
            else if ((_this.controls[columnName] instanceof RxFormGroup)) {
                ( /** @type {?} */(_this.controls[columnName])).valueChangedSync();
            }
        });
    };
    /**
     * @return {?}
     */
    RxFormGroup.prototype.refreshDisable = function () {
        var _this = this;
        Object.keys(this.controls).forEach(function (columnName) {
            if (!(_this.controls[columnName] instanceof FormArray || _this.controls[columnName] instanceof RxFormArray) && !(_this.controls[columnName] instanceof FormGroup || _this.controls[columnName] instanceof RxFormGroup)) {
                ( /** @type {?} */(_this.controls[columnName])).refresh();
            }
            else if ((_this.controls[columnName] instanceof RxFormGroup)) {
                ( /** @type {?} */(_this.controls[columnName])).refreshDisable();
            }
        });
    };
    /**
     * @return {?}
     */
    RxFormGroup.prototype.bindErrorMessages = function () {
        var _this = this;
        Object.keys(this.controls).forEach(function (columnName) {
            if (!(_this.controls[columnName] instanceof FormArray || _this.controls[columnName] instanceof RxFormArray) && !(_this.controls[columnName] instanceof FormGroup || _this.controls[columnName] instanceof RxFormGroup)) {
                ( /** @type {?} */(_this.controls[columnName])).bindError();
            }
            else if ((_this.controls[columnName] instanceof RxFormGroup)) {
                ( /** @type {?} */(_this.controls[columnName])).bindErrorMessages();
            }
        });
    };
    Object.defineProperty(RxFormGroup.prototype, "submitted", {
        /**
         * @return {?}
         */
        get: function () {
            return this._submitted;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var _this = this;
            this._submitted = value;
            Object.keys(this.controls).forEach(function (columnName) {
                if (_this.controls[columnName] instanceof FormArray) {
                    var /** @type {?} */ formArray = /** @type {?} */ (_this.controls[columnName]);
                    for (var _i = 0, _a = formArray.controls; _i < _a.length; _i++) {
                        var formGroup = _a[_i];
                        ( /** @type {?} */(formGroup)).submitted = value;
                    }
                }
                else if (_this.controls[columnName] instanceof FormGroup) {
                    ( /** @type {?} */(_this.controls[columnName])).submitted = value;
                }
                else
                    ( /** @type {?} */(_this.controls[columnName])).bindError();
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxFormGroup.prototype, "modelInstanceValue", {
        /**
         * @return {?}
         */
        get: function () {
            return clone(this.entityObject);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxFormGroup.prototype, "modelInstance", {
        /**
         * @return {?}
         */
        get: function () {
            return this.entityObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxFormGroup.prototype, "controlsError", {
        /**
         * @return {?}
         */
        get: function () {
            return this.getErrorSummary(true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RxFormGroup.prototype.toFormData = function () {
        return this.formDataProvider.convertToFormData(this.value);
    };
    /**
     * @param {?} controlName
     * @param {?} control
     * @return {?}
     */
    RxFormGroup.prototype.processModified = function (controlName, control) {
        if (control.isModified)
            this._modified[controlName] = control.value;
        else
            delete this._modified[controlName];
        this._isModified = Object.keys(this._modified).length > 0;
    };
    /**
     * @return {?}
     */
    RxFormGroup.prototype.nestedArrayIsModified = function () {
        for (var /** @type {?} */ controlName in this.controls) {
            if (this.controls[controlName] instanceof RxFormArray)
                this._isModified = ( /** @type {?} */(this.controls[controlName])).isModified;
            if (this._isModified)
                break;
        }
    };
    /**
     * @return {?}
     */
    RxFormGroup.prototype.nestedFormsModification = function () {
        for (var /** @type {?} */ controlName in this.controls) {
            if (this.controls[controlName] instanceof RxFormGroup)
                this.processModified(controlName, this.controls[controlName]);
            else if (this.controls[controlName] instanceof RxFormArray) {
                if (( /** @type {?} */(this.controls[controlName])).isModified) {
                    var /** @type {?} */ formGroups = ( /** @type {?} */(this.controls[controlName])).controls;
                    this._modified[controlName] = [];
                    for (var _i = 0, formGroups_1 = formGroups; _i < formGroups_1.length; _i++) {
                        var formGroup = formGroups_1[_i];
                        if (( /** @type {?} */(formGroup)).isModified) {
                            if (!this._modified[controlName])
                                this._modified[controlName] = [];
                            this._modified[controlName].push(( /** @type {?} */(formGroup)).modifiedValue);
                        }
                    }
                    if (this._modified[controlName].length == 0)
                        delete this._modified[controlName];
                }
                else if (this._modified[controlName])
                    delete this._modified[controlName];
            }
        }
    };
    return RxFormGroup;
}(FormGroup));
var FormProvider = /** @class */ (function () {
    function FormProvider() {
    }
    /**
     * @param {?} control
     * @param {?} config
     * @param {?=} isDynamicConfig
     * @return {?}
     */
    FormProvider.ProcessRule = function (control, config, isDynamicConfig) {
        if (isDynamicConfig === void 0) {
            isDynamicConfig = false;
        }
        var /** @type {?} */ formGroupValue = ApplicationUtil.getParentObjectValue(control);
        var /** @type {?} */ parentObject = (control.parent) ? ApplicationUtil.cloneValue(control.parent.value) : undefined;
        var /** @type {?} */ modelInstance = undefined;
        if (control.parent && control.parent instanceof RxFormGroup)
            modelInstance = ( /** @type {?} */(control.parent)).modelInstance;
        if (parentObject)
            this.updateFormControlValue(parentObject, control.parent.controls, control);
        else if (config.conditionalExpression)
            return false;
        return Linq.execute(formGroupValue, config, parentObject, modelInstance, isDynamicConfig);
    };
    /**
     * @param {?} parentObject
     * @param {?} controls
     * @param {?} control
     * @return {?}
     */
    FormProvider.updateFormControlValue = function (parentObject, controls, control) {
        for (var /** @type {?} */ controlName in parentObject) {
            if (!(parentObject[controlName] instanceof Object))
                if (controls[controlName] === control) {
                    parentObject[controlName] = control.value;
                    break;
                }
        }
    };
    return FormProvider;
}());
var ValidatorValueChecker = /** @class */ (function () {
    function ValidatorValueChecker() {
    }
    /**
     * @param {?} control
     * @param {?} config
     * @return {?}
     */
    ValidatorValueChecker.pass = function (control, config) {
        if (FormProvider.ProcessRule(control, config))
            return RegexValidator.isNotBlank(control.value);
        else
            return false;
    };
    /**
     * @param {?} control
     * @param {?} config
     * @return {?}
     */
    ValidatorValueChecker.passArrayValue = function (control, config) {
        if (FormProvider.ProcessRule(control, config))
            return control.value instanceof Array;
        else
            return false;
    };
    return ValidatorValueChecker;
}());
var ARRAY_CONFIG = "ArrayConfig";
var FIELD_CONFIG = "FieldConfig";
var IP_CONFIG = "IpConfig";
var NUMBER_CONFIG = "NumberConfig";
var PASSWORD_CONFIG = "PasswordConfig";
var PATTERN_CONFIG = "PatternConfig";
var RANGE_CONFIG = "RangeConfig";
var CONFIG_REQUIRED_FIELDS = (_a = {}, _a[ARRAY_CONFIG] = ["matchValues"], _a[FIELD_CONFIG] = ["fieldName"], _a[IP_CONFIG] = ["version"], _a[PASSWORD_CONFIG] = ["validation"], _a[NUMBER_CONFIG] = ["value"], _a[PATTERN_CONFIG] = ["expression"], _a[RANGE_CONFIG] = ["minimumNumber", "maximumNumber"], _a);
/**
 * @param {?} config
 * @param {?} control
 * @param {?=} configName
 * @return {?}
 */
function getConfigObject(config, control, configName) {
    if (configName === void 0) {
        configName = '';
    }
    return (config != undefined && config != true) ? configProvider(control, config, configName) : {};
}
/**
 * @param {?} control
 * @param {?} config
 * @param {?} configName
 * @return {?}
 */
function configProvider(control, config, configName) {
    if (config.dynamicConfig) {
        var /** @type {?} */ currentConfig_1 = FormProvider.ProcessRule(control, clone(config), true);
        if (typeof currentConfig_1 != "boolean") {
            currentConfig_1.conditionalExpression = config.conditionalExpression;
            currentConfig_1.dynamicConfig = config.dynamicConfig;
            Object.keys(config).forEach(function (t) {
                if ((t != "conditionalExpression" && t != "dynamicConfig") || currentConfig_1[t] === undefined) {
                    currentConfig_1[t] = config[t];
                }
            });
            return currentConfig_1;
        }
        else
            return config;
    }
    return checkRequiredProps(config, configName);
}
/**
 * @param {?} config
 * @param {?} configName
 * @return {?}
 */
function checkRequiredProps(config, configName) {
    var /** @type {?} */ props = CONFIG_REQUIRED_FIELDS[configName];
    if (configName) {
        props.forEach(function (prop) {
            if (config[prop] === undefined)
                throw new Error("Pass the property of '" + prop + "' with value in the " + configName + ", otherwise it won't work.");
        });
    }
    return config;
}
/**
 * @param {?} configModel
 * @param {?} control
 * @param {?} regExps
 * @param {?} key
 * @return {?}
 */
function alphaValidation(configModel, control, regExps, key) {
    var /** @type {?} */ config = getConfigObject(configModel, control);
    if (ValidatorValueChecker.pass(control, config)) {
        var /** @type {?} */ isValid = (!config || !config.allowWhiteSpace) ?
            RegexValidator.isValid(control.value, regExps[0]) :
            RegexValidator.isValid(control.value, regExps[1]);
        if (!isValid)
            return ObjectMaker.toJson(key, config, [control.value]);
    }
    return ObjectMaker.null();
}
/**
 * @param {?} configModel
 * @return {?}
 */
function alphaValidator(configModel) {
    return function (control) {
        return alphaValidation(configModel, control, [RegExRule.alpha, RegExRule.alphaWithSpace], AnnotationTypes.alpha);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function alphaNumericValidator(configModel) {
    return function (control) {
        return alphaValidation(configModel, control, [RegExRule.alphaNumeric, RegExRule.alphaNumericWithSpace], AnnotationTypes.alphaNumeric);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function compareValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, FIELD_CONFIG);
        var /** @type {?} */ compareControl = ApplicationUtil.getFormControl(config.fieldName, control);
        var /** @type {?} */ controlValue = control.value;
        var /** @type {?} */ compareControlValue = (compareControl) ? compareControl.value : '';
        if (RegexValidator.isNotBlank(controlValue) || RegexValidator.isNotBlank(compareControlValue)) {
            if (!(compareControl && compareControl.value === controlValue))
                return ObjectMaker.toJson(AnnotationTypes.compare, config, [controlValue, compareControlValue]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function containsValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (control.value.indexOf(config.value) == -1)
                return ObjectMaker.toJson(AnnotationTypes.contains, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} length
 * @param {?} checks
 * @return {?}
 */
function checkLength(length, checks) {
    var /** @type {?} */ isPassed = false;
    for (var _i = 0, checks_1 = checks; _i < checks_1.length; _i++) {
        var check = checks_1[_i];
        isPassed = (check == length);
        if (isPassed)
            break;
    }
    return isPassed;
}
/**
 * @param {?} numbers
 * @return {?}
 */
function calculate(numbers) {
    var /** @type {?} */ numberSum = 0;
    for (var /** @type {?} */ i = 0; i < numbers.length; i++)
        numberSum += parseInt(numbers.substring(i, i + 1));
    var /** @type {?} */ deltas = new Array(0, 1, 2, 3, 4, -4, -3, -2, -1, 0);
    for (var /** @type {?} */ i = numbers.length - 1; i >= 0; i -= 2) {
        numberSum += deltas[parseInt(numbers.substring(i, i + 1))];
    }
    var /** @type {?} */ mod = numberSum % 10;
    mod = 10 - mod;
    if (mod == 10)
        mod = 0;
    return mod;
}
/**
 * @param {?} configModel
 * @return {?}
 */
function creditCardValidator(configModel) {
    var /** @type {?} */ cardDigits = {
        AmericanExpress: [15],
        DinersClub: [14, 16, 19],
        Discover: [16, 19],
        JCB: [16, 19],
        Maestro: [12, 16, 19],
        MasterCard: [16],
        Visa: [13, 16, 19]
    };
    /**
     * @param {?} creditCardNumber
     * @return {?}
     */
    function validate(creditCardNumber) {
        var /** @type {?} */ digit = parseInt(creditCardNumber.substring(creditCardNumber.length - 1, creditCardNumber.length));
        return calculate(creditCardNumber.substring(0, creditCardNumber.length - 1)) == parseInt(String(digit)) ? !0 : !1;
    }
    /**
     * @param {?} cardNumber
     * @return {?}
     */
    function getCardProviderName(cardNumber) {
        var /** @type {?} */ cardProviderName = "";
        return /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/.test(cardNumber) ? cardProviderName = "Maestro" : /^5[1-5]/.test(cardNumber) ? cardProviderName = "MasterCard" : /^4/.test(cardNumber) ? cardProviderName = "Visa" : /^3[47]/.test(cardNumber) ? cardProviderName = "AmericanExpress" : /^(?:2131|1800|35)/.test(cardNumber) ? cardProviderName = "JCB" : /^3(?:0[0-5]|[68])/.test(cardNumber) ? cardProviderName = "DinersClub" : /^6(?:011|5)/.test(cardNumber) && (cardProviderName = "Discover"), cardProviderName;
    }
    return function (control) {
        var /** @type {?} */ controlValue = control.value;
        var /** @type {?} */ config = getConfigObject(configModel, control);
        var /** @type {?} */ parentObject = (control.parent) ? control.parent.value : undefined;
        if (FormProvider.ProcessRule(control, config)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                var /** @type {?} */ isValid_1 = false;
                var /** @type {?} */ cardTypes = config.fieldName && parentObject[config.fieldName] ? [parentObject[config.fieldName]] : config.creditCardTypes;
                var /** @type {?} */ cardType = '';
                for (var _i = 0, cardTypes_1 = cardTypes; _i < cardTypes_1.length; _i++) {
                    var creditCardType = cardTypes_1[_i];
                    isValid_1 = checkLength(controlValue.length, cardDigits[creditCardType]) && getCardProviderName(controlValue) == creditCardType && validate(controlValue);
                    cardType = creditCardType;
                    if (isValid_1)
                        break;
                }
                if (!isValid_1)
                    return ObjectMaker.toJson(AnnotationTypes.creditCard, config, [controlValue, cardType]);
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @param {?} control
 * @param {?} regExp
 * @param {?} key
 * @return {?}
 */
function regexValidation(configModel, control, regExp, key) {
    var /** @type {?} */ config = getConfigObject(configModel, control);
    if (ValidatorValueChecker.pass(control, config)) {
        if (!RegexValidator.isValid(control.value, regExp))
            return ObjectMaker.toJson(key, config, [control.value]);
    }
    return ObjectMaker.null();
}
/**
 * @param {?} configModel
 * @return {?}
 */
function digitValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.onlyDigit, AnnotationTypes.digit);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function emailValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.basicEmail, AnnotationTypes.email);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function hexColorValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.strictHexColor, AnnotationTypes.hexColor);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function lowercaseValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(control.value === control.value.toLowerCase()))
                return ObjectMaker.toJson(AnnotationTypes.lowerCase, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
var OPERATORS = {
    lessThan: "<",
    greaterThan: ">",
    lessThanEqualTo: "<=",
    greaterThanEqualTo: ">="
};
/**
 * @param {?} leftValue
 * @param {?} rightValue
 * @param {?} operator
 * @return {?}
 */
function runCondition(leftValue, rightValue, operator) {
    var /** @type {?} */ result = false;
    switch (operator) {
        case OPERATORS.lessThan:
        case OPERATORS.greaterThan:
            result = leftValue > rightValue;
            break;
        case OPERATORS.lessThanEqualTo:
        case OPERATORS.greaterThanEqualTo:
            result = leftValue >= rightValue;
            break;
    }
    return result;
}
/**
 * @param {?} control
 * @param {?} config
 * @param {?} operationType
 * @return {?}
 */
function dateChecker(control, config, operationType) {
    config = getConfigObject(config, control);
    var /** @type {?} */ dateProvider = new DateProvider();
    if (FormProvider.ProcessRule(control, config)) {
        if (RegexValidator.isNotBlank(control.value)) {
            if (dateProvider.isDate(control.value) || dateProvider.isValid(control.value)) {
                var /** @type {?} */ checkDate = dateProvider.getCompareDate(config, control);
                var /** @type {?} */ currentControlValue = dateProvider.getDate(control.value);
                var /** @type {?} */ isValid_2 = operationType == AnnotationTypes.minDate ? runCondition(currentControlValue, checkDate, config.operator || OPERATORS.greaterThanEqualTo) : runCondition(checkDate, currentControlValue, config.operator || OPERATORS.lessThanEqualTo);
                if (!isValid_2)
                    return ObjectMaker.toJson(operationType, config, [control.value]);
            }
            else
                return ObjectMaker.toJson(operationType, config, [control.value]);
        }
    }
    return ObjectMaker.null();
}
/**
 * @param {?} control
 * @param {?} config
 * @param {?} operationType
 * @return {?}
 */
function validateDate(control, config, operationType) {
    config = getConfigObject(config, control);
    var /** @type {?} */ dateProvider = new DateProvider();
    if (FormProvider.ProcessRule(control, config)) {
        if (RegexValidator.isNotBlank(control.value)) {
            if (!dateProvider.isDate(control.value) && !dateProvider.isValid(control.value)) {
                return ObjectMaker.toJson(operationType, config, [control.value]);
            }
        }
    }
    return ObjectMaker.null();
}
/**
 * @param {?} configModel
 * @return {?}
 */
function maxDateValidator(configModel) {
    return function (control) {
        return dateChecker(control, configModel, AnnotationTypes.maxDate);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function maxLengthValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, NUMBER_CONFIG);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(control.value.length <= config.value))
                return ObjectMaker.toJson(AnnotationTypes.maxLength, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function maxNumberValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, NUMBER_CONFIG);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(parseFloat(control.value) <= config.value))
                return ObjectMaker.toJson(AnnotationTypes.maxNumber, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function minDateValidator(configModel) {
    return function (control) {
        return dateChecker(control, configModel, AnnotationTypes.minDate);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function minLengthValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, NUMBER_CONFIG);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(String(control.value).length >= config.value))
                return ObjectMaker.toJson(AnnotationTypes.minLength, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function minNumberValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, NUMBER_CONFIG);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(parseFloat(control.value) >= config.value))
                return ObjectMaker.toJson(AnnotationTypes.minNumber, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function passwordValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, PASSWORD_CONFIG);
        var /** @type {?} */ controlValue = control.value;
        if (RegexValidator.isNotBlank(controlValue)) {
            var /** @type {?} */ validation = RegexValidator.isValidPassword(config.validation, controlValue);
            if (!validation.isValid)
                return ObjectMaker.toJson(AnnotationTypes.password, config, [controlValue]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function rangeValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, RANGE_CONFIG);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(String(control.value).indexOf(".") == -1 && parseInt(control.value) >= config.minimumNumber && parseInt(control.value) <= config.maximumNumber))
                return ObjectMaker.toJson(AnnotationTypes.range, config, [control.value, config.minimumNumber, config.maximumNumber]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?=} configModel
 * @return {?}
 */
function uppercaseValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(control.value === control.value.toUpperCase()))
                return ObjectMaker.toJson(AnnotationTypes.upperCase, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function requiredValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            if (!RegexValidator.isNotBlank(control.value)) {
                return ObjectMaker.toJson(AnnotationTypes.required, config, []);
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function patternValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, PATTERN_CONFIG);
        if (ValidatorValueChecker.pass(control, config)) {
            for (var /** @type {?} */ pattern in config.expression)
                if (!(RegexValidator.isValid(control.value, config.expression[pattern])))
                    return ObjectMaker.toJson(pattern, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function timeValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ isValid_3 = config.allowSeconds ? RegexValidator.isValid(control.value, RegExRule.timeWithSeconds) : RegexValidator.isValid(control.value, RegExRule.time);
            if (!isValid_3)
                return ObjectMaker.toJson(AnnotationTypes.time, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function urlValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.url, AnnotationTypes.url);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function jsonValidator(configModel) {
    /**
     * @param {?} value
     * @return {?}
     */
    function process(value) {
        var /** @type {?} */ result = false;
        try {
            var /** @type {?} */ json = JSON.parse(value);
            result = !!json && typeof json === 'object';
        }
        catch ( /** @type {?} */ex) {
            result = false;
        }
        return result;
    }
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (process(control.value))
                return ObjectMaker.toJson(AnnotationTypes.json, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} control
 * @param {?} config
 * @param {?} relationalOperatorName
 * @return {?}
 */
function relationalCheck(control, config, relationalOperatorName) {
    config = getConfigObject(config, control);
    var /** @type {?} */ matchControl = config.fieldName ? ApplicationUtil.getFormControl(config.fieldName, control) : undefined;
    var /** @type {?} */ matchControlValue = (matchControl) ? matchControl.value : config.value !== undefined ? config.value : '';
    if (FormProvider.ProcessRule(control, config)) {
        if (RegexValidator.isNotBlank(control.value) && RegexValidator.isNotBlank(matchControlValue)) {
            var /** @type {?} */ isValid_4 = false;
            switch (relationalOperatorName) {
                case AnnotationTypes.greaterThan:
                    isValid_4 = parseFloat(control.value) > parseFloat(matchControlValue);
                    break;
                case AnnotationTypes.lessThan:
                    isValid_4 = parseFloat(control.value) < parseFloat(matchControlValue);
                    break;
                case AnnotationTypes.greaterThanEqualTo:
                    isValid_4 = parseFloat(control.value) >= parseFloat(matchControlValue);
                    break;
                case AnnotationTypes.lessThanEqualTo:
                    isValid_4 = parseFloat(control.value) <= parseFloat(matchControlValue);
                    break;
            }
            if (!isValid_4)
                return ObjectMaker.toJson(relationalOperatorName, config, [control.value, matchControlValue]);
        }
    }
    return ObjectMaker.null();
}
/**
 * @param {?} configModel
 * @return {?}
 */
function greaterThanValidator(configModel) {
    return function (control) {
        return relationalCheck(control, configModel, AnnotationTypes.greaterThan);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function greaterThanEqualToValidator(configModel) {
    return function (control) {
        return relationalCheck(control, configModel, AnnotationTypes.greaterThanEqualTo);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function lessThanEqualToValidator(configModel) {
    return function (control) {
        return relationalCheck(control, configModel, AnnotationTypes.lessThanEqualTo);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function lessThanValidator(configModel) {
    return function (control) {
        return relationalCheck(control, configModel, AnnotationTypes.lessThan);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function choiceValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            if (control.value instanceof Array) {
                config.minLength = (config.minLength == undefined) ? 0 : config.minLength;
                config.maxLength = (config.maxLength == undefined) ? 0 : config.maxLength;
                if ((((control.value.length) < config.minLength) || (config.maxLength !== 0 && control.value.length > config.maxLength)))
                    return ObjectMaker.toJson(AnnotationTypes.choice, config, [control.value]);
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function differentValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, FIELD_CONFIG);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ differentControl = ApplicationUtil.getFormControl(config.fieldName, control);
            var /** @type {?} */ differentControlValue = (differentControl) ? differentControl.value : '';
            if (!(differentControl && differentControl.value != control.value))
                return ObjectMaker.toJson(AnnotationTypes.different, config, [control.value, differentControlValue]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function numericValidator(configModel) {
    return function (control) {
        if (configModel && (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.numeric]))
            ApplicationUtil.configureControl(control, configModel, AnnotationTypes.numeric);
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!RegexValidator.isValid(control.value, ApplicationUtil.numericValidation(config.allowDecimal, config.acceptValue)))
                return ObjectMaker.toJson(AnnotationTypes.numeric, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function evenValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(control.value % 2 == 0))
                return ObjectMaker.toJson(AnnotationTypes.even, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function oddValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!(!(control.value % 2 == 0)) || !ApplicationUtil.isNumeric(control.value))
                return ObjectMaker.toJson(AnnotationTypes.odd, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function factorValidator(configModel) {
    /**
     * @param {?} dividend
     * @param {?} value
     * @return {?}
     */
    function positiveFactors(dividend, value) {
        var /** @type {?} */ isPositive = false;
        for (var /** @type {?} */ index = 1; index <= Math.floor(Math.sqrt(dividend)); index += 1) {
            if (dividend % index === 0) {
                if (index == value)
                    isPositive = true;
                if (dividend / index !== index)
                    if ((dividend / index) == value)
                        isPositive = true;
                if (isPositive)
                    break;
            }
        }
        return isPositive;
    }
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        var /** @type {?} */ dividendField = (control.parent && config.fieldName) ? ApplicationUtil.getFormControl(config.fieldName, control) : undefined;
        var /** @type {?} */ dividend = (config.fieldName && dividendField) ? dividendField.value : config.dividend;
        if (FormProvider.ProcessRule(control, config)) {
            if (RegexValidator.isNotBlank(control.value) && dividend > 0) {
                if (!RegexValidator.isValid(control.value, RegExRule.onlyDigit) || !positiveFactors(dividend, parseInt(control.value)))
                    return ObjectMaker.toJson(AnnotationTypes.factor, config, [control.value]);
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function leapYearValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ isValid = (control.value % 100 === 0) ? (control.value % 400 === 0) : (control.value % 4 === 0);
            if (!isValid)
                return ObjectMaker.toJson(AnnotationTypes.leapYear, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function allOfValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, ARRAY_CONFIG);
        if (ValidatorValueChecker.passArrayValue(control, config)) {
            var /** @type {?} */ testResult = false;
            var _loop_2 = function (value) {
                testResult = control.value.some(function (y) { return y == value; });
                if (!testResult)
                    return "break";
            };
            for (var _i = 0, _a = config.matchValues; _i < _a.length; _i++) {
                var value = _a[_i];
                var state_1 = _loop_2(/** @type {?} */ value);
                if (state_1 === "break")
                    break;
            }
            if (!testResult)
                return ObjectMaker.toJson(AnnotationTypes.allOf, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function oneOfValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, ARRAY_CONFIG);
        if (ValidatorValueChecker.passArrayValue(control, config)) {
            var /** @type {?} */ testResult = false;
            var _loop_3 = function (value) {
                testResult = control.value.some(function (y) { return y == value; });
                if (testResult)
                    return "break";
            };
            for (var _i = 0, _a = config.matchValues; _i < _a.length; _i++) {
                var value = _a[_i];
                var state_2 = _loop_3(/** @type {?} */ value);
                if (state_2 === "break")
                    break;
            }
            if (!testResult)
                return ObjectMaker.toJson(AnnotationTypes.oneOf, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function noneOfValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, ARRAY_CONFIG);
        if (FormProvider.ProcessRule(control, config)) {
            var /** @type {?} */ testResult = false;
            var _loop_4 = function (value) {
                var /** @type {?} */ matchValue = ApplicationUtil.lowerCaseWithTrim(value);
                testResult = Array.isArray(control.value) ? control.value.some(function (y) { return ApplicationUtil.lowerCaseWithTrim(y) === matchValue; }) : ApplicationUtil.lowerCaseWithTrim(control.value) === matchValue;
                if (testResult)
                    return "break";
            };
            for (var _i = 0, _a = config.matchValues; _i < _a.length; _i++) {
                var value = _a[_i];
                var state_3 = _loop_4(/** @type {?} */ value);
                if (state_3 === "break")
                    break;
            }
            if (testResult)
                return ObjectMaker.toJson(AnnotationTypes.noneOf, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function macValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.macId, AnnotationTypes.mac);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function asciiValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.ascii, AnnotationTypes.ascii);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function dataUriValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.dataUri, AnnotationTypes.dataUri);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function portValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ isValid_5 = RegexValidator.isValid(control.value, RegExRule.onlyDigit) && (control.value >= 0 && control.value <= 65535);
            if (!isValid_5)
                return ObjectMaker.toJson(AnnotationTypes.port, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function latLongValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ splitText = control.value.split(',');
            if (!(splitText.length > 1 && RegexValidator.isValid(splitText[0], RegExRule.lat) && RegexValidator.isValid(splitText[1], RegExRule.long)))
                return ObjectMaker.toJson(AnnotationTypes.latLong, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function extensionValidator(configModel) {
    return function (control, files) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.extension])
            ApplicationUtil.configureControl(control, config, AnnotationTypes.extension);
        if (files && FormProvider.ProcessRule(control, config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var /** @type {?} */ testResult = true;
                var /** @type {?} */ extension_1 = '';
                for (var /** @type {?} */ i = 0; i < files.length; i++) {
                    var /** @type {?} */ file_1 = files.item(i);
                    var /** @type {?} */ splitText = file_1.name.split(".");
                    extension_1 = splitText[splitText.length - 1];
                    var /** @type {?} */ result = config.extensions.filter(function (t) { return extension_1.toLowerCase() == t.toLowerCase(); })[0];
                    if (!result) {
                        testResult = false;
                        break;
                    }
                }
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.extension, config, [extension_1, config.extensions.join(",")]);
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function fileSizeValidator(configModel) {
    return function (control, files) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.fileSize])
            ApplicationUtil.configureControl(control, config, AnnotationTypes.fileSize);
        if (files && FormProvider.ProcessRule(control, config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var /** @type {?} */ minFileSize = config.minSize ? config.minSize : 0;
                var /** @type {?} */ testResult = false;
                var /** @type {?} */ fileSize_1 = 0;
                for (var /** @type {?} */ i = 0; i < files.length; i++) {
                    var /** @type {?} */ file_2 = files.item(i);
                    fileSize_1 = file_2.size;
                    testResult = (!(fileSize_1 >= minFileSize && fileSize_1 <= config.maxSize));
                    if (testResult)
                        break;
                }
                if (testResult)
                    return ObjectMaker.toJson(AnnotationTypes.fileSize, config, [fileSize_1, config.maxSize]);
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function endsWithValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ endString = String(control.value).substr(control.value.length - config.value.length, config.value.length);
            if (endString != config.value)
                return ObjectMaker.toJson(AnnotationTypes.endsWith, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function startsWithValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ startString = String(control.value).substr(0, config.value.length);
            if (startString != config.value)
                return ObjectMaker.toJson(AnnotationTypes.startsWith, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function primeNumberValidator(configModel) {
    /**
     * @param {?} value
     * @return {?}
     */
    function isPrime(value) {
        var /** @type {?} */ isPrimeNumber = value != 1;
        for (var /** @type {?} */ i = 2; i < value; i++) {
            if (value % i == 0) {
                isPrimeNumber = false;
                break;
            }
        }
        return isPrimeNumber;
    }
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!ApplicationUtil.isNumeric(control.value) || !isPrime(control.value))
                return ObjectMaker.toJson(AnnotationTypes.primeNumber, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function latitudeValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.lat, AnnotationTypes.latitude);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function longitudeValidator(configModel) {
    return function (control) {
        return regexValidation(configModel, control, RegExRule.long, AnnotationTypes.longitude);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function composeValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            if (config.validators) {
                var /** @type {?} */ result = undefined;
                for (var _i = 0, _a = config.validators; _i < _a.length; _i++) {
                    var validator = _a[_i];
                    result = validator(control);
                    if (result)
                        break;
                }
                if (result)
                    return (config.messageKey || config.message) ? ObjectMaker.toJson(config.messageKey || AnnotationTypes.compose, config, [control.value]) : result;
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @param {?} entity
 * @return {?}
 */
function ruleValidator(configModel, entity) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            var /** @type {?} */ result = null;
            for (var _i = 0, _a = config.customRules; _i < _a.length; _i++) {
                var rule_1 = _a[_i];
                result = rule_1(entity);
                if (result)
                    break;
            }
            if (result)
                return result;
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function fileValidator(configModel) {
    return function (control, files) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.file])
            ApplicationUtil.configureControl(control, config, AnnotationTypes.file);
        if (FormProvider.ProcessRule(control, config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var /** @type {?} */ minFiles = config.minFiles ? config.minFiles : 0;
                var /** @type {?} */ maxFiles = config.maxFiles ? config.maxFiles : files.length;
                if (!(files.length > 0 && files[0] instanceof File && files.length >= minFiles && files.length <= maxFiles))
                    return ObjectMaker.toJson(AnnotationTypes.file, config, [files.length, minFiles, maxFiles]);
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function customValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            var /** @type {?} */ formGroupValue = ApplicationUtil.getParentObjectValue(control);
            var /** @type {?} */ parentObject = (control.parent) ? control.parent.value : undefined;
            var /** @type {?} */ result = null;
            for (var _i = 0, _a = config.customRules; _i < _a.length; _i++) {
                var rule_2 = _a[_i];
                result = rule_2(formGroupValue, parentObject, config.additionalValue);
                if (result)
                    break;
            }
            if (result)
                return result;
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function uniqueValidator(configModel) {
    var /** @type {?} */ setTimeoutFunc = function (invalidateControls, controlValues) {
        var /** @type {?} */ timeOut = setTimeout(function () {
            invalidateControls.forEach(function (t) {
                var /** @type {?} */ isMatched = controlValues.filter(function (x) { return x == t.value; })[0];
                if (!isMatched)
                    t.updateValueAndValidity();
            });
            clearTimeout(timeOut);
        }, 200);
    };
    var /** @type {?} */ additionalValidation = function (config, fieldName, formGroup, formArray, currentValue) {
        var /** @type {?} */ indexOf = formArray.controls.indexOf(formGroup);
        var /** @type {?} */ formArrayValue = [];
        if (indexOf != -1) {
            formArray.value.forEach(function (t, i) {
                if (indexOf != i)
                    formArrayValue.push(t);
            });
            return config.additionalValidation(currentValue, indexOf, fieldName, formGroup.value, formArrayValue);
        }
        return false;
    };
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var /** @type {?} */ formArray = ApplicationUtil.getParentFormArray(control);
                var /** @type {?} */ parentFormGroup = control.parent ? control.parent : undefined;
                var /** @type {?} */ invalidateControls = [];
                var /** @type {?} */ controlValues = [];
                if (formArray && parentFormGroup) {
                    var /** @type {?} */ currentValue = control.value;
                    var /** @type {?} */ fieldName_1 = ApplicationUtil.getFormControlName(control);
                    var /** @type {?} */ isMatched_1 = false;
                    var _loop_5 = function (formGroup) {
                        if (formGroup != parentFormGroup) {
                            isMatched_1 = (ApplicationUtil.toLower(formGroup.controls[fieldName_1].value) == ApplicationUtil.toLower(currentValue) && !(formGroup.controls[fieldName_1].errors && formGroup.controls[fieldName_1].errors[AnnotationTypes.unique]));
                            if (formGroup.controls[fieldName_1].errors && formGroup.controls[fieldName_1].errors[AnnotationTypes.unique]) {
                                matchedControl = formArray.controls.filter(function (t) { return t.controls[fieldName_1] != formGroup.controls[fieldName_1] && ApplicationUtil.toLower(t.controls[fieldName_1].value) == ApplicationUtil.toLower(formGroup.controls[fieldName_1].value); })[0];
                                if (!matchedControl)
                                    invalidateControls.push(formGroup.controls[fieldName_1]);
                            }
                            else
                                controlValues.push(formGroup.controls[fieldName_1].value);
                        }
                        if (isMatched_1)
                            return "break";
                    };
                    var matchedControl;
                    for (var _i = 0, _a = formArray.controls; _i < _a.length; _i++) {
                        var formGroup = _a[_i];
                        var state_4 = _loop_5(/** @type {?} */ formGroup);
                        if (state_4 === "break")
                            break;
                    }
                    if (invalidateControls.length > 0)
                        setTimeoutFunc(invalidateControls, controlValues);
                    var /** @type {?} */ validation = false;
                    if (config.additionalValidation) {
                        validation = additionalValidation(config, fieldName_1, parentFormGroup, formArray, currentValue);
                    }
                    if (isMatched_1 && !validation)
                        return ObjectMaker.toJson(AnnotationTypes.unique, config, [control.value]);
                }
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function imageValidator(configModel) {
    return function (control, files) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.image])
            ApplicationUtil.configureControl(control, config, AnnotationTypes.image);
        if (!files)
            return ObjectMaker.null();
        return new Promise(function (resolve, reject) {
            if (FormProvider.ProcessRule(control, config)) {
                if (RegexValidator.isNotBlank(control.value)) {
                    var /** @type {?} */ testResult_1 = false;
                    var _loop_6 = function () {
                        var /** @type {?} */ file_3 = files.item(i);
                        var /** @type {?} */ type = file_3.type ? file_3.type.split('/') : [];
                        testResult_1 = type.length > 1 && type[0] == "image";
                        if (!testResult_1)
                            return "break";
                        var /** @type {?} */ image_1 = new Image();
                        config.minWidth = config.minWidth ? config.minWidth : 0;
                        config.minHeight = config.minHeight ? config.minHeight : 0;
                        image_1.onload = function () {
                            testResult_1 = (image_1.width >= config.minWidth && image_1.height >= config.minHeight) && (image_1.width <= config.maxWidth && image_1.height <= config.maxHeight);
                            if (!testResult_1)
                                resolve(ObjectMaker.toJson(AnnotationTypes.image, config, [image_1.width, image_1.height]));
                            else
                                resolve(ObjectMaker.null());
                        };
                        image_1.onerror = function () {
                            resolve(ObjectMaker.toJson(AnnotationTypes.image, config, []));
                        };
                        image_1.src = URL.createObjectURL(file_3);
                    };
                    for (var /** @type {?} */ i = 0; i < files.length; i++) {
                        var state_5 = _loop_6();
                        if (state_5 === "break")
                            break;
                    }
                    if (!testResult_1)
                        resolve(ObjectMaker.toJson(AnnotationTypes.image, config, []));
                }
            }
            return ObjectMaker.null();
        });
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function notEmptyValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (FormProvider.ProcessRule(control, config)) {
            if (!RegexValidator.isNotBlank(control.value, true)) {
                return ObjectMaker.toJson(AnnotationTypes.notEmpty, config, []);
            }
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} value
 * @return {?}
 */
function checkIpV4(value) {
    var /** @type {?} */ isValid = RegexValidator.isValid(value, RegExRule.ipV4);
    if (isValid) {
        var /** @type {?} */ splitDots = value.split('.');
        for (var _i = 0, splitDots_1 = splitDots; _i < splitDots_1.length; _i++) {
            var ipNum = splitDots_1[_i];
            isValid = ipNum <= 255;
            if (!isValid)
                break;
        }
    }
    return isValid;
}
/**
 * @param {?} value
 * @return {?}
 */
function checkIpV6(value) {
    return RegexValidator.isValid(value, RegExRule.ipV6);
}
/**
 * @param {?} configModel
 * @return {?}
 */
function ipValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control, IP_CONFIG);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ values = config.isCidr ? control.value.split('/') : [control.value];
            var /** @type {?} */ isValid = (config.version == IpVersion.V4) ?
                checkIpV4(values[0]) :
                (config.version == IpVersion.V6) ?
                    checkIpV6(values[0]) :
                    (checkIpV4(values[0]) || checkIpV6(values[0]));
            if (config.isCidr && isValid) {
                isValid = (values.length > 1) ?
                    config.version == IpVersion.V4 ?
                        RegexValidator.isValid(values[1], RegExRule.cidrV4) :
                        config.version == IpVersion.V6 ?
                            RegexValidator.isValid(values[1], RegExRule.cidrV6) :
                            (RegexValidator.isValid(values[1], RegExRule.cidrV4) || RegexValidator.isValid(values[1], RegExRule.cidrV6)) :
                    false;
            }
            if (!isValid)
                return ObjectMaker.toJson(AnnotationTypes.ip, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function cusipValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ controlValue = control.value.toUpperCase();
            var /** @type {?} */ isValid_6 = RegexValidator.isValid(controlValue, RegExRule.cusip);
            if (isValid_6) {
                var /** @type {?} */ numericValues = controlValue.split("").map(function (value) {
                    var /** @type {?} */ charCode = value.charCodeAt(0);
                    return charCode >= "A".charCodeAt(0) && charCode <= "Z".charCodeAt(0) ? charCode - "A".charCodeAt(0) + 10 : value;
                });
                var /** @type {?} */ totalCount = 0;
                for (var /** @type {?} */ i = 0; i < numericValues.length - 1; i++) {
                    var /** @type {?} */ numericValue = parseInt(numericValues[i], 10);
                    if (i % 2 !== 0) {
                        numericValue *= 2;
                    }
                    if (numericValue > 9) {
                        numericValue -= 9;
                    }
                    totalCount += numericValue;
                }
                totalCount = (10 - (totalCount % 10)) % 10;
                isValid_6 = totalCount == numericValues[numericValues.length - 1];
            }
            if (!isValid_6)
                return ObjectMaker.toJson(AnnotationTypes.cusip, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function gridValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ controlValue = control.value.toUpperCase();
            var /** @type {?} */ isValid = RegexValidator.isValid(controlValue, RegExRule.grid);
            if (isValid) {
                controlValue = controlValue.replace(/\s/g, '').replace(/-/g, '');
                if ('GRID:' === controlValue.substr(0, 5)) {
                    controlValue = controlValue.substr(5);
                }
                var /** @type {?} */ alphaNums = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var /** @type {?} */ alphaNumLength = alphaNums.length, /** @type {?} */ length = controlValue.length, /** @type {?} */ check = Math.floor(alphaNumLength / 2);
                for (var /** @type {?} */ i = 0; i < length; i++) {
                    check = (((check || alphaNumLength) * 2) % (alphaNumLength + 1) + alphaNums.indexOf(controlValue.charAt(i))) % alphaNumLength;
                }
                isValid = (check === 1);
            }
            if (!isValid)
                return ObjectMaker.toJson(AnnotationTypes.grid, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function dateValidator(configModel) {
    return function (control) {
        return validateDate(control, configModel, AnnotationTypes.date);
    };
}
/**
 * @param {?} leftValue
 * @param {?} rightValue
 * @param {?} operator
 * @return {?}
 */
function runCondition$1(leftValue, rightValue, operator) {
    var /** @type {?} */ result = false;
    switch (operator) {
        case OPERATORS.lessThan:
        case OPERATORS.greaterThan:
            result = leftValue > rightValue;
            break;
        case OPERATORS.lessThanEqualTo:
        case OPERATORS.greaterThanEqualTo:
            result = leftValue >= rightValue;
            break;
    }
    return result;
}
/**
 * @param {?} control
 * @param {?} config
 * @return {?}
 */
function isValid(control, config) {
    return config.allowSeconds ? RegexValidator.isValid(control.value, RegExRule.timeWithSeconds) : RegexValidator.isValid(control.value, RegExRule.time);
}
/**
 * @param {?} value
 * @return {?}
 */
function getTime(value) {
    var /** @type {?} */ splitTime = (value) ? value.split(':') : [];
    return new Date(1970, 0, 1, splitTime[0] ? splitTime[0] : 0, splitTime[1] ? splitTime[1] : 0, splitTime[2] ? splitTime[2] : 0).getTime();
}
/**
 * @param {?} control
 * @param {?} config
 * @param {?} operationType
 * @return {?}
 */
function timeChecker(control, config, operationType) {
    config = getConfigObject(config, control);
    if (FormProvider.ProcessRule(control, config)) {
        if (RegexValidator.isNotBlank(control.value)) {
            if (isValid(control, config)) {
                var /** @type {?} */ crossFormControl = config.fieldName ? ApplicationUtil.getFormControl(config.fieldName, control) : undefined;
                var /** @type {?} */ crossControlValue = crossFormControl ? getTime(crossFormControl.value) : getTime(config.value);
                var /** @type {?} */ currentControlValue = getTime(control.value);
                var /** @type {?} */ isValid_7 = operationType == AnnotationTypes.minTime ? runCondition$1(currentControlValue, crossControlValue, config.operator || OPERATORS.greaterThanEqualTo) : runCondition$1(crossControlValue, currentControlValue, config.operator || OPERATORS.lessThanEqualTo);
                if (!isValid_7)
                    return ObjectMaker.toJson(operationType, config, [control.value]);
            }
            else
                return ObjectMaker.toJson(operationType, config, [control.value]);
        }
    }
    return ObjectMaker.null();
}
/**
 * @param {?} configModel
 * @return {?}
 */
function minTimeValidator(configModel) {
    return function (control) {
        return timeChecker(control, configModel, AnnotationTypes.minTime);
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function maxTimeValidator(configModel) {
    return function (control) {
        return timeChecker(control, configModel, AnnotationTypes.maxTime);
    };
}
var APP_VALIDATORS = {
    "alphaNumeric": alphaNumericValidator,
    "alpha": alphaValidator,
    "compare": compareValidator,
    "email": emailValidator,
    "hexColor": hexColorValidator,
    "lowerCase": lowercaseValidator,
    "maxDate": maxDateValidator,
    "maxNumber": maxNumberValidator,
    "minDate": minDateValidator,
    "minNumber": minNumberValidator,
    "contains": containsValidator,
    "upperCase": uppercaseValidator,
    "maxLength": maxLengthValidator,
    "minLength": minLengthValidator,
    "password": passwordValidator,
    "range": rangeValidator,
    "required": requiredValidator,
    "creditCard": creditCardValidator,
    "digit": digitValidator,
    "pattern": patternValidator,
    "time": timeValidator,
    "url": urlValidator,
    "json": jsonValidator,
    "greaterThan": greaterThanValidator,
    "greaterThanEqualTo": greaterThanEqualToValidator,
    "lessThan": lessThanValidator,
    "lessThanEqualTo": lessThanEqualToValidator,
    "choice": choiceValidator,
    "different": differentValidator,
    "numeric": numericValidator,
    "even": evenValidator,
    "odd": oddValidator,
    "factor": factorValidator,
    "leapYear": leapYearValidator,
    "allOf": allOfValidator,
    "oneOf": oneOfValidator,
    "noneOf": noneOfValidator,
    "mac": macValidator,
    "ascii": asciiValidator,
    "dataUri": dataUriValidator,
    "port": portValidator,
    "latLong": latLongValidator,
    "extension": extensionValidator,
    "fileSize": fileSizeValidator,
    "endsWith": endsWithValidator,
    "startsWith": startsWithValidator,
    "primeNumber": primeNumberValidator,
    "latitude": latitudeValidator,
    "longitude": longitudeValidator,
    "compose": composeValidator,
    "rule": ruleValidator,
    "file": fileValidator,
    "unique": uniqueValidator,
    "image": imageValidator,
    "notEmpty": notEmptyValidator,
    "ip": ipValidator,
    "cusip": cusipValidator,
    "grid": gridValidator,
    "date": dateValidator,
    "minTime": minTimeValidator,
    "maxTime": maxTimeValidator
};
/**
 * @param {?} configModel
 * @return {?}
 */
function andValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ validatorNames = Object.keys(config.validation);
            var /** @type {?} */ failed = false;
            for (var _i = 0, validatorNames_1 = validatorNames; _i < validatorNames_1.length; _i++) {
                var validatorName = validatorNames_1[_i];
                failed = typeof config.validation[validatorName] == "boolean" ? APP_VALIDATORS[validatorName]()(control) : APP_VALIDATORS[validatorName](config.validation[validatorName])(control);
                if (failed)
                    break;
            }
            if (failed)
                return ObjectMaker.toJson(AnnotationTypes.and, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function orValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ validatorNames = Object.keys(config.validation);
            var /** @type {?} */ failed = false;
            for (var _i = 0, validatorNames_2 = validatorNames; _i < validatorNames_2.length; _i++) {
                var validatorName = validatorNames_2[_i];
                failed = typeof config.validation[validatorName] == "boolean" ? APP_VALIDATORS[validatorName]()(control) : APP_VALIDATORS[validatorName](config.validation[validatorName])(control);
                if (!failed)
                    break;
            }
            if (failed)
                return ObjectMaker.toJson(AnnotationTypes.or, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
/**
 * @param {?} configModel
 * @return {?}
 */
function notValidator(configModel) {
    return function (control) {
        var /** @type {?} */ config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            var /** @type {?} */ validatorNames = Object.keys(config.validation);
            var /** @type {?} */ failed = false;
            for (var _i = 0, validatorNames_3 = validatorNames; _i < validatorNames_3.length; _i++) {
                var validatorName = validatorNames_3[_i];
                failed = typeof config.validation[validatorName] == "boolean" ? APP_VALIDATORS[validatorName]()(control) : APP_VALIDATORS[validatorName](config.validation[validatorName])(control);
                if (!failed)
                    break;
            }
            if (!failed)
                return ObjectMaker.toJson(AnnotationTypes.not, config, [control.value]);
        }
        return ObjectMaker.null();
    };
}
var LOGICAL_VALIDATORS = { and: andValidator, or: orValidator, not: notValidator };
var ASYNC = "async";
var ENTITY_OBJECT = "entityObject";
var RxFormBuilder = /** @class */ (function (_super) {
    __extends(RxFormBuilder, _super);
    function RxFormBuilder() {
        var _this = _super.call(this) || this;
        _this.conditionalObjectProps = [];
        _this.conditionalValidationInstance = {};
        _this.builderConfigurationConditionalObjectProps = [];
        _this.formGroupPropOtherValidator = {};
        _this.currentFormGroupPropOtherValidator = {};
        _this.isNested = false;
        _this.isGroupCalled = false;
        _this.isNestedBinding = false;
        return _this;
    }
    /**
     * @param {?} instanceFunc
     * @param {?} entityObject
     * @return {?}
     */
    RxFormBuilder.prototype.getInstanceContainer = function (instanceFunc, entityObject) {
        return this.instaceProvider(instanceFunc, entityObject);
    };
    /**
     * @param {?} formGroup
     * @param {?} object
     * @return {?}
     */
    RxFormBuilder.prototype.setValue = function (formGroup, object) {
        for (var /** @type {?} */ col in object) {
            var /** @type {?} */ control = formGroup.get([col]);
            control.setValue(object[col]);
            control.updateValueAndValidity();
        }
    };
    /**
     * @param {?} fomrBuilderConfiguration
     * @return {?}
     */
    RxFormBuilder.prototype.extractExpressions = function (fomrBuilderConfiguration) {
        if (fomrBuilderConfiguration && fomrBuilderConfiguration.dynamicValidation) {
            for (var /** @type {?} */ property in fomrBuilderConfiguration.dynamicValidation) {
                for (var /** @type {?} */ decorator in fomrBuilderConfiguration.dynamicValidation[property]) {
                    if (fomrBuilderConfiguration.dynamicValidation[property][decorator].conditionalExpression) {
                        var /** @type {?} */ columns = Linq.expressionColumns(fomrBuilderConfiguration.dynamicValidation[property][decorator].conditionalExpression);
                        defaultContainer.addChangeValidation(this.conditionalValidationInstance, property, columns);
                    }
                }
            }
        }
        return null;
    };
    /**
     * @param {?} property
     * @param {?} propertyValidators
     * @param {?} propValidationConfig
     * @return {?}
     */
    RxFormBuilder.prototype.addAsyncValidation = function (property, propertyValidators, propValidationConfig) {
        var /** @type {?} */ asyncValidators = [];
        if (propertyValidators) {
            for (var _i = 0, propertyValidators_1 = propertyValidators; _i < propertyValidators_1.length; _i++) {
                var propertyValidator = propertyValidators_1[_i];
                if (propertyValidator.isAsync)
                    propertyValidator.config.forEach(function (t) { asyncValidators.push(t); });
            }
        }
        if (propValidationConfig && propValidationConfig[ASYNC]) {
            propValidationConfig[ASYNC].forEach(function (t) { asyncValidators.push(t); });
        }
        return asyncValidators;
    };
    /**
     * @param {?} property
     * @param {?} propertyValidators
     * @param {?} propValidationConfig
     * @param {?} instance
     * @param {?} entity
     * @return {?}
     */
    RxFormBuilder.prototype.addFormControl = function (property, propertyValidators, propValidationConfig, instance, entity) {
        var /** @type {?} */ validators = [];
        var /** @type {?} */ columns = [];
        if ((instance.conditionalValidationProps && instance.conditionalValidationProps[property.name]) || (this.conditionalValidationInstance.conditionalValidationProps && this.conditionalValidationInstance.conditionalValidationProps[property.name])) {
            var /** @type {?} */ props_1 = [];
            if ((instance.conditionalValidationProps && instance.conditionalValidationProps[property.name]))
                instance.conditionalValidationProps[property.name].forEach(function (t) { return props_1.push(t); });
            if (this.conditionalValidationInstance.conditionalValidationProps && this.conditionalValidationInstance.conditionalValidationProps[property.name])
                this.conditionalValidationInstance.conditionalValidationProps[property.name].forEach(function (t) { return props_1.push(t); });
            validators.push(conditionalChangeValidator(props_1));
        }
        if (this.conditionalObjectProps.length > 0 || this.builderConfigurationConditionalObjectProps.length > 0) {
            var /** @type {?} */ propConditions_1 = [];
            if (this.conditionalObjectProps)
                propConditions_1 = this.conditionalObjectProps.filter(function (t) { return t.propName == property.name; });
            if (this.builderConfigurationConditionalObjectProps)
                this.builderConfigurationConditionalObjectProps.filter(function (t) { return t.propName == property.name; }).forEach(function (t) { return propConditions_1.push(t); });
            propConditions_1.forEach(function (t) {
                if (t.referencePropName && columns.indexOf(t.referencePropName) == -1)
                    columns.push(t.referencePropName);
            });
            if (columns.length > 0)
                validators.push(conditionalChangeValidator(columns));
        }
        for (var _i = 0, propertyValidators_2 = propertyValidators; _i < propertyValidators_2.length; _i++) {
            var propertyValidator = propertyValidators_2[_i];
            if (!propertyValidator.isAsync)
                switch (propertyValidator.annotationType) {
                    case AnnotationTypes.rule:
                        validators.push(APP_VALIDATORS[propertyValidator.annotationType](propertyValidator.config, entity));
                        break;
                    case AnnotationTypes.and:
                    case AnnotationTypes.or:
                    case AnnotationTypes.not:
                        validators.push(LOGICAL_VALIDATORS[propertyValidator.annotationType](propertyValidator.config));
                        break;
                    default:
                        validators.push(APP_VALIDATORS[propertyValidator.annotationType](propertyValidator.config));
                        break;
                }
        }
        if (propValidationConfig)
            this.additionalValidation(validators, propValidationConfig);
        if (this.currentFormGroupPropOtherValidator[property.name])
            this.currentFormGroupPropOtherValidator[property.name].forEach(function (t) { validators.push(t); });
        return validators;
    };
    /**
     * @param {?} validations
     * @param {?} propValidationConfig
     * @return {?}
     */
    RxFormBuilder.prototype.additionalValidation = function (validations, propValidationConfig) {
        for (var /** @type {?} */ col in AnnotationTypes) {
            if (propValidationConfig[AnnotationTypes[col]] && col != "custom") {
                validations.push(APP_VALIDATORS[AnnotationTypes[col]](propValidationConfig[AnnotationTypes[col]]));
            }
            else if (col == AnnotationTypes.custom && propValidationConfig[AnnotationTypes[col]])
                validations.push(propValidationConfig[col]);
        }
    };
    /**
     * @template T
     * @param {?} object
     * @param {?} formBuilderConfiguration
     * @param {?} propertyName
     * @param {?=} isSameObjectConstructor
     * @return {?}
     */
    RxFormBuilder.prototype.getEntity = function (object, formBuilderConfiguration, propertyName, isSameObjectConstructor) {
        if (isSameObjectConstructor === void 0) {
            isSameObjectConstructor = false;
        }
        if (formBuilderConfiguration && formBuilderConfiguration.genericEntities && formBuilderConfiguration.genericEntities[propertyName])
            return formBuilderConfiguration.genericEntities[propertyName];
        return isSameObjectConstructor ? object.constructor : undefined;
    };
    /**
     * @param {?} object
     * @param {?} propertyInfo
     * @param {?} formBuilderConfiguration
     * @return {?}
     */
    RxFormBuilder.prototype.getObjectPropertyInstance = function (object, propertyInfo, formBuilderConfiguration) {
        if (propertyInfo.propertyType == OBJECT_PROPERTY && object[propertyInfo.name])
            return object[propertyInfo.name].constructor;
        else if (propertyInfo.propertyType == ARRAY_PROPERTY && object[propertyInfo.name] && object[propertyInfo.name].length > 0)
            return object[propertyInfo.name][0].constructor;
        return this.getEntity(object, formBuilderConfiguration, propertyInfo.name);
    };
    /**
     * @template T
     * @param {?} instanceContainer
     * @param {?} object
     * @param {?} formBuilderConfiguration
     * @return {?}
     */
    RxFormBuilder.prototype.checkObjectPropAdditionalValidation = function (instanceContainer, object, formBuilderConfiguration) {
        var _this = this;
        var /** @type {?} */ props = instanceContainer.properties.filter(function (t) { return t.propertyType == OBJECT_PROPERTY || t.propertyType == ARRAY_PROPERTY; });
        props.forEach(function (t) {
            var /** @type {?} */ entity = t.entity;
            if (!t.entity)
                entity = _this.getObjectPropertyInstance(object, t, formBuilderConfiguration);
            if (entity) {
                var /** @type {?} */ instance = _this.getInstanceContainer(entity, null);
                if (instance.conditionalValidationProps) {
                    for (var /** @type {?} */ key in instance.conditionalValidationProps) {
                        var /** @type {?} */ prop = instanceContainer.properties.filter(function (t) { return t.name == key; })[0];
                        if (prop) {
                            if (!instanceContainer.conditionalValidationProps)
                                instanceContainer.conditionalValidationProps = {};
                            if (!instanceContainer.conditionalValidationProps[key])
                                instanceContainer.conditionalValidationProps[key] = [];
                            instance.conditionalValidationProps[key].forEach(function (x) {
                                if (t.propertyType != ARRAY_PROPERTY)
                                    instanceContainer.conditionalValidationProps[key].push([t.name, x].join('.'));
                                else
                                    instanceContainer.conditionalValidationProps[key].push([t.name, x].join('[]'));
                            });
                        }
                    }
                }
            }
        });
    };
    /**
     * @param {?} model
     * @param {?=} entityObject
     * @param {?=} formBuilderConfiguration
     * @return {?}
     */
    RxFormBuilder.prototype.getObject = function (model, entityObject, formBuilderConfiguration) {
        var /** @type {?} */ json = {};
        if (typeof model == FUNCTION_STRING)
            json.model = model;
        if (typeof model == FUNCTION_STRING && (entityObject instanceof FormBuilderConfiguration)) {
            json.entityObject = this.createClassObject(json.model, entityObject);
        }
        if (entityObject && !(entityObject instanceof FormBuilderConfiguration))
            json.entityObject = entityObject;
        if (entityObject instanceof FormBuilderConfiguration && !formBuilderConfiguration)
            json.formBuilderConfiguration = entityObject;
        else if (!(entityObject instanceof FormBuilderConfiguration) && formBuilderConfiguration) {
            json.formBuilderConfiguration = formBuilderConfiguration;
            json.entityObject = this.createClassObject(json.model, json.formBuilderConfiguration, json.entityObject);
        }
        if (!entityObject) {
            if (typeof model == OBJECT_STRING)
                json.model = model.constructor;
            json.entityObject = this.createClassObject(json.model, json.formBuilderConfiguration, model);
        }
        else if (model && (entityObject instanceof FormBuilderConfiguration) && (typeof model == OBJECT_STRING)) {
            json[MODEL] = model.constructor;
            json[ENTITY_OBJECT] = this.createClassObject(json.model, json.formBuilderConfiguration, model);
        }
        return json;
    };
    /**
     * @param {?} groupObject
     * @param {?=} validatorConfig
     * @return {?}
     */
    RxFormBuilder.prototype.group = function (groupObject, validatorConfig) {
        var /** @type {?} */ modelInstance = _super.prototype.createInstance.call(this);
        var /** @type {?} */ entityObject = {};
        this.formGroupPropOtherValidator = {};
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.createValidatorFormGroup(groupObject, entityObject, modelInstance, validatorConfig);
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.isGroupCalled = true;
        var /** @type {?} */ formGroup = this.formGroup(modelInstance.constructor, entityObject, validatorConfig);
        this.isGroupCalled = false;
        this.formGroupPropOtherValidator = {};
        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator;
        this.formGroupPropOtherValidator = {};
        return formGroup;
    };
    /**
     * @param {?} propName
     * @param {?} validatorConfig
     * @param {?} modelInstance
     * @return {?}
     */
    RxFormBuilder.prototype.applyAllPropValidator = function (propName, validatorConfig, modelInstance) {
        var _this = this;
        if (validatorConfig && validatorConfig.applyAllProps) {
            if (!(validatorConfig.excludeProps && validatorConfig.excludeProps.length > 0 && validatorConfig.excludeProps.indexOf(propName) == -1)) {
                validatorConfig.applyAllProps.forEach(function (t) {
                    if (t.name == RX_WEB_VALIDATOR) {
                        t(propName, modelInstance);
                    }
                    else {
                        if (!_this.currentFormGroupPropOtherValidator[propName])
                            _this.currentFormGroupPropOtherValidator[propName] = [];
                        _this.currentFormGroupPropOtherValidator[propName].push(t);
                    }
                });
            }
        }
    };
    /**
     * @param {?} propName
     * @param {?} validatorConfig
     * @return {?}
     */
    RxFormBuilder.prototype.dynamicValidationPropCheck = function (propName, validatorConfig) {
        return (validatorConfig == undefined) ? true : (!validatorConfig.dynamicValidationConfigurationPropertyName) ? true : validatorConfig.dynamicValidationConfigurationPropertyName == propName ? false : true;
    };
    /**
     * @param {?} groupObject
     * @param {?} entityObject
     * @param {?} modelInstance
     * @param {?} validatorConfig
     * @return {?}
     */
    RxFormBuilder.prototype.createValidatorFormGroup = function (groupObject, entityObject, modelInstance, validatorConfig) {
        for (var /** @type {?} */ propName in groupObject) {
            var /** @type {?} */ prop = groupObject[propName];
            if (prop instanceof Array && prop.length > 0 && typeof prop[0] != OBJECT_STRING) {
                var /** @type {?} */ propValidators = (prop.length > 1 && prop[1] instanceof Array) ? prop[1] : (prop.length == 2) ? [prop[1]] : [];
                var /** @type {?} */ propertyAdded = false;
                for (var /** @type {?} */ i = 0; i < propValidators.length; i++) {
                    if (propValidators[i].name == RX_WEB_VALIDATOR) {
                        propValidators[i](propName, modelInstance);
                        propertyAdded = true;
                    }
                    else {
                        if (!this.currentFormGroupPropOtherValidator[propName])
                            this.currentFormGroupPropOtherValidator[propName] = [];
                        this.currentFormGroupPropOtherValidator[propName].push(propValidators[i]);
                    }
                }
                if (!propertyAdded)
                    defaultContainer.initPropertyObject(propName, PROPERTY, undefined, typeof modelInstance == OBJECT_STRING ? modelInstance : { constructor: modelInstance });
                this.applyAllPropValidator(propName, validatorConfig, modelInstance);
            }
            else if (typeof prop == STRING || typeof prop == NUMBER || typeof prop == BOOLEAN || prop instanceof Date) {
                defaultContainer.initPropertyObject(propName, PROPERTY, undefined, typeof modelInstance == OBJECT_STRING ? modelInstance : { constructor: modelInstance });
                this.applyAllPropValidator(propName, validatorConfig, modelInstance);
            }
            else if (prop instanceof Array) {
                if (prop instanceof FormArray) {
                    entityObject[propName] = prop;
                }
                else {
                    var /** @type {?} */ propModelInstance = _super.prototype.createInstance.call(this);
                    if (typeof modelInstance == "function")
                        modelInstance.constructor = modelInstance;
                    defaultContainer.initPropertyObject(propName, ARRAY_PROPERTY, propModelInstance.constructor, modelInstance);
                    entityObject[propName] = [];
                    for (var _i = 0, prop_2 = prop; _i < prop_2.length; _i++) {
                        var row = prop_2[_i];
                        var /** @type {?} */ jObject = {};
                        entityObject[propName].push(jObject);
                        this.createValidatorFormGroup(row, jObject, propModelInstance.constructor, validatorConfig);
                    }
                }
            }
            else if (typeof prop == OBJECT_STRING && !(prop instanceof FormControl || prop instanceof RxFormControl)) {
                var /** @type {?} */ formGroup = (prop instanceof FormArray) ? prop.controls[0] : prop;
                if (!formGroup.model && (prop instanceof FormGroup || prop instanceof RxFormGroup)) {
                    formGroup = this.group(formGroup.controls);
                }
                if (prop instanceof FormGroup || prop instanceof RxFormGroup) {
                    entityObject[propName] = prop;
                    defaultContainer.initPropertyObject(propName, OBJECT_PROPERTY, formGroup.model, modelInstance);
                }
                else if (prop instanceof FormArray) {
                    entityObject[propName] = prop;
                    defaultContainer.initPropertyObject(propName, ARRAY_PROPERTY, formGroup.model, modelInstance);
                }
                else {
                    if (this.dynamicValidationPropCheck(propName, validatorConfig)) {
                        this.formGroupPropOtherValidator[propName] = {};
                        this.currentFormGroupPropOtherValidator = this.formGroupPropOtherValidator[propName];
                        var /** @type {?} */ propModelInstance = _super.prototype.createInstance.call(this);
                        entityObject[propName] = {};
                        entityObject[propName].constructor = propModelInstance.constructor;
                        defaultContainer.initPropertyObject(propName, OBJECT_PROPERTY, entityObject[propName].constructor, modelInstance);
                        var /** @type {?} */ objectValidationConfig = this.getValidatorConfig(validatorConfig, groupObject, propName + ".");
                        this.createValidatorFormGroup(groupObject[propName], entityObject[propName], entityObject[propName].constructor, objectValidationConfig);
                    }
                    else
                        entityObject[propName] = groupObject[propName];
                }
            }
            if (typeof prop == STRING || typeof prop == NUMBER || typeof prop == BOOLEAN || prop instanceof Date) {
                entityObject[propName] = prop;
            }
            else if ((prop && prop.length > 0 && (typeof prop[0] != OBJECT_STRING) && !(prop instanceof FormControl || prop instanceof RxFormControl) && !(prop instanceof FormArray))) {
                entityObject[propName] = prop[0];
            }
            else if (prop instanceof FormArray) {
                entityObject[propName] = prop;
            }
            else if (prop instanceof FormControl || prop instanceof RxFormControl) {
                entityObject[propName] = prop;
                defaultContainer.initPropertyObject(propName, PROPERTY, undefined, modelInstance.constructor ? modelInstance : { constructor: modelInstance });
            }
        }
    };
    /**
     * @param {?} validatorConfig
     * @param {?} entityObject
     * @param {?} rootPropertyName
     * @param {?=} arrayPropertyName
     * @return {?}
     */
    RxFormBuilder.prototype.getValidatorConfig = function (validatorConfig, entityObject, rootPropertyName, arrayPropertyName) {
        var /** @type {?} */ validationProps = {};
        var /** @type {?} */ excludeProps = [];
        var /** @type {?} */ includeProps = [];
        var /** @type {?} */ ignoreUndefinedProps = [];
        if (validatorConfig) {
            for (var /** @type {?} */ propName in validatorConfig.dynamicValidation) {
                if (propName.indexOf(rootPropertyName) != -1 || (arrayPropertyName && propName.indexOf(arrayPropertyName) != -1)) {
                    var /** @type {?} */ splitProp = propName.split(".")[1];
                    if (splitProp)
                        validationProps[splitProp] = validatorConfig.dynamicValidation[propName];
                }
            }
            if (validatorConfig.excludeProps)
                excludeProps = this.getProps(validatorConfig.excludeProps, rootPropertyName);
            if (validatorConfig.includeProps)
                includeProps = this.getProps(validatorConfig.includeProps, rootPropertyName);
            if (validatorConfig.ignoreUndefinedProps)
                ignoreUndefinedProps = this.getProps(validatorConfig.ignoreUndefinedProps, rootPropertyName, true);
            return { ignoreUndefinedProps: ignoreUndefinedProps, includeProps: includeProps, dynamicValidation: (validatorConfig.dynamicValidationConfigurationPropertyName && entityObject[validatorConfig.dynamicValidationConfigurationPropertyName]) ? entityObject[validatorConfig.dynamicValidationConfigurationPropertyName] : validationProps, excludeProps: excludeProps };
        }
        return {};
    };
    /**
     * @param {?} properties
     * @param {?} rootPropertyName
     * @param {?=} isIgnoreProp
     * @return {?}
     */
    RxFormBuilder.prototype.getProps = function (properties, rootPropertyName, isIgnoreProp) {
        if (isIgnoreProp === void 0) {
            isIgnoreProp = false;
        }
        var /** @type {?} */ props = [];
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var prop_3 = properties_2[_i];
            if (prop_3.indexOf(rootPropertyName) != -1) {
                var /** @type {?} */ splitProps = prop_3.split(".");
                if (splitProps.length == 2) {
                    props.push(splitProps[1]);
                }
                else if (splitProps.length > 2) {
                    splitProps.splice(0, 1);
                    props.push(splitProps.join("."));
                }
            }
        }
        if (isIgnoreProp && properties.filter(function (x) { return x == rootPropertyName.replace('.', ''); }).length == 1)
            props.push(':self:');
        return props;
    };
    /**
     * @template T
     * @param {?} model
     * @param {?=} entityObject
     * @param {?=} formBuilderConfiguration
     * @return {?}
     */
    RxFormBuilder.prototype.formGroup = function (model, entityObject, formBuilderConfiguration) {
        var _this = this;
        var /** @type {?} */ json = this.getObject(model, entityObject, formBuilderConfiguration);
        model = json.model;
        entityObject = json.entityObject;
        if (entityObject.constructor != model && !this.isGroupCalled) {
            entityObject = json.entityObject = this.updateObject(model, json.entityObject, formBuilderConfiguration);
        }
        formBuilderConfiguration = json.formBuilderConfiguration;
        if (formBuilderConfiguration)
            this.extractExpressions(formBuilderConfiguration);
        var /** @type {?} */ instanceContainer = this.getInstanceContainer(model, entityObject);
        this.checkObjectPropAdditionalValidation(instanceContainer, entityObject, formBuilderConfiguration);
        var /** @type {?} */ formGroupObject = {};
        var /** @type {?} */ additionalValidations = {};
        instanceContainer.properties.forEach(function (property) {
            var /** @type {?} */ isIncludeProp = true;
            if (formBuilderConfiguration) {
                if (formBuilderConfiguration.excludeProps && formBuilderConfiguration.excludeProps.length > 0)
                    isIncludeProp = formBuilderConfiguration.excludeProps.indexOf(property.name) == -1;
                if (formBuilderConfiguration.dynamicValidation)
                    additionalValidations = formBuilderConfiguration.dynamicValidation;
                if (formBuilderConfiguration.includeProps && formBuilderConfiguration.includeProps.length > 0)
                    isIncludeProp = formBuilderConfiguration.includeProps.indexOf(property.name) != -1;
                if (formBuilderConfiguration.ignoreUndefinedProps && formBuilderConfiguration.ignoreUndefinedProps.length > 0) {
                    isIncludeProp = !(property.propertyType == PROPERTY && !RegexValidator.isNotBlank(json.entityObject[property.name]) && (formBuilderConfiguration.ignoreUndefinedProps.indexOf(property.name) !== -1 || formBuilderConfiguration.ignoreUndefinedProps.indexOf(":self:") !== -1));
                }
            }
            if (property.ignore)
                isIncludeProp = !property.ignore.call(json.entityObject, json.entityObject);
            if (isIncludeProp) {
                switch (property.propertyType) {
                    case PROPERTY:
                        if (!(entityObject[property.name] instanceof FormControl || entityObject[property.name] instanceof RxFormControl)) {
                            var /** @type {?} */ propertyValidators = instanceContainer.propertyAnnotations.filter(function (t) { return t.propertyName == property.name; });
                            formGroupObject[property.name] = new RxFormControl(_super.prototype.sanitizeValue.call(_this, instanceContainer, property.name, _super.prototype.getDefaultValue.call(_this, property, entityObject[property.name], formBuilderConfiguration), json.entityObject, Object.assign({}, json.entityObject)), _this.addFormControl(property, propertyValidators, additionalValidations[property.name], instanceContainer, entityObject), _this.addAsyncValidation(property, propertyValidators, additionalValidations[property.name]), json.entityObject, Object.assign({}, json.entityObject), property.name, instanceContainer.sanitizers[property.name]);
                            _this.isNested = false;
                        }
                        else
                            formGroupObject[property.name] = _super.prototype.getDefaultValue.call(_this, property, entityObject[property.name], formBuilderConfiguration);
                        break;
                    case OBJECT_PROPERTY:
                        var /** @type {?} */ objectValue = entityObject[property.name];
                        if (objectValue && objectValue instanceof Object && !(objectValue instanceof FormGroup || objectValue instanceof RxFormGroup)) {
                            _this.isNestedBinding = _this.isNested = true;
                            if (instanceContainer && instanceContainer.conditionalObjectProps)
                                _this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(function (t) { return t.objectPropName == property.name; });
                            if (_this.conditionalValidationInstance && _this.conditionalValidationInstance.conditionalObjectProps)
                                _this.builderConfigurationConditionalObjectProps = _this.conditionalValidationInstance.conditionalObjectProps.filter(function (t) { return t.objectPropName == property.name; });
                            if (_this.formGroupPropOtherValidator[property.name])
                                _this.currentFormGroupPropOtherValidator = _this.formGroupPropOtherValidator[property.name];
                            var /** @type {?} */ objectValidationConfig = _this.getValidatorConfig(formBuilderConfiguration, objectValue, property.name + ".");
                            var /** @type {?} */ entity = property.entityProvider ? property.entityProvider.call(entityObject) : undefined;
                            formGroupObject[property.name] = _this.formGroup(entity || property.entity || _this.getEntity(objectValue, formBuilderConfiguration, property.name, true), objectValue, objectValidationConfig);
                            _this.conditionalObjectProps = [];
                            _this.builderConfigurationConditionalObjectProps = [];
                            _this.isNestedBinding = _this.isNested = false;
                        }
                        else if (objectValue instanceof FormGroup || objectValue instanceof RxFormGroup)
                            formGroupObject[property.name] = objectValue;
                        break;
                    case ARRAY_PROPERTY:
                        var /** @type {?} */ arrayObjectValue = entityObject[property.name];
                        if (arrayObjectValue && arrayObjectValue instanceof Array && !(arrayObjectValue instanceof FormArray)) {
                            _this.isNestedBinding = _this.isNested = true;
                            var /** @type {?} */ formArrayGroup = [];
                            var /** @type {?} */ index_1 = 0;
                            var /** @type {?} */ entity = property.entityProvider ? property.entityProvider.call(entityObject) : undefined;
                            for (var _i = 0, arrayObjectValue_2 = arrayObjectValue; _i < arrayObjectValue_2.length; _i++) {
                                var subObject = arrayObjectValue_2[_i];
                                if (instanceContainer && instanceContainer.conditionalObjectProps)
                                    _this.conditionalObjectProps = instanceContainer.conditionalObjectProps.filter(function (t) { return t.objectPropName == property.name && t.arrayIndex == index_1; });
                                if (_this.conditionalValidationInstance && _this.conditionalValidationInstance.conditionalObjectProps)
                                    _this.builderConfigurationConditionalObjectProps = _this.conditionalValidationInstance.conditionalObjectProps.filter(function (t) { return t.objectPropName == property.name && t.arrayIndex == index_1; });
                                if (_this.formGroupPropOtherValidator[property.name])
                                    _this.currentFormGroupPropOtherValidator = _this.formGroupPropOtherValidator[property.name];
                                var /** @type {?} */ objectValidationConfig = _this.getValidatorConfig(formBuilderConfiguration, subObject, property.name + ".", property.name + "[" + index_1 + "].");
                                formArrayGroup.push(_this.formGroup(entity || property.entity || _this.getEntity(subObject, formBuilderConfiguration, property.name, true), subObject, objectValidationConfig));
                                index_1++;
                                _this.conditionalObjectProps = [];
                                _this.builderConfigurationConditionalObjectProps = [];
                            }
                            formGroupObject[property.name] = new RxFormArray(arrayObjectValue, formArrayGroup);
                            _this.isNestedBinding = _this.isNested = false;
                        }
                        else if (arrayObjectValue instanceof FormArray)
                            formGroupObject[property.name] = arrayObjectValue;
                        break;
                }
            }
        });
        if (!this.isNested) {
            this.conditionalValidationInstance = {};
            this.builderConfigurationConditionalObjectProps = [];
        }
        var /** @type {?} */ formGroup = new RxFormGroup(json.model, json.entityObject, formGroupObject, undefined);
        if (!this.isNestedBinding && !this.isGroupCalled)
            formGroup.refreshDisable();
        return formGroup;
    };
    return RxFormBuilder;
}(BaseFormBuilder));
RxFormBuilder.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
RxFormBuilder.ctorParameters = function () { return []; };
/**
 * @abstract
 */
var BaseDirective = /** @class */ (function () {
    function BaseDirective() {
    }
    /**
     * @param {?} controls
     * @param {?=} model
     * @return {?}
     */
    BaseDirective.prototype.applyValidations = function (controls, model) {
        var _this = this;
        if (model === void 0) {
            model = null;
        }
        if (this.model) {
            var /** @type {?} */ modelConfig_1 = defaultContainer.get(model || this.model.constructor);
            if (modelConfig_1) {
                modelConfig_1.properties.forEach(function (property) {
                    if (controls[property.name]) {
                        switch (property.propertyType) {
                            case PROPERTY:
                                _this.setValidatorConfig(controls[property.name], modelConfig_1, property);
                                break;
                            case OBJECT_PROPERTY:
                                _this.applyValidations(controls[property.name].controls, property.entity);
                                break;
                        }
                    }
                });
            }
        }
    };
    /**
     * @param {?} control
     * @param {?} modelConfig
     * @param {?} property
     * @return {?}
     */
    BaseDirective.prototype.setValidatorConfig = function (control, modelConfig, property) {
        var /** @type {?} */ annotations = modelConfig.propertyAnnotations.filter(function (t) { return t.propertyName == property.name; });
        annotations.forEach(function (annotation) {
            if (!control[TEMPLATE_VALIDATION_CONFIG])
                control[TEMPLATE_VALIDATION_CONFIG] = {};
            ApplicationUtil.configureControl(control, annotation.config ? annotation.config : "", annotation.annotationType);
        });
    };
    return BaseDirective;
}());
BaseDirective.propDecorators = {
    'model': [{ type: Input },],
};
var RxwebFormDirective = /** @class */ (function (_super) {
    __extends(RxwebFormDirective, _super);
    function RxwebFormDirective() {
        var _this = _super.apply(this, arguments) || this;
        _this.clearTimeoutNumber = 0;
        _this.validationRule = {};
        return _this;
    }
    /**
     * @return {?}
     */
    RxwebFormDirective.prototype.ngAfterContentInit = function () {
        if (this.formGroup && !this.formGroup[MODEL] && this.formGroup.parent == null) {
            this.expressionProcessor(this.formGroup.controls);
            this.setConditionalValidator(this.formGroup.controls);
        }
        else if (this.ngForm) {
            this.configureModelValidations();
        }
    };
    /**
     * @return {?}
     */
    RxwebFormDirective.prototype.configureModelValidations = function () {
        var _this = this;
        this.clearTimeoutNumber = setTimeout(function () {
            clearTimeout(_this.clearTimeoutNumber);
            _this.applyValidations(_this.ngForm.form.controls);
            _this.expressionProcessor(_this.ngForm.form.controls);
            _this.setConditionalValidator(_this.ngForm.form.controls);
            _this.updateValueAndValidity(_this.ngForm.form.controls);
        }, 500);
    };
    /**
     * @param {?} controls
     * @return {?}
     */
    RxwebFormDirective.prototype.updateValueAndValidity = function (controls) {
        var _this = this;
        Object.keys(controls).forEach(function (key) {
            if (controls[key] instanceof FormGroup)
                _this.updateValueAndValidity(controls[key].controls);
            else if (controls[key] instanceof FormArray)
                _this.updateValueAndValidity(controls[key].controls);
            else
                controls[key].updateValueAndValidity();
        });
    };
    /**
     * @param {?} controls
     * @param {?=} rootFieldName
     * @return {?}
     */
    RxwebFormDirective.prototype.expressionProcessor = function (controls, rootFieldName) {
        var _this = this;
        if (rootFieldName === void 0) {
            rootFieldName = "";
        }
        Object.keys(controls).forEach(function (fieldName) {
            var /** @type {?} */ formControl = controls[fieldName];
            if (formControl.validatorConfig) {
                Object.keys(AnnotationTypes).forEach(function (validatorName) {
                    if (formControl.validatorConfig[validatorName] && formControl.validatorConfig[validatorName].conditionalExpression) {
                        var /** @type {?} */ columns = Linq.expressionColumns(formControl.validatorConfig[validatorName].conditionalExpression);
                        defaultContainer.addChangeValidation(_this.validationRule, rootFieldName + fieldName, columns);
                    }
                    if (formControl.validatorConfig[validatorName] && formControl.validatorConfig[validatorName].dynamicConfig) {
                        var /** @type {?} */ columns = Linq.dynamicConfigParser(formControl.validatorConfig[validatorName].dynamicConfig, fieldName);
                        defaultContainer.addChangeValidation(_this.validationRule, rootFieldName + fieldName, columns);
                    }
                    if (formControl.validatorConfig[validatorName] && (validatorName == AnnotationTypes.and || validatorName == AnnotationTypes.or || validatorName == AnnotationTypes.not)) {
                        Object.keys(formControl.validatorConfig[validatorName].validation).forEach(function (t) {
                            if (typeof formControl.validatorConfig[validatorName].validation[t] !== "boolean")
                                defaultContainer.setLogicalConditional(_this.validationRule, t, formControl.validatorConfig[validatorName].validation[t].fieldName, fieldName);
                        });
                    }
                    else if (formControl.validatorConfig[validatorName] && ((validatorName == AnnotationTypes.compare || validatorName == AnnotationTypes.greaterThan || validatorName == AnnotationTypes.greaterThanEqualTo || validatorName == AnnotationTypes.lessThan || validatorName == AnnotationTypes.lessThanEqualTo || validatorName == AnnotationTypes.different || validatorName == AnnotationTypes.factor || validatorName == AnnotationTypes.minTime || validatorName == AnnotationTypes.maxTime) || (validatorName == AnnotationTypes.creditCard && formControl.validatorConfig[validatorName].fieldName) || ((validatorName == AnnotationTypes.minDate || validatorName == AnnotationTypes.maxDate) && formControl.validatorConfig[validatorName].fieldName))) {
                        defaultContainer.setConditionalValueProp(_this.validationRule, formControl.validatorConfig[validatorName].fieldName, fieldName);
                    }
                });
            }
            else if (formControl instanceof FormGroup) {
                _this.expressionProcessor(formControl.controls, fieldName + ".");
            }
            else if (formControl instanceof FormArray) {
                if (formControl.controls)
                    formControl.controls.forEach(function (t, i) {
                        if (t.controls)
                            _this.expressionProcessor(t.controls, fieldName + "[]");
                    });
            }
        });
    };
    /**
     * @param {?} controls
     * @return {?}
     */
    RxwebFormDirective.prototype.setConditionalValidator = function (controls) {
        var _this = this;
        Object.keys(controls).forEach(function (fieldName) {
            if (_this.validationRule.conditionalValidationProps && _this.validationRule.conditionalValidationProps[fieldName]) {
                controls[fieldName][CONDITIONAL_VALIDATOR] = conditionalChangeValidator(_this.validationRule.conditionalValidationProps[fieldName]);
            }
        });
    };
    /**
     * @return {?}
     */
    RxwebFormDirective.prototype.ngOnDestroy = function () {
    };
    return RxwebFormDirective;
}(BaseDirective));
RxwebFormDirective.decorators = [
    { type: Directive, args: [{
                selector: '[formGroup],[rxwebForm]',
            },] },
];
/**
 * @nocollapse
 */
RxwebFormDirective.ctorParameters = function () { return []; };
RxwebFormDirective.propDecorators = {
    'formGroup': [{ type: Input },],
    'ngForm': [{ type: Input, args: ['rxwebForm',] },],
};
var DecimalProvider = /** @class */ (function () {
    /**
     * @param {?} decimalPipe
     * @param {?} localeId
     */
    function DecimalProvider(decimalPipe, localeId) {
        this.decimalPipe = decimalPipe;
        this.localeId = localeId;
        this.decimalSeperator = ".";
        this.groupSeperator = ",";
        this.isSetConfig = false;
        this.decimalSeperator = getLocaleNumberSymbol(localeId, NumberSymbol.Decimal);
        this.groupSeperator = getLocaleNumberSymbol(localeId, NumberSymbol.Group);
        this.setSymbolInConfig();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DecimalProvider.prototype.replacer = function (value) {
        value = String(value);
        if (!this.isSetConfig)
            this.bindConfig();
        value = value.split(this.groupSeperator).join(BLANK);
        if (this.allowDecimalSymbol)
            value = value.replace(this.decimalSeperator, this.allowDecimalSymbol);
        var /** @type {?} */ splitValue = value.split(this.decimalSeperator);
        value = (splitValue.length > 1 && splitValue[1] && RegexValidator.isZero(splitValue[1])) ? splitValue[0] : value;
        return value;
    };
    /**
     * @param {?} value
     * @param {?} digitsInfo
     * @return {?}
     */
    DecimalProvider.prototype.transFormDecimal = function (value, digitsInfo) {
        value = String(value);
        return this.decimalPipe.transform(value.replace(this.decimalSeperator, "."), digitsInfo, this.localeId);
    };
    /**
     * @return {?}
     */
    DecimalProvider.prototype.setSymbolInConfig = function () {
        ReactiveFormConfig.number = { decimalSymbol: this.decimalSeperator, groupSymbol: this.groupSeperator };
    };
    /**
     * @return {?}
     */
    DecimalProvider.prototype.bindConfig = function () {
        if (ReactiveFormConfig.json) {
            if (ReactiveFormConfig.json.localeId)
                this.localeId = ReactiveFormConfig.json.localeId;
            if (ReactiveFormConfig.json.allowDecimalSymbol)
                this.allowDecimalSymbol = ReactiveFormConfig.json.allowDecimalSymbol;
        }
        this.isSetConfig = true;
    };
    return DecimalProvider;
}());
DecimalProvider.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
DecimalProvider.ctorParameters = function () {
    return [
        { type: DecimalPipe, },
        { type: undefined, decorators: [{ type: Inject, args: [LOCALE_ID,] },] },
    ];
};
var HtmlControlTemplateDirective = /** @class */ (function () {
    /**
     * @param {?} templateRef
     */
    function HtmlControlTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    return HtmlControlTemplateDirective;
}());
HtmlControlTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[htmlControlTemplate]'
            },] },
];
/**
 * @nocollapse
 */
HtmlControlTemplateDirective.ctorParameters = function () {
    return [
        { type: TemplateRef, },
    ];
};
HtmlControlTemplateDirective.propDecorators = {
    'type': [{ type: Input, args: ['htmlControlTemplate',] },],
};
var ControlHostDirective = /** @class */ (function () {
    /**
     * @param {?} viewContainerRef
     */
    function ControlHostDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(ControlHostDirective.prototype, "portal", {
        /**
         * @param {?} context
         * @return {?}
         */
        set: function (context) {
            if (context.templateRef) {
                if (this.view) {
                    this.view.destroy();
                    this.view = undefined;
                }
                this.view = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ControlHostDirective.prototype.ngOnDestroy = function () {
        if (this.view)
            this.view.destroy();
        if (this.viewContainerRef)
            this.viewContainerRef.clear();
    };
    return ControlHostDirective;
}());
ControlHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[controlHost]'
            },] },
];
/**
 * @nocollapse
 */
ControlHostDirective.ctorParameters = function () {
    return [
        { type: ViewContainerRef, },
    ];
};
ControlHostDirective.propDecorators = {
    'portal': [{ type: Input, args: ['controlHost',] },],
};
/**
 * @abstract
 */
var ControlExpressionProcess = /** @class */ (function () {
    function ControlExpressionProcess() {
        this.controlConfig = {};
        this.isProcessed = false;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    ControlExpressionProcess.prototype.setModelConfig = function (control) {
        this.isProcessed = true;
        if (this.controlConfig && this.controlConfig.validatorConfig) {
            control[VALIDATOR_CONFIG] = this.controlConfig.validatorConfig;
            this.controlConfig = undefined;
        }
    };
    return ControlExpressionProcess;
}());
ControlExpressionProcess.propDecorators = {
    'name': [{ type: Input },],
    'formControlName': [{ type: Input },],
};
var BaseValidator = /** @class */ (function (_super) {
    __extends(BaseValidator, _super);
    function BaseValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    BaseValidator.prototype.validation = function (control) {
        var /** @type {?} */ result = null;
        for (var _i = 0, _a = this.validators; _i < _a.length; _i++) {
            var validator = _a[_i];
            result = validator(control);
            if (result)
                break;
        }
        return result;
    };
    /**
     * @return {?}
     */
    BaseValidator.prototype.setEventName = function () {
        var /** @type {?} */ eventName = '';
        switch (this.element.tagName) {
            case INPUT:
            case TEXTAREA:
                eventName = (this.element.type == CHECKBOX || this.element.type == RADIO || this.element.type == FILE) ? CHANGE : INPUT;
                break;
            case SELECT:
                eventName = CHANGE;
                break;
        }
        this.eventName = eventName.toLowerCase();
    };
    return BaseValidator;
}(ControlExpressionProcess));
BaseValidator.propDecorators = {
    'formControl': [{ type: Input },],
};
var NGMODEL_BINDING = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return RxFormControlDirective; }),
    multi: true
};
var ALLOW_VALIDATOR_WITHOUT_CONFIG = ['required', 'notEmpty', 'alpha', 'alphaNumeric', 'ascii', 'dataUri', 'digit', 'email', 'even', 'hexColor', 'json', 'latitude', 'latLong', 'leapYear', 'longitude', 'lowerCase', 'mac', 'odd', 'port', 'primeNumber', 'time', 'upperCase', 'url', 'unique', 'cusip', 'gird'];
var NUMERIC = "numeric";
var IS_FORMAT = "isFormat";
var RxFormControlDirective = /** @class */ (function (_super) {
    __extends(RxFormControlDirective, _super);
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} decimalProvider
     */
    function RxFormControlDirective(elementRef, renderer, decimalProvider) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.renderer = renderer;
        _this.decimalProvider = decimalProvider;
        _this.eventListeners = [];
        _this.isNumericSubscribed = false;
        _this.isFocusCalled = false;
        _this.element = elementRef.nativeElement;
        _this.setEventName();
        return _this;
    }
    Object.defineProperty(RxFormControlDirective.prototype, "validationControls", {
        /**
         * @return {?}
         */
        get: function () {
            return this.controls;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.controls = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RxFormControlDirective.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ validators = [];
        Object.keys(APP_VALIDATORS).forEach(function (validatorName) {
            if ((_this[validatorName]) || (ALLOW_VALIDATOR_WITHOUT_CONFIG.indexOf(validatorName) != -1 && _this[validatorName] == BLANK)) {
                validators.push(APP_VALIDATORS[validatorName](_this[validatorName]));
                if (_this.name && !(_this.formControlName && _this.formControl)) {
                    ApplicationUtil.configureControl(_this.controlConfig, _this[validatorName], validatorName);
                }
            }
        });
        if (validators.length > 0)
            this.validators = validators;
        if (this.numeric && this.numeric.isFormat)
            this.bindNumericElementEvent();
    };
    /**
     * @return {?}
     */
    RxFormControlDirective.prototype.blurEvent = function () {
        if (!(this.formControl && this.formControl.errors && this.formControl.errors.numeric)) {
            var /** @type {?} */ value = this.decimalProvider.transFormDecimal(this.formControl.value, this.numeric.digitsInfo);
            this.setValueOnElement(value);
            this.isFocusCalled = false;
        }
    };
    /**
     * @param {?=} config
     * @return {?}
     */
    RxFormControlDirective.prototype.bindNumericElementEvent = function (config) {
        var _this = this;
        if (config)
            this.numeric = config;
        var /** @type {?} */ listener = this.renderer.listen(this.element, BLUR, this.blurEvent.bind(this));
        this.eventListeners.push(listener);
        listener = this.renderer.listen(this.element, FOCUS, function (event) {
            if (!(_this.formControl && _this.formControl.errors && _this.formControl.errors.numeric) && _this.formControl.value != null) {
                var /** @type {?} */ value = _this.decimalProvider.replacer(_this.element.value);
                _this.setValueOnElement(value);
                _this.isFocusCalled = true;
            }
        });
        this.eventListeners.push(listener);
    };
    /**
     * @return {?}
     */
    RxFormControlDirective.prototype.bindValueChangeEvent = function () {
        var _this = this;
        if (this.eventName != BLANK) {
            var /** @type {?} */ listener = this.renderer.listen(this.element, this.eventName, function () {
                Object.keys(_this.validationControls).forEach(function (fieldName) {
                    _this.validationControls[fieldName].updateValueAndValidity();
                });
            });
            this.eventListeners.push(listener);
        }
    };
    /**
     * @return {?}
     */
    RxFormControlDirective.prototype.subscribeNumericFormatter = function () {
        if (this.formControl[VALIDATOR_CONFIG] && this.formControl[VALIDATOR_CONFIG][NUMERIC] && this.formControl[VALIDATOR_CONFIG][NUMERIC][IS_FORMAT]) {
            if (!this.isNumericSubscribed) {
                this.bindNumericElementEvent(this.formControl[VALIDATOR_CONFIG][NUMERIC]);
                this.isNumericSubscribed = true;
            }
            if (!this.isFocusCalled && RegexValidator.isNotBlank(this.formControl.value)) {
                this.blurEvent();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    RxFormControlDirective.prototype.setValueOnElement = function (value) {
        this.renderer.setElementProperty(this.element, ELEMENT_VALUE, value);
    };
    /**
     * @param {?} control
     * @return {?}
     */
    RxFormControlDirective.prototype.setTemplateValidators = function (control) {
        for (var /** @type {?} */ validatorName in control[VALIDATOR_CONFIG]) {
            this[validatorName] = control[VALIDATOR_CONFIG][validatorName];
        }
        delete control[TEMPLATE_VALIDATION_CONFIG];
        delete control[VALIDATOR_CONFIG];
        this.ngOnInit();
    };
    /**
     * @param {?} element
     * @return {?}
     */
    RxFormControlDirective.prototype.updateOnElementClass = function (element) {
        var /** @type {?} */ previousClassName = '';
        return function (className) {
            if (previousClassName)
                element.classList.remove(previousClassName);
            if (className)
                element.classList.add(className);
            previousClassName = className;
        };
    };
    /**
     * @param {?} control
     * @return {?}
     */
    RxFormControlDirective.prototype.setValidatorConfig = function (control) {
        if (!this.formControl) {
            this.formControl = control;
            var /** @type {?} */ rxFormControl = /** @type {?} */ (this.formControl);
            if (rxFormControl.updateOnElementClass)
                rxFormControl.updateOnElementClass = this.updateOnElementClass(this.element);
        }
        this.subscribeNumericFormatter();
        if (control[TEMPLATE_VALIDATION_CONFIG])
            this.setTemplateValidators(control);
        if (control[CONDITIONAL_VALIDATOR]) {
            this.conditionalValidator = control[CONDITIONAL_VALIDATOR];
            delete control[CONDITIONAL_VALIDATOR];
        }
    };
    /**
     * @param {?} control
     * @return {?}
     */
    RxFormControlDirective.prototype.validate = function (control) {
        this.setValidatorConfig(control);
        if (this.conditionalValidator)
            this.conditionalValidator(control);
        if (!this.isProcessed)
            this.setModelConfig(control);
        return this.validators && this.validators.length > 0 ? this.validation(control) : null;
    };
    /**
     * @return {?}
     */
    RxFormControlDirective.prototype.ngOnDestroy = function () {
        this.controls = undefined;
        var /** @type {?} */ eventCount = this.eventListeners.length;
        for (var /** @type {?} */ i = 0; i < eventCount; i++) {
            this.eventListeners[0]();
            this.eventListeners.splice(0, 1);
        }
        this.eventListeners = [];
    };
    return RxFormControlDirective;
}(BaseValidator));
RxFormControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngModel],[formControlName],[formControl]',
                providers: [NGMODEL_BINDING],
            },] },
];
/**
 * @nocollapse
 */
RxFormControlDirective.ctorParameters = function () {
    return [
        { type: ElementRef, },
        { type: Renderer, },
        { type: DecimalProvider, },
    ];
};
RxFormControlDirective.propDecorators = {
    'allOf': [{ type: Input },],
    'alpha': [{ type: Input },],
    'alphaNumeric': [{ type: Input },],
    'ascii': [{ type: Input },],
    'choice': [{ type: Input },],
    'compare': [{ type: Input },],
    'compose': [{ type: Input },],
    'contains': [{ type: Input },],
    'creditCard': [{ type: Input },],
    'dataUri': [{ type: Input },],
    'different': [{ type: Input },],
    'digit': [{ type: Input },],
    'email': [{ type: Input },],
    'endsWith': [{ type: Input },],
    'even': [{ type: Input },],
    'extension': [{ type: Input },],
    'factor': [{ type: Input },],
    'fileSize': [{ type: Input },],
    'greaterThanEqualTo': [{ type: Input },],
    'greaterThan': [{ type: Input },],
    'hexColor': [{ type: Input },],
    'json': [{ type: Input },],
    'latitude': [{ type: Input },],
    'latLong': [{ type: Input },],
    'leapYear': [{ type: Input },],
    'lessThan': [{ type: Input },],
    'lessThanEqualTo': [{ type: Input },],
    'longitude': [{ type: Input },],
    'lowerCase': [{ type: Input },],
    'mac': [{ type: Input },],
    'maxDate': [{ type: Input },],
    'maxLength': [{ type: Input },],
    'maxNumber': [{ type: Input },],
    'minDate': [{ type: Input },],
    'minLength': [{ type: Input },],
    'minNumber': [{ type: Input },],
    'noneOf': [{ type: Input },],
    'numeric': [{ type: Input },],
    'odd': [{ type: Input },],
    'oneOf': [{ type: Input },],
    'password': [{ type: Input },],
    'port': [{ type: Input },],
    'primeNumber': [{ type: Input },],
    'required': [{ type: Input },],
    'range': [{ type: Input },],
    'rule': [{ type: Input },],
    'startsWith': [{ type: Input },],
    'time': [{ type: Input },],
    'upperCase': [{ type: Input },],
    'url': [{ type: Input },],
    'unique': [{ type: Input },],
    'notEmpty': [{ type: Input },],
    'cusip': [{ type: Input },],
    'grid': [{ type: Input },],
    'date': [{ type: Input },],
};
var VALIDATOR_CONFIG$1 = "validatorConfig";
var FILE_VALIDATOR_NAMES = ["extension", "fileSize", "file"];
var FileControlDirective = /** @class */ (function () {
    /**
     * @param {?} elementRef
     */
    function FileControlDirective(elementRef) {
        this.elementRef = elementRef;
        this.isProcessed = false;
        this.validators = [];
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.element = elementRef.nativeElement;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    FileControlDirective.prototype.onChangeCall = function (element) {
        var /** @type {?} */ files = element.files;
        if (this.writeFile)
            this.onChange(files);
        else {
            if (files.length > 0)
                this.onChange(element.value);
            else
                this.onChange(undefined);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileControlDirective.prototype.writeValue = function (value) { };
    /**
     * @param {?} invocation
     * @return {?}
     */
    FileControlDirective.prototype.registerOnChange = function (invocation) { this.onChange = invocation; };
    /**
     * @param {?} invocation
     * @return {?}
     */
    FileControlDirective.prototype.registerOnTouched = function (invocation) { this.onTouched = invocation; };
    Object.defineProperty(FileControlDirective.prototype, "extension", {
        /**
         * @param {?} config
         * @return {?}
         */
        set: function (config) {
            this.pushValidator(FILE_VALIDATOR_NAMES[0], config);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileControlDirective.prototype, "fileSize", {
        /**
         * @param {?} config
         * @return {?}
         */
        set: function (config) {
            this.pushValidator(FILE_VALIDATOR_NAMES[1], config);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileControlDirective.prototype, "file", {
        /**
         * @param {?} config
         * @return {?}
         */
        set: function (config) {
            this.pushValidator(FILE_VALIDATOR_NAMES[2], config);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} control
     * @return {?}
     */
    FileControlDirective.prototype.setConfig = function (control) {
        var _this = this;
        FILE_VALIDATOR_NAMES.forEach(function (t) {
            if (!_this[t] && control[VALIDATOR_CONFIG$1] && control[VALIDATOR_CONFIG$1][t])
                _this[t] = control[VALIDATOR_CONFIG$1][t];
        });
        this.isProcessed = true;
    };
    /**
     * @param {?} validatorName
     * @param {?} config
     * @return {?}
     */
    FileControlDirective.prototype.pushValidator = function (validatorName, config) {
        if (config)
            this.validators.push(APP_VALIDATORS[validatorName](config));
    };
    /**
     * @param {?} control
     * @return {?}
     */
    FileControlDirective.prototype.validate = function (control) {
        if (!this.isProcessed)
            this.setConfig(control);
        var /** @type {?} */ result = null;
        for (var _i = 0, _a = this.validators; _i < _a.length; _i++) {
            var validator = _a[_i];
            result = validator(control, this.element.files);
            if (result)
                break;
        }
        return result;
    };
    return FileControlDirective;
}());
FileControlDirective.decorators = [
    { type: Directive, args: [{
                selector: "input[type=file]",
                host: {
                    "(change)": "onChangeCall($event.target)",
                    "(blur)": "onTouched()"
                },
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: FileControlDirective, multi: true }, {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(function () { return FileControlDirective; }),
                        multi: true
                    }]
            },] },
];
/**
 * @nocollapse
 */
FileControlDirective.ctorParameters = function () {
    return [
        { type: ElementRef, },
    ];
};
FileControlDirective.propDecorators = {
    'writeFile': [{ type: Input },],
    'extension': [{ type: Input },],
    'fileSize': [{ type: Input },],
    'file': [{ type: Input },],
};
var VALIDATOR_CONFIG$2 = "validatorConfig";
var ImageFileControlDirective = /** @class */ (function () {
    /**
     * @param {?} elementRef
     */
    function ImageFileControlDirective(elementRef) {
        this.elementRef = elementRef;
        this.isProcessed = false;
        this.element = elementRef.nativeElement;
    }
    Object.defineProperty(ImageFileControlDirective.prototype, "image", {
        /**
         * @param {?} config
         * @return {?}
         */
        set: function (config) {
            this.imageValidation = APP_VALIDATORS.image(config);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} control
     * @return {?}
     */
    ImageFileControlDirective.prototype.setConfig = function (control) {
        var /** @type {?} */ image = "image";
        if (!this[image] && control[VALIDATOR_CONFIG$2] && control[VALIDATOR_CONFIG$2][image])
            this[image] = control[VALIDATOR_CONFIG$2][image];
        this.isProcessed = true;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ImageFileControlDirective.prototype.validate = function (control) {
        if (!this.isProcessed)
            this.setConfig(control);
        if (this.imageValidation) {
            return this.imageValidation(control, this.element.files);
        }
        return new Promise(function (resolve, reject) { resolve(null); });
    };
    return ImageFileControlDirective;
}());
ImageFileControlDirective.decorators = [
    { type: Directive, args: [{
                selector: "input[type=file]",
                providers: [{
                        provide: NG_ASYNC_VALIDATORS,
                        useExisting: forwardRef(function () { return ImageFileControlDirective; }),
                        multi: true
                    }]
            },] },
];
/**
 * @nocollapse
 */
ImageFileControlDirective.ctorParameters = function () {
    return [
        { type: ElementRef, },
    ];
};
ImageFileControlDirective.propDecorators = {
    'image': [{ type: Input },],
};
var RxReactiveFormsModule = /** @class */ (function () {
    function RxReactiveFormsModule() {
    }
    /**
     * @return {?}
     */
    RxReactiveFormsModule.forRoot = function () { return { ngModule: RxReactiveFormsModule, providers: [] }; };
    return RxReactiveFormsModule;
}());
RxReactiveFormsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [RxwebFormDirective, HtmlControlTemplateDirective, ControlHostDirective, RxFormControlDirective, FileControlDirective, ImageFileControlDirective],
                imports: [CommonModule, FormsModule, ReactiveFormsModule],
                providers: [RxFormBuilder, DecimalProvider, DecimalPipe],
                exports: [RxwebFormDirective, HtmlControlTemplateDirective, RxFormControlDirective, FileControlDirective, ImageFileControlDirective]
            },] },
];
/**
 * @nocollapse
 */
RxReactiveFormsModule.ctorParameters = function () { return []; };
/**
 * @param {?} config
 * @param {?} type
 * @param {?} validator
 * @return {?}
 */
function baseValidator(config, type, validator) {
    var /** @type {?} */ rxwebValidator = function (control, target) {
        if (typeof control == STRING)
            defaultContainer.init(target, 0, control, type, config, false);
        else {
            if (config && (!control.validatorConfig || !control.validatorConfig[type]))
                ApplicationUtil.configureControl(control, config, type);
            return validator(control);
        }
        return null;
    };
    return rxwebValidator;
}
/**
 * @param {?=} config
 * @return {?}
 */
function alphaValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.alpha, alphaValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function allOfValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.allOf, allOfValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function alphaNumericValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.alphaNumeric, alphaNumericValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function choiceValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.choice, choiceValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function compareValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.compare, compareValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function containsValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.contains, containsValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function creditCardValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.creditCard, creditCardValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function differentValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.different, differentValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function digitValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.digit, digitValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function emailValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.email, emailValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function evenValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.even, evenValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function factorValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.factor, factorValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function greaterThanEqualToValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.greaterThanEqualTo, greaterThanEqualToValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function greaterThanValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.greaterThan, greaterThanValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function hexColorValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.hexColor, hexColorValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function jsonValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.json, jsonValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function leapYearValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.leapYear, leapYearValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function lessThanEqualToValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.lessThanEqualTo, lessThanEqualToValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function lessThanValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.lessThan, lessThanValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function lowerCaseValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.lowerCase, lowercaseValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function macValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.mac, macValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function maxDateValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.maxDate, maxDateValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function maxLengthValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.maxLength, maxLengthValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function maxNumberValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.maxNumber, maxNumberValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function minDateValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.minDate, minDateValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function minLengthValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.minLength, minLengthValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function minNumberValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.minNumber, minNumberValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function noneOfValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.noneOf, noneOfValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function numericValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.numeric, numericValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function oddValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.odd, oddValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function oneOfValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.oneOf, oneOfValidator(config));
}
/**
 * @param {?} config
 * @return {?}
 */
function passwordcValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.password, passwordValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function patternValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.pattern, patternValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function rangeValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.range, rangeValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function requiredValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.required, requiredValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function timeValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.time, timeValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function upperCaseValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.upperCase, uppercaseValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function urlValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.url, urlValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function asciiValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.ascii, asciiValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function dataUriValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.dataUri, dataUriValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function portValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.port, portValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function latLongValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.latLong, latLongValidator(config));
}
/**
 * @param {?} config
 * @return {?}
 */
function extensionValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.extension, function (control) { return null; });
}
/**
 * @param {?} config
 * @return {?}
 */
function fileSizeValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.fileSize, function (control) { return null; });
}
/**
 * @param {?} config
 * @return {?}
 */
function endsWithValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.endsWith, endsWithValidator(config));
}
/**
 * @param {?} config
 * @return {?}
 */
function startsWithValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.startsWithWith, startsWithValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function primeNumberValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.primeNumber, primeNumberValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function latitudeValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.latitude, latitudeValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function longitudeValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.longitude, longitudeValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function composeValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.compose, composeValidator(config));
}
/**
 * @param {?} config
 * @return {?}
 */
function fileValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.file, function (control) { return null; });
}
/**
 * @param {?=} config
 * @return {?}
 */
function customValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.custom, customValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function uniqueValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.unique, uniqueValidator(config));
}
/**
 * @param {?} config
 * @return {?}
 */
function imageValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.image, function (control) { return null; });
}
/**
 * @param {?=} config
 * @return {?}
 */
function notEmptyValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.notEmpty, notEmptyValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function ipValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.ip, ipValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function cusipValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.cusip, cusipValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function gridValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.grid, gridValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function dateValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.date, dateValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function andValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.and, andValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function orValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.or, orValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function notValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.not, notValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function minTimeValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.minTime, minTimeValidator(config));
}
/**
 * @param {?=} config
 * @return {?}
 */
function maxTimeValidatorExtension(config) {
    return baseValidator(config, AnnotationTypes.maxTime, maxTimeValidator(config));
}
var RxwebValidators = /** @class */ (function () {
    function RxwebValidators() {
    }
    return RxwebValidators;
}());
RxwebValidators.alpha = alphaValidatorExtension;
RxwebValidators.allOf = allOfValidatorExtension;
RxwebValidators.alphaNumeric = alphaNumericValidatorExtension;
RxwebValidators.choice = choiceValidatorExtension;
RxwebValidators.compare = compareValidatorExtension;
RxwebValidators.contains = containsValidatorExtension;
RxwebValidators.creditCard = creditCardValidatorExtension;
RxwebValidators.different = differentValidatorExtension;
RxwebValidators.digit = digitValidatorExtension;
RxwebValidators.email = emailValidatorExtension;
RxwebValidators.even = evenValidatorExtension;
RxwebValidators.factor = factorValidatorExtension;
RxwebValidators.greaterThanEqualTo = greaterThanEqualToValidatorExtension;
RxwebValidators.greaterThan = greaterThanValidatorExtension;
RxwebValidators.hexColor = hexColorValidatorExtension;
RxwebValidators.json = jsonValidatorExtension;
RxwebValidators.leapYear = leapYearValidatorExtension;
RxwebValidators.lessThanEqualTo = lessThanEqualToValidatorExtension;
RxwebValidators.lessThan = lessThanValidatorExtension;
RxwebValidators.lowerCase = lowerCaseValidatorExtension;
RxwebValidators.mac = macValidatorExtension;
RxwebValidators.maxDate = maxDateValidatorExtension;
RxwebValidators.maxLength = maxLengthValidatorExtension;
RxwebValidators.maxNumber = maxNumberValidatorExtension;
RxwebValidators.minDate = minDateValidatorExtension;
RxwebValidators.minLength = minLengthValidatorExtension;
RxwebValidators.minNumber = minNumberValidatorExtension;
RxwebValidators.noneOf = noneOfValidatorExtension;
RxwebValidators.numeric = numericValidatorExtension;
RxwebValidators.odd = oddValidatorExtension;
RxwebValidators.oneOf = oneOfValidatorExtension;
RxwebValidators.password = passwordcValidatorExtension;
RxwebValidators.pattern = patternValidatorExtension;
RxwebValidators.range = rangeValidatorExtension;
RxwebValidators.required = requiredValidatorExtension;
RxwebValidators.time = timeValidatorExtension;
RxwebValidators.upperCase = upperCaseValidatorExtension;
RxwebValidators.url = urlValidatorExtension;
RxwebValidators.ascii = asciiValidatorExtension;
RxwebValidators.dataUri = dataUriValidatorExtension;
RxwebValidators.port = portValidatorExtension;
RxwebValidators.latLong = latLongValidatorExtension;
RxwebValidators.extension = extensionValidatorExtension;
RxwebValidators.fileSize = fileSizeValidatorExtension;
RxwebValidators.endsWith = endsWithValidatorExtension;
RxwebValidators.startsWith = startsWithValidatorExtension;
RxwebValidators.primeNumber = primeNumberValidatorExtension;
RxwebValidators.latitude = latitudeValidatorExtension;
RxwebValidators.longitude = longitudeValidatorExtension;
RxwebValidators.compose = composeValidatorExtension;
RxwebValidators.file = fileValidatorExtension;
RxwebValidators.custom = customValidatorExtension;
RxwebValidators.unique = uniqueValidatorExtension;
RxwebValidators.image = imageValidatorExtension;
RxwebValidators.notEmpty = notEmptyValidatorExtension;
RxwebValidators.ip = ipValidatorExtension;
RxwebValidators.cusip = cusipValidatorExtension;
RxwebValidators.grid = gridValidatorExtension;
RxwebValidators.date = dateValidatorExtension;
RxwebValidators.and = andValidatorExtension;
RxwebValidators.or = orValidatorExtension;
RxwebValidators.not = notValidatorExtension;
RxwebValidators.minTime = minTimeValidatorExtension;
RxwebValidators.maxTime = maxTimeValidatorExtension;
/**
 * @abstract
 */
var IAbstractControl = /** @class */ (function (_super) {
    __extends(IAbstractControl, _super);
    function IAbstractControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IAbstractControl;
}(AbstractControl));
/**
 * @param {?} jsonObject
 * @param {?} compareObject
 * @return {?}
 */
function isNotMatched(jsonObject, compareObject) {
    var /** @type {?} */ isModified = false;
    for (var /** @type {?} */ columnName in compareObject) {
        if (Array.isArray(jsonObject[columnName])) {
            for (var /** @type {?} */ i = 0; i < jsonObject[columnName].length; i++) {
                isModified = isNotMatched(jsonObject[columnName][i], compareObject[columnName][i]);
            }
        }
        else if (typeof jsonObject[columnName] == "object")
            isModified = isNotMatched(jsonObject[columnName], compareObject[columnName]);
        else
            isModified = !(jsonObject[columnName] == compareObject[columnName]);
        if (isModified)
            break;
    }
    return isModified;
}
var ValueChangeNotification = /** @class */ (function () {
    function ValueChangeNotification() {
        this.attributeChangeSubscriptions = new Array();
    }
    /**
     * @param {?} controlId
     * @param {?} subscription
     * @param {?} func
     * @return {?}
     */
    ValueChangeNotification.prototype.onPropValueChanged = function (controlId, subscription, func) {
        this.attributeChangeSubscriptions.push({ controlId: controlId, names: subscription.names, props: subscription.props, func: func });
    };
    /**
     * @param {?} name
     * @param {?} value
     * @param {?} oldValue
     * @param {?=} isProps
     * @return {?}
     */
    ValueChangeNotification.prototype.notifyValueChanged = function (name, value, oldValue, isProps) {
        if (isProps === void 0) { isProps = false; }
        if ((!isProps && this.isNotEqual(oldValue, value)) && this.onPropValueChanged) {
            var /** @type {?} */ subscriptions = this.attributeChangeSubscriptions.filter(function (t) { return t.names.indexOf(name) != -1; });
            subscriptions.forEach(function (subscribe) {
                if (subscribe.props && subscribe.props[name])
                    subscribe.func(subscribe.props[name]);
            });
        }
    };
    /**
     * @param {?} leftValue
     * @param {?} rightValue
     * @return {?}
     */
    ValueChangeNotification.prototype.isNotEqual = function (leftValue, rightValue) {
        if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
            var /** @type {?} */ isNotEqual = leftValue.length != rightValue.length;
            if (!isNotEqual)
                for (var /** @type {?} */ i = 0; i < leftValue.length; i++) {
                    isNotEqual = isNotMatched(leftValue[i], rightValue[i]);
                    if (isNotEqual)
                        break;
                }
            return isNotEqual;
        }
        return leftValue != rightValue;
    };
    /**
     * @param {?} controlId
     * @return {?}
     */
    ValueChangeNotification.prototype.destroy = function (controlId) {
        for (var /** @type {?} */ i = 0; i < this.attributeChangeSubscriptions.length; i++) {
            if (this.attributeChangeSubscriptions[i].controlId == controlId) {
                this.attributeChangeSubscriptions.splice(i, 1);
                break;
            }
        }
    };
    return ValueChangeNotification;
}());
var FILTER = "filter";
var FUNCTION = "function";
var ERRORS = "errors";
var PropDescriptor = /** @class */ (function (_super_1) {
    __extends(PropDescriptor, _super_1);
    function PropDescriptor() {
        return _super_1 !== null && _super_1.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    PropDescriptor.prototype.checkFilterFunction = function () {
        var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), FILTER);
        this.isDefinedFilter = (descriptor && !descriptor.get && !descriptor.set && typeof this[FILTER] == FUNCTION);
    };
    /**
     * @param {?} propName
     * @return {?}
     */
    PropDescriptor.prototype.defineProp = function (propName) {
        var _this_1 = this;
        var /** @type {?} */ value = this.props[propName];
        var /** @type {?} */ oldValue = null;
        Object.defineProperty(this.props, propName, {
            get: function () { return value; },
            set: function (v) {
                value = v;
                _this_1.notifyValueChanged("props." + propName, value, oldValue, true);
                oldValue = value;
            }
        });
    };
    /**
     * @return {?}
     */
    PropDescriptor.prototype.overrideProps = function () {
        var _this_1 = this;
        ["disabled", "label", "placeholder", "hide", "description", "focus", "readonly", "class", "source"].forEach(function (t) {
            var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(_this_1), t);
            var /** @type {?} */ value = null;
            var /** @type {?} */ oldValue = null;
            Object.defineProperty(_this_1, t, {
                get: function () { return descriptor ? descriptor.get.call(_this_1) : value; },
                set: function (v) {
                    value = v;
                    if (descriptor && descriptor.set)
                        descriptor.set.call(_this_1, v);
                    _super_1.prototype.notifyValueChanged.call(_this_1, t, value, oldValue);
                    oldValue = v;
                }
            });
        });
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    PropDescriptor.prototype.overrideErrorsProp = function (formControl) {
        var _this_1 = this;
        var /** @type {?} */ value = formControl.errors;
        var /** @type {?} */ oldValue = formControl.errorMessage;
        Object.defineProperty(formControl, ERRORS, {
            get: function () { return value; },
            set: function (v) {
                value = v;
                _this_1.notifyValueChanged("errorMessage", value, oldValue);
                oldValue = value;
            }
        });
    };
    return PropDescriptor;
}(ValueChangeNotification));
var FILE$1 = 'file';
var RANGE = 'range';
var CHECKBOX$1 = 'checkbox';
var BLANK$1 = "";
var PROP = "prop";
var ATTR = "attr";
var EVENTS = "events";
var FOCUS$1 = "focus";
var READONLY = "readonly";
var CLASS = "class";
var STYLE = "style";
var RADIO$1 = "radio";
var STRING$1 = "string";
var FUNCTION$1 = "function";
var SQUARE = "{";
var COLON = ":";
var CLICK = "click";
var INPUT$1 = "input";
var TEXT = "text";
var CONTROL = 'control';
var BLUR$1 = 'blur';
var SELECT$1 = "select";
var TEXTAREA$1 = "textarea";
var BOOLEAN$1$1 = "boolean";
var NONE = "none";
var DISPLAY = "display";
var ADDITIONAL_CLASS = "additional-class";
var SELECT_MULTIPLE = "select-multiple";
var SOURCE = "source";
var RXWEB_ID_STRING = "string";
var ADVANCE = "advance";
var SQUARE_CONTROL = "[control]";
var SQUARE_LABEL = "[label]";
var SQUARE_SMALL = "[small]";
var SQUARE_ERROR = "[error]";
var FILTER$1 = "filter";
var INPUT_TEXT = "input-text";
var PREPEND_LEFT = "prepend-left";
var PREPEND_RIGHT = "prepend-right";
var PREPEND_BOTH = "prepend-both";
/**
 * @abstract
 */
var BaseFormControlConfig = /** @class */ (function (_super_1) {
    __extends(BaseFormControlConfig, _super_1);
    /**
     * @param {?} configs
     */
    function BaseFormControlConfig(configs) {
        var _this_1 = _super_1.call(this) || this;
        _this_1.configs = configs;
        _this_1._actionResult = {
            label: undefined,
            placeholder: '',
            source: [],
            filter: [],
            hide: false,
            description: undefined,
            disabled: false,
            focus: false,
            readonly: false,
            class: [],
            prependText: ''
        };
        return _this_1;
    }
    /**
     * @return {?}
     */
    BaseFormControlConfig.prototype.complete = function () {
        this.controlNotifications = { filter: [], disabled: [], label: [], description: [], hide: [], placeholder: [], readonly: [], focus: [], class: [] };
        for (var /** @type {?} */ action in this.controlNotifications)
            for (var /** @type {?} */ columnName in this.configs) {
                if (!Array.isArray(this.configs[columnName])) {
                    var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.configs[columnName]), action);
                    if ((descriptor && descriptor.get) || this.configs[columnName].isFilterFunction) {
                        var /** @type {?} */ stringFunction = this.configs[columnName].isFilterFunction ? String(this.configs[columnName][FILTER$1]) : String(descriptor.get);
                        if (stringFunction.indexOf("." + this.config.name) != -1 || stringFunction.indexOf("." + this.config.name + ";") != -1) {
                            this.controlNotifications[action].push(columnName);
                        }
                    }
                }
            }
        this.overrideProps();
        this.updateActionValue();
    };
    /**
     * @param {?=} actionName
     * @return {?}
     */
    BaseFormControlConfig.prototype.refresh = function (actionName) {
        var _this_1 = this;
        for (var /** @type {?} */ columnName in this.controlNotifications) {
            if (this.controlNotifications[columnName].length > 0)
                this.controlNotifications[columnName].forEach(function (x) {
                    if (x != _this_1.config.name)
                        _this_1.configs[x].refresh(columnName);
                    else
                        _this_1.setActionValue(columnName);
                });
        }
        if (actionName)
            this.setActionValue(actionName);
    };
    /**
     * @param {?} actionName
     * @return {?}
     */
    BaseFormControlConfig.prototype.setActionValue = function (actionName) {
        if (actionName == FILTER$1 && this.isDefinedFilter) {
            this[FILTER$1].call(this);
        }
        else
            this[actionName == FILTER$1 ? SOURCE : actionName] = this[actionName];
    };
    /**
     * @return {?}
     */
    BaseFormControlConfig.prototype.updateActionValue = function () {
        var _this_1 = this;
        ["disabled", "label", "placeholder", "hide", "description", "focus", "readonly", "class", "filter", "source"].forEach(function (key) {
            switch (key) {
                case FILTER$1:
                case SOURCE:
                    if (_this_1.config[key])
                        _this_1[key] = _this_1.config[key];
                    if (_this_1.config.filter) {
                        _this_1[key] = _this_1[FILTER$1];
                    }
                    if (_this_1.isDefinedFilter && key == FILTER$1)
                        _this_1[FILTER$1]();
                    if (key == SOURCE && !_this_1.source)
                        _this_1[key] = [];
                    break;
                default:
                    if (_this_1.config.ui && _this_1.config.ui[key])
                        _this_1[key] = _this_1.config.ui[key];
                    else
                        _this_1[key == FILTER$1 ? SOURCE : key] = _this_1._actionResult[key];
                    break;
            }
        });
    };
    return BaseFormControlConfig;
}(PropDescriptor));
/**
 * @abstract
 */
var FormControlConfig = /** @class */ (function (_super_1) {
    __extends(FormControlConfig, _super_1);
    /**
     * @param {?} fieldConfig
     * @param {?} controlsConfig
     */
    function FormControlConfig(fieldConfig, controlsConfig) {
        var _this_1 = _super_1.call(this, controlsConfig) || this;
        _this_1.controlsConfig = controlsConfig;
        _this_1.config = fieldConfig;
        _this_1.value = fieldConfig.value;
        _super_1.prototype.checkFilterFunction.call(_this_1);
        _this_1.props = Object.create({});
        return _this_1;
    }
    Object.defineProperty(FormControlConfig.prototype, "formControl", {
        /**
         * @return {?}
         */
        get: function () {
            return this._formControl;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var _this_1 = this;
            this._formControl = value;
            setTimeout(function () { return _this_1.overrideErrorsProp(_this_1._formControl); }, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlConfig.prototype, "errorMessage", {
        /**
         * @return {?}
         */
        get: function () {
            return this.formControl.errorMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlConfig.prototype, "prependText", {
        /**
         * @return {?}
         */
        get: function () {
            return this.config.ui ? this.config.ui.prependText : '';
        },
        enumerable: true,
        configurable: true
    });
    return FormControlConfig;
}(BaseFormControlConfig));
var ControlConfig = /** @class */ (function (_super_1) {
    __extends(ControlConfig, _super_1);
    /**
     * @param {?} fieldConfig
     * @param {?} controlsConfig
     */
    function ControlConfig(fieldConfig, controlsConfig) {
        return _super_1.call(this, fieldConfig, controlsConfig) || this;
    }
    return ControlConfig;
}(FormControlConfig));
/**
 * @param {?} model
 * @param {?} objectArguments
 * @return {?}
 */
function getInstance$1(model, objectArguments) {
    var /** @type {?} */ classInstance = Object.create(model.prototype);
    try {
        model.apply(classInstance, objectArguments);
    }
    catch ( /** @type {?} */ex) {
        ///resolution of issue https://github.com/rxweb/rxweb/issues/188
        classInstance = Reflect.construct(model, objectArguments);
    }
    return classInstance;
}
var ApplicationUtil$1 = /** @class */ (function () {
    function ApplicationUtil$1() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    ApplicationUtil$1.getRootFormGroup = function (control) {
        if (control.parent) {
            return this.getRootFormGroup(control.parent);
        }
        return /** @type {?} */ (control);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ApplicationUtil$1.isObject = function (value) {
        return Object.prototype.toString.call(value) === '[object Object]';
    };
    return ApplicationUtil$1;
}());
var ARRAY = "array";
var RxDynamicFormBuilder = /** @class */ (function () {
    function RxDynamicFormBuilder() {
    }
    /**
     * @param {?} fields
     * @param {?} dynamicFormConfig
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.formGroup = function (fields, dynamicFormConfig) {
        var _this_1 = this;
        this.formConfiguration = dynamicFormConfig;
        var /** @type {?} */ entityObject = {};
        var /** @type {?} */ formFieldConfigs = new Array();
        var /** @type {?} */ modelConfig = {};
        var /** @type {?} */ formGroup = new RxFormGroup({}, entityObject, {}, undefined);
        fields.forEach(function (x, i) {
            if (x.type == ARRAY) {
                _this_1.createFormArray(modelConfig, x, /** @type {?} */ (ApplicationUtil$1.getRootFormGroup(formGroup)), entityObject);
            }
            else {
                var /** @type {?} */ splitName = x.name.split('.');
                var /** @type {?} */ name = x.name;
                if (splitName.length > 1) {
                    entityObject[splitName[0]] = {};
                    formGroup.addControl(splitName[0], new RxFormGroup({}, entityObject[splitName[0]], {}, undefined));
                    formGroup = /** @type {?} */ (formGroup.controls[splitName[0]]);
                    name = splitName[1];
                }
                else
                    formGroup = /** @type {?} */ (ApplicationUtil$1.getRootFormGroup(formGroup));
                var /** @type {?} */ modelInstance = _this_1.getDynamicModelInstance(x, modelConfig, entityObject, name);
                formGroup.addControl(name, modelInstance.formControl);
                formFieldConfigs.push(modelInstance);
            }
        });
        if (this.formConfiguration.additionalConfig)
            this.formConfiguration.additionalConfig.forEach(function (t) { return _this_1.getModelInstance(t, modelConfig); });
        this.completeModelConfig(modelConfig);
        return {
            controlsConfig: modelConfig,
            formGroup: /** @type {?} */ (ApplicationUtil$1.getRootFormGroup(formGroup))
        };
    };
    /**
     * @param {?} modelConfig
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.completeModelConfig = function (modelConfig) {
        var _this_1 = this;
        for (var /** @type {?} */ column in modelConfig)
            if (Array.isArray(modelConfig[column]))
                modelConfig[column].forEach(function (x) { return _this_1.completeModelConfig(x); });
            else {
                modelConfig[column].isPlainTextMode = this.formConfiguration ? this.formConfiguration.isPlainTextMode : false;
                modelConfig[column].complete();
            }
    };
    /**
     * @param {?} modelConfig
     * @param {?} field
     * @param {?} formGroup
     * @param {?} entityObject
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.createFormArray = function (modelConfig, field, formGroup, entityObject) {
        var _this_1 = this;
        modelConfig[field.name] = [];
        entityObject[field.name] = [];
        var /** @type {?} */ formArray = new RxFormArray(entityObject[field.name], []);
        if (field.controlConfigs) {
            if (field.rows)
                field.rows.forEach(function (row) {
                    formArray.controls.push(_this_1.createDynamicFormGroup(field, modelConfig[field.name], _this_1.getRefObject(entityObject[field.name]), row));
                });
            if (field.minimumRepeatCount && field.minimumRepeatCount > 0) {
                var /** @type {?} */ countLeft = field.minimumRepeatCount - (formArray.controls.length);
                for (var /** @type {?} */ i = 0; i < countLeft; i++)
                    formArray.controls.push(this.createDynamicFormGroup(field, modelConfig[field.name], this.getRefObject(entityObject[field.name]), { fields: [] }));
            }
            this.addTwoProp(modelConfig[field.name], field, entityObject[field.name], formArray);
            formGroup.addControl(field.name, formArray);
        }
    };
    /**
     * @param {?} entityObject
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.getRefObject = function (entityObject) {
        var /** @type {?} */ jObject = {};
        entityObject.push(jObject);
        return jObject;
    };
    /**
     * @param {?} modelConfig
     * @param {?} x
     * @param {?} entityObject
     * @param {?} formArray
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.addTwoProp = function (modelConfig, x, entityObject, formArray) {
        var _this_1 = this;
        modelConfig.__proto__.addItem = function () {
            formArray.controls.push(_this_1.createDynamicFormGroup(x, modelConfig, _this_1.getRefObject(entityObject), { fields: [] }));
        };
        modelConfig.__proto__.removeItem = function (index) {
            formArray.removeAt(index);
            modelConfig.splice(index, 1);
        };
    };
    /**
     * @param {?} x
     * @param {?} modelConfig
     * @param {?} entityObject
     * @param {?} row
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.createDynamicFormGroup = function (x, modelConfig, entityObject, row) {
        var _this_1 = this;
        var /** @type {?} */ nestedFormGroup = new RxFormGroup({}, entityObject, {}, undefined);
        var /** @type {?} */ jObject = {};
        modelConfig.push(jObject);
        Object.keys(x.controlConfigs).forEach(function (key) {
            var /** @type {?} */ field = row.fields.filter(function (x) { return x.name == key; })[0];
            var /** @type {?} */ formControlConfig = Object.assign({}, x.controlConfigs[key], { name: key });
            if (field)
                formControlConfig = Object.assign({}, formControlConfig, field);
            var /** @type {?} */ modelInstance = _this_1.getDynamicModelInstance(formControlConfig, jObject, entityObject, key);
            nestedFormGroup.addControl(key, modelInstance.formControl);
        });
        return nestedFormGroup;
    };
    /**
     * @param {?} x
     * @param {?} modelConfig
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.getModelInstance = function (x, modelConfig) {
        var /** @type {?} */ configModel = (x.modelName) && this.formConfiguration && this.formConfiguration.controlConfigModels ? this.formConfiguration.controlConfigModels.filter(function (y) { return y.modelName == x.modelName; })[0] : undefined;
        var /** @type {?} */ modelArguments = [x, modelConfig];
        var /** @type {?} */ model$$1 = undefined;
        if (configModel) {
            model$$1 = configModel.model;
            if (configModel.arguments)
                configModel.arguments.forEach(function (t) { return modelArguments.push(t); });
        }
        else
            model$$1 = FormControlConfig;
        var /** @type {?} */ modelInstance = getInstance$1(model$$1, modelArguments);
        modelConfig[x.name] = modelInstance;
        return modelInstance;
    };
    /**
     * @param {?} x
     * @param {?} modelConfig
     * @param {?} entityObject
     * @param {?} name
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.getDynamicModelInstance = function (x, modelConfig, entityObject, name) {
        var /** @type {?} */ modelInstance = this.getModelInstance(x, modelConfig);
        var /** @type {?} */ validators = [];
        var /** @type {?} */ asyncValidators = [];
        if (x.validators)
            this.validatorBindings(validators, x.validators);
        if (modelInstance.validator)
            validators.push(modelInstance.validator.bind(modelInstance));
        if (modelInstance.asyncValidator)
            asyncValidators.push(modelInstance.asyncValidator.bind(modelInstance));
        if (modelInstance)
            entityObject[x.name] = x.value;
        var /** @type {?} */ baseObject = {};
        baseObject[x.name] = x.value;
        entityObject[x.name] = x.value;
        modelInstance.formControl = new RxFormControl(x.value, validators, asyncValidators, entityObject, baseObject, name, undefined);
        return modelInstance;
    };
    /**
     * @param {?} validations
     * @param {?} validationConfig
     * @return {?}
     */
    RxDynamicFormBuilder.prototype.validatorBindings = function (validations, validationConfig) {
        for (var /** @type {?} */ column in RxwebValidators) {
            if (validationConfig[column]) {
                validations.push(RxwebValidators[column](validationConfig[column]));
            }
        }
        return validations;
    };
    return RxDynamicFormBuilder;
}());
var commonAttributes = {
    placeholder: ':placeholder',
    readonly: ':readonly',
    class: ':class',
    name: '{config.name'
};
var commonEvents = {
    focus: ':focus',
    input: 'true',
    blur: 'blur'
};
var checkBoxAndRadioDesign = ['div', [{
            for: {
                source: function (item, index) {
                    return ['div', ['input', [{
                                    attr: Object.assign({ type: '{config.type' }, commonAttributes, { value: item[this.config.valuePropName || 'value'], checked: item[this.config.valuePropName || 'value'] == this.value, disabled: item.disabled ? item.disabled : ':disabled' }),
                                    events: commonEvents,
                                    overrideProp: (index == 0)
                                }],
                            'label', [{ prop: { innerText: item[this.config.valuePropName || 'text'] } }]]];
                }
            }
        }
    ]];
var configUiText = { innerText: '{config.ui.text' };
var classAttribute = { class: ':class', style: { display: ":hide" } };
var DYNAMIC_ELEMENT_DESIGN_TREE = {
    p: ['p', [{ prop: configUiText, attr: classAttribute }]],
    h1: ['h1', [{ prop: configUiText, attr: classAttribute }]],
    h2: ['h2', [{ prop: configUiText, attr: classAttribute }]],
    h3: ['h3', [{ prop: configUiText, attr: classAttribute }]],
    h4: ['h4', [{ prop: configUiText, attr: classAttribute }]],
    h5: ['h5', [{ prop: configUiText, attr: classAttribute }]],
    h6: ['h6', [{ prop: configUiText, attr: classAttribute }]],
    a: ['a', [{ attr: Object.assign({ href: '{config.href' }, classAttribute), prop: configUiText }]],
    hr: ['hr', [{ attr: commonAttributes }]],
    strong: ['strong', [{ prop: configUiText, attr: classAttribute }]],
    span: ['span', [{ prop: configUiText, attr: classAttribute }]],
    label: ['label', [{ prop: { innerText: ':label' }, attr: Object.assign({ style: { display: ":label" } }, classAttribute) }]],
    small: ['small', [{ prop: { innerText: ':description' }, attr: Object.assign({ style: { display: ":description" } }, classAttribute) }]],
    input: ['input', [{
                attr: Object.assign({ type: '{config.type' }, commonAttributes, { disabled: ':disabled' }),
                events: commonEvents,
            }]],
    error: ["span", [{ prop: { innerText: ':errorMessage' }, attr: Object.assign({ style: { display: ":errorMessage" } }, commonAttributes) }]],
    div: ['div', [{ attr: classAttribute }]],
    card: ['div', [{ attr: classAttribute }]],
    'card-header': ['div', [{ attr: classAttribute, prop: configUiText }]],
    'card-body': ['div', [{ attr: classAttribute }]],
    buttonGroup: ['div', [{
                for: {
                    source: function (item) {
                        return ['label', [{
                                    attr: Object.assign({ type: '{config.type' }, commonAttributes, { value: item[this.config.valuePropName || 'value'] }),
                                    events: commonEvents
                                }],
                            'label', [{ prop: { innerText: item[this.config.valuePropName || 'text'] } }]];
                    }
                }
            }
        ]
    ],
    'prepend-left': ["div", [
            "div", [
                "div", [{ prop: { innerText: '{config.ui.prependText.left' } }]
            ],
            '[input-text]'
        ]],
    'prepend-right': ["div", [
            '[input-text]',
            "div", [
                "div", [{ prop: { innerText: '{config.ui.prependText.right' } }]
            ],
        ]],
    'prepend-both': ["div", [
            "div", [
                "div", [{ prop: { innerText: '{config.ui.prependText.left' } }]
            ],
            '[input-text]',
            "div", [
                "div", [{ prop: { innerText: '{config.ui.prependText.right' } }]
            ],
        ]],
    textarea: ['textarea', [{ attr: Object.assign({ rows: '{config.ui.rows', cols: '{config.ui.cols' }, commonAttributes), events: commonEvents }]],
    radio: checkBoxAndRadioDesign,
    'checkbox': checkBoxAndRadioDesign,
    select: ['select', [{
                attr: {
                    multiple: '{config.multiselect',
                },
                events: commonEvents,
                source: true
            },
            'option', [{ prop: { innerText: ":placeholder" }, attr: { style: { display: ":placeholder" } } }],
            {
                for: {
                    source: function (item) {
                        var _this_1 = this;
                        return ['option', [
                                {
                                    prop: { innerText: item[this.config.textPropName || 'text'] }, attr: {
                                        value: item[this.config.valuePropName || 'value'],
                                        selected: Array.isArray(this.value) ? this.value.filter(function (x) { return item[_this_1.config.valuePropName || 'value'] == x; })[0] != undefined : item[this.config.valuePropName || 'value'] == this.value,
                                        disabled: item.disabled
                                    }
                                }
                            ]];
                    }
                }
            }
        ]],
    button: ['button', [{ attr: Object.assign({}, commonAttributes, { name: '{config.name', type: '{config.type' }), events: { click: '{config.events.click' }, prop: { innerText: '{config.ui.text' } }]],
    alert: ['div', [{ attr: commonAttributes }]],
    viewMode: {
        basic: ['div', [{
                    attr: {
                        style: { display: ":hide" }
                    }
                },
                '[label]',
                '[control]',
                '[error]',
                '[small]'
            ]],
        horizontal: ['div', [{
                    attr: {
                        style: { display: ":hide" }
                    }
                },
                '[label]',
                'div', ['[control]', '[error]', '[small]']
            ]],
        advance: ['div', [
                'div', [{
                        attr: {
                            style: { display: ":hide" }
                        }
                    },
                    '[label]', '[control]', '[error]', '[small]']
            ]]
    }
};
var BOOSTRAP_CLASS_CONFIG = {
    defaultControl: 'form-control',
    fileControl: 'form-control-file',
    readOnlyPlainText: 'form-control-plaintext',
    rangeControl: 'form-control-range',
    checkBoxAndRadioControl: 'form-check-input',
    checkboxAndRadioControlInline: 'form-check-inline',
    controlValid: 'is-valid',
    controlInvalid: 'is-invalid',
    validMessage: 'valid-feedback',
    invalidMessage: 'invalid-feedback',
};
var PREPEND_TEXT_CLASS_PATH = {
    class: ['input-group-prepend'],
    child: {
        0: { class: ['input-group-text'] }
    }
};
var INPUT_GROUP = ['input-group'];
var BOOTSTRAP_DESIGN_CONFIG = {
    elementClassPath: {
        "prepend-left": {
            class: INPUT_GROUP,
            child: PREPEND_TEXT_CLASS_PATH
        },
        "prepend-right": {
            class: INPUT_GROUP,
            child: PREPEND_TEXT_CLASS_PATH
        },
        "prepend-both": {
            class: INPUT_GROUP,
            child: {
                0: PREPEND_TEXT_CLASS_PATH,
                2: PREPEND_TEXT_CLASS_PATH
            }
        },
        input: { class: [inputElementClassProvider, function () { var /** @type {?} */ invalidClass = (this.formControl.validator && this.formControl.errorMessage) ? BOOSTRAP_CLASS_CONFIG.controlInvalid : ''; return invalidClass; }], listenerProps: [":errorMessage"] },
        checkbox: {
            class: [], child: {
                0: {
                    class: ['form-check', inLineRadioAndCheckbox],
                    child: { 0: { class: ['form-check-input'] }, 1: { class: ['form-check-label'] } }
                }
            }
        },
        radio: {
            class: [], child: {
                0: {
                    class: ['form-check', inLineRadioAndCheckbox],
                    child: { 0: { class: ['form-check-input'] }, 1: { class: ['form-check-label'] } }
                }
            }
        },
        'error': { class: [function () { return !(this.formControl.validator && this.formControl.errorMessage) ? BOOSTRAP_CLASS_CONFIG.validMessage : BOOSTRAP_CLASS_CONFIG.invalidMessage; }], listenerProps: [":errorMessage"] },
        button: { class: ['btn'] },
        alert: { class: ['alert'] },
        card: { class: ['card'] },
        'card-header': { class: ['card-header'] },
        'card-body': { class: ['card-body'] },
        viewMode: {
            basic: { class: ['form-group'] },
            horizontal: {
                class: ['form-group', 'row'],
                child: {
                    0: { class: [function () { return this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.horizontal && this.config.ui.viewMode.horizontal.label ? this.config.ui.viewMode.horizontal.label : ''; }] },
                    1: {
                        class: [function () { return this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.horizontal && this.config.ui.viewMode.horizontal.div ? this.config.ui.viewMode.horizontal.div : ''; }],
                    }
                }
            },
            advance: {
                class: ['form-row', function () { return this.config && this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.root_div ? this.config.ui.viewMode.advance.root_div : ''; }],
                child: {
                    0: {
                        class: ['form-group', function () { return this.config && this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.div ? this.config.ui.viewMode.advance.div : ''; }],
                        child: {
                            0: { class: [function () { return this.config && this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.label ? this.config.ui.viewMode.advance.label : ''; }] },
                            2: { class: [function () { return this.config && this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.error ? this.config.ui.viewMode.advance.error : ''; }] },
                            3: { class: [function () { return this.config.ui && this.config.ui.viewMode && this.config.ui.viewMode.advance && this.config.ui.viewMode.advance.small ? this.config.ui.viewMode.advance.small : ''; }] }
                        }
                    }
                }
            }
        },
        small: { class: ['form-text'] },
        textarea: { class: [BOOSTRAP_CLASS_CONFIG.defaultControl] },
        select: { class: [BOOSTRAP_CLASS_CONFIG.defaultControl] }
    }
};
/**
 * @return {?}
 */
function inputElementClassProvider() {
    var /** @type {?} */ elementClass = '';
    if (!this.readonly || (this.readonly && !this.isPlainTextMode))
        switch (this.config.type) {
            case FILE$1:
                elementClass = BOOSTRAP_CLASS_CONFIG.fileControl;
                break;
            case RANGE:
                elementClass = BOOSTRAP_CLASS_CONFIG.rangeControl;
                break;
            case RADIO$1:
            case CHECKBOX$1:
                elementClass = BLANK$1;
                break;
            default:
                elementClass = BOOSTRAP_CLASS_CONFIG.defaultControl;
                break;
        }
    else if (this.readonly && this.isPlainTextMode)
        elementClass = BOOSTRAP_CLASS_CONFIG.readOnlyPlainText;
    return elementClass;
}
/**
 * @return {?}
 */
function inLineRadioAndCheckbox() {
    return this.config && this.config.inline ? ['form-check-inline'] : [];
}
var ControlState = /** @class */ (function () {
    function ControlState() {
    }
    return ControlState;
}());
ControlState.controlId = 1;
ControlState.controls = {};
/**
 * @param {?} key
 * @param {?} valueObject
 * @return {?}
 */
function objectPropValue(key, valueObject) {
    var /** @type {?} */ jObject = undefined;
    var /** @type {?} */ splitTexts = key.split('.');
    for (var _d = 0, splitTexts_2 = splitTexts; _d < splitTexts_2.length; _d++) {
        var column = splitTexts_2[_d];
        if (!jObject)
            jObject = valueObject;
        if (jObject)
            jObject = jObject[column];
        else
            break;
    }
    return jObject;
}
/**
 * @param {?} key
 * @param {?} value
 * @param {?} valueObject
 * @return {?}
 */
var PROPS = ":props.";
var GLOBAL_MATCH = "g";
var DOT = ".";
/**
 * @abstract
 */
var BaseObjectAccessor = /** @class */ (function () {
    /**
     * @param {?} dynamicNodeConfig
     */
    function BaseObjectAccessor(dynamicNodeConfig) {
        this.dynamicNodeConfig = dynamicNodeConfig;
        this.subscribeProps = {
            names: [], props: {}
        };
        this.controlConfig = this.dynamicNodeConfig.controlConfig;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    BaseObjectAccessor.prototype.getPropName = function (text) {
        if (text[0] == COLON || (text[0] == SQUARE)) {
            return text.replace(new RegExp(COLON, GLOBAL_MATCH), BLANK$1).replace(new RegExp(SQUARE, GLOBAL_MATCH), BLANK$1);
        }
        return text;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    BaseObjectAccessor.prototype.getValue = function (text) {
        if (typeof text == STRING$1 && ((text[0] == COLON) || (text[0] == SQUARE))) {
            text = text.replace(new RegExp(COLON, GLOBAL_MATCH), BLANK$1).replace(new RegExp(SQUARE, GLOBAL_MATCH), BLANK$1);
            return objectPropValue(text, this.controlConfig);
        }
        return text;
    };
    /**
     * @param {?} propName
     * @param {?} type
     * @param {?} attributeName
     * @param {?=} valuePropName
     * @param {?=} parentPropName
     * @return {?}
     */
    BaseObjectAccessor.prototype.setPropSubscription = function (propName, type, attributeName, valuePropName, parentPropName) {
        if (valuePropName === void 0) { valuePropName = ''; }
        if (parentPropName === void 0) { parentPropName = ''; }
        if (propName.startsWith(PROPS))
            this.defineProp(propName);
        var /** @type {?} */ prop = this.getPropName(propName);
        if (!this.subscribeProps.props[prop])
            this.subscribeProps.props[prop] = {};
        if (!this.subscribeProps.props[prop][type])
            this.subscribeProps.props[prop][type] = {};
        if (parentPropName) {
            this.subscribeProps.props[prop][type][parentPropName] = {};
            this.subscribeProps.props[prop][type][parentPropName][attributeName] = (valuePropName) ? valuePropName : propName;
        }
        else
            this.subscribeProps.props[prop][type][attributeName] = (valuePropName) ? valuePropName : propName;
        if (this.subscribeProps.names.indexOf(prop) == -1)
            this.subscribeProps.names.push(prop);
    };
    /**
     * @param {?} propName
     * @return {?}
     */
    BaseObjectAccessor.prototype.isSubscribeProp = function (propName) {
        return (typeof propName == STRING$1 && (propName[0] == COLON));
    };
    /**
     * @param {?} propName
     * @return {?}
     */
    BaseObjectAccessor.prototype.defineProp = function (propName) {
        var /** @type {?} */ splitText = propName.split(DOT);
        if (splitText.length > 1) {
            var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.controlConfig.props), splitText[1]);
            if (!descriptor)
                this.controlConfig.defineProp(splitText[1]);
        }
    };
    return BaseObjectAccessor;
}());
/**
 * @abstract
 */
var ElementAccessor = /** @class */ (function (_super_1) {
    __extends(ElementAccessor, _super_1);
    /**
     * @param {?} dynamicNodeConfig
     */
    function ElementAccessor(dynamicNodeConfig) {
        var _this_1 = _super_1.call(this, dynamicNodeConfig) || this;
        _this_1.checkedCheckbox = function (value, element) { return (value) ? (_this_1.controlConfig.config.multiselect) ? value.filter(function (t) { return element.value == t; })[0] != undefined : element.value == value : false; };
        _this_1.checkedRadio = function (value, element) { return (value) ? value == element.value : false; };
        return _this_1;
    }
    /**
     * @param {?} parentElement
     * @param {?} name
     * @return {?}
     */
    ElementAccessor.prototype.createNodeElement = function (parentElement, name) {
        this.element = this.dynamicNodeConfig.renderer.createElement(name);
        this.dynamicNodeConfig.renderer.appendChild(parentElement, this.element);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    ElementAccessor.prototype.removeChildren = function (element) {
        if (element.firstElementChild) {
            this.removeChildren(element.firstElementChild);
        }
        var /** @type {?} */ controlId = element.getAttribute(RXWEB_ID_STRING);
        if (controlId && ControlState.controls[controlId]) {
            ControlState.controls[controlId].destroy();
            delete ControlState.controls[controlId];
        }
    };
    /**
     * @param {?} targetElement
     * @return {?}
     */
    ElementAccessor.prototype.setControlConfigValue = function (targetElement) {
        switch (targetElement.type) {
            case CHECKBOX$1:
                this.setCheckboxValue(targetElement);
                break;
            case SELECT_MULTIPLE:
                var /** @type {?} */ value = [];
                for (var _d = 0, _e = this.element.options; _d < _e.length; _d++) {
                    var option = _e[_d];
                    if (option.selected && option.value)
                        value.push(option.value);
                }
                this.controlConfig.value = value;
                break;
            default:
                this.controlConfig.formControl.setValue(targetElement.value);
                this.controlConfig.value = targetElement.value;
                break;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElementAccessor.prototype.resetElementValue = function (value) {
        switch (this.element.type) {
            case CHECKBOX$1:
            case RADIO$1:
                var /** @type {?} */ elements = document.querySelectorAll("[name='" + this.controlConfig.config.name + "']");
                for (var /** @type {?} */ i = 0; i < elements.length; i++) {
                    elements[i].checked = this.element.type == CHECKBOX$1 ? this.checkedCheckbox(value, elements[i]) : this.checkedRadio(value, elements[i]);
                }
                break;
            case SELECT_MULTIPLE:
                var _loop_7 = function (option) {
                    option.selected = (value) ? value.filter(function (t) { return t == option.value; })[0] != undefined : false;
                };
                for (var _d = 0, _e = this.element.options; _d < _e.length; _d++) {
                    var option = _e[_d];
                    _loop_7(/** @type {?} */ option);
                }
                break;
            default:
                this.element.value = value;
        }
    };
    /**
     * @param {?} targetElement
     * @return {?}
     */
    ElementAccessor.prototype.setCheckboxValue = function (targetElement) {
        var /** @type {?} */ value = (this.controlConfig.config.multiselect) ? this.controlConfig.value || [] : targetElement.value;
        if (targetElement.checked)
            (this.controlConfig.config.multiselect) ? value.push(targetElement.value) : null;
        else
            (this.controlConfig.config.multiselect) ? value.splice(value.indexOf(targetElement.value), 1) : value = null;
        this.controlConfig.formControl.setValue(value);
        this.controlConfig.value = value;
    };
    return ElementAccessor;
}(BaseObjectAccessor));
var ElementEventProcessor = /** @class */ (function (_super_1) {
    __extends(ElementEventProcessor, _super_1);
    /**
     * @param {?} dynamicNodeConfig
     */
    function ElementEventProcessor(dynamicNodeConfig) {
        var _this_1 = _super_1.call(this, dynamicNodeConfig) || this;
        _this_1.dynamicNodeConfig = dynamicNodeConfig;
        return _this_1;
    }
    /**
     * @param {?} events
     * @param {?} isSubscribe
     * @return {?}
     */
    ElementEventProcessor.prototype.bindEvents = function (events, isSubscribe) {
        var _this_1 = this;
        Object.keys(events).forEach(function (eventName) {
            switch (eventName) {
                case FOCUS$1:
                    _this_1.setFocus(_this_1.getValue(events[eventName]));
                    break;
                case SELECT$1:
                case INPUT$1:
                    _this_1.setInput();
                    break;
                case BLUR$1:
                    _this_1.setBlur();
                    break;
                case CLICK:
                    _this_1.setClick(_this_1.getValue(events[eventName]));
                    break;
            }
            if (isSubscribe && _this_1.isSubscribeProp(events[eventName]))
                _this_1.setPropSubscription(_this_1.getPropName(events[eventName]), EVENTS, eventName);
        });
    };
    /**
     * @param {?} functionName
     * @return {?}
     */
    ElementEventProcessor.prototype.setClick = function (functionName) {
        var _this_1 = this;
        this.element.onclick = function () {
            if (_this_1.controlConfig[functionName])
                _this_1.controlConfig[functionName].call(_this_1.controlConfig);
        };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ElementEventProcessor.prototype.setFocus = function (value) {
        var _this_1 = this;
        if (value && this.element.focus)
            setTimeout(function (t) { _this_1.element.focus(); }, 1000);
    };
    /**
     * @return {?}
     */
    ElementEventProcessor.prototype.setBlur = function () {
        var _this_1 = this;
        var /** @type {?} */ listen = this.dynamicNodeConfig.renderer.listen(this.element, BLUR$1, function () {
            _this_1.dynamicNodeConfig.controlConfig.formControl.markAsTouched();
        });
        this.eventListeners.push(listen);
    };
    /**
     * @return {?}
     */
    ElementEventProcessor.prototype.setInput = function () {
        var _this_1 = this;
        var /** @type {?} */ listen = this.dynamicNodeConfig.renderer.listen(this.element, INPUT$1, function (v) {
            var /** @type {?} */ isPassed = true;
            if (_this_1.controlConfig.hooks && _this_1.controlConfig.hooks.preValue) {
                isPassed = _this_1.controlConfig.hooks.preValue.call(_this_1.controlConfig);
                if (!isPassed)
                    _this_1.controlConfig.formControl.patchValue(_this_1.controlConfig.formControl.value);
            }
            if (isPassed) {
                _this_1.setControlConfigValue(v.target);
                if (_this_1.controlConfig.hooks && _this_1.controlConfig.hooks.postValue)
                    _this_1.controlConfig.hooks.postValue.call(_this_1.controlConfig);
            }
            _this_1.controlConfig.formControl.markAsDirty();
        });
        this.eventListeners.push(listen);
    };
    return ElementEventProcessor;
}(ElementAccessor));
/**
 * @abstract
 */
var ElementPropsAccessor = /** @class */ (function (_super_1) {
    __extends(ElementPropsAccessor, _super_1);
    /**
     * @param {?} dynamicNodeConfig
     */
    function ElementPropsAccessor(dynamicNodeConfig) {
        var _this_1 = _super_1.call(this, dynamicNodeConfig) || this;
        _this_1.oldAdditionalClasses = [];
        _this_1.oldClasses = [];
        return _this_1;
    }
    /**
     * @param {?} attr
     * @param {?} isSubscribe
     * @return {?}
     */
    ElementPropsAccessor.prototype.bindAttribute = function (attr, isSubscribe) {
        var _this_1 = this;
        Object.keys(attr).forEach(function (attributeName) {
            var /** @type {?} */ value = (attributeName !== STYLE) ? _this_1.getValue(attr[attributeName]) : attr[attributeName];
            switch (attributeName) {
                case ADDITIONAL_CLASS:
                case CLASS:
                    _this_1.setClass(value, attributeName);
                    break;
                case STYLE:
                    Object.keys(attr[attributeName]).forEach(function (x) {
                        var /** @type {?} */ value = _this_1.getValue(attr[attributeName][x]);
                        _this_1.setStyleProp(x, value);
                        if (isSubscribe && _this_1.isSubscribeProp(attr[attributeName][x]))
                            _this_1.setPropSubscription(attr[attributeName][x], ATTR, x, '', STYLE);
                    });
                    break;
                default:
                    _this_1.addOrRemoveAttribute(attributeName, value);
                    break;
            }
            if (isSubscribe && attributeName !== STYLE && _this_1.isSubscribeProp(attr[attributeName]))
                _this_1.setPropSubscription(attr[attributeName], ATTR, attributeName);
        });
    };
    /**
     * @param {?} prop
     * @param {?} isSubscribe
     * @return {?}
     */
    ElementPropsAccessor.prototype.bindProp = function (prop, isSubscribe) {
        var _this_1 = this;
        Object.keys(prop).forEach(function (propName) {
            var /** @type {?} */ value = _this_1.getValue(prop[propName]);
            if (value)
                _this_1.setProperty(propName, value);
            if (isSubscribe && _this_1.isSubscribeProp(prop[propName]))
                _this_1.setPropSubscription(prop[propName], PROP, propName);
        });
    };
    /**
     * @param {?} classes
     * @param {?} type
     * @return {?}
     */
    ElementPropsAccessor.prototype.setClass = function (classes, type) {
        classes = this.getClassNames(type == ADDITIONAL_CLASS ? this.dynamicNodeConfig.additionalClasses.class : classes);
        type == ADDITIONAL_CLASS ? this.addOrRemoveClasses(this.oldAdditionalClasses, false) : this.addOrRemoveClasses(this.oldClasses, false);
        this.addOrRemoveClasses(classes);
        switch (type) {
            case ADDITIONAL_CLASS:
                this.oldAdditionalClasses = classes;
                break;
            case CLASS:
                this.oldClasses = classes;
                break;
        }
    };
    /**
     * @param {?} propName
     * @param {?} value
     * @return {?}
     */
    ElementPropsAccessor.prototype.setStyleProp = function (propName, value) {
        switch (propName) {
            case DISPLAY:
                value = (typeof value == BOOLEAN$1$1) ? value : !(value);
                value = (value) ? NONE : BLANK$1;
                break;
        }
        this.addOrRemoveStyle(propName, value);
    };
    /**
     * @param {?} propertyName
     * @param {?} value
     * @return {?}
     */
    ElementPropsAccessor.prototype.setProperty = function (propertyName, value) {
        this.dynamicNodeConfig.renderer.setProperty(this.element, propertyName, value);
    };
    /**
     * @param {?} classes
     * @param {?=} isAdd
     * @return {?}
     */
    ElementPropsAccessor.prototype.addOrRemoveClasses = function (classes, isAdd) {
        var _this_1 = this;
        if (isAdd === void 0) { isAdd = true; }
        if (isAdd)
            classes.forEach(function (t) { return _this_1.dynamicNodeConfig.renderer.addClass(_this_1.element, t); });
        else
            classes.forEach(function (t) { return _this_1.dynamicNodeConfig.renderer.removeClass(_this_1.element, t); });
    };
    /**
     * @param {?} styleName
     * @param {?} value
     * @return {?}
     */
    ElementPropsAccessor.prototype.addOrRemoveStyle = function (styleName, value) {
        if (value)
            this.dynamicNodeConfig.renderer.setStyle(this.element, styleName, value);
        else
            this.dynamicNodeConfig.renderer.removeStyle(this.element, styleName);
    };
    /**
     * @param {?} attributeName
     * @param {?} value
     * @return {?}
     */
    ElementPropsAccessor.prototype.addOrRemoveAttribute = function (attributeName, value) {
        if (value)
            this.dynamicNodeConfig.renderer.setAttribute(this.element, attributeName, value);
        else
            this.dynamicNodeConfig.renderer.removeAttribute(this.element, attributeName);
    };
    /**
     * @param {?} classes
     * @return {?}
     */
    ElementPropsAccessor.prototype.getClassNames = function (classes) {
        var _this_1 = this;
        var /** @type {?} */ elementClasses = [];
        if (classes)
            classes.forEach(function (t) {
                if (typeof t == STRING$1)
                    elementClasses.push(t);
                else if (typeof t == FUNCTION$1) {
                    var /** @type {?} */ elementClass = t.call(_this_1.controlConfig);
                    if (elementClass && !Array.isArray(elementClass))
                        elementClasses.push(elementClass);
                    else if (Array.isArray(elementClass))
                        elementClass.forEach(function (x) { return elementClasses.push(x); });
                }
            });
        return elementClasses;
    };
    return ElementPropsAccessor;
}(ElementEventProcessor));
var VALUE = "value";
/**
 * @abstract
 */
var OverrideObjectProp = /** @class */ (function (_super_1) {
    __extends(OverrideObjectProp, _super_1);
    /**
     * @param {?} dynamicNodeConfig
     */
    function OverrideObjectProp(dynamicNodeConfig) {
        return _super_1.call(this, dynamicNodeConfig) || this;
    }
    /**
     * @return {?}
     */
    OverrideObjectProp.prototype.overrideValueProp = function () {
        var _this_1 = this;
        var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.controlConfig), VALUE);
        var /** @type {?} */ value = this.controlConfig.value;
        var /** @type {?} */ oldValue = null;
        Object.defineProperty(this.controlConfig, VALUE, {
            get: function () { return descriptor ? descriptor.get.call(_this_1.controlConfig) : value; },
            set: function (v) {
                value = v;
                if (_this_1.controlConfig.formControl.value != v) {
                    _this_1.controlConfig.formControl.setValue(v);
                    _this_1.resetElementValue(v);
                    _this_1.controlConfig.value = v;
                }
                else {
                    _this_1.controlConfig.notifyValueChanged(VALUE, v, oldValue);
                    if (descriptor)
                        descriptor.set.call(_this_1.controlConfig, v);
                    _this_1.controlConfig.refresh();
                }
                _this_1.controlConfig.config.value = v;
                oldValue = v;
            }
        });
        this.overrideFormControlProp();
        if (this.controlConfig.formControl.value)
            this.resetElementValue(this.controlConfig.formControl.value);
    };
    /**
     * @return {?}
     */
    OverrideObjectProp.prototype.overrideFormControlProp = function () {
        var _this_1 = this;
        var /** @type {?} */ value = this.controlConfig.formControl.value;
        Object.defineProperty(this.controlConfig.formControl, VALUE, {
            get: function () { return value; },
            set: function (v) {
                value = v;
                var /** @type {?} */ t = setTimeout(function () {
                    if (value != _this_1.controlConfig.value) {
                        _this_1.controlConfig.value = value;
                        _this_1.resetElementValue(value);
                    }
                }, 50);
            }
        });
    };
    return OverrideObjectProp;
}(ElementPropsAccessor));
var DomManipulation = /** @class */ (function (_super_1) {
    __extends(DomManipulation, _super_1);
    /**
     * @param {?} parentNode
     * @param {?} elementName
     * @param {?} dynamicNodeConfig
     */
    function DomManipulation(parentNode, elementName, dynamicNodeConfig) {
        var _this_1 = _super_1.call(this, dynamicNodeConfig) || this;
        _this_1.subscribers = [];
        _this_1.elementIndex = 0;
        _this_1.eventListeners = [];
        _this_1.actionListeners = {};
        _this_1.elementClasses = [];
        _this_1.nodeName = elementName;
        _super_1.prototype.createNodeElement.call(_this_1, parentNode, elementName);
        _this_1.bindAdditionalClasses();
        _this_1.controlId = ControlState.controlId = ControlState.controlId + 1;
        ControlState.controls[_this_1.controlId] = _this_1;
        _this_1.addOrRemoveAttribute("data-rxwebid", _this_1.controlId);
        return _this_1;
    }
    /**
     * @param {?} jObject
     * @param {?} isSubscribe
     * @return {?}
     */
    DomManipulation.prototype.parseObject = function (jObject, isSubscribe) {
        this.domConfig = jObject;
        this.process(jObject, isSubscribe);
        this.overrideProp();
        this.subscribeValueChange();
    };
    /**
     * @return {?}
     */
    DomManipulation.prototype.subscribeValueChange = function () {
        var _this_1 = this;
        if (Object.keys(this.subscribeProps).length > 0)
            this.controlConfig.onPropValueChanged(this.controlId, this.subscribeProps, function (x, y) {
                _this_1.process(x, false);
            });
    };
    /**
     * @param {?} jObject
     * @param {?} isSubscribe
     * @return {?}
     */
    DomManipulation.prototype.process = function (jObject, isSubscribe) {
        var _this_1 = this;
        Object.keys(jObject).forEach(function (propName) {
            switch (propName) {
                case PROP:
                    _this_1.bindProp(jObject[propName], isSubscribe);
                    break;
                case ATTR:
                    _this_1.bindAttribute(jObject[propName], isSubscribe);
                    break;
                case EVENTS:
                    _this_1.bindEvents(jObject[propName], isSubscribe);
                    break;
                case SOURCE:
                    if (!isSubscribe) {
                        while (_this_1.element.firstElementChild)
                            _this_1.removeChildren(_this_1.element.firstElementChild);
                        _this_1.dynamicNodeConfig.controlConfigProcessor.createChildrens(_this_1.dynamicNodeConfig.collections, _this_1, _this_1.controlConfig, _this_1.dynamicNodeConfig.additionalClasses, false);
                    }
                    else
                        _this_1.setPropSubscription(SOURCE, SOURCE, SOURCE);
                    break;
            }
        });
    };
    /**
     * @return {?}
     */
    DomManipulation.prototype.overrideProp = function () {
        switch (this.nodeName) {
            case INPUT$1:
            case SELECT$1:
            case TEXTAREA$1:
                if (this.domConfig.overrideProp == undefined || this.domConfig.overrideProp)
                    this.overrideValueProp();
                this.setPropSubscription(READONLY, ATTR, ADDITIONAL_CLASS, ADDITIONAL_CLASS);
                break;
        }
    };
    /**
     * @return {?}
     */
    DomManipulation.prototype.bindAdditionalClasses = function () {
        var _this_1 = this;
        var /** @type {?} */ additionalClasses = this.dynamicNodeConfig.additionalClasses;
        if (additionalClasses && additionalClasses.class) {
            this.setClass(additionalClasses.class, ADDITIONAL_CLASS);
            if (additionalClasses.listenerProps)
                additionalClasses.listenerProps.forEach(function (t) { return _this_1.setPropSubscription(t, ATTR, ADDITIONAL_CLASS, ADDITIONAL_CLASS); });
        }
    };
    /**
     * @return {?}
     */
    DomManipulation.prototype.destroy = function () {
        var /** @type {?} */ eventCount = this.eventListeners.length;
        for (var /** @type {?} */ i = 0; i < eventCount; i++) {
            this.eventListeners[0]();
            this.eventListeners.splice(0, 1);
        }
        this.eventListeners = [];
        this.element.onClick = null;
        this.element.parentElement.removeChild(this.element);
        this.controlConfig.destroy(this.controlId);
    };
    return DomManipulation;
}(OverrideObjectProp));
var ControlConfigProcessor = /** @class */ (function () {
    /**
     * @param {?} element
     * @param {?} renderer
     */
    function ControlConfigProcessor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.isBuild = false;
    }
    Object.defineProperty(ControlConfigProcessor.prototype, "viewMode", {
        /**
         * @return {?}
         */
        get: function () {
            return this._viewMode;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._viewMode = value;
            if (this.isBuild)
                this.build();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlConfigProcessor.prototype, "currentViewMode", {
        /**
         * @return {?}
         */
        get: function () {
            return DYNAMIC_ELEMENT_DESIGN_TREE.viewMode[this.viewMode];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} name
     * @return {?}
     */
    ControlConfigProcessor.prototype.getView = function (name) {
        return DYNAMIC_ELEMENT_DESIGN_TREE[name];
    };
    Object.defineProperty(ControlConfigProcessor.prototype, "viewClassPath", {
        /**
         * @return {?}
         */
        get: function () {
            return BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ControlConfigProcessor.prototype.build = function () {
        var _this_1 = this;
        this.uiBindings.forEach(function (controlConfigName) {
            _this_1.designForm(controlConfigName, _this_1.element, _this_1.currentViewMode[0], _this_1.currentViewMode[1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[_this_1.viewMode]);
        });
    };
    /**
     * @param {?} controlConfigName
     * @param {?} element
     * @param {?} viewRoot
     * @param {?} viewChild
     * @param {?} classPath
     * @param {?=} childrenControlConfig
     * @return {?}
     */
    ControlConfigProcessor.prototype.designForm = function (controlConfigName, element, viewRoot, viewChild, classPath, childrenControlConfig) {
        var _this_1 = this;
        var /** @type {?} */ controlConfig = childrenControlConfig || this.getControlConfig(controlConfigName);
        if (controlConfig) {
            if (controlConfig && !controlConfig.config.skipDefaultView)
                this.createElement(viewRoot, viewChild, element, controlConfig, classPath);
            else {
                var /** @type {?} */ currentView = this.getView(controlConfig.config.type);
                this.createElement(currentView[0], currentView[1], element, controlConfig, BOOTSTRAP_DESIGN_CONFIG.elementClassPath[controlConfig.config.type]);
            }
        }
        else if (this.viewMode == ADVANCE && Array.isArray(controlConfigName)) {
            var /** @type {?} */ config = {};
            var /** @type {?} */ domManipulation_1 = this.createElement(this.currentViewMode[0], [], element, config, BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[this.viewMode]);
            controlConfigName.forEach(function (t) {
                _this_1.designForm(t, domManipulation_1.element, _this_1.currentViewMode[1][0], _this_1.currentViewMode[1][1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[_this_1.viewMode].child["0"]);
            });
        }
    };
    /**
     * @param {?} elementName
     * @param {?} collections
     * @param {?} parentElement
     * @param {?} controlConfig
     * @param {?} elementClassPath
     * @return {?}
     */
    ControlConfigProcessor.prototype.createElement = function (elementName, collections, parentElement, controlConfig, elementClassPath) {
        var _this_1 = this;
        elementClassPath = elementClassPath ? elementClassPath : {};
        var /** @type {?} */ dynamicNodeConfig = {
            controlConfig: controlConfig, additionalClasses: elementClassPath, renderer: this.renderer, collections: collections, controlConfigProcessor: this
        };
        var /** @type {?} */ domManipulation = new DomManipulation(parentElement, elementName, dynamicNodeConfig);
        this.createChildrens(collections, domManipulation, controlConfig, elementClassPath);
        if (controlConfig.config && controlConfig.config.childrens && controlConfig.config.childrens.length > 0) {
            controlConfig.config.childrens.forEach(function (t, i) {
                var /** @type {?} */ childrenControlConfig = undefined;
                if (!(typeof t == STRING$1) && !Array.isArray(t))
                    childrenControlConfig = new ControlConfig(Object.assign({}, t, { skipDefaultView: true }), {});
                _this_1.designForm(t, domManipulation.element, _this_1.currentViewMode[0], _this_1.currentViewMode[1], BOOTSTRAP_DESIGN_CONFIG.elementClassPath.viewMode[_this_1.viewMode], childrenControlConfig);
            });
        }
        return domManipulation;
    };
    /**
     * @param {?} collections
     * @param {?} domManipulation
     * @param {?} controlConfig
     * @param {?} elementClassPath
     * @param {?=} isSubscribe
     * @return {?}
     */
    ControlConfigProcessor.prototype.createChildrens = function (collections, domManipulation, controlConfig, elementClassPath, isSubscribe) {
        var _this_1 = this;
        if (isSubscribe === void 0) { isSubscribe = true; }
        var /** @type {?} */ elementCount = 0;
        var /** @type {?} */ childElementsClassConfig = elementClassPath.child ? elementClassPath.child : {};
        for (var /** @type {?} */ i = 0; i < collections.length; i++) {
            var /** @type {?} */ collection = collections[i];
            if (!ApplicationUtil$1.isObject(collection)) {
                if (this.isCreateElement(collections[i], controlConfig)) {
                    if (collection == SQUARE_CONTROL && controlConfig.config.type == undefined && controlConfig.config.childControlConfigs) {
                        controlConfig.config.childControlConfigs.forEach(function (x) {
                            var /** @type {?} */ childControlConfig = _this_1.getControlConfig(x);
                            _this_1.createChildNodes(collections, childControlConfig, childElementsClassConfig, elementCount, i, domManipulation);
                        });
                    }
                    else {
                        var /** @type {?} */ isIncrease = this.createChildNodes(collections, controlConfig, childElementsClassConfig, elementCount, i, domManipulation);
                        if (isIncrease)
                            i = i + 1;
                    }
                }
                elementCount++;
            }
            else {
                if (collection.for)
                    this.runForCollection(collection, domManipulation, controlConfig, elementClassPath);
                if (isSubscribe)
                    domManipulation.parseObject(collections[i], isSubscribe);
            }
        }
    };
    /**
     * @param {?} collections
     * @param {?} controlConfig
     * @param {?} childElementsClassConfig
     * @param {?} elementCount
     * @param {?} i
     * @param {?} domManipulation
     * @return {?}
     */
    ControlConfigProcessor.prototype.createChildNodes = function (collections, controlConfig, childElementsClassConfig, elementCount, i, domManipulation) {
        var /** @type {?} */ isNextCollection = false;
        var /** @type {?} */ nextCollection = this.getCollection(collections[i], controlConfig);
        var /** @type {?} */ childClasses = this.getAdditionalClasses(collections[i], childElementsClassConfig, elementCount, controlConfig);
        if (!nextCollection) {
            nextCollection = [collections[i], collections[i + 1]];
            isNextCollection = true;
        }
        this.createElement(nextCollection[0], nextCollection[1], domManipulation.element, controlConfig, childClasses);
        return isNextCollection;
    };
    /**
     * @param {?} collection
     * @param {?} domManipulation
     * @param {?} controlConfig
     * @param {?} elementClassPath
     * @return {?}
     */
    ControlConfigProcessor.prototype.runForCollection = function (collection, domManipulation, controlConfig, elementClassPath) {
        var _this_1 = this;
        Object.keys(collection.for).forEach(function (t) {
            var /** @type {?} */ source = objectPropValue(t, controlConfig);
            source.forEach(function (x, index) {
                var /** @type {?} */ item = collection.for[t].call(controlConfig, x, index);
                _this_1.createChildrens(item, domManipulation, controlConfig, elementClassPath);
            });
        });
    };
    /**
     * @param {?} name
     * @param {?} childClasses
     * @param {?} index
     * @param {?} controlConfig
     * @return {?}
     */
    ControlConfigProcessor.prototype.getAdditionalClasses = function (name, childClasses, index, controlConfig) {
        name = this.getName(name, controlConfig);
        var /** @type {?} */ additionalClasses = BOOTSTRAP_DESIGN_CONFIG.elementClassPath[name];
        var /** @type {?} */ childrenClasses = childClasses[index] ? childClasses[index] : {
            class: []
        };
        if (additionalClasses) {
            if (childrenClasses.class)
                additionalClasses = { class: additionalClasses.class.concat(childrenClasses.class), listenerProps: additionalClasses.listenerProps, child: additionalClasses.child };
            return additionalClasses;
        }
        return childrenClasses;
    };
    /**
     * @param {?} name
     * @param {?} controlConfig
     * @return {?}
     */
    ControlConfigProcessor.prototype.getCollection = function (name, controlConfig) {
        if (name[0] == "[") {
            name = this.getName(name, controlConfig);
            return DYNAMIC_ELEMENT_DESIGN_TREE[name];
        }
        return undefined;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ControlConfigProcessor.prototype.getControlName = function (name) {
        var /** @type {?} */ controlName = '';
        switch (name) {
            case RANGE:
            case FILE$1:
            case TEXT:
                controlName = INPUT$1;
                break;
            default:
                controlName = name;
        }
        return controlName;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ControlConfigProcessor.prototype.getControlConfig = function (name) {
        return this.dynamicFormBuildConfig.controlsConfig[name];
    };
    /**
     * @param {?} name
     * @param {?} controlConfig
     * @return {?}
     */
    ControlConfigProcessor.prototype.getName = function (name, controlConfig) {
        name = name.replace(new RegExp(/\[/g), '').replace(new RegExp(/\]/g), '');
        name = (name == CONTROL) ? this.getControlName(controlConfig.config.type) : name;
        switch (name) {
            case INPUT$1:
                name = this.prependControl(name, controlConfig);
                break;
            case INPUT_TEXT:
                name = INPUT$1;
                break;
        }
        return name;
    };
    /**
     * @param {?} name
     * @param {?} controlConfig
     * @return {?}
     */
    ControlConfigProcessor.prototype.prependControl = function (name, controlConfig) {
        if (controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.right && controlConfig.config.ui.prependText.left)
            name = PREPEND_BOTH;
        else if (name == INPUT$1 && controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.left)
            name = PREPEND_LEFT;
        else if (name == INPUT$1 && controlConfig.config.ui && controlConfig.config.ui.prependText && controlConfig.config.ui.prependText.right)
            name = PREPEND_RIGHT;
        return name;
    };
    /**
     * @param {?} collection
     * @param {?} controlConfig
     * @return {?}
     */
    ControlConfigProcessor.prototype.isCreateElement = function (collection, controlConfig) {
        var /** @type {?} */ isCreate = true;
        switch (collection) {
            case SQUARE_LABEL:
                isCreate = controlConfig.label != undefined;
                break;
            case SQUARE_SMALL:
                isCreate = controlConfig.description != undefined;
                break;
            case SQUARE_ERROR:
                isCreate = controlConfig.formControl != undefined && controlConfig.formControl.validator != undefined;
                break;
        }
        return isCreate;
    };
    return ControlConfigProcessor;
}());
ControlConfigProcessor.propDecorators = {
    'dynamicFormBuildConfig': [{ type: Input, args: ['rxwebDynamicForm',] },],
    'viewMode': [{ type: Input },],
    'uiBindings': [{ type: Input },],
};
var RxDynamicFormDirective = /** @class */ (function (_super_1) {
    __extends(RxDynamicFormDirective, _super_1);
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    function RxDynamicFormDirective(elementRef, renderer) {
        return _super_1.call(this, elementRef.nativeElement, renderer) || this;
    }
    /**
     * @return {?}
     */
    RxDynamicFormDirective.prototype.ngOnInit = function () {
        this.build();
    };
    /**
     * @param {?} element
     * @return {?}
     */
    RxDynamicFormDirective.prototype.removeChildren = function (element) {
        while (element.firstElementChild)
            this.removeChildren(element.firstElementChild);
        var /** @type {?} */ controlId = element.getAttribute("data-rxwebid");
        if (controlId && ControlState.controls[controlId]) {
            ControlState.controls[controlId].destroy();
            delete ControlState.controls[controlId];
        }
    };
    /**
     * @return {?}
     */
    RxDynamicFormDirective.prototype.ngOnDestroy = function () {
        if (this.element)
            this.removeChildren(this.element);
    };
    return RxDynamicFormDirective;
}(ControlConfigProcessor));
RxDynamicFormDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rxwebDynamicForm]'
            },] },
];
/**
 * @nocollapse
 */
RxDynamicFormDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
var RxReactiveDynamicFormsModule = /** @class */ (function () {
    function RxReactiveDynamicFormsModule() {
    }
    /**
     * @return {?}
     */
    RxReactiveDynamicFormsModule.forRoot = function () { return { ngModule: RxReactiveDynamicFormsModule, providers: [] }; };
    return RxReactiveDynamicFormsModule;
}());
RxReactiveDynamicFormsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [RxDynamicFormDirective],
                imports: [CommonModule],
                providers: [RxDynamicFormBuilder],
                exports: [RxDynamicFormDirective]
            },] },
];
/**
 * @nocollapse
 */
RxReactiveDynamicFormsModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { RxDynamicFormBuilder, RxReactiveDynamicFormsModule, FormControlConfig, ControlConfig, BOOSTRAP_CLASS_CONFIG, BOOTSTRAP_DESIGN_CONFIG, DYNAMIC_ELEMENT_DESIGN_TREE, RxDynamicFormDirective as ɵa, ControlConfigProcessor as ɵb, BaseFormControlConfig as ɵc, PropDescriptor as ɵd, ValueChangeNotification as ɵe };
//# sourceMappingURL=reactive-dynamic-forms.es5.js.map
