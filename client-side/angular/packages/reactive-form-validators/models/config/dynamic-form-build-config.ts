import { RxFormGroup } from '../../services/rx-form-group'
import { FormControlConfig } from '../../dynamic/form-control-config'
export interface DynamicFormBuildConfig{

    formGroup: RxFormGroup;

    controlsConfig: { [key: string]: FormControlConfig };

    sectionsConfig?: { [key: string]: any };
}