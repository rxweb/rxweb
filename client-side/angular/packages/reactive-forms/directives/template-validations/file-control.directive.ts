import { ExtensionConfig, SizeConfig, FileConfig } from '../../models/config'
import { APP_VALIDATORS } from "../../const/app-validators.const";
import { AbstractControl } from '../../abstract/abstract-control';
const VALIDATOR_CONFIG = "validatorConfig";
const FILE_VALIDATOR_NAMES: string[] = ["extension", "fileSize", "file"];

export class FileControlDirective {
    files: any;
    element: any
    isProcessed: boolean = false;
    

    private validators: Function[] = [];

    onChange = (_) => { };
    onTouched = () => { };

    onChangeCall(element: any) {
        let files = element.files;
        if (this.writeFile)
            this.onChange(files);
        else {
            if (files.length > 0)
                this.onChange(element.value);
            else
                this.onChange(undefined);
        }
    }

    writeFile: boolean = false;
    set extension(config: ExtensionConfig) {
        this.pushValidator(FILE_VALIDATOR_NAMES[0], config)
    }
    set fileSize(config: SizeConfig) {
        this.pushValidator(FILE_VALIDATOR_NAMES[1], config)
    }

    set file(config: FileConfig) {
        this.pushValidator(FILE_VALIDATOR_NAMES[2], config)
    }

    constructor(private elementRef: any) {
        this.element = elementRef.nativeElement as Node;
    }

    setConfig(control: any) {
        let _this:any = this;
        FILE_VALIDATOR_NAMES.forEach((t:string) => {
            if (!_this[t] && control[VALIDATOR_CONFIG] && control[VALIDATOR_CONFIG][t])
                _this[t] = control[VALIDATOR_CONFIG][t];
        })
        this.isProcessed = true;
    }

    pushValidator(validatorName: string, config: ExtensionConfig | SizeConfig | FileConfig) {
        if (config)
            this.validators.push(APP_VALIDATORS[validatorName](config))
    }

    validate(control: AbstractControl): { [key: string]: any } {
        if (!this.isProcessed)
            this.setConfig(control);
        var result = null;
        for (var validator of this.validators) {
            result = validator(control, this.element.files);
            if (result)
                break;
        }
        return result
    }
}
