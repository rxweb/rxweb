import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common"
import { BrowserModule } from '@angular/platform-browser';;
import { RxHttp } from '../http';
import { HttpModule } from '@angular/http';
import {
    GridTemplateHostDirective,
    RxCellTemplateDirective,
    RxColumnComponent,
    RxPermissionItemTemplateDirective,
    RxSelectableDirective,
    RxTableComponent,
    RxTableDetailTemplateDirective, ValueOfPipe, RxTemplateComponent, RxFooterComponent
} from './table'
import { RxViewModule } from '../view/views.module';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";



@NgModule({
  imports: [CommonModule, HttpModule, RouterModule, RxViewModule,FormsModule],
    declarations: [
        GridTemplateHostDirective,
        RxCellTemplateDirective,
        RxColumnComponent,
        RxPermissionItemTemplateDirective,
        RxSelectableDirective,
        RxTableComponent,
      RxTableDetailTemplateDirective, ValueOfPipe, RxTemplateComponent, RxFooterComponent
    ], exports: [
        RxCellTemplateDirective,
        RxColumnComponent,
        RxPermissionItemTemplateDirective,
        RxTableComponent,
      RxTableDetailTemplateDirective, RxTemplateComponent, RxFooterComponent
    ],
    providers: [RxHttp, DatePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RxTableModule {
}
