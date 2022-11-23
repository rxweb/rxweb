Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@rxweb/i18n");
const translate_questions_1 = require("../questions/translate.questions");
class TranslateAction {
    constructor(args) {
        this.args = args;
        this.ioOperation = new i18n_1.IoOperation();
    }
    async perform() {
        if (!this.ioOperation.isExistsConfig) {
            let translateAnswer = await translate_questions_1.translateSetupQuestions();
            let translateService = new i18n_1.TranslateService();
            translateService.init(translateAnswer);
        }
        else if (this.args.length == 5) {
            let actionName = this.args[2];
            let optimize = this.args[3];
            if (actionName == "translate" && optimize == '-o') {
                let translateService = new i18n_1.TranslateService({ optimizePath: this.args[4] });
                translateService.init();
            }
        }
    }
}
exports.TranslateAction = TranslateAction;
//# sourceMappingURL=translate.action.js.map