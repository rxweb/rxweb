import { MultiLingualData } from "../core/multilingual-data";
import { translateContainer } from "../core/translate-container";

export function defineProperty(model: Function, propertyName: string, modelName: string) {
    Object.defineProperty(model.prototype, propertyName, {
        get: function () {
            return modelName ? MultiLingualData.get(modelName) : {};
        },
        enumerable: true,
        configurable: true
    })
}