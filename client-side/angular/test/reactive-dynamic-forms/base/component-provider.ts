import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { RxReactiveDynamicFormsModule } from "@rxweb/reactive-dynamic-forms"
import { AddressSectionComponent } from "../components/sections/address-section.component";

export function createComponentInstance<T>(component: Type<T>, ...directives: Type<any>[]): ComponentFixture<T> {
    TestBed.configureTestingModule(
        {
            declarations: [AddressSectionComponent, component, ...directives],

            imports: [FormsModule, ReactiveFormsModule, RxReactiveDynamicFormsModule, RxReactiveFormsModule, CommonModule]
        });
    return TestBed.createComponent(component);
}