import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule} from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule, ReactiveFormsModule, FormsModule, RxReactiveFormsModule,
      HttpModule, CommonModule,
     ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


