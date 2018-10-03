import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisqusComponent } from "src/app/components/shared/disqus/disqus.component";
import { TimeAgoPipe } from 'time-ago-pipe';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
 imports:      [ CommonModule ,FormsModule, ReactiveFormsModule,],
 declarations: [ DisqusComponent,TimeAgoPipe ],
 exports:      [ DisqusComponent,CommonModule, FormsModule ]
})
export class DisqusSharedModule { }