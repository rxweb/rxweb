import { IControlValueAccessor } from "@rxweb/types"
export class ControlValue implements IControlValueAccessor<string>{
    function: (value: Date) => void;
    value: Date;
    writeValue(obj: string): void {
        this.value = obj;
    }

    registerOnChange(fn: (value: string) => void): void {
        this.function = fn;
    }

    registerOnTouched(fn: any): void {
        throw new Error("Method not implemented.");
    }

    setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }
}
