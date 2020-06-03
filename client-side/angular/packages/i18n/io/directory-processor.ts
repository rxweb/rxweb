import * as fs from "fs";
import { PathProvider } from "./path-provider";
import { Notify } from "../core/notify";
import { APP_CONST } from "../const/app-const";

export abstract class DirectoryProcessor extends PathProvider {
    constructor() {
        super();
    }
    getDirectoriesOrFiles(directoryPath: string): string[] {
        return fs.readdirSync(directoryPath);
    }

    createDirectory(directoryPath: string, isNotify: boolean = true): void {
        if (!this.exists(directoryPath)) {
            fs.mkdirSync(directoryPath);
            if (isNotify)
                Notify.createdOrUpdated("CREATED", directoryPath.replace(`${this.basePath}\\`, APP_CONST.blank));
        }

    }




    create(mainPath: string) {
        if (!this.exists(mainPath)) {
            let splitPaths = mainPath.split("/");
            let finalPath = this.basePath;
            splitPaths.forEach(path => {
                finalPath = `${finalPath}\\${path}`
                this.createDirectory(finalPath,false)
            })
            Notify.createdOrUpdated("CREATED", mainPath);
        }
    }
}
