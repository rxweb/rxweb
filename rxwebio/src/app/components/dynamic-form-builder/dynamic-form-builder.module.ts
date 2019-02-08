import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { RxFormsModule } from '@rx/forms';
import { RxViewModule } from '@rx/view';
import { ClipboardModule } from 'ngx-clipboard';
import { MonacoEditorModule } from 'ngx-monaco-editor'
import { HighlightModule } from 'ngx-highlightjs';
import { DYNAMIC_FORM_BUILDER_ROUTING } from './dynamic-form-builder.routing';
import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';
import { ValidationComponent } from './validation/validation.component';

@NgModule({
 imports:      [ DYNAMIC_FORM_BUILDER_ROUTING, CommonModule ,FormsModule, ReactiveFormsModule,RouterModule,RxFormsModule, RxViewModule,ClipboardModule, HighlightModule ,MonacoEditorModule ],
 declarations: [ DynamicFormBuilderComponent,ValidationComponent ],
 entryComponents:[ValidationComponent],
 exports:      [ DynamicFormBuilderComponent,RouterModule,ValidationComponent ]
})
export class DynamicFormBuilderModule { }