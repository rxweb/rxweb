import { RxHttp } from "@rxweb/http"
import { MultiLingualData } from "@rxweb/core"
import { frameworkContainer } from "./frameworkContainer";
import { ElementBinder } from "../interface/element-binder";
import { directiveElement } from "./directive-elements";
import { DIRECTIVE_MODEL_REFERENCE } from '../const/directive-class-reference'

export class CoreComponent extends RxHttp {
    private _componentId: string;
    private propListners: { [key: string]: any } = {};
    private isRequestPassed: boolean;
    private callOnInit: boolean = false;
    private languageCode: string;
    private ngOnInitFunc: Function;

    constructor() {
        super()
        this.languageCode = localStorage.getItem("lcode") || "en";
        var componentPropConfig = frameworkContainer.getDecoratorInfo(this.getConstructor());
        if (componentPropConfig) {
            var decoratorConfig = componentPropConfig.decorators.filter(t => t.type == "multilingual")[0];
            if (decoratorConfig)
                this.componentId = decoratorConfig.config.key;
        }
        if (this.componentId) {
            var data = MultiLingualData.get(`${this.componentId}`)
            if (!data) {
                this.httpGetAsync(`assets/localization/${this.componentId}-${this.languageCode}.json`, this.updateMultilingual.bind(this))
                this.ngOnInitFunc = this["ngOnInit"];
                this["ngOnInit"] = this.extendNgOnInit.bind(this);
            } else
                this.isRequestPassed = true;
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

    updateMultilingual(data) {
        if (data) {
            try {
                MultiLingualData.addOrUpdate(this.componentId, JSON.parse(data));
            } catch (ex) { }
        }
            
        this.isRequestPassed = true;
        if (this.callOnInit)
            this.onInit();
        if (this.ngOnInitFunc) {
            this.ngOnInitFunc();
        }
        
    }

    httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
            else if (xmlHttp.readyState == 4 && xmlHttp.status == 404)
                callback();
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    }

    onInit() {
        var t = setTimeout(() => { 
        if (this.isRequestPassed) {
            var directiveInfo = directiveElement.get(this.componentId);
            if (directiveInfo ) {
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
        } else
                this.callOnInit = true;
        })
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