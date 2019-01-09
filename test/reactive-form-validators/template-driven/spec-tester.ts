import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"
import { tick } from '@angular/core/testing';

export function specTester(fixture: any, jObject: any, validatorName: string, errorObject: { [key: string]: any } = undefined): boolean {
    let validateControlName = '';
    for (var columnName in jObject) {
        const areaName = fixture.debugElement.query(By.css(`[name=${columnName}]`));
        areaName.nativeElement.value = jObject[columnName];
        areaName.nativeElement.dispatchEvent(new Event("input"));
        validateControlName = columnName;
    }
    fixture.detectChanges();
    tick(3000);
    const form = fixture.debugElement.children[0].injector.get(NgForm);
    const control = form.control.get(validateControlName);
    return control.hasError(validatorName);
}