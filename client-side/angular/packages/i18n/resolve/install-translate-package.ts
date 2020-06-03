import { TranslateAnswerConfig } from "../interface/translate-answer-config";

const cmd = require('node-cmd')
export function installTranslatePackage(answer: TranslateAnswerConfig) {
    console.log("Installing Packages...")
    cmd.get(
        `npm install @rxweb/translate
         `,
        function (err: any, data: any, stderr: any) {
            console.log(data)
            cmd.get('npm install @rxweb/i18n', function () {
                if (answer.ngxPackageInstallation == "y" || !answer.ngxPackageInstallation)
                    cmd.get('ng add ngx-build-plus', function () {
                        console.log("completed")
                    })
                else
                    console.log("completed")
            })
        }
    );
}
