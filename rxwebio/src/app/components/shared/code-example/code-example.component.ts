import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ElementRef } from "@angular/core";
import { ViewContainerRef } from "@angular/core";
import { ComponentFactoryResolver } from "@angular/core";
import { ComponentView } from "src/app/domain/view";
import { AlphaAllowWhiteSpaceComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { Inject } from "@angular/core";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { BaseComponentProvider } from "src/app/components/shared/base.component";

@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
})

export class CodeExampleComponent extends BaseComponentProvider implements OnInit {
    @Input() Component: any;
    element: HTMLElement;
    componentSelector: string;
    constructor(private elementRef: ElementRef, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef,
    @Inject(COMPONENT_EXAMPLE) exampleComponents: { [key: string]: any }
    ) {
        super(viewContainerRef,componentFactoryResolver,exampleComponents)
        this.element = elementRef.nativeElement as HTMLElement;
    }
    ngOnInit(): void {
        this.element.appendChild(this.create(this.Component,{}).rootNode());
    }
}