import { TranslateAction } from "../actions/translate.action";
import * as chalk from "chalk";
declare const process: any;
export class RxWebCli {
    constructor(private args: string[]) {
    }
    async execute() {
            let action = new TranslateAction(this.args);
            await action.perform();
    }
}



try {
    let cli = new RxWebCli(process.argv);
    cli.execute();
} catch (error) {
    console.log(chalk.redBright(error));
    process.exit(1);
}

