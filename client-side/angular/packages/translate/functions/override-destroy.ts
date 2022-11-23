import { MultiLingualData } from "../core/multilingual-data";
import { viewRefContainer } from "../core/view-ref-container";

export function overrideDestroyMethod(model: Function, name: string) {
    let onDestroy = model.prototype.ngOnDestroy;
    model.prototype.ngOnDestroy = function () {
        MultiLingualData.remove(name);
        viewRefContainer.destroy(this);
        if (onDestroy)
            onDestroy.bind(this).call();
    }
}
