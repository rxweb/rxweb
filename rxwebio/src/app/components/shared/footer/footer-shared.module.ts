import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './footer.component';

@NgModule({
 imports:      [ CommonModule,FormsModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule,HttpClientModule ],
 declarations: [ FooterComponent ],
 exports:      [ FooterComponent,CommonModule, FormsModule ]
})
export class FooterSharedModule { }