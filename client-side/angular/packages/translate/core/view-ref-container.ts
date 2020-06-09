import { ViewRef, ChangeDetectorRef } from "@angular/core";
import { RxChangeDetectorRef } from "../service/rx-change-detector-ref";
const NG_CONTEXT: string = "__ngContext__";
export const viewRefContainer:
    {
        create(instance: any): number
        markForCheck(): void;
        destroy(markId: number): void;
    } = new (class {
        viewRefs: Array<RxChangeDetectorRef> = new Array<RxChangeDetectorRef>();
        increment: number = 1;
        create(instance: any): number {
            var changeDetector = new RxChangeDetectorRef(instance);
            if (changeDetector.createViewRef())
                this.viewRefs.push(changeDetector);
            return instance[NG_CONTEXT] ? instance[NG_CONTEXT].rxRefMarkedId : 0;
        }

        markForCheck(): void {
            this.viewRefs.forEach(cd => {
                cd.markForCheck();
            })
        }

        destroy(instance:any): void {
            if (instance[NG_CONTEXT] && instance[NG_CONTEXT].rxRefMarkedId !== undefined) {
                let indexOf = this.viewRefs.findIndex(t => t.instance[NG_CONTEXT].rxRefMarkedId == instance[NG_CONTEXT].rxRefMarkedId);
                if (indexOf != -1)
                    this.viewRefs.splice(indexOf, 1);
            }
        }
    })();