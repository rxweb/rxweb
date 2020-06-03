import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElement} from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('source', () => {

        it('bind source in select dropdown', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["countryId"], component: BindingComponent, serverData: [{ name: "countryId", type: "select", source: [{ value: 1, text: 'India' }, { value: 1, text: 'USA' }] }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.countryId.source).toEqual([{ value: 1, text: 'India' }, { value: 1, text: 'USA' }]);
            let element = getElement(options.nativeElement, "select");
            expect(element.options.length).toEqual(3);
        }));


        //end
    })

})