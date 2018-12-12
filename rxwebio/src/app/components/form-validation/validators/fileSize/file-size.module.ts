import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FILE_SIZE_ROUTING } from "src/app/components/form-validation/validators/fileSize/file-size.routing";
import { FileSizeDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/fileSize/file-size-decorators-extended.module";
import { FileSizeValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/fileSize/file-size-validators-extended.module";
import { FileSizeTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/fileSize/file-size-validation-directives-extended.module";
import { FileSizeTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/fileSize/file-size-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { FILE_SIZE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/fileSize/file-size.constants";



@NgModule({
  imports: [FILE_SIZE_ROUTING, FileSizeDecoratorsExtendedModule, FileSizeValidatorsExtendedModule, FileSizeTemplateDrivenValidationDirectivesExtendedModule, FileSizeTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: FILE_SIZE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class FileSizeModule { }

