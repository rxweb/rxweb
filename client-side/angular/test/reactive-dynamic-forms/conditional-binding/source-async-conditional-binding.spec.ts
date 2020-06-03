import { fakeAsync, tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElements} from '../base/element-checker'
import { SourceAsyncConditionalModel } from '../models/conditional-models/source-async-conditional.model'
describe('FormControlConfig Properties', () => {

    describe('conditional-async-source', () => {

        it('Bind conditionally state dropdown based upon country selection', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'sourceAsync', model: SourceAsyncConditionalModel }],
            }
            let options = inputProcessor({ uiBindings: ["country", "state"], dynamicFormConfiguration: dynamicFormConfiguration, component: BindingComponent, serverData: [{ name: "country", type: "select", source: [{ text: "India", value: 1 }, { text: "US", value: 2 }, { text: "Canada", value: 3 }] }, { name: "state", modelName: 'sourceAsync', type: "select"}], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.state.source).toEqual([]);
            let elements = getElements(options.nativeElement, "select");
            elements[0].value = 1;
            elements[0].dispatchEvent(new Event("input"));
            tick(100);
            expect(elements[1].options.length).toEqual(3);
        }));

        //end
    })

})