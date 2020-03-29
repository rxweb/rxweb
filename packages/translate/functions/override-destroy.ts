import { MultiLingualData } from "../core/multilingual-data";

export function overrideDestroyMethod(model: Function, name: string) {
    let onDestroy = model.prototype.ngOnDestroy;
    model.prototype.ngOnDestroy = function () {
        MultiLingualData.remove(name);
        if (onDestroy)
            onDestroy();
    }
}
