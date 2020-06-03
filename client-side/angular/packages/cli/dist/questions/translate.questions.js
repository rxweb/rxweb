Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const chalk = require("chalk");
async function translateSetupQuestions() {
    let questions = [
        {
            name: 'i18n',
            type: 'input',
            message: `What's the ${chalk.greenBright('i18n')} folder path you would like to assign, default(${chalk.blueBright('src/assets/i18n')}) :`,
        },
        {
            name: 'interface',
            type: 'input',
            message: `What's the ${chalk.greenBright('model generation')} folder path, default(${chalk.blueBright('src/app/i18n-models')}) :`,
        },
        {
            name: 'component',
            type: 'input',
            message: `Please point ${chalk.greenBright('components')} folder path, default('${chalk.blueBright('src/app')}) :`,
        },
        {
            name: 'ngxPackageInstallation',
            type: 'input',
            message: `Would you like to install '${chalk.greenBright('nbx-build-plus')}(https://bit.ly/2K9K3ov)'(Extend the Angular CLI's default build behavior without ejecting, In our case it's required for extracting keys from the template)?, default(y) y/n :`,
        }
    ];
    return inquirer.prompt(questions);
}
exports.translateSetupQuestions = translateSetupQuestions;
//# sourceMappingURL=translate.questions.js.map