import { fakeAsync, tick } from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElements } from '../base/element-checker'
import { ConditionalLabelModel } from '../models/conditional-models/conditional-label-model'

describe('FormControlConfig Properties', () => {

    describe('conditional-label', () => {

        it('Bind label conditionally in lastName control when firstName control value is "Bharat"', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'conditionalLabel', model: ConditionalLabelModel }],
            }
            let options = inputProcessor({ uiBindings: ["firstName", "lastName"], dynamicFormConfiguration: dynamicFormConfiguration, component: BindingComponent, serverData: [{ name: "firstName", type: "text" }, { name: "lastName", modelName: 'conditionalLabel', type: "text", ui: { label: 'Last Name' } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.label).toEqual('Last Name');
            let elements = getElements(options.nativeElement, "input");
            let labelElements = getElements(options.nativeElement, "label");
            expect(labelElements[0].innerText).toEqual("Last Name");
            elements[0].value = "Bharat";
            elements[0].dispatchEvent(new Event("input"));
            tick(100);
            expect(labelElements[0].innerText).toEqual("Enter Your Last Name");
        }));

        //end
    })

})