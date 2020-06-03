Object.defineProperty(exports, "__esModule", { value: true });
const translate_action_1 = require("../actions/translate.action");
const chalk = require("chalk");
class RxWebCli {
    constructor(args) {
        this.args = args;
    }
    async execute() {
        let action = new translate_action_1.TranslateAction(this.args);
        await action.perform();
    }
}
exports.RxWebCli = RxWebCli;
try {
    let cli = new RxWebCli(process.argv);
    cli.execute();
}
catch (error) {
    console.log(chalk.redBright(error));
    process.exit(1);
}
//# sourceMappingURL=index.js.map