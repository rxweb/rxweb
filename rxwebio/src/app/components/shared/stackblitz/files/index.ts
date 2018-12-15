import { ANGULAR } from "./angular.string";
import { APP_MODULE } from "./app-module.string";
import { INDEXHTML } from "./index.string";
import { MAIN } from "./main.string";
import { PACKAGE } from "./package.string";
import { POLYFILLS } from "./polyfills.string";
import { STYLES } from "./styles.string";
import { APP_COMPONENT } from "src/app/components/shared/stackblitz/files/app-component.string";
import { APP_COMPONENT_HTML } from "src/app/components/shared/stackblitz/files/app-component-html.string";

export const FILES:{[key:string]:any} =  {
"angular.json":ANGULAR,
"package.json":PACKAGE,
"src/index.html":INDEXHTML,
"src/main.ts":MAIN,
"src/polyfills.ts":POLYFILLS,
"src/styles.css":STYLES,
"src/app/app.module.ts":APP_MODULE,
"src/app/app.component.ts":APP_COMPONENT,
"src/app/app.component.html":APP_COMPONENT_HTML,
}
