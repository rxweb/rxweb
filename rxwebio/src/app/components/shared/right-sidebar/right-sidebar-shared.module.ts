import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RightSideBarComponent } from "src/app/components/shared/right-sidebar/right-sidebar.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

@NgModule({
 imports:      [ CommonModule,FormsModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule,HttpClientModule,RouterModule ],
 declarations: [ RightSideBarComponent ],
 exports:      [ RightSideBarComponent,CommonModule, FormsModule,RouterModule ]
})
export class RightSideBarSharedModule { }