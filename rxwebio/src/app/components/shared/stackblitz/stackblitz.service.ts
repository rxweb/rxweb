import { FILES } from "./files"
import { PACKAGE } from './files/package.string'
import { VALIDATION_MESSAGES } from "src/app/components/shared/stackblitz/files/validation-messages.const";
const STACKBLITZ_ANGULAR_TEMPLATE_URI = 'https://run.stackblitz.com/api/angular/v1';



export class StackBlitzService {
  constructor() {
  }

  buildForm(validationName: string, exampleName: string, validationType: string, templateDrivenType: string, exampleContent: { [key: string]: any }, title?: string) {
    if (title == null)
      title = validationName + " " + validationType + " with " + exampleName;
    let exampleComponentFileName = `src/app/${this.parseName(validationName)}-${this.parseName(exampleName)}.component.ts`
    let componentPath = `${this.parseName(validationName)}-${this.parseName(exampleName)}.component`;
    let exampleComponentHtmlFileName = `src/app/${this.parseName(validationName)}-${this.parseName(exampleName)}.component.html`
    let form = this.createFormElement(exampleComponentFileName);
    this.addDefaultElement(form, validationName, exampleName, validationType, templateDrivenType, title);
    let selectorName;
    let componentName;
    if (validationType != undefined && validationType == "validator") {
      selectorName = `app-${validationName}-${exampleName}-${this.dashCase(validationType)}`
      componentName = `${this.pascalCase(validationName)}${this.pascalCase(exampleName)}${this.pascalCase(validationType)}Component`;
    }
    else if (validationType != undefined && validationType == "templateDriven") {
      selectorName = `app-${validationName}-${exampleName}-${this.dashCase(validationType)}-validation-${templateDrivenType}`
      componentName = `${this.pascalCase(validationName)}${this.pascalCase(exampleName)}${this.pascalCase(validationType)}Validation${this.pascalCase(templateDrivenType)}Component`;
    }
    else {
      selectorName = `app-${validationName}-${exampleName}`;
      componentName = `${this.pascalCase(validationName)}${this.pascalCase(exampleName)}Component`;
    }
    for (var fileName in FILES) {
      let fileContent = FILES[fileName]
      fileContent = fileContent.replace(new RegExp(/selector-name/, "g"), selectorName);
      fileContent = fileContent.replace(new RegExp(/##component-name##/), componentName).replace(new RegExp(/##title##/), title).replace(new RegExp(/##component-name##/), componentName).replace(new RegExp(/##component-name##/), componentName).replace(new RegExp(/##component-path##/), componentPath);
      if (fileName.indexOf("app.component.ts")) {
        let configObject = { validationMessage: {} };
        if (validationName.indexOf("Date") >= 0) {
          configObject['internationalization'] = {};
          configObject['internationalization'] = VALIDATION_MESSAGES["internationalization"]
        }
        configObject.validationMessage[validationName] = VALIDATION_MESSAGES["validationMessage"][validationName];
        fileContent = fileContent.replace(new RegExp(/##global-config##/), JSON.stringify(configObject));
      }
      this.addInputElement(form, `files[${fileName}]`, fileContent);
    }
    if (exampleContent["modelName"] != null && exampleContent["model"] != null) {
      let exampleModelFileName = `src/app/${exampleContent["modelName"]}`
      this.addInputElement(form, `files[${exampleModelFileName}]`, exampleContent["model"]);
    }
    if (JSON.stringify(exampleContent["json"]) !== JSON.stringify({})) {
      this.addJson(form, exampleContent,validationType,validationName,exampleName,templateDrivenType)
    }

    // if (exampleContent["jsonName"] != null && exampleContent["json"] != null) {
    //   let exampleJsonFileName = `src/assets/${exampleContent["jsonName"]}`
    //   this.addInputElement(form, `files[${exampleJsonFileName}]`, exampleContent["json"]);
    //   if (exampleContent["component"] != null)
    //     exampleContent["component"] = exampleContent["component"].replace(`assets/examples/reactive-form-validators/${validationType}s/${validationName}/${exampleName}/${exampleContent["jsonName"]}`, `assets/${exampleContent["jsonName"]}`)
    // }
    if (exampleContent["component"] != null)
      this.addInputElement(form, `files[${exampleComponentFileName}]`, exampleContent["component"]);
    if (exampleContent["html"] != null)
      this.addInputElement(form, `files[${exampleComponentHtmlFileName}]`, exampleContent["html"]);
    return form;
  }

  private addDefaultElement(form: any, validatorName: string, exampleName: string, validatorType: string, templateDrivenType: string, title?: string) {
    ['angular', 'reactive-form-validation', 'rxweb', validatorType, templateDrivenType, validatorName, exampleName].forEach((tag, i) => this.addInputElement(form, `tags[${i}]`, tag));
    this.addInputElement(form, 'private', 'true');
    this.addInputElement(form, 'title', title);
    this.addInputElement(form, 'description', title);
    let parsePackage = JSON.parse(PACKAGE)
    this.addInputElement(form, 'dependencies', JSON.stringify(parsePackage.dependencies));
  }

  private createFormElement(indexFile: string): HTMLFormElement {
    const form = document.createElement('form');
    form.action = `${STACKBLITZ_ANGULAR_TEMPLATE_URI}?file=${indexFile}`;
    form.method = 'post';
    form.target = '_blank';
    return form;
  }

  private addInputElement(form: HTMLFormElement, name: string, value: string): void {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  private replaceText(fileContent: string) {

  }
  private parseName(name: string) {
    let fileName = '';
    let splitTexts = name.split("");
    for (var character of splitTexts) {
      fileName += (character == character.toUpperCase()) ? `-${character.toLowerCase()}` : `${character.toLowerCase()}`;
    }
    return fileName;
  }


  private pascalCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }


  private dashCase(value: string, seprator: string = "-") {
    let count = 0;
    value = value.replace(" ", seprator);
    let newString = "";
    value.split('').forEach(t => {
      if (count != 0 && t != t.toLowerCase())
        newString += seprator;
      newString += t.toLowerCase();
      count++;
    });
    return newString;
  }


  private addJson(form, obj,validationType,validationName,exampleName,templateDrivenType) {
    var jsonObject = obj['json'];
    if (jsonObject) {
      for (var prop in jsonObject) {
        if (jsonObject.hasOwnProperty(prop)) {
          let exampleJsonFileName = `src/assets/${prop}`
          let sourcePath:string= validationType == "templateDriven" ? `assets/examples/reactive-form-validators/template-driven/validation-${templateDrivenType}/${validationName}/${exampleName}/${prop}` :`assets/examples/reactive-form-validators/${validationType}s/${validationName}/${exampleName}/${prop}`;
          let destinationPath:string =  `assets/${prop}`
          this.addInputElement(form, `files[${exampleJsonFileName}]`, jsonObject[prop]);
          if (obj["component"] != null)
          debugger
            obj["component"] = obj["component"].replace(sourcePath, destinationPath)
        }
      }
    }
  }
}
