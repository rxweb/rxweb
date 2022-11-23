import * as fs from "fs"
import { APP_CONST } from "../const/app-const";
import { DirectoryProcessor } from "./directory-processor";
import { Notify } from "../core/notify";

export abstract class FileProcessor extends DirectoryProcessor {
    

    readJSON(filePath: string) {
        return JSON.parse(this.read(filePath));
    }

    readText(filePath: string) {
        return this.read(filePath);
    }

    createJSONFile(filePath: string, content: { [key: string]: any }) {
        let action = this.exists(filePath) ? 'UPDATED' : 'CREATED';
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        Notify.createdOrUpdated(action,filePath.replace(`${this.basePath}\\`, APP_CONST.blank),)
    }

    createFile(filePath:string,content:string,action:string = "CREATED") {
        fs.writeFileSync(filePath, content);
        Notify.createdOrUpdated(action, filePath.replace(`${this.basePath}\\`, APP_CONST.blank))
    }

    private read(filePath:string) {
        return fs.readFileSync(filePath, APP_CONST.utf);
    }
}
