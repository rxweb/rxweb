import { FilePathInfo } from "../interface/file-path-info";
import { rxWebConfig } from "../core/rxweb-config";

export function getFilePathInfos(files:string[]) {
    let filePathInfos: FilePathInfo[] = new Array<FilePathInfo>();
    let splitPath = rxWebConfig.config.translate.path.component.split('/');
    let componentFolder = splitPath[splitPath.length - 1];
    splitPath = rxWebConfig.config.translate.path.generate.interface.split('/');
    let interfaceFolder = splitPath[splitPath.length - 1];
    if (files) {
        files.forEach(filePath => {
            if (!filePath.endsWith('spec.ts') && (filePath.endsWith('.html') || filePath.endsWith('.ts')) && filePath.indexOf(`\\${componentFolder}\\`) != -1 && filePath.indexOf(`\\${interfaceFolder}\\`) == -1) {
                let paths = filePath.split('\\');
                let filePathInfo: FilePathInfo = {
                    directoryPath: paths.slice(0, paths.length - 1).join('\\'),
                    filePath: filePath.endsWith('.html') ? filePath.replace('.html', '.ts') : filePath
                }
                filePathInfos.push(filePathInfo);
            }
        })
    }
    return filePathInfos;
}
