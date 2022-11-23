import { IFormGroup } from '../models/interface/i-form-group'

export abstract class TypedForm<T>{
    formGroup: IFormGroup<T>
}