import { fakeAsync } from '@angular/core/testing';
import { BootstrapViewModeComponent } from "./bootstrap-view-mode.component"
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators"
import { inputProcessor } from '../../../services/component-processor/input-processor';

describe('Bootstrap UI', () => {

    describe('viewMode', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })

        it('view mode should be "bootstrap-basic".', fakeAsync(() => {
            let serverData = [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox" }];
            let options = inputProcessor({ component: BootstrapViewModeComponent, serverData: serverData, viewMode: 'bootstrap-basic', tagName: 'input' })
            let formGroupElements = options.nativeElement.getElementsByClassName("form-group");
            let formRowElements = options.nativeElement.getElementsByClassName("form-row");
            let inputElements = options.nativeElement.getElementsByTagName("input");
            expect(formGroupElements.length).toEqual(formRowElements.length);
            expect(inputElements.length).toEqual(serverData.length);
        }));

        it('view mode should be "bootstrap-horizontal".', fakeAsync(() => {
            let serverData = [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox" }];
            let options = inputProcessor({ component: BootstrapViewModeComponent, serverData: serverData, viewMode: 'bootstrap-horizontal', tagName: 'input' })
            let formGroupElements = options.nativeElement.getElementsByClassName("form-group");
            let formRowElements = options.nativeElement.getElementsByClassName("form-row");
            let inputElements = options.nativeElement.getElementsByTagName("input");
            expect(formGroupElements.length).toEqual(2);
            expect(formRowElements.length).toEqual(0);
            expect(inputElements.length).toEqual(serverData.length);
        }));

        it('view mode should be "bootstrap-advance".', fakeAsync(() => {
            let serverData = [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox" }];
            let options = inputProcessor({ component: BootstrapViewModeComponent, serverData: serverData, viewMode: 'bootstrap-advance', tagName: 'input' })
            let formGroupElements = options.nativeElement.getElementsByClassName("form-group");
            let formRowElements = options.nativeElement.getElementsByClassName("form-row");
            let inputElements = options.nativeElement.getElementsByTagName("input");
            expect(formGroupElements.length).toEqual(0);
            expect(formRowElements.length).toEqual(2);
            expect(inputElements.length).toEqual(serverData.length);
        }));

        //end
    })

})