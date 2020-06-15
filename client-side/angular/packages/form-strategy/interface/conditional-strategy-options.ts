export interface CondtionalStrategyOptions {
    message?: (formGroup, rootFormGroup) => boolean;
    disable?: (formGroup, rootFormGroup) => boolean;
}