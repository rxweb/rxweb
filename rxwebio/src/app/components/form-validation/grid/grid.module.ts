import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/grid/grid-decorators-extended.module";
import { GridTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/grid/grid-validation-directives-extended.module";
import { GridTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/grid/grid-validation-decorators-extended.module";
import { GridValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/grid/grid-validators-extended.module";
import { GRID_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/grid/grid.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { GRID_ROUTING } from "src/app/components/form-validation/grid/grid.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [GRID_ROUTING ,GridDecoratorsExtendedModule , GridValidatorsExtendedModule ,GridTemplateDrivenValidationDirectivesExtendedModule, GridTemplateDrivenValidationDecoratorsExtendedModule ,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: GRID_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class GridModule { }

