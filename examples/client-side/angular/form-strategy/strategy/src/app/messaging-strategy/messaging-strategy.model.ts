export interface MessagingStrategy {
    onDirty: string;
    onTouched: string;
    onDirtyOrTouched: string;
    onDirtyOrSubmit: string;
    onTouchedOrSubmit: string;
    onSubmit: string;
}
