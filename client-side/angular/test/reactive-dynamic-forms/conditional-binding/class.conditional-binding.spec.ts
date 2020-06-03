import { fakeAsync, tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElements} from '../base/element-checker'
import { ConditionalClassModel } from '../models/conditional-models/conditional-class-model'
describe('FormControlConfig Properties', () => {

    describe('conditional-class', () => {

        it('Bind class conditionally in lastName control when firstName control value is "Bharat"', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'conditionalClass', model: ConditionalClassModel }],
            }
            let options = inputProcessor({ uiBindings: ["firstName", "lastName"], dynamicFormConfiguration: dynamicFormConfiguration, component: BindingComponent, serverData: [{ name: "firstName", type: "text" }, { name: "lastName", modelName:'conditionalClass', type: "text" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.class).toEqual([]);
            let elements = getElements(options.nativeElement, "input");
            expect(elements[1].classList.length).toEqual(1);
            elements[0].value = "Bharat";
            elements[0].dispatchEvent(new Event("input"));
            tick(100);
            expect(elements[1].classList[1]).toEqual("conditional-class");
        }));

        //end
    })

})