import { MultiLingualData } from "../core/multilingual-data";
import { TranslateModel } from '../model/translate.model';
import { getKeyName } from "./get-key-name";
import { translateConfigContainer } from "../core/translate-config-container";

export function defineProperty(model: Function, propertyName: string, modelName: string,languageCode:string) {
    let data = null;
    Object.defineProperty(model.prototype, propertyName, {
        get: function () {
            let keyName = getKeyName(modelName, languageCode);
            data = MultiLingualData.get(keyName);
            let translationModelData = MultiLingualData.getComponentPropValue(keyName, this.constructor);
            if ((data && !translationModelData))
                if (!translateConfigContainer.loading)
                    MultiLingualData.addOrUpdateComponent(keyName, new TranslateModel({ ...data }, this), this.constructor);
                else
                    return new TranslateModel(data, {});
            let value = MultiLingualData.getComponentPropValue(keyName, this.constructor);
            return value === undefined ? {} : value;
        },
        enumerable: true,
        configurable: true
    })
}
