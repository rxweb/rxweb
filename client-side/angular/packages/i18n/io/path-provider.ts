import { TranslatePathProvider } from './path-provider/translate-path-provider'
import * as fs from "fs";
import * as path from "path";
declare var process: any;
import { FilePathInfo} from '../interface/file-path-info'
export abstract class PathProvider {
    basePath: string;

    constructor() {
        this.basePath = process.cwd();
        this.translate = new TranslatePathProvider(this.basePath);
    }

    exists(path:string):boolean {
        return fs.existsSync(path);
    }

    get configPath():string {
        return `${this.basePath}\\rxweb.json`;
    }

    get modulePath(): string {
        return `${this.translate.component}\\rxweb.module.ts`;
    }

    get webpackPath(): string {
        return `${this.basePath}\\rxweb.webpack.dev.js`;
    }

    get isExistsConfig() {
        return this.exists(this.configPath);
    }

    allFiles(directoryPath: string, extension: string = ".ts"): Array<FilePathInfo> {
        let filePathInfos: Array<FilePathInfo> = new Array<FilePathInfo>();
        fs.readdirSync(directoryPath)
            .reduce((files, file) => {
                if (file.lastIndexOf(extension) != -1) 
                    filePathInfos.push({ directoryPath: directoryPath, filePath: path.join(directoryPath, file) });
                
                return fs.statSync(path.join(directoryPath, file)).isDirectory() ?
                    files.concat(this.allFiles(path.join(directoryPath, file))) :
                    files.concat(path.join(directoryPath, file));
            }, []);
        return filePathInfos;
    }

    translate: TranslatePathProvider;
}
