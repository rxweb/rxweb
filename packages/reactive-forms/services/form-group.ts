
export interface FormGroupExtension {
    isDirty: () => boolean;
    resetForm: () => void;
    getErrorSummary: (onlyMessage: boolean) => { [key: string]: any };
    toFormData: () => FormData;

}
