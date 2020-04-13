import { MultiLingualData } from "../core/multilingual-data";
import { TranslateModel } from '../model/translate.model';
import { getKeyName } from "./get-key-name";
import { translateConfigContainer } from "../core/translate-config-container";

export function defineProperty(model: Function, propertyName: string, modelName: string) {
    let data = null;
    Object.defineProperty(model.prototype, propertyName, {
        get: function () {
            let keyName = getKeyName(modelName);
            data = MultiLingualData.get(keyName);
            if ((data && !(data instanceof TranslateModel)))
                if (!translateConfigContainer.loading)
                    MultiLingualData.addOrUpdate(keyName, new TranslateModel(data, this), modelName);
                else
                    return new TranslateModel(data, {});
            return MultiLingualData.get(keyName);
        },
        enumerable: true,
        configurable: true
    })
}
