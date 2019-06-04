import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "./components/binding.component"
import { ReactiveFormConfig, FormControlConfig, action } from "@rxweb/reactive-form-validators"
import { inputProcessor } from '../component-processor/input-processor';
import { selectChecker } from '../component-processor/element-checker';
@action([
    {
        keyName: 'asyncSource',
        actions: {
            filter: function () {
                let promise = new Promise<any[]>((resolve, reject) => {
                    resolve(this.config.source.filter(t => t.countryId == this.dynamicModel.countryId.value));
                });
                return promise
            }
        }
    },
    {
    keyName:'nonAsyncSource',
    actions: {
        filter: function () {
            if (this.controlsConfig && this.controlsConfig.countryId)
                return this.config.source.filter(t => t.countryId == this.controlsConfig.countryId.value);
            else
                return [];
        }
    }
}])
export class SourceModel extends FormControlConfig {
}

describe('FormControlConfig Properties', () => {

    describe('source', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('should pass with blank source.', fakeAsync(() => {
            let options = inputProcessor({
                component: BindingComponent,
                serverData: [
                    {
                        name: "countryId",
                        type: "select",
                        textPropName: 'countryName',
                        valuePropName: 'countryId',
                        source: [],
                    }], tagName: 'select',
                uiBindings: ['countryId']
            })
            expect(options.element.options.length).toEqual(1);
        }));

        it('should pass with undefined source.', fakeAsync(() => {
            let options = inputProcessor({
                component: BindingComponent,
                serverData: [
                    {
                        name: "countryId",
                        type: "select",
                        textPropName: 'countryName',
                        valuePropName: 'countryId',
                    }], tagName: 'select',
                uiBindings: ['countryId']
            })
            expect(options.element.options.length).toEqual(1);
        }));

        it('bind dropdown with country data.', fakeAsync(() => {
            let source = [{ countryId: 1, countryName: "India" }];
            let options = inputProcessor({
                component: BindingComponent,
                serverData: [
                    {
                        name: "countryId",
                        type: "select",
                        textPropName: 'countryName',
                        valuePropName: 'countryId',
                        source: source,
                    }], tagName: 'select',
                uiBindings:['countryId']
            })
            expect(options.element.options.length).toEqual(source.length + 1);
        }));

        it('stateid source should be blank.', fakeAsync(() => {
            let countrySource = [{ countryId: 1, countryName: "India" }, { countryId: 2, countryName: "Australia" }];
            let stateSource = [{ stateId: 1, stateName: "Gujarat", countryId: 1 }, { stateId: 2, stateName: "Delhi", countryId: 1 },{ stateId: 3, stateName: "Melbourne", countryId: 2 }]
            let options = inputProcessor({
                dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'source', model: SourceModel}] },
                component: BindingComponent,
                serverData: [
                    {
                        name: "countryId",
                        type: "select",
                        textPropName: 'countryName',
                        valuePropName: 'countryId',
                        source: countrySource,
                    },
                    {
                        modelName:'source',
                        actionKeyNames: ["nonAsyncSource"],
                        name: "stateId",
                        type: "select",
                        textPropName: 'stateName',
                        valuePropName: 'stateId',
                        source: stateSource,
                    }
                ], tagName: 'select',
                uiBindings: ['countryId','stateId']
            })
            selectChecker(options.nativeElement, { count: 2, optionsCount: countrySource.length, index: 0, tagName: 'select' })
            selectChecker(options.nativeElement, { count: 2, optionsCount: 0, index: 1, tagName: 'select' })
        }));

        it('country Australia source states should be bind in the dropdown of stateId.', fakeAsync(() => {
            let countrySource = [{ countryId: 1, countryName: "India" }, { countryId: 2, countryName: "Australia" }];
            let stateSource = [{ stateId: 1, stateName: "Gujarat", countryId: 1 }, { stateId: 2, stateName: "Delhi", countryId: 1 }, { stateId: 3, stateName: "Melbourne", countryId: 2 }]
            let options = inputProcessor({
                dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'source', model: SourceModel }] },
                component: BindingComponent,
                serverData: [
                    {
                        name: "countryId",
                        type: "select",
                        textPropName: 'countryName',
                        valuePropName: 'countryId',
                        source: countrySource,
                        value:2
                    },
                    {
                        modelName: 'source',
                        actionKeyNames: ["nonAsyncSource"],
                        name: "stateId",
                        type: "select",
                        textPropName: 'stateName',
                        valuePropName: 'stateId',
                        source: stateSource,
                    }
                ], tagName: 'select',
                uiBindings: ['countryId', 'stateId']
            })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.stateId.source.length).toEqual(1);
            selectChecker(options.nativeElement, { count: 2, optionsCount: countrySource.length, index: 0, tagName: 'select' })
            selectChecker(options.nativeElement, { count: 2, optionsCount: 1, index: 1, tagName: 'select' })
        }));

        //end
    })

})