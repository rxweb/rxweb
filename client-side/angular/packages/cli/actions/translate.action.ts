import { TranslateService, IoOperation } from "@rxweb/i18n";

import { translateSetupQuestions } from "../questions/translate.questions";
import { TranslateAnswerConfig } from "../interface/translate-answer-config";

export class TranslateAction {

    constructor(private args:string[]) {
        this.ioOperation = new IoOperation();
    }

    async perform() {
        if (!this.ioOperation.isExistsConfig) {
            let translateAnswer: TranslateAnswerConfig = await translateSetupQuestions();
            let translateService = new TranslateService();
            translateService.init(translateAnswer);
        } else if (this.args.length ==5 ) {
            let actionName = this.args[2];
            let optimize = this.args[3];
            if (actionName == "translate" && optimize == '-o') {
                let translateService = new TranslateService({ optimizePath: this.args[4] })
                translateService.init();
            }
        }
    }
    ioOperation: IoOperation;
}
