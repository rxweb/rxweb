import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisqusComponent } from "src/app/components/shared/disqus/disqus.component";

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ DisqusComponent ],
 exports:      [ DisqusComponent,CommonModule, FormsModule ]
})
export class DisqusSharedModule { }