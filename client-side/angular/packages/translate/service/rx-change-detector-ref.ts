import { ViewRef, ChangeDetectorRef } from "@angular/core";
import { MultiLingualData } from "../core/multilingual-data";
const NG_CONTEXT: string = "__ngContext__";
const NG_ELEMENT_ID: string = "__NG_ELEMENT_ID__";
const LVIEW: string = "_lView";
const CD_REF_INJECTING_VIEW: string = "_cdRefInjectingView";
const CONSTRUCTOR: string = "constructor";
export class RxChangeDetectorRef extends ChangeDetectorRef {
    viewRef: ViewRef;
    constructor(public instance: any) {
        super();
    }

    createViewRef() {
        if (this.instance[NG_CONTEXT] && this.instance[NG_CONTEXT].rxRefMarkedId === undefined) {
            let emulatedDom = this.instance[NG_CONTEXT][11];
            if (emulatedDom && emulatedDom.component && emulatedDom.component.onPush) {
                this.viewRef = super[CONSTRUCTOR][NG_ELEMENT_ID]();
                this.viewRef[LVIEW] = this.viewRef[CD_REF_INJECTING_VIEW] = this.instance[NG_CONTEXT][14];
            }
            this.setDestroyHooks();
            this.instance[NG_CONTEXT].rxRefMarkedId = Math.random();
        }
        return this.viewRef;
    }

    setDestroyHooks() {
        let tView = this.instance[NG_CONTEXT][1];
        if (!tView.destroyHooks)
            tView.destroyHooks = [this.instance[NG_CONTEXT].length - 1, () => { MultiLingualData.removeComponentPropValue(this.instance.constructor, this.instance[NG_CONTEXT].rxRefMarkedId) }]
        else
            tView.destroyHooks.push(this.instance[NG_CONTEXT].length - 1, () => {
                MultiLingualData.removeComponentPropValue(this.instance.constructor, this.instance[NG_CONTEXT].rxRefMarkedId)
            });
    }



    markForCheck(): void {
        this.viewRef.markForCheck();
    }
    detach(): void {
        throw new Error("Method not implemented.");
    }
    detectChanges(): void {
        throw new Error("Method not implemented.");
    }
    checkNoChanges(): void {
        throw new Error("Method not implemented.");
    }
    reattach(): void {
        throw new Error("Method not implemented.");
    }


}