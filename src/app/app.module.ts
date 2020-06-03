import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppComponent} from './app.component';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RxReactiveDynamicFormsModule } from '@rxweb/reactive-dynamic-forms'
import { Routes, RouterModule, CanActivate, } from '@angular/router';

@NgModule({
  declarations: [
        AppComponent
  ],
    imports: [
        BrowserModule, ReactiveFormsModule, FormsModule, RxReactiveFormsModule, RxReactiveDynamicFormsModule,
        CommonModule,
        
     ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [RouterModule],
    entryComponents: [],
})
export class AppModule { }


