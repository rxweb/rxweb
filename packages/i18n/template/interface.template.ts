import { StringBuilder } from "../core/string-builder";

export class InterfaceTemplate {
    imports: StringBuilder;
    properties: StringBuilder;
    name: string;
    fileName: string;
    constructor() {
        this.imports = new StringBuilder();
        this.properties = new StringBuilder();
    }
    
    private get interfaceDeclaration() {
      return  `export interface ${this.name}\n`;
    }

    toString() {
        return `${this.imports.toString()}${this.interfaceDeclaration}{\n${this.properties.toString()}}`;
    }
}
