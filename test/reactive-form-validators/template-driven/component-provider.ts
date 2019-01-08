import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from "@angular/forms"
import { RxReactiveFormsModule } from "../../../packages/reactive-form-validators"

export function createInstance<T>(component: Type<T>, ...directives: Type<any>[]): ComponentFixture<T> {
    TestBed.configureTestingModule(
        { declarations: [component, ...directives], imports: [FormsModule, ReactiveFormsModule, RxReactiveFormsModule] });
    return TestBed.createComponent(component);
}