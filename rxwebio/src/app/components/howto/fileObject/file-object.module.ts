import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FILE_OBJECT_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/fileObject/file-object.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { FILE_OBJECT_ROUTING } from "src/app/components/howto/fileObject/file-object.routing";
import { PageModule } from "src/app/components/page/page.module";
import { FileObjectDecoratorsExtendedModule } from 'src/assets/examples/how-to/decorators/fileObject/file-object-decorators-extended.module';
import { FileObjectValidatorsExtendedModule } from 'src/assets/examples/how-to/validators/fileObject/file-object-validators-extended.module';


@NgModule({
  imports: [FILE_OBJECT_ROUTING ,PageModule,FileObjectDecoratorsExtendedModule,FileObjectValidatorsExtendedModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: FILE_OBJECT_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class FileObjectModule { }

