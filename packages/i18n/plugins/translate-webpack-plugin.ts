import { TranslateService } from "../service/translate-service";

export class TranslationWebpackPlugin {
    apply(compiler:any) {
        compiler.hooks.watchRun.tap('TranslationWebpackPlugin', (hook: any) => {
            let files = Object.keys(hook.watchFileSystem.watcher.mtimes)
            let translateService = new TranslateService();
            translateService.webpack(files);
        });
    }
}
