import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
// import { AllOfTemplateDrivenExtendedModule } from 'src/assets/examples/reactive-form-validators/template-driven/allOf/all-of-template-driven-extended.module';
import { AllOfValidatorsExtendedModule } from 'src/assets/examples/reactive-form-validators/validators/allOf/all-of-validators-extended.module';
import { ALL_OF_ROUTING } from './all-of.routing';
import { PageModule } from '../../page/page.module';
import { ALL_OF_COMPONENT_EXAMPLE_CONSTANT } from './all-of.constants';
import { AllOfDecoratorsExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/allOf/all-of-decorators-extended.module';

@NgModule({
  imports: [ALL_OF_ROUTING, AllOfValidatorsExtendedModule,AllOfDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: ALL_OF_COMPONENT_EXAMPLE_CONSTANT }]
})
export class AllOfModule { }
