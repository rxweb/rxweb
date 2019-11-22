import { RxHttp } from "@rxweb/http"
import { MultiLingualData } from "@rxweb/core"
import { frameworkContainer } from "./frameworkContainer";
import { ElementBinder } from "../interface/element-binder";
import { directiveElement } from "./directive-elements";
import { DIRECTIVE_MODEL_REFERENCE } from '../const/directive-class-reference'
import { FrameworkDecoratorConfig } from "../interface/component-decorator-config";

export class CoreComponent extends RxHttp {
    private _componentId: string;
    private propListners: { [key: string]: any } = {};
    private isRequestPassed: boolean;
    private isBind: boolean;
    private callOnInit: boolean = false;
    private languageCode: string;
    private ngOnInitFunc: Function;

    constructor() {
        super()
        var componentPropConfig = frameworkContainer.getDecoratorInfo(this.getConstructor());
        if (componentPropConfig) {
            var multiLingualDecorator = componentPropConfig.decorators.filter(t => t.type == "multilingual")[0];
            var authorizeDecorator = componentPropConfig.decorators.filter(t => t.type == "authorize")[0];
            if (authorizeDecorator || multiLingualDecorator) {
                this.ngOnInitFunc = this["ngOnInit"];
                this["ngOnInit"] = this.extendNgOnInit.bind(this);
            }
            if (authorizeDecorator) {
                var result = frameworkContainer.authorize.isAuthorize(authorizeDecorator.config);
                if (typeof result !== "boolean")
                    result.then(t => {
                        if (t)
                            this.callMultilingual(multiLingualDecorator);
                    });
                else
                    if (result && multiLingualDecorator)
                        this.callMultilingual(multiLingualDecorator);
                    else if (result)
                        this.callNgOnInit();
            } else {
                this.callMultilingual(multiLingualDecorator);
            }
        }
    }

    private callNgOnInit() {
        if (this.ngOnInitFunc) {
            this.ngOnInitFunc();
        }
    }

    private callMultilingual(multiLingualDecorator: FrameworkDecoratorConfig) {
        if (multiLingualDecorator) {
            this.componentId = multiLingualDecorator.config.key;
            var result = frameworkContainer.multilingual.load(multiLingualDecorator.config.key);
            if (typeof result !== "boolean") {
                result.then(x => {
                    this.callNgOnInit();
                })
            } else
                this.callNgOnInit();
        }
    }

    private extendNgOnInit() {
        this["ngOnInit"] = this.ngOnInitFunc;
    }

    set componentId(value: string) {
        this._componentId = value;
    }
    get componentId() {
        return this._componentId;
    }

    private getConstructor() {
        var ctr: any = this;
        return ctr.__proto__.constructor;
    }

    onInit() {
        if (!this.isBind) {
            var t = setTimeout(() => {
                var directiveInfo = directiveElement.get(this.componentId);
                if (directiveInfo) {
                    Object.keys(directiveInfo.directives).forEach(t => {
                        directiveInfo.directives[t].forEach(x => {
                            var model = DIRECTIVE_MODEL_REFERENCE[t];
                            var instance = this.getInstance(model, [{ ...x, componentId: this.componentId }]);
                            if (t == "rxSpinner")
                                this.overrideProp(x.propName, instance);
                            else
                                instance.bind();
                        })
                    })
                }
                this.isBind = true;
            })
        }
        
    }

    private overrideProp(name: string, elementBinder: ElementBinder) {
        var value = this[name];
        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), name);
        var oldValue = value;
        Object.defineProperty(
            this,
            name,
            {
                configurable: true,
                enumerable: true,
                get: () => {
                    return descriptor ? descriptor.get.call(this) : value;
                },
                set: (newValue: any) => {
                    if (value != newValue) {
                        elementBinder.valueChange(newValue)
                    }
                    value = newValue;
                }
            },
        );
        elementBinder.valueChange(value);
    }

    private getInstance(model: any, objectArguments: any[] = []) {
        let classInstance = Object.create(model.prototype)
        try {
            model.apply(classInstance, objectArguments);
        } catch (ex) {
            ///resolution of issue https://github.com/rxweb/rxweb/issues/188
            classInstance = Reflect.construct(model, objectArguments);
        }
        return classInstance;
    }
}