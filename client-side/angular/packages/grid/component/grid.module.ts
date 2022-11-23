import { NgModule, ModuleWithProviders } from '@angular/core';
import { GridElement } from './grid';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        GridElement
    ],
    imports: [CommonModule
    ],
    providers: [],
    exports: [GridElement],
    entryComponents: [],
})
export class GridModule { }
