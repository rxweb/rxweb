import { fakeAsync, tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElements} from '../base/element-checker'
import { SourceSyncConditionalModel } from '../models/conditional-models/source-sync-conditional.model'
describe('FormControlConfig Properties', () => {

    describe('conditional-sync-source', () => {

        it('Bind conditionally state dropdown based upon country selection', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'sourceSync', model: SourceSyncConditionalModel }],
            }
            let options = inputProcessor({ uiBindings: ["country", "state"], dynamicFormConfiguration: dynamicFormConfiguration, component: BindingComponent, serverData: [{ name: "country", type: "select", source: [{ text: "India", value: 1 }, { text: "US", value: 2 }, { text: "Canada", value: 3 }] }, { name: "state", modelName: 'sourceSync', type: "select", filter: [{ text: "Gujarat", value: 1, countryId: 1 }, { text: "Delhi", value: 2, countryId: 1 }, { text: "NY", value: 3, countryId: 2 }], }], tagName: 'input' })
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