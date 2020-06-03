import { fakeAsync, tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElements} from '../base/element-checker'
import { ConditionalDescriptionModel } from '../models/conditional-models/conditional-description-model'

describe('FormControlConfig Properties', () => {

    describe('conditional-description', () => {

        it('Bind description conditionally in lastName control when firstName control value is "Bharat"', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'conditionalDescription', model: ConditionalDescriptionModel }],
            }
            let options = inputProcessor({ uiBindings: ["firstName", "lastName"], dynamicFormConfiguration: dynamicFormConfiguration, component: BindingComponent, serverData: [{ name: "firstName", type: "text" }, { name: "lastName", modelName: 'conditionalDescription', type: "text", ui: {description:"Last Name"} }], tagName: 'input' })
            tick(100);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.description).toEqual('Last Name');
            let elements = getElements(options.nativeElement, "input");
            let smallElements = getElements(options.nativeElement, "small");
            expect(smallElements[0].innerText).toEqual("Last Name");
            elements[0].value = "Bharat";
            elements[0].dispatchEvent(new Event("input"));
            tick(100);
            expect(smallElements[0].innerText).toEqual("You can enter your last name");
        }));

        //end
    })

})