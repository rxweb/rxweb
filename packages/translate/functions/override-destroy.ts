import { MultiLingualData } from "../core/multilingual-data";

export function overrideDestroyMethod(model: Function, name: string) {
    console.log(name);
    let onDestroy = model.prototype.ngOnDestroy;
    model.prototype.ngOnDestroy = function () {
        MultiLingualData.remove(name);
        console.log(name);
        if (onDestroy)
            onDestroy();
    }
}