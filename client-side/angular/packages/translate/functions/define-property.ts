import { MultiLingualData } from "../core/multilingual-data";
import { TranslateModel } from '../model/translate.model';
import { getKeyName } from "./get-key-name";
import { translateConfigContainer } from "../core/translate-config-container";
import { viewRefContainer } from "../core/view-ref-container";

export function defineProperty(model: Function, propertyName: string, modelName: string,languageCode:string,filePath:string) {
    let data = null;
    Object.defineProperty(model.prototype, propertyName, {
        get: function () {
            let keyName = getKeyName(modelName, languageCode, filePath);
            data = MultiLingualData.get(keyName);
            let refMarkedId = this["__ngContext__"] ?  this["__ngContext__"].rxRefMarkedId : 0;
            let translationModelData = MultiLingualData.getComponentPropValue(keyName, this.constructor, refMarkedId );
            if ((data && !translationModelData))
                if (!translateConfigContainer.loading) {
                    refMarkedId  = viewRefContainer.create(this);
                    MultiLingualData.addOrUpdateComponent(keyName, new TranslateModel({ ...data }, this, modelName, {}), this.constructor, refMarkedId);
                }
                else
                    return new TranslateModel(data, {}, modelName, {});
            let value = MultiLingualData.getComponentPropValue(keyName, this.constructor, refMarkedId);
            return value === undefined ? {} : value;
        },
        enumerable: true,
        configurable: true
    })
}
