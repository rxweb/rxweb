import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, AddressSectionComponent} from './app.component';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RxReactiveDynamicFormsModule } from '@rxweb/reactive-dynamic-forms'

@NgModule({
  declarations: [
        AppComponent, AddressSectionComponent
  ],
  imports: [
      BrowserModule, ReactiveFormsModule, FormsModule, RxReactiveFormsModule, RxReactiveDynamicFormsModule,
      CommonModule,
     ],
  providers: [],
    bootstrap: [AppComponent],
    entryComponents: [AddressSectionComponent]
})
export class AppModule { }


