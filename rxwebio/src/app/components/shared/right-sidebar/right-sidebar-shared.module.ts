import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RightSideBarComponent } from "src/app/components/shared/right-sidebar/right-sidebar.component";

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ RightSideBarComponent ],
 exports:      [ RightSideBarComponent,CommonModule, FormsModule ]
})
export class RightSideBarSharedModule { }