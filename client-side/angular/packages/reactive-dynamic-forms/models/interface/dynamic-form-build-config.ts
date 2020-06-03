import { RxFormGroup } from '@rxweb/reactive-form-validators'
import { FormControlConfig } from '../../services/form-control-config'

export interface DynamicFormBuildConfig{

    formGroup: RxFormGroup;

    controlsConfig: { [key: string]: FormControlConfig };

    sectionsConfig?: { [key: string]: any };
}