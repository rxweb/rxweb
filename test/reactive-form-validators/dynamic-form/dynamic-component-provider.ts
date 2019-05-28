import { TestBed, ComponentFixture} from '@angular/core/testing';
import { Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { RxDynamicReactiveFormsModule, RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { RxwebBootstrapModule } from './bootstrap/bootstrap.components'
export function createComponentInstance<T>(component: Type<T>, ...directives: Type<any>[]): ComponentFixture<T> {
    TestBed.configureTestingModule(
        {
            declarations: [component, ...directives],
            imports: [FormsModule, ReactiveFormsModule, RxDynamicReactiveFormsModule, RxReactiveFormsModule, RxwebBootstrapModule,CommonModule]
        });
    return TestBed.createComponent(component);
}