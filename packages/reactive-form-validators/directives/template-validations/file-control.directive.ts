import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: "input[type=file]",
    host : {
        "(change)" : "onChangeEvent($event.target.files)",
        "(blur)": "onBlurEvent()"
    },
    providers: [{provide: NG_VALUE_ACCESSOR,
                 useExisting: FileControlDirective,
                 multi: true}]
})
export class FileControlDirective implements ControlValueAccessor {
    writeValue(value) {}

    onChangeEvent = (value) => {};
    onBlurEvent = () => {};

    

    registerOnChange(eventFunction: any) {
       this.onChangeEvent = eventFunction;
    }

    registerOnTouched(eventFunction: any) {
        this.onBlurEvent = eventFunction;
    }
}
