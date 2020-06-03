import { fakeAsync } from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElement, getElementsByClassName } from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('input-addons', () => {

        it('bind  left addon.', fakeAsync(() => {
            let options = inputProcessor({
                uiBindings: ["email"], component: BindingComponent, serverData: [{ name: "email", type: "text", ui: { prependText: {left:"@"}} }], tagName: 'input'
            })
            let element = getElement(options.nativeElement, "input");
            let inputGroupElement = getElementsByClassName(options.nativeElement, "input-group")[0];
            let inputGroupPrependElement = getElementsByClassName(options.nativeElement, "input-group-prepend")[0];
            let inputGroupText = getElementsByClassName(options.nativeElement, "input-group-text")[0];
            expect(inputGroupElement).toBeTruthy();
            expect(inputGroupPrependElement).toBeTruthy();
            expect(inputGroupText).toBeTruthy();
            expect(inputGroupText.innerText).toEqual('@');
            expect(element).toBeTruthy();

        }));

        it('bind  right addon.', fakeAsync(() => {
            let options = inputProcessor({
                uiBindings: ["email"], component: BindingComponent, serverData: [{ name: "email", type: "text", ui: { prependText: { right: "@" } } }], tagName: 'input'
            })
            let element = getElement(options.nativeElement, "input");
            let inputGroupElement = getElementsByClassName(options.nativeElement, "input-group")[0];
            let inputGroupPrependElement = getElementsByClassName(options.nativeElement, "input-group-prepend")[0];
            let inputGroupText = getElementsByClassName(options.nativeElement, "input-group-text")[0];
            expect(inputGroupElement).toBeTruthy();
            expect(inputGroupPrependElement).toBeTruthy();
            expect(inputGroupText).toBeTruthy();
            expect(inputGroupText.innerText).toEqual('@');
            expect(element).toBeTruthy();

        }));

        it('bind  both addon.', fakeAsync(() => {
            let options = inputProcessor({
                uiBindings: ["email"], component: BindingComponent, serverData: [{ name: "email", type: "text", ui: { prependText: { right: "@", left: "E" } } }], tagName: 'input'
            })
            let element = getElement(options.nativeElement, "input");
            let inputGroupElements = getElementsByClassName(options.nativeElement, "input-group");
            let inputGroupPrependElements = getElementsByClassName(options.nativeElement, "input-group-prepend");
            let inputGroupTexts = getElementsByClassName(options.nativeElement, "input-group-text");
            expect(inputGroupElements[0]).toBeTruthy();
            expect(inputGroupPrependElements[0]).toBeTruthy();
            expect(inputGroupTexts[0]).toBeTruthy();
            expect(inputGroupTexts[0].innerText).toEqual('E');
            expect(element).toBeTruthy();
            expect(inputGroupPrependElements[1]).toBeTruthy();
            expect(inputGroupTexts[1]).toBeTruthy();
            expect(inputGroupTexts[1].innerText).toEqual('@');
        }));


        //end
    })

})