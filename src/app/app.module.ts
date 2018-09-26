import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Injectable, Inject, ReflectiveInjector } from "@angular/core"
import { AppComponent } from './app.component';
import { RxFormBuilder, RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule, FormBuilder } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import { RequestOptions, Headers } from "@angular/http";
import { Response } from "@angular/http";
import { CanDeactivate } from "@angular/router";


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


