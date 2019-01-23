import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { CONDITIONAL_VALIDATION_ROUTING } from "src/app/components/advance-form-validation/conditionalValidation/conditional-validation.routing";
import { PageModule } from "src/app/components/page/page.module";
import { CONDITIONAL_VALIDATION_COMPONENT_EXAMPLE_CONSTANT } from './conditional-validation.constant';
import { ConditionalValidationExtendedModule } from 'src/assets/examples/advance-form-validations/conditional-validation-extended.module';



@NgModule({
  imports: [CONDITIONAL_VALIDATION_ROUTING ,PageModule,ConditionalValidationExtendedModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: CONDITIONAL_VALIDATION_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ConditionalValidationModule { }

