import { MultiLingualData } from "../core/multilingual-data";
import { TranslateModel } from '../model/translate.model';

export function defineProperty(model: Function, propertyName: string, modelName: string) {
    let data = null;
    Object.defineProperty(model.prototype, propertyName, {
        get: function () {
            data = MultiLingualData.get(modelName);
            if ((data && !(data instanceof TranslateModel))) {
                MultiLingualData.addOrUpdate(modelName,new TranslateModel(data, this));
            }
            return modelName ? MultiLingualData.get(modelName) : {};
        },
        enumerable: true,
        configurable: true
    })
}
