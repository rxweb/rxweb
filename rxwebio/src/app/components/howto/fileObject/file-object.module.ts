import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileObjectDecoratorsExtendedModule } from "src/assets/examples/howto/decorators/fileObject/file-object-decorators-extended.module";

import { FileObjectValidatorsExtendedModule } from "src/assets/examples/howto/validators/fileObject/file-object-validators-extended.module";
import { FILE_OBJECT_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/fileObject/file-object.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { FILE_OBJECT_ROUTING } from "src/app/components/howto/fileObject/file-object.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [FILE_OBJECT_ROUTING ,FileObjectDecoratorsExtendedModule ,FileObjectValidatorsExtendedModule,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: FILE_OBJECT_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class FileObjectModule { }

