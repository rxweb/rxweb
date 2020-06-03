import { FileProcessor } from "./file-processor"
import { rxWebConfig } from "../core/rxweb-config";
import { Notify } from "../core/notify";
import { MESSAGES } from "../const/message";
export class IoOperation extends FileProcessor {
    constructor() { super(); }

    setupFolder() {
        if (rxWebConfig.config && rxWebConfig.config.translate && rxWebConfig.config.translate.path && rxWebConfig.config.translate.path.i18n && rxWebConfig.config.translate.path.generate && rxWebConfig.config.translate.path.generate.interface && rxWebConfig.config.translate.path.component && this.exists(rxWebConfig.config.translate.path.component)) {
            this.create(rxWebConfig.config.translate.path.i18n);
            if (rxWebConfig.config.translate.allowedLanguages)
                rxWebConfig.config.translate.allowedLanguages.forEach(language => {
                    let folderPath = `${rxWebConfig.config.translate.path.i18n}/${language}`
                    this.create(folderPath);
                    let filePath = `${folderPath}/global.${language}.json`;
                    if (!this.exists(filePath))
                        this.createJSONFile(filePath, {});
                })
            this.create(rxWebConfig.config.translate.path.generate.interface)
        } else
            Notify.error(MESSAGES.folderPathNotFound)
    }

}
